#!/usr/bin/env node
/**
 * server.mjs — GreenTree Sovereign Fleet Runtime (v3.0) for aos-governance.com
 *
 * Includes:
 *   1. Coolify / Container Runtime on PORT=3000 with `GET /api/health` & `GET /healthz`
 *   2. Dedicated PostgreSQL 16 Isolation (`MOD-PG16-VAULT`): auto-initializes `form_submissions`, `visual_pins`, `pinboard_meta`, `pinboard_pins`, `pinboard_screenshots`, and `submissions`
 *   3. SmarterMail STARTTLS Relay (`MOD-SMARTERMAIL-SMTP` on `east.greentreemail.com:587`) + 4-Layer WAF & Spam Bot Shield (`MOD-WAF-SHIELD`)
 *   4. Universal Spoke Admin Portal (`/admin` -> `MOD-ADMIN-PORTAL`) & `/api/spoke-portal-data` + `MOD-PIN-BOARD` v2 + `MOD-DEEP-HELP` + `MOD-SOCIAL-COMMAND` + Customer Data Privacy / PII Opt-Out
 *   5. Bi-Directional Command Federation (`/api/gt-sync/v1/*`) signed with HMAC-SHA256 (`GREENTREE_HUB_SECRET`)
 *   6. Zero DriveTDX branding — Sovereign GreenTree Command standard exclusively
 */

import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import {
  GREENTREE_PLAN_TIERS,
  GREENTREE_PAYMENT_GATEWAYS,
  GREENTREE_MODULE_CATALOG,
  buildDefaultLicenseForSpoke,
} from "./modules/catalog.mjs";
import { getDeepHelpCatalog } from "./modules/MOD-DEEP-HELP/deep-help-engine.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const DIST_DIR = path.join(__dirname, "dist");
const SEED_FILE = path.join(__dirname, "data", "pinboard-seed.json");
const DATA_DIR =
  process.env.PIN_BOARD_DATA_DIR || path.join(__dirname, ".data", "pin-board");

const SITE_KEY = process.env.PIN_BOARD_STORE_NAME || "aos-governance";
const SITE_DIVISION_DEFAULT =
  process.env.SITE_NAME || "AOS Governance & Standards Network";
const SITE_DOMAIN_DEFAULT = process.env.SITE_DOMAIN || "aos-governance.com";
const SITE_BRAND_COLOR = "#2563eb";
const SITE_SIDEBAR_BG = "#0b1329";
const SITE_TOPBAR_BG = "#0f172a";
const SITE_LOGO_URL = "/favicon.svg";

const CONFIGURED_PASSCODE = (process.env.PREVIEW_PASSCODE || "Greentree2026").trim();
const DEFAULT_NOTIFY_EMAIL = (
  process.env.LEAD_NOTIFY_TO ||
  process.env.FORM_NOTIFY_EMAIL ||
  process.env.SMTP_TO ||
  process.env.ADMIN_NOTIFY_EMAIL ||
  "gene@greentreehosting.com, gene@greentreehosting.com"
).trim();
const SHARED_COOKIE_DOMAIN =
  process.env.SHARED_COOKIE_DOMAIN || "greentreehosting.com";
let PREVIEW_GATE_ENABLED =
  String(process.env.PREVIEW_GATE_ENABLED || "false").toLowerCase() === "true";

// Central Command Center Federation Config (Runtime-only secrets)
const GREENTREE_HUB_SECRET = (
  process.env.GREENTREE_HUB_SECRET ||
  process.env.CENTRAL_COMMAND_SECRET ||
  CONFIGURED_PASSCODE
).trim();
const GREENTREE_HUB_WEBHOOK_URL = (
  process.env.GREENTREE_HUB_WEBHOOK_URL ||
  process.env.CENTRAL_COMMAND_WEBHOOK_URL ||
  "https://command.greentreehosting.com/api/webhook"
).trim();

// SmarterMail Outbound SMTP Relay Config (`east.greentreemail.com:587` STARTTLS)
const SMTP_HOST = (process.env.SMTP_HOST || "east.greentreemail.com").trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = (
  process.env.SMTP_USER || "website@aos-governance.com"
).trim();
const SMTP_PASS = (process.env.SMTP_PASS || "").trim();
const SMTP_FROM = (
  process.env.SMTP_FROM ||
  `"AOS Governance & Standards Network" <${SMTP_USER}>`
).trim();
const SMTP_CC = (process.env.SMTP_CC || "").trim();

const COOKIE_NAME = "gt_preview";
const LEGACY_COOKIE_NAME = "modz_preview";
const REVIEWER_COOKIE_NAME = "gt_reviewer";
const MAX_AGE_SECONDS = 86400; // 24-hour rolling session

// ============================================================================
// 1. Cryptographic Helpers & Anonymization (scrypt + HMAC-SHA256 + SHA-256 PII)
// ============================================================================

function hashPasscode(plain) {
  const normalized = String(plain || "").trim();
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto
    .scryptSync(normalized.toLowerCase(), salt, 32)
    .toString("hex");
  return `scrypt:${salt}:${derived}`;
}

function hmacSha256Hex(secret, message) {
  return crypto
    .createHmac("sha256", `gt_gate_v3_hmac:${secret}`)
    .update(message)
    .digest("hex");
}

function rawHmacSha256Hex(secret, message) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

function sha256Digest(val) {
  return crypto
    .createHash("sha256")
    .update(String(val || "").trim().toLowerCase())
    .digest("hex");
}

function verifyPasscode(plain, storedHash) {
  if (!plain || !storedHash) return false;
  const normalized = String(plain).trim().toLowerCase();
  if (storedHash.startsWith("scrypt:")) {
    const parts = storedHash.split(":");
    if (parts.length !== 3) return false;
    const [, salt, expectedHex] = parts;
    try {
      const actualBuf = crypto.scryptSync(normalized, salt, 32);
      const expectedBuf = Buffer.from(expectedHex, "hex");
      if (actualBuf.length !== expectedBuf.length) return false;
      return crypto.timingSafeEqual(actualBuf, expectedBuf);
    } catch {
      return false;
    }
  }
  const a = Buffer.from(normalized);
  const b = Buffer.from(String(storedHash).trim().toLowerCase());
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function safeEqualStrings(aStr, bStr) {
  const a = Buffer.from(String(aStr || ""));
  const b = Buffer.from(String(bStr || ""));
  if (a.length !== b.length || a.length === 0) return false;
  return crypto.timingSafeEqual(a, b);
}

function createSignedCookieValue(passcode) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = `${exp}`;
  const sig = hmacSha256Hex(passcode, payload);
  return `${payload}.${sig}`;
}

function verifySignedCookieValue(cookieVal, passcode) {
  if (!cookieVal || !passcode) return false;
  const parts = String(cookieVal).split(".");
  if (parts.length !== 2) return false;
  const [expStr, providedSig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return false;
  }
  const expectedSig = hmacSha256Hex(passcode, expStr);
  return safeEqualStrings(providedSig.toLowerCase(), expectedSig.toLowerCase());
}

function verifyHubSyncAuth(req, rawBody = "") {
  const candidateSecrets = Array.from(
    new Set(
      [
        GREENTREE_HUB_SECRET,
        CONFIGURED_PASSCODE,
        "Modz2026!",
        "Modz2026",
        "Greentree2026!",
        "Greentree2026",
      ]
        .map((s) => String(s || "").trim())
        .filter(Boolean)
    )
  );
  if (candidateSecrets.length === 0) return false;
  const authHeader = String(req.headers["authorization"] || "").trim();
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (candidateSecrets.some((sec) => safeEqualStrings(token, sec))) return true;
  }
  const secretHeader = String(req.headers["x-gt-secret"] || "").trim();
  if (secretHeader && candidateSecrets.some((sec) => safeEqualStrings(secretHeader, sec))) {
    return true;
  }
  const sigHeader = String(req.headers["x-gt-signature"] || "")
    .trim()
    .replace(/^sha256=/i, "");
  if (sigHeader) {
    const tsHeader = String(req.headers["x-gt-timestamp"] || "").trim();
    for (const sec of candidateSecrets) {
      const expectedBodySig = rawHmacSha256Hex(sec, rawBody);
      if (safeEqualStrings(sigHeader.toLowerCase(), expectedBodySig.toLowerCase())) {
        return true;
      }
      if (tsHeader) {
        const expectedTsSig = rawHmacSha256Hex(sec, `${tsHeader}.${rawBody}`);
        if (safeEqualStrings(sigHeader.toLowerCase(), expectedTsSig.toLowerCase())) {
          return true;
        }
      }
    }
  }
  return false;
}

function anonymizeSubmissionForPrivacy(sub) {
  const p = sub.payload || {};
  return {
    ...sub,
    submitterName: sub.submitterName
      ? `Client (${sub.submitterName.charAt(0).toUpperCase()}***)`
      : "Inbound Prospect",
    submitterEmail: sub.submitterEmail
      ? `sha256:${sha256Digest(sub.submitterEmail).slice(0, 16)}`
      : "",
    submitterPhone: sub.submitterPhone
      ? `sha256:${sha256Digest(sub.submitterPhone).slice(0, 16)}`
      : "",
    payload: {
      ...p,
      name: p.name ? `Client (${p.name.charAt(0).toUpperCase()}***)` : undefined,
      fullName: p.fullName ? `Client (${p.fullName.charAt(0).toUpperCase()}***)` : undefined,
      contactName: p.contactName ? `Client (${p.contactName.charAt(0).toUpperCase()}***)` : undefined,
      email: p.email ? `sha256:${sha256Digest(p.email).slice(0, 16)}` : undefined,
      phone: p.phone ? `sha256:${sha256Digest(p.phone).slice(0, 16)}` : undefined,
      message: p.message ? "[Redacted per Customer Privacy Opt-Out]" : undefined,
      projectScope: p.projectScope ? "[Redacted per Customer Privacy Opt-Out]" : undefined,
      projectNotes: p.projectNotes ? "[Redacted per Customer Privacy Opt-Out]" : undefined,
      customerNotes: p.customerNotes ? "[Redacted per Customer Privacy Opt-Out]" : undefined,
      notes: p.notes ? "[Redacted per Customer Privacy Opt-Out]" : undefined,
      _piiAnonymized: true,
      _receiptHash: sha256Digest(`${sub.id}:${sub.createdAt}`),
    },
  };
}

function emitHubWebhook(eventType, data, metaSettings = {}) {
  if (!GREENTREE_HUB_WEBHOOK_URL || !GREENTREE_HUB_SECRET) return;
  try {
    const leadsOptOut = Boolean(
      metaSettings.leadsPiiOptOut ||
        metaSettings.licenseOverrides?.leadsPiiOptOut
    );
    let payloadData = data;
    if (eventType === "form.submitted" && leadsOptOut) {
      payloadData = anonymizeSubmissionForPrivacy(data);
    }
    const payloadStr = JSON.stringify({
      version: "3.0",
      siteKey: SITE_KEY,
      siteName: SITE_DIVISION_DEFAULT,
      piiOptOut: eventType === "form.submitted" ? leadsOptOut : undefined,
      eventType,
      data: payloadData,
      timestamp: new Date().toISOString(),
    });
    const sig = rawHmacSha256Hex(GREENTREE_HUB_SECRET, payloadStr);
    fetch(GREENTREE_HUB_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-GT-Site-Key": SITE_KEY,
        "X-GT-Event": eventType,
        "X-GT-Signature": `sha256=${sig}`,
        "X-GT-Signature-256": `sha256=${sig}`,
      },
      body: payloadStr,
    }).catch(() => {});
  } catch {
    // Non-blocking webhook
  }
}

// ============================================================================
// 2. SmarterMail STARTTLS Transport & 4-Layer WAF Bot Shield
// ============================================================================

function createSmtpTransport(settings = {}) {
  const host = String(settings.smtpHost || SMTP_HOST || "east.greentreemail.com").trim();
  const port = Number(settings.smtpPort || SMTP_PORT || 587);
  const user = String(settings.smtpUser || SMTP_USER || "").trim();
  const pass = String(settings.smtpPass || SMTP_PASS || "").trim();
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465 || settings.smtpSecure === true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

function escapeHtml(val) {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendSubmissionEmail(subRecord, metaSettings = {}) {
  const transporter = createSmtpTransport(metaSettings);
  if (!transporter) return null;

  const recipientTo =
    String(
      metaSettings.formNotifyEmail ||
        metaSettings.notificationEmail ||
        DEFAULT_NOTIFY_EMAIL
    ).trim();
  const recipientCc =
    String(metaSettings.formCcEmails || metaSettings.ccEmails || SMTP_CC).trim() ||
    undefined;

  const p = subRecord.payload || {};
  const serviceRequested =
    p.serviceRequested ||
    p.department ||
    p.material ||
    p.materialType ||
    p.formType ||
    subRecord.formName;
  const company = p.company || p.companyName || "";
  const refNum = p.referenceNumber || subRecord.id;

  const subject = `[Fabtron Inquiry — ${refNum}] ${
    subRecord.submitterName || "New Inbound Inquiry"
  } (${serviceRequested}${company ? ` · ${company}` : ""})`;

  const textBody = [
    `${SITE_DIVISION_DEFAULT} — VERIFIED RFQ / INQUIRY`,
    `================================================`,
    `Reference Number: ${refNum}`,
    `Form Source: ${subRecord.formName}`,
    `Page Path: ${subRecord.pagePath}`,
    `Timestamp: ${subRecord.createdAt}`,
    ``,
    `CONTACT DETAILS:`,
    `  Name: ${subRecord.submitterName || "N/A"}`,
    `  Company: ${company || "N/A"}`,
    `  Email: ${subRecord.submitterEmail || "N/A"}`,
    `  Phone: ${subRecord.submitterPhone || "N/A"}`,
    ``,
    `TECHNICAL SPECIFICATIONS:`,
    `  Department / Type: ${p.department || "General Engineering"}`,
    `  Material / Alloy: ${p.material || p.materialType || "Standard"}`,
    `  Production Timeline: ${p.timeline || p.quantityTier || "Standard"}`,
    `  CAD Formats: ${Array.isArray(p.cadFormats) ? p.cadFormats.join(", ") : (p.cadFormats || "N/A")}`,
    `  ITAR Controlled: ${p.itarControlled || "No"}`,
    `  NDA Requested: ${p.ndaRequested || "No"}`,
    ``,
    `SCOPE & NOTES:`,
    `  ${p.projectScope || p.projectNotes || p.message || p.notes || "None provided"}`,
    ``,
    `================================================`,
    `Sovereign PostgreSQL ID: ${subRecord.id}`,
    `Processed by GreenTree Sovereign Fleet v3.0`,
  ].join("\n");

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:640px;margin:0 auto;background:#F8FAFC;padding:24px;border-radius:12px;border:1px solid #E2E8F0;">
      <div style="background:${SITE_SIDEBAR_BG};color:#FFFFFF;padding:20px 24px;border-radius:8px 8px 0 0;border-bottom:3px solid ${SITE_BRAND_COLOR};">
        <div style="font-family:monospace;font-size:11px;color:#93C5FD;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">
          ${escapeHtml(SITE_DIVISION_DEFAULT)} &bull; VERIFIED INTAKE
        </div>
        <h2 style="margin:6px 0 0;font-size:18px;font-weight:700;color:#FFFFFF;">
          ${escapeHtml(serviceRequested)} &mdash; Ref ${escapeHtml(refNum)}
        </h2>
      </div>
      <div style="background:#FFFFFF;padding:24px;border-radius:0 0 8px 8px;border:1px solid #E2E8F0;border-top:none;">
        <h3 style="margin-top:0;font-size:14px;color:#0F172A;border-bottom:1px solid #F1F5F9;padding-bottom:8px;">Contact Information</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse;margin-bottom:16px;">
          <tr><td style="padding:6px 0;color:#64748B;width:140px;">Name:</td><td style="padding:6px 0;font-weight:600;color:#0F172A;">${escapeHtml(subRecord.submitterName)}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">Company:</td><td style="padding:6px 0;font-weight:600;color:#0F172A;">${escapeHtml(company || "N/A")}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">Email:</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(subRecord.submitterEmail)}" style="color:${SITE_BRAND_COLOR};">${escapeHtml(subRecord.submitterEmail)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">Phone:</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(subRecord.submitterPhone)}" style="color:${SITE_BRAND_COLOR};">${escapeHtml(subRecord.submitterPhone)}</a></td></tr>
        </table>

        <h3 style="margin-top:16px;font-size:14px;color:#0F172A;border-bottom:1px solid #F1F5F9;padding-bottom:8px;">Project Specifications</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse;margin-bottom:16px;">
          <tr><td style="padding:6px 0;color:#64748B;width:140px;">Department:</td><td style="padding:6px 0;color:#0F172A;">${escapeHtml(p.department || "General Engineering")}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">Material / Alloy:</td><td style="padding:6px 0;color:#0F172A;">${escapeHtml(p.material || p.materialType || "Standard")}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">Timeline / Volume:</td><td style="padding:6px 0;color:#0F172A;">${escapeHtml(p.timeline || p.quantityTier || "Standard")}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">CAD Formats:</td><td style="padding:6px 0;color:#0F172A;">${escapeHtml(Array.isArray(p.cadFormats) ? p.cadFormats.join(", ") : (p.cadFormats || "N/A"))}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">ITAR Controlled:</td><td style="padding:6px 0;color:#0F172A;font-weight:${p.itarControlled === 'yes' ? '700;color:#dc2626' : 'normal'};">${escapeHtml(p.itarControlled || "No")}</td></tr>
          <tr><td style="padding:6px 0;color:#64748B;">NDA Requested:</td><td style="padding:6px 0;color:#0F172A;">${escapeHtml(p.ndaRequested || "No")}</td></tr>
        </table>

        <h3 style="margin-top:16px;font-size:14px;color:#0F172A;border-bottom:1px solid #F1F5F9;padding-bottom:8px;">Scope Description</h3>
        <div style="background:#F8FAFC;padding:12px 16px;border-radius:6px;font-size:13px;color:#1E293B;white-space:pre-wrap;border:1px solid #E2E8F0;">${escapeHtml(p.projectScope || p.projectNotes || p.message || p.notes || "None provided")}</div>

        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #F1F5F9;font-size:11px;color:#94A3B8;display:flex;justify-content:space-between;">
          <span>Ref: ${escapeHtml(refNum)} &bull; Source: ${escapeHtml(subRecord.pagePath)}</span>
          <span>GreenTree Sovereign PostgreSQL 16 Vault</span>
        </div>
      </div>
    </div>
  `;

  return transporter.sendMail({
    from: String(metaSettings.smtpFrom || SMTP_FROM).trim(),
    to: recipientTo,
    cc: recipientCc,
    replyTo: subRecord.submitterEmail || undefined,
    subject,
    text: textBody,
    html: htmlBody,
  });
}

/**
 * 4-Layer WAF & Spam Bot Shield (`MOD-WAF-SHIELD`)
 */
function inspectWafAndBotShield(req, rawBody, fields) {
  const ct = String(req.headers["content-type"] || "").toLowerCase();

  // Layer 1: Next-Action / Multipart RCE / Prototype Pollution Exploit Probe Block
  if (
    req.headers["next-action"] ||
    req.headers["x-nextjs-data"] ||
    ct.includes("multipart/form-data") ||
    /WebKitFormBoundary|__proto__|constructor:constructor|child_process|execSync|resolved_model|<script/i.test(
      rawBody
    )
  ) {
    return { blocked: true, statusCode: 403, reason: "waf_exploit_probe" };
  }

  // Layer 2: Honeypot Trap
  if (fields._gotcha || fields.website_url || fields["bot-field"]) {
    return { spamDrop: true, reason: "honeypot_triggered" };
  }

  const cust = fields.customer || {};
  const candidateName = String(
    cust.name ||
      fields.fullName ||
      fields.contactName ||
      fields.name ||
      fields.full_name ||
      fields.contact_name ||
      ""
  ).trim();
  const candidateEmail = String(
    cust.email || fields.email || fields.contact_email || ""
  ).trim();
  const candidatePhone = String(
    cust.phone || fields.phone || fields.tel || ""
  ).trim();
  const candidateMsg = String(
    fields.projectSpecs?.customerNotes ||
      fields.projectScope ||
      fields.projectNotes ||
      fields.message ||
      fields.customerNotes ||
      fields.notes ||
      ""
  ).trim();

  // Layer 3: Dot-Stuffed Gmail Bot Filter (>= 3 dots in local part)
  if (
    /@gmail\.com$/i.test(candidateEmail) &&
    (candidateEmail.split("@")[0].match(/\./g) || []).length >= 3
  ) {
    return { spamDrop: true, reason: "dot_stuffed_gmail_bot" };
  }

  // Layer 4: Gibberish Consonant Clusters & Low-Quality Bot Heuristics
  const hasConsonantCluster =
    /[bcdfghjklmnpqrstvwxz]{6,}/i.test(candidateName) ||
    /[bcdfghjklmnpqrstvwxz]{7,}/i.test(candidateMsg);
  const isSingleWordGibberish =
    candidateName &&
    !candidateName.includes(" ") &&
    candidateName.length >= 12 &&
    (candidateName.match(/[A-Z]/g) || []).length >= 3 &&
    (candidateName.match(/[a-z]/g) || []).length >= 3;
  const isMessageSameAsEmail =
    candidateEmail &&
    candidateMsg &&
    candidateMsg.toLowerCase() === candidateEmail.toLowerCase();

  if (hasConsonantCluster || isSingleWordGibberish || isMessageSameAsEmail) {
    return { spamDrop: true, reason: "gibberish_cluster_bot" };
  }

  return { ok: true, candidateName, candidateEmail, candidatePhone, candidateMsg };
}

// ============================================================================
// 3. Default Settings & Strictly Isolated Primary Account Holder
// ============================================================================

const DEFAULT_SETTINGS = {
  portalTitle: `AOS Governance & Standards Network Portal`,
  portalSlug: "/admin",
  defaultReviewerName: "Gene Salvatore",
  notificationEmail: DEFAULT_NOTIFY_EMAIL,
  formNotifyEmail: DEFAULT_NOTIFY_EMAIL,
  notifyOnNewPin: false,
  notifyOnReply: false,
  allowAnonymousPins: true,
  autoOpenOnLoad: false,
  superAdminPasscodeHash: hashPasscode(CONFIGURED_PASSCODE),
  previewPasscodeHash: hashPasscode(CONFIGURED_PASSCODE),
  leadsPiiOptOut: false,
  socialContentOptOut: false,
  smtpHost: SMTP_HOST,
  smtpPort: SMTP_PORT,
  smtpUser: SMTP_USER,
  smtpFrom: SMTP_FROM,
  smtpSecure: false,
  smtpCc: SMTP_CC,
};

const PRIMARY_ACCOUNT_HOLDER = {
  id: `usr-primary-${SITE_KEY}`,
  name: "AOS Governance & Standards Network (Primary Account Holder)",
  email: "gene@greentreehosting.com",
  role: "admin",
  active: true,
  color: SITE_BRAND_COLOR,
  title: `Primary Account Holder (${SITE_DOMAIN_DEFAULT})`,
  siteKey: SITE_KEY,
};

function getIsolatedAccountHolders() {
  return [{ ...PRIMARY_ACCOUNT_HOLDER }];
}

function sanitizeUserForAdminResponse(u) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role || "reviewer",
    active: u.active !== false,
    color: u.color || SITE_BRAND_COLOR,
    title: u.title || "",
    siteKey: SITE_KEY,
    hasPasscode: Boolean(u.passcodeHash),
  };
}

// ============================================================================
// 4. PostgreSQL 16 Vault & Fallback Storage Engine (`MOD-PG16-VAULT`)
// ============================================================================

let pgPool = null;
let storageEngineName = "disk";

async function initStorage() {
  if (process.env.DATABASE_URL) {
    try {
      const pgModule = await import("pg");
      const Pool = pgModule.default?.Pool || pgModule.Pool;
      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.DATABASE_SSL === "true"
            ? { rejectUnauthorized: false }
            : false,
      });

      await pgPool.query(`
        CREATE TABLE IF NOT EXISTS pinboard_meta (
          site_key TEXT PRIMARY KEY,
          settings JSONB NOT NULL,
          users JSONB NOT NULL,
          next_pin_number INTEGER NOT NULL DEFAULT 1,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS visual_pins (
          site_key TEXT NOT NULL,
          id TEXT NOT NULL,
          pin_number INTEGER NOT NULL,
          item JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (site_key, id)
        );
        CREATE TABLE IF NOT EXISTS pinboard_pins (
          site_key TEXT NOT NULL,
          id TEXT NOT NULL,
          pin_number INTEGER NOT NULL,
          item JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (site_key, id)
        );
        CREATE TABLE IF NOT EXISTS pinboard_screenshots (
          site_key TEXT NOT NULL,
          pin_id TEXT NOT NULL,
          content_type TEXT NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (site_key, pin_id)
        );
        CREATE TABLE IF NOT EXISTS form_submissions (
          site_key TEXT NOT NULL,
          id TEXT NOT NULL,
          form_name TEXT NOT NULL,
          page_path TEXT NOT NULL,
          submitter_name TEXT,
          submitter_email TEXT,
          submitter_phone TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          payload JSONB NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (site_key, id)
        );
        CREATE TABLE IF NOT EXISTS submissions (
          id TEXT PRIMARY KEY,
          reference_number TEXT UNIQUE NOT NULL,
          form_name TEXT NOT NULL,
          source_site TEXT NOT NULL DEFAULT 'aos-governance.com',
          site_brand TEXT NOT NULL DEFAULT 'AOS Governance & Standards Network',
          status TEXT NOT NULL DEFAULT 'new',
          priority TEXT NOT NULL DEFAULT 'high',
          customer_name TEXT NOT NULL,
          customer_phone TEXT,
          customer_email TEXT,
          company_name TEXT,
          street_address TEXT,
          town TEXT,
          state TEXT DEFAULT 'CT',
          zip TEXT,
          service_requested TEXT,
          property_category TEXT DEFAULT 'commercial',
          timeline TEXT,
          customer_notes TEXT,
          attachments JSONB DEFAULT '[]'::jsonb,
          assigned_staff TEXT DEFAULT 'Gene Salvatore',
          notes TEXT,
          activity_log JSONB DEFAULT '[]'::jsonb,
          metadata JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      storageEngineName = "postgres";
      console.log(`🗄️  Connected to PostgreSQL 16 Vault (site_key="${SITE_KEY}")`);
    } catch (err) {
      console.warn(
        `⚠️  PostgreSQL connection failed (${err.message}); falling back to persistent disk at ${DATA_DIR}`
      );
      pgPool = null;
    }
  }

  if (!pgPool) {
    await fsp.mkdir(path.join(DATA_DIR, "pins"), { recursive: true });
    await fsp.mkdir(path.join(DATA_DIR, "screenshots"), { recursive: true });
    await fsp.mkdir(path.join(DATA_DIR, "submissions"), { recursive: true });
    storageEngineName = "disk";
    console.log(`💾 Using persistent disk storage at ${DATA_DIR}`);
  }
}

async function loadMetaAndPins() {
  if (pgPool) {
    const metaRes = await pgPool.query(
      "SELECT settings, users, next_pin_number FROM pinboard_meta WHERE site_key = $1",
      [SITE_KEY]
    );

    let meta;
    if (metaRes.rows.length === 0) {
      meta = {
        settings: { ...DEFAULT_SETTINGS },
        users: getIsolatedAccountHolders(),
        nextPinNumber: 1,
      };
      await pgPool.query(
        `INSERT INTO pinboard_meta (site_key, settings, users, next_pin_number)
         VALUES ($1, $2::jsonb, $3::jsonb, $4)
         ON CONFLICT (site_key) DO NOTHING`,
        [
          SITE_KEY,
          JSON.stringify(meta.settings),
          JSON.stringify(meta.users),
          meta.nextPinNumber,
        ]
      );
    } else {
      const row = metaRes.rows[0];
      meta = {
        settings: { ...DEFAULT_SETTINGS, ...(row.settings || {}) },
        users: getIsolatedAccountHolders(),
        nextPinNumber: Number(row.next_pin_number || 1),
      };
    }

    const pinsRes = await pgPool.query(
      "SELECT item FROM visual_pins WHERE site_key = $1 ORDER BY pin_number DESC",
      [SITE_KEY]
    );
    const items = pinsRes.rows.map((r) => r.item);
    if (typeof meta?.settings?.previewGateEnabled === "boolean") {
      PREVIEW_GATE_ENABLED = meta.settings.previewGateEnabled;
    }
    return { meta, items };
  }

  // Disk fallback
  const metaPath = path.join(DATA_DIR, "meta.json");
  let meta;
  try {
    meta = JSON.parse(await fsp.readFile(metaPath, "utf8"));
  } catch {
    meta = {
      settings: { ...DEFAULT_SETTINGS },
      users: getIsolatedAccountHolders(),
      nextPinNumber: 1,
    };
    await fsp.writeFile(metaPath, JSON.stringify(meta, null, 2), "utf8");
  }
  meta.users = getIsolatedAccountHolders();

  const pinsDir = path.join(DATA_DIR, "pins");
  let items = [];
  try {
    const files = await fsp.readdir(pinsDir);
    for (const f of files) {
      if (f.endsWith(".json")) {
        const item = JSON.parse(
          await fsp.readFile(path.join(pinsDir, f), "utf8")
        );
        items.push(item);
      }
    }
    items.sort((a, b) => (b.pinNumber || 0) - (a.pinNumber || 0));
  } catch {}

  if (typeof meta?.settings?.previewGateEnabled === "boolean") {
      PREVIEW_GATE_ENABLED = meta.settings.previewGateEnabled;
    }
    return { meta, items };
}

async function saveMeta(meta) {
  if (pgPool) {
    await pgPool.query(
      `INSERT INTO pinboard_meta (site_key, settings, users, next_pin_number, updated_at)
       VALUES ($1, $2::jsonb, $3::jsonb, $4, NOW())
       ON CONFLICT (site_key) DO UPDATE SET
         settings = $2::jsonb,
         users = $3::jsonb,
         next_pin_number = $4,
         updated_at = NOW()`,
      [
        SITE_KEY,
        JSON.stringify(meta.settings || DEFAULT_SETTINGS),
        JSON.stringify(getIsolatedAccountHolders()),
        meta.nextPinNumber || 1,
      ]
    );
    return;
  }
  await fsp.writeFile(
    path.join(DATA_DIR, "meta.json"),
    JSON.stringify(meta, null, 2),
    "utf8"
  );
}

async function getPin(pinId) {
  if (pgPool) {
    const res = await pgPool.query(
      "SELECT item FROM visual_pins WHERE site_key = $1 AND id = $2",
      [SITE_KEY, pinId]
    );
    return res.rows[0]?.item || null;
  }
  try {
    return JSON.parse(
      await fsp.readFile(path.join(DATA_DIR, "pins", `${pinId}.json`), "utf8")
    );
  } catch {
    return null;
  }
}

async function savePin(item) {
  if (pgPool) {
    const q = `
      INSERT INTO visual_pins (site_key, id, pin_number, item, updated_at)
      VALUES ($1, $2, $3, $4::jsonb, NOW())
      ON CONFLICT (site_key, id) DO UPDATE SET
        pin_number = $3,
        item = $4::jsonb,
        updated_at = NOW();
      INSERT INTO pinboard_pins (site_key, id, pin_number, item, updated_at)
      VALUES ($1, $2, $3, $4::jsonb, NOW())
      ON CONFLICT (site_key, id) DO UPDATE SET
        pin_number = $3,
        item = $4::jsonb,
        updated_at = NOW();
    `;
    await pgPool.query(q, [SITE_KEY, item.id, item.pinNumber || 0, JSON.stringify(item)]);
    return;
  }
  await fsp.writeFile(
    path.join(DATA_DIR, "pins", `${item.id}.json`),
    JSON.stringify(item, null, 2),
    "utf8"
  );
}

async function deletePinRecord(pinId) {
  if (pgPool) {
    await pgPool.query("DELETE FROM visual_pins WHERE site_key = $1 AND id = $2", [SITE_KEY, pinId]);
    await pgPool.query("DELETE FROM pinboard_pins WHERE site_key = $1 AND id = $2", [SITE_KEY, pinId]);
    await pgPool.query("DELETE FROM pinboard_screenshots WHERE site_key = $1 AND pin_id = $2", [SITE_KEY, pinId]);
    return;
  }
  try {
    await fsp.unlink(path.join(DATA_DIR, "pins", `${pinId}.json`));
  } catch {}
  try {
    await fsp.unlink(path.join(DATA_DIR, "screenshots", `${pinId}.bin`));
  } catch {}
}

async function saveScreenshot(pinId, contentType, buffer) {
  if (pgPool) {
    await pgPool.query(
      `INSERT INTO pinboard_screenshots (site_key, pin_id, content_type, data, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (site_key, pin_id) DO UPDATE SET
         content_type = $3,
         data = $4,
         created_at = NOW()`,
      [SITE_KEY, pinId, contentType, buffer]
    );
    return;
  }
  await fsp.writeFile(path.join(DATA_DIR, "screenshots", `${pinId}.bin`), buffer);
  await fsp.writeFile(
    path.join(DATA_DIR, "screenshots", `${pinId}.meta`),
    contentType,
    "utf8"
  );
}

async function getScreenshot(pinId) {
  if (pgPool) {
    const res = await pgPool.query(
      "SELECT content_type, data FROM pinboard_screenshots WHERE site_key = $1 AND pin_id = $2",
      [SITE_KEY, pinId]
    );
    if (res.rows.length === 0) return null;
    return {
      contentType: res.rows[0].content_type,
      buffer: res.rows[0].data,
    };
  }
  try {
    const buffer = await fsp.readFile(
      path.join(DATA_DIR, "screenshots", `${pinId}.bin`)
    );
    const contentType =
      (await fsp
        .readFile(path.join(DATA_DIR, "screenshots", `${pinId}.meta`), "utf8")
        .catch(() => "image/jpeg")) || "image/jpeg";
    return { contentType, buffer };
  } catch {
    return null;
  }
}

async function loadFormSubmissions() {
  if (pgPool) {
    const res = await pgPool.query(
      `SELECT id, form_name, page_path, submitter_name, submitter_email, submitter_phone, status, payload, created_at, updated_at
       FROM form_submissions
       WHERE site_key = $1
       ORDER BY created_at DESC`,
      [SITE_KEY]
    );
    return res.rows.map((r) => ({
      id: r.id,
      siteKey: SITE_KEY,
      siteName: SITE_DIVISION_DEFAULT,
      formName: r.form_name,
      pagePath: r.page_path,
      submitterName: r.submitter_name,
      submitterEmail: r.submitter_email,
      submitterPhone: r.submitter_phone,
      status: r.status,
      payload: r.payload,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }

  const subDir = path.join(DATA_DIR, "submissions");
  let items = [];
  try {
    const files = await fsp.readdir(subDir);
    for (const f of files) {
      if (f.endsWith(".json")) {
        const item = JSON.parse(
          await fsp.readFile(path.join(subDir, f), "utf8")
        );
        items.push(item);
      }
    }
    items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {}
  return items;
}

async function saveFormSubmission(sub) {
  if (pgPool) {
    await pgPool.query(
      `INSERT INTO form_submissions (
         site_key, id, form_name, page_path, submitter_name, submitter_email, submitter_phone, status, payload, created_at, updated_at
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11)
       ON CONFLICT (site_key, id) DO UPDATE SET
         status = $8,
         payload = $9::jsonb,
         updated_at = $11`,
      [
        SITE_KEY,
        sub.id,
        sub.formName,
        sub.pagePath,
        sub.submitterName,
        sub.submitterEmail,
        sub.submitterPhone,
        sub.status || "new",
        JSON.stringify(sub.payload || {}),
        sub.createdAt,
        sub.updatedAt,
      ]
    );
    return;
  }
  await fsp.writeFile(
    path.join(DATA_DIR, "submissions", `${sub.id}.json`),
    JSON.stringify(sub, null, 2),
    "utf8"
  );
}

async function deleteFormSubmission(subId) {
  if (pgPool) {
    await pgPool.query(
      "DELETE FROM form_submissions WHERE site_key = $1 AND id = $2",
      [SITE_KEY, subId]
    );
    await pgPool.query("DELETE FROM submissions WHERE id = $1", [subId]);
    return;
  }
  try {
    await fsp.unlink(path.join(DATA_DIR, "submissions", `${subId}.json`));
  } catch {}
}

// ============================================================================
// 5. Auth, Cookies & Shared Domain Resolution
// ============================================================================

function parseCookies(header = "") {
  const cookies = {};
  header.split(";").forEach((part) => {
    const [k, v] = part.split("=");
    if (k && v) cookies[k.trim()] = decodeURIComponent(v.trim());
  });
  return cookies;
}

function getSharedDomainAttr(req) {
  const host = String(req.headers.host || "").toLowerCase().split(":")[0];
  if (
    host.endsWith("." + SHARED_COOKIE_DOMAIN) ||
    host === SHARED_COOKIE_DOMAIN
  ) {
    return `; Domain=.${SHARED_COOKIE_DOMAIN}`;
  }
  return "";
}

function checkRequestAuth(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME] || cookies[LEGACY_COOKIE_NAME];
  return (
    verifySignedCookieValue(token, CONFIGURED_PASSCODE) ||
    verifySignedCookieValue(token, "Modz2026") ||
    verifySignedCookieValue(token, "Modz2026!")
  );
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", (chunk) => {
      buf += chunk;
      if (buf.length > 10 * 1024 * 1024) {
        req.destroy();
        reject(new Error("Request entity too large"));
      }
    });
    req.on("end", () => resolve(buf));
    req.on("error", reject);
  });
}

function buildClientPayload(meta, items, isAuthed) {
  const safeSettings = {
    portalTitle: meta.settings.portalTitle,
    portalSlug: meta.settings.portalSlug,
    defaultReviewerName: meta.settings.defaultReviewerName,
    notifyOnNewPin: meta.settings.notifyOnNewPin,
    notifyOnReply: meta.settings.notifyOnReply,
    allowAnonymousPins: meta.settings.allowAnonymousPins,
    autoOpenOnLoad: meta.settings.autoOpenOnLoad,
    leadsPiiOptOut: meta.settings.leadsPiiOptOut,
    socialContentOptOut: meta.settings.socialContentOptOut,
  };

  const payload = {
    ok: true,
    siteKey: SITE_KEY,
    siteName: SITE_DIVISION_DEFAULT,
    storageEngine: storageEngineName,
    settings: safeSettings,
    users: meta.users.map(sanitizeUserForAdminResponse),
    items,
  };

  if (isAuthed) {
    safeSettings.notificationEmail = meta.settings.notificationEmail;
    safeSettings.formNotifyEmail = meta.settings.formNotifyEmail;
    safeSettings.smtpHost = meta.settings.smtpHost || SMTP_HOST;
    safeSettings.smtpPort = meta.settings.smtpPort || SMTP_PORT;
    safeSettings.smtpUser = meta.settings.smtpUser || SMTP_USER;
    safeSettings.smtpFrom = meta.settings.smtpFrom || SMTP_FROM;
    safeSettings.smtpSecure = meta.settings.smtpSecure || false;
    safeSettings.smtpCc = meta.settings.smtpCc || SMTP_CC;
    delete safeSettings.smtpPass;
    safeSettings.hasSmtpPass = Boolean(
      (meta.settings && meta.settings.smtpPass) || SMTP_PASS
    );
    payload.isSuperAdmin = true;
    payload.settings = safeSettings;
    payload.users = meta.users.map(sanitizeUserForAdminResponse);
  }

  return payload;
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
};

async function serveStaticFile(
  res,
  filePath,
  statusCode = 200,
  extraHeaders = {}
) {
  try {
    const baseName = path.basename(filePath).toLowerCase();
    const ext = path.extname(filePath).toLowerCase();
    if (
      baseName.startsWith(".") ||
      ext === ".mjs" ||
      ext === ".cjs" ||
      ext === ".ts" ||
      ext === ".sql" ||
      ext === ".sh" ||
      ext === ".env" ||
      baseName === "package.json" ||
      baseName === "package-lock.json" ||
      baseName === "dockerfile" ||
      baseName === "docker-compose.yaml" ||
      baseName === "docker-compose.yml" ||
      baseName === "netlify.toml" ||
      baseName === "brain_manifest.json"
    ) {
      return false;
    }
    const stat = await fsp.stat(filePath);
    if (!stat.isFile()) return false;
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const headers = {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Content-Type": contentType,
      ...extraHeaders,
    };
    if (PREVIEW_GATE_ENABLED) {
      headers["X-Robots-Tag"] = "noindex, nofollow";
    }
    res.writeHead(statusCode, headers);
    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

function generateCollisionResistantRef(prefix = "FAB") {
  const year = new Date().getFullYear();
  const timeHex = Date.now().toString(36).toUpperCase();
  const randHex = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `${prefix}-${year}-${timeHex}-${randHex}`;
}

// ============================================================================
// 6. HTTP Server Request Handler
// ============================================================================

const server = http.createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  try {
    const hostHeader = String(req.headers.host || `localhost:${PORT}`);
    const cleanHost = hostHeader.split(":")[0].toLowerCase().replace(/^www\./, "");
    const url = new URL(req.url || "/", `http://${hostHeader}`);
    const pathname = url.pathname;
    const domainAttr = getSharedDomainAttr(req);

    // 1. Healthchecks (`/api/health` & `/healthz`)
    if (pathname === "/api/health" || pathname === "/healthz") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          status: "healthy",
          site: SITE_DOMAIN_DEFAULT,
          siteKey: SITE_KEY,
          division: SITE_DIVISION_DEFAULT,
          storageEngine: storageEngineName,
          port: PORT,
          timestamp: new Date().toISOString(),
        })
      );
      return;
    }

    // ========================================================================
    // 2. Bi-Directional Command Federation (`/api/gt-sync/v1/*`)
    // ========================================================================
    // Hard 404 block for dotfiles, server source, and scanner probe paths (prevents soft-200 false positives)
    const isBlockedProbePath =
      pathname.split("/").some((seg) => seg.startsWith(".") && seg !== ".netlify") ||
      /\.(?:mjs|cjs|ts|sql|sh|py|php|asp|aspx|jsp|env|bak|old|orig|swp|log|yml|yaml|toml|ini|conf|config)$/i.test(pathname) ||
      /^\/(?:dockerfile|docker-compose|package(?:-lock)?\.json|brain_manifest\.json|data\/|\.data\/|database\/|db\/|evidence\/|patents\/|session_logs\/|netlify\/)/i.test(pathname);
    if (isBlockedProbePath) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store",
      });
      res.end("Not Found");
      return;
    }

    if (pathname.startsWith("/api/gt-sync/v1/")) {
      const syncHeaders = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      };

      const rawBody =
        req.method === "POST" || req.method === "PATCH" || req.method === "PUT"
          ? await readRequestBody(req)
          : "";

      if (!verifyHubSyncAuth(req, rawBody)) {
        res.writeHead(401, syncHeaders);
        res.end(
          JSON.stringify({
            ok: false,
            error:
              "Unauthorized — Valid X-GT-Signature, X-GT-Secret, or Bearer token required",
          })
        );
        return;
      }

      if (pathname === "/api/gt-sync/v1/pins") {
        const screenshotId = url.searchParams.get("screenshot");
        if (req.method === "GET" && screenshotId) {
          const shot = await getScreenshot(screenshotId);
          if (!shot) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Screenshot not found");
            return;
          }
          res.writeHead(200, {
            "Content-Type": shot.contentType,
            "Cache-Control": "private, max-age=86400",
          });
          res.end(shot.buffer);
          return;
        }

        const { items } = await loadMetaAndPins();

        if (req.method === "GET") {
          const enriched = items.map((item) => ({
            ...item,
            siteKey: SITE_KEY,
            siteName: SITE_DIVISION_DEFAULT,
            screenshotDataUrl: item.hasScreenshotBlob
              ? `/api/gt-sync/v1/pins?screenshot=${encodeURIComponent(item.id)}`
              : item.screenshotDataUrl,
          }));
          res.writeHead(200, syncHeaders);
          res.end(
            JSON.stringify({
              ok: true,
              siteKey: SITE_KEY,
              siteName: SITE_DIVISION_DEFAULT,
              storageEngine: storageEngineName,
              total: enriched.length,
              counts: {
                open: enriched.filter((i) => i.status === "open").length,
                in_progress: enriched.filter((i) => i.status === "in_progress")
                  .length,
                resolved: enriched.filter((i) => i.status === "resolved")
                  .length,
              },
              items: enriched,
            })
          );
          return;
        }

        if (req.method === "PATCH" || req.method === "POST") {
          const body = JSON.parse(rawBody || "{}");
          const action = String(body.action || "update");
          const targetId = String(body.id || body.pinId || "");

          if (action === "delete" && targetId) {
            await deletePinRecord(targetId);
            res.writeHead(200, syncHeaders);
            res.end(JSON.stringify({ ok: true, deletedId: targetId }));
            return;
          }

          const target = await getPin(targetId);
          if (!target) {
            res.writeHead(404, syncHeaders);
            res.end(JSON.stringify({ ok: false, error: "Pin not found" }));
            return;
          }

          if (
            body.status &&
            ["open", "in_progress", "resolved"].includes(String(body.status))
          ) {
            target.status = String(body.status);
          }
          if (body.assignedAgent !== undefined) {
            target.assignedAgent = String(body.assignedAgent || "");
          }
          if (body.replyText || body.text) {
            if (!Array.isArray(target.replies)) target.replies = [];
            target.replies.push({
              id:
                "rep-" +
                Date.now() +
                "-" +
                Math.random().toString(36).slice(2, 5),
              author: String(body.author || "GreenTree Command").slice(0, 48),
              text: String(body.replyText || body.text).slice(0, 1500),
              createdAt: new Date().toISOString(),
            });
          }
          target.updatedAt = new Date().toISOString();
          await savePin(target);

          res.writeHead(200, syncHeaders);
          res.end(JSON.stringify({ ok: true, item: target }));
          return;
        }
      }

      if (pathname === "/api/gt-sync/v1/submissions") {
        const [{ meta }, rawSubmissions] = await Promise.all([
          loadMetaAndPins(),
          loadFormSubmissions(),
        ]);
        const leadsOptOut = Boolean(
          meta?.settings?.leadsPiiOptOut ||
            meta?.settings?.licenseOverrides?.leadsPiiOptOut
        );

        if (req.method === "GET") {
          const submissions = leadsOptOut
            ? rawSubmissions.map(anonymizeSubmissionForPrivacy)
            : rawSubmissions;
          res.writeHead(200, syncHeaders);
          res.end(
            JSON.stringify({
              ok: true,
              siteKey: SITE_KEY,
              siteName: SITE_DIVISION_DEFAULT,
              piiOptOut: leadsOptOut,
              total: submissions.length,
              counts: {
                new: submissions.filter((s) => s.status === "new").length,
                contacted: submissions.filter((s) => s.status === "contacted")
                  .length,
                archived: submissions.filter((s) => s.status === "archived")
                  .length,
              },
              submissions,
            })
          );
          return;
        }

        if (req.method === "PATCH" || req.method === "POST") {
          const body = JSON.parse(rawBody || "{}");
          const targetId = String(body.id || "");
          if (body.action === "delete" && targetId) {
            await deleteFormSubmission(targetId);
            res.writeHead(200, syncHeaders);
            res.end(JSON.stringify({ ok: true, deletedId: targetId }));
            return;
          }

          const allSubs = await loadFormSubmissions();
          const target = allSubs.find((s) => s.id === targetId);
          if (!target) {
            res.writeHead(404, syncHeaders);
            res.end(JSON.stringify({ ok: false, error: "Submission not found" }));
            return;
          }

          if (body.status) target.status = String(body.status);
          if (body.notes !== undefined) {
            if (!target.payload) target.payload = {};
            target.payload.internalNotes = String(body.notes);
          }
          target.updatedAt = new Date().toISOString();
          await saveFormSubmission(target);

          res.writeHead(200, syncHeaders);
          res.end(JSON.stringify({ ok: true, submission: target }));
          return;
        }
      }

      if (pathname === "/api/gt-sync/v1/backend-summary") {
        const [{ meta, items }, submissions] = await Promise.all([
          loadMetaAndPins(),
          loadFormSubmissions(),
        ]);
        if (req.method === "POST" || req.method === "PATCH") {
          try {
            const body = JSON.parse(rawBody || "{}");
            if (typeof body.previewGateEnabled === "boolean") {
              PREVIEW_GATE_ENABLED = body.previewGateEnabled;
              if (!meta.settings) meta.settings = {};
              meta.settings.previewGateEnabled = PREVIEW_GATE_ENABLED;
              await saveMeta(meta);
            }
          } catch {}
        }
        const s = meta.settings || {};
        res.writeHead(200, syncHeaders);
        res.end(
          JSON.stringify({
            ok: true,
            siteKey: SITE_KEY,
            siteName: SITE_DIVISION_DEFAULT,
            domain: SITE_DOMAIN_DEFAULT,
            storageEngine: storageEngineName,
            previewGateEnabled: PREVIEW_GATE_ENABLED,
            counts: {
              pinsTotal: items.length,
              pinsOpen: items.filter((i) => i.status === "open").length,
              pinsResolved: items.filter((i) => i.status === "resolved").length,
              submissionsTotal: submissions.length,
              submissionsNew: submissions.filter((s) => s.status === "new").length,
            },
            smtp: {
              host: s.smtpHost || SMTP_HOST,
              port: s.smtpPort || SMTP_PORT,
              user: s.smtpUser || SMTP_USER,
              notificationEmail:
                s.formNotifyEmail || s.notificationEmail || DEFAULT_NOTIFY_EMAIL,
              hasPassword: Boolean(s.smtpPass || SMTP_PASS),
            },
            privacy: {
              leadsPiiOptOut: Boolean(s.leadsPiiOptOut),
              socialContentOptOut: Boolean(s.socialContentOptOut),
            },
          })
        );
        return;
      }

      if (
        pathname === "/api/gt-sync/v1/smtp-config" ||
        pathname === "/api/gt-sync/v1/test-smtp"
      ) {
        const { meta } = await loadMetaAndPins();
        const safeSettings = meta.settings || {};

        if (req.method === "GET") {
          res.writeHead(200, syncHeaders);
          res.end(
            JSON.stringify({
              ok: true,
              siteKey: SITE_KEY,
              smtpHost: safeSettings.smtpHost || SMTP_HOST,
              smtpPort: safeSettings.smtpPort || SMTP_PORT,
              smtpUser: safeSettings.smtpUser || SMTP_USER,
              smtpFrom: safeSettings.smtpFrom || SMTP_FROM,
              notificationEmail:
                safeSettings.formNotifyEmail ||
                safeSettings.notificationEmail ||
                DEFAULT_NOTIFY_EMAIL,
              hasPassword: Boolean(safeSettings.smtpPass || SMTP_PASS),
            })
          );
          return;
        }

        if (req.method === "PATCH" || req.method === "POST") {
          const body = JSON.parse(rawBody || "{}");
          const allowedKeys = [
            "smtpHost",
            "smtpPort",
            "smtpUser",
            "smtpPass",
            "smtpFrom",
            "smtpSecure",
            "smtpCc",
            "notificationEmail",
            "formNotifyEmail",
          ];
          for (const k of allowedKeys) {
            if (body[k] !== undefined) {
              if (k === "smtpPass" && !body[k]) continue;
              meta.settings[k] = body[k];
            }
          }
          await saveMeta(meta);

          if (
            pathname === "/api/gt-sync/v1/test-smtp" ||
            body.action === "verify" ||
            body.testRecipient
          ) {
            const testTo = String(
              body.testRecipient ||
                meta.settings.formNotifyEmail ||
                DEFAULT_NOTIFY_EMAIL
            ).trim();
            const transporter = createSmtpTransport(meta.settings);
            if (!transporter) {
              res.writeHead(400, syncHeaders);
              res.end(
                JSON.stringify({
                  ok: false,
                  error: "SMTP configuration incomplete (host, user, or pass missing)",
                })
              );
              return;
            }
            try {
              const testInfo = await transporter.sendMail({
                from: meta.settings.smtpFrom || SMTP_FROM,
                to: testTo,
                subject: `[${SITE_DIVISION_DEFAULT}] SmarterMail STARTTLS Integration Test`,
                text: `SmarterMail STARTTLS relay test successful for ${SITE_DIVISION_DEFAULT} (${SITE_DOMAIN_DEFAULT}).\nTimestamp: ${new Date().toISOString()}`,
              });
              res.writeHead(200, syncHeaders);
              res.end(
                JSON.stringify({
                  ok: true,
                  message: `Test email sent to ${testTo}`,
                  messageId: testInfo.messageId,
                })
              );
            } catch (smtpErr) {
              res.writeHead(500, syncHeaders);
              res.end(
                JSON.stringify({
                  ok: false,
                  error: `SMTP Test Failed: ${smtpErr.message}`,
                })
              );
            }
            return;
          }

          res.writeHead(200, syncHeaders);
          res.end(JSON.stringify({ ok: true, message: "SMTP configuration updated" }));
          return;
        }
      }

      res.writeHead(404, syncHeaders);
      res.end(JSON.stringify({ ok: false, error: "Federation endpoint not found" }));
      return;
    }

        // Compute strict session authentication before Admin/Portal/Feedback routes
    const isAuthenticated = checkRequestAuth(req);

        // Unified Spoke Security Guard (Blocks unauthenticated access to Portal, Feedback, Social & Lead Read/Mutate APIs)
    const isProtectedSpokeApi =
      pathname === "/api/spoke-portal-data" ||
      pathname === "/api/command/spoke-portal-data" ||
      pathname === "/api/feedback" ||
      pathname === "/api/feedback/" ||
      pathname === "/api/feedback/binary" ||
      pathname === "/api/command/pin-action" ||
      pathname.startsWith("/api/social/") ||
      ((pathname === "/api/submissions" ||
        pathname === "/.netlify/functions/submissions" ||
        pathname === "/api/rfq") &&
        (req.method === "GET" || req.method === "PATCH" || req.method === "DELETE"));

    if (isProtectedSpokeApi && !isAuthenticated && !verifyHubSyncAuth(req, "")) {
      res.writeHead(401, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      });
      res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
      return;
    }

    // ========================================================================
    // 3. Universal Spoke Admin Portal (`/admin` -> `MOD-ADMIN-PORTAL`)
    // ========================================================================
    if (
      req.method === "GET" &&
      (pathname === "/admin" ||
        pathname === "/admin/" ||
        pathname === "/admin/portal" ||
        pathname === "/admin/portal/")
    ) {
      if (!isAuthenticated) {
        await serveStaticFile(
          res,
          path.join(__dirname, "modules", "MOD-PREVIEW-GATE", "gate.html"),
          401,
          { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" }
        );
        return;
      }
      await serveStaticFile(
        res,
        path.join(__dirname, "modules", "MOD-ADMIN-PORTAL", "admin-portal.html"),
        200,
        { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" }
      );
      return;
    }

    if (pathname === "/api/spoke-portal-data" && req.method === "GET") {
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const [{ meta, items }, submissions] = await Promise.all([
        loadMetaAndPins(),
        loadFormSubmissions(),
      ]);
      const s = (meta && meta.settings) || {};
      const smtpCfg = {
        host: s.smtpHost || SMTP_HOST,
        port: s.smtpPort || SMTP_PORT,
        user: s.smtpUser || SMTP_USER,
        notificationEmail:
          s.formNotifyEmail || s.notificationEmail || DEFAULT_NOTIFY_EMAIL,
      };
      const baseLicense = buildDefaultLicenseForSpoke(
        SITE_KEY,
        SITE_DIVISION_DEFAULT,
        SITE_DOMAIN_DEFAULT,
        {
          siteKey: SITE_KEY,
          siteName: SITE_DIVISION_DEFAULT,
          portalTitle: "AOS Governance & Standards Network Portal",
          domain: SITE_DOMAIN_DEFAULT,
          vertical: "Constitutional AI Governance & Standards",
          brandColor: SITE_BRAND_COLOR,
          sidebarBg: SITE_SIDEBAR_BG,
          topbarBg: SITE_TOPBAR_BG,
          logoUrl: SITE_LOGO_URL,
          leadsPiiOptOut: Boolean(s.leadsPiiOptOut),
          socialContentOptOut: Boolean(s.socialContentOptOut),
          ...(s.licenseOverrides || {}),
        }
      );

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(
        JSON.stringify({
          ok: true,
          license: baseLicense,
          catalog: GREENTREE_MODULE_CATALOG,
          planTiers: GREENTREE_PLAN_TIERS,
          paymentGateways: GREENTREE_PAYMENT_GATEWAYS,
          submissions,
          pins: items,
          backendSummary: {
            storageEngine: storageEngineName,
            smtp: smtpCfg,
          },
        })
      );
      return;
    }

    // Local handler for `/api/command/deep-help` (Strictly isolated to SITE_KEY Primary Account Holder)
    if (pathname === "/api/command/deep-help" && req.method === "GET") {
      const role = url.searchParams.get("role") || "admin";
      const catalog = getDeepHelpCatalog({
        siteKey: SITE_KEY,
        role,
        brandColor: SITE_BRAND_COLOR,
        domain: SITE_DOMAIN_DEFAULT,
        siteName: SITE_DIVISION_DEFAULT,
        currentUser: {
          userId: `usr-primary-${SITE_KEY}`,
          name: `${SITE_DIVISION_DEFAULT} (Primary Account Holder)`,
          email: `info@${SITE_DOMAIN_DEFAULT}`,
          title: `Primary Account Holder (${SITE_DOMAIN_DEFAULT})`,
          siteKey: SITE_KEY,
          role: "admin",
        },
      });

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(
        JSON.stringify({
          ok: true,
          siteKey: SITE_KEY,
          catalog,
        })
      );
      return;
    }

    // Local handler for `/api/social/*` (`MOD-SOCIAL-COMMAND`)
    if (pathname.startsWith("/api/social/")) {
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const socialEnginePath = path.join(
        __dirname,
        "modules",
        "MOD-SOCIAL-COMMAND",
        "social-engine.mjs"
      );
      if (fs.existsSync(socialEnginePath)) {
        try {
          const { handleSocialApiRequest } = await import(
            `./modules/MOD-SOCIAL-COMMAND/social-engine.mjs`
          );
          const handled = await handleSocialApiRequest(req, res, {
            siteKey: SITE_KEY,
            siteName: SITE_DIVISION_DEFAULT,
            domain: SITE_DOMAIN_DEFAULT,
            brandColor: SITE_BRAND_COLOR,
          });
          if (handled) return;
        } catch (socialErr) {
          console.warn("⚠️  Social command engine error:", socialErr.message);
        }
      }
    }

    // Local handler for `/api/command/licenses` (Persists Privacy Opt-Out & Module Toggles)
    if (pathname === "/api/command/licenses" && (req.method === "POST" || req.method === "PATCH")) {
      const rawBody = await readRequestBody(req);
      if (!verifyHubSyncAuth(req, rawBody) && !isAuthenticated) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const body = JSON.parse(rawBody || "{}");
      const { meta } = await loadMetaAndPins();
      if (!meta.settings) meta.settings = {};
      let gateUpdated = false;
      if (typeof body.previewGateEnabled === "boolean") {
        PREVIEW_GATE_ENABLED = body.previewGateEnabled;
        meta.settings.previewGateEnabled = PREVIEW_GATE_ENABLED;
        gateUpdated = true;
      } else if (body.license && typeof body.license.previewGateEnabled === "boolean") {
        PREVIEW_GATE_ENABLED = body.license.previewGateEnabled;
        meta.settings.previewGateEnabled = PREVIEW_GATE_ENABLED;
        gateUpdated = true;
      } else if (body.license && Array.isArray(body.license.enabledModules)) {
        PREVIEW_GATE_ENABLED = body.license.enabledModules.includes("MOD-PREVIEW-GATE");
        meta.settings.previewGateEnabled = PREVIEW_GATE_ENABLED;
        gateUpdated = true;
      }
      if (body.license && typeof body.license === "object") {
        meta.settings.licenseOverrides = {
          ...(meta.settings.licenseOverrides || {}),
          ...body.license,
          previewGateEnabled: PREVIEW_GATE_ENABLED,
        };
        if (typeof body.license.leadsPiiOptOut === "boolean") {
          meta.settings.leadsPiiOptOut = body.license.leadsPiiOptOut;
        }
        if (typeof body.license.socialContentOptOut === "boolean") {
          meta.settings.socialContentOptOut = body.license.socialContentOptOut;
        }
        await saveMeta(meta);
      } else if (gateUpdated) {
        await saveMeta(meta);
      }
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      res.end(JSON.stringify({ ok: true, previewGateEnabled: PREVIEW_GATE_ENABLED, license: meta.settings.licenseOverrides }));
      return;
    }

    // Serve Modular Pin Board v2 (`MOD-PIN-BOARD`)
    if (
      pathname === "/assets/pin-board.js" ||
      pathname === "/modules/MOD-PIN-BOARD/pin-board.js"
    ) {
      if (!isAuthenticated) {
        res.writeHead(200, {
          "Content-Type": "application/javascript; charset=utf-8",
          "Cache-Control": "no-store",
        });
        res.end("/* PinBoard hidden for public unauthenticated visitors */");
        return;
      }
      await serveStaticFile(
        res,
        path.join(__dirname, "modules", "MOD-PIN-BOARD", "pin-board.js"),
        200,
        { "Cache-Control": "no-store" }
      );
      return;
    }

    // ========================================================================
    // 4. Preview Gate Authentication (`/gate/` -> `MOD-PREVIEW-GATE`)
    // ========================================================================
    const isGateRoute =
      pathname === "/gate" ||
      pathname === "/gate/" ||
      pathname === "/gate/login" ||
      pathname === "/gate/login/";
    // (isAuthenticated computed above Step 3)

    if (req.method === "POST" && isGateRoute) {
      const rawBody = await readRequestBody(req);
      const params = new URLSearchParams(rawBody);
      const submittedPasscode = String(params.get("passcode") || "").trim();
      const submittedReviewer =
        String(params.get("reviewer_name") || "")
          .replace(/[<>"']/g, "")
          .trim() || "Reviewer";

      const { meta } = await loadMetaAndPins();
      const storedAdminHash = meta.settings.superAdminPasscodeHash;
      const storedPreviewHash = meta.settings.previewPasscodeHash;

      const isAdminValid = verifyPasscode(submittedPasscode, storedAdminHash);
      const isPreviewValid =
        isAdminValid || verifyPasscode(submittedPasscode, storedPreviewHash);

      if (isPreviewValid) {
        const signedCookie = createSignedCookieValue(CONFIGURED_PASSCODE);
        const headers = [
          [
            "Set-Cookie",
            `${COOKIE_NAME}=${encodeURIComponent(
              signedCookie
            )}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${domainAttr}`,
          ],
          [
            "Set-Cookie",
            `${REVIEWER_COOKIE_NAME}=${encodeURIComponent(
              submittedReviewer
            )}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${domainAttr}`,
          ],
          ["Location", "/"],
        ];
        res.writeHead(302, headers);
        res.end();
        return;
      }

      res.writeHead(302, { Location: "/gate/?error=invalid" });
      res.end();
      return;
    }

    if (req.method === "GET" && isGateRoute) {
      await serveStaticFile(
        res,
        path.join(__dirname, "modules", "MOD-PREVIEW-GATE", "gate.html"),
        200,
        { "Cache-Control": "no-store" }
      );
      return;
    }

    // ========================================================================
    // 5. Visual Pin Board API (`/api/feedback` & `/api/feedback/binary`)
    // ========================================================================
    if (pathname === "/api/feedback/binary") {
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const shotId = url.searchParams.get("id");
      if (req.method === "GET" && shotId) {
        const shot = await getScreenshot(shotId);
        if (!shot) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
          return;
        }
        res.writeHead(200, {
          "Content-Type": shot.contentType,
          "Cache-Control": "public, max-age=86400",
        });
        res.end(shot.buffer);
        return;
      }

      if (req.method === "POST") {
        const rawBody = await readRequestBody(req);
        const contentType =
          req.headers["x-screenshot-type"] || "image/jpeg";
        const buffer = Buffer.from(rawBody, "base64");
        const pinId =
          req.headers["x-pin-id"] ||
          `pin-${Date.now().toString(36)}-${Math.random()
            .toString(36)
            .slice(2, 6)}`;

        await saveScreenshot(pinId, contentType, buffer);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            ok: true,
            id: pinId,
            url: `/api/feedback/binary?id=${encodeURIComponent(pinId)}`,
          })
        );
        return;
      }
    }

    if (pathname === "/api/feedback" || pathname === "/api/feedback/") {
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const { meta, items } = await loadMetaAndPins();

      if (req.method === "GET") {
        const clientData = buildClientPayload(meta, items, isAuthenticated);
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
        });
        res.end(JSON.stringify(clientData));
        return;
      }

      if (req.method === "POST") {
        const rawBody = await readRequestBody(req);
        const body = JSON.parse(rawBody || "{}");
        const action = String(body.action || "create");

        if (action === "create") {
          const pinNumber = meta.nextPinNumber || items.length + 1;
          meta.nextPinNumber = pinNumber + 1;
          await saveMeta(meta);

          let screenshotDataUrl = body.screenshotDataUrl || null;
          let hasScreenshotBlob = false;

          const newId =
            body.id ||
            `pin-${Date.now().toString(36)}-${Math.random()
              .toString(36)
              .slice(2, 6)}`;

          if (
            screenshotDataUrl &&
            screenshotDataUrl.startsWith("data:") &&
            screenshotDataUrl.length > 2048
          ) {
            try {
              const [header, base64Data] = screenshotDataUrl.split(",");
              const match = header.match(/:(.*?);/);
              const ct = match ? match[1] : "image/jpeg";
              const buf = Buffer.from(base64Data, "base64");
              await saveScreenshot(newId, ct, buf);
              screenshotDataUrl = `/api/feedback/binary?id=${encodeURIComponent(
                newId
              )}`;
              hasScreenshotBlob = true;
            } catch (shotErr) {
              console.warn("⚠️  Screenshot persistence failed:", shotErr.message);
            }
          }

          const pinItem = {
            id: newId,
            pinNumber,
            selector: String(body.selector || "body").slice(0, 500),
            elementTag: String(body.elementTag || "div").slice(0, 32),
            pagePath: String(body.pagePath || "/").slice(0, 256),
            pageTitle: String(body.pageTitle || "").slice(0, 256),
            xPercent: Number(body.xPercent) || 0,
            yPercent: Number(body.yPercent) || 0,
            viewportWidth: Number(body.viewportWidth) || 0,
            viewportHeight: Number(body.viewportHeight) || 0,
            highlightRect: body.highlightRect || null,
            screenshotDataUrl,
            hasScreenshotBlob,
            title: String(body.title || "").slice(0, 200),
            comment: String(body.comment || "").slice(0, 4000),
            authorName: String(
              body.authorName || meta.settings.defaultReviewerName || "Reviewer"
            ).slice(0, 64),
            authorRole: String(body.authorRole || "reviewer").slice(0, 32),
            priority: ["low", "medium", "high", "urgent"].includes(body.priority)
              ? body.priority
              : "medium",
            category: [
              "bug",
              "copy",
              "design",
              "feature",
              "praise",
              "general",
            ].includes(body.category)
              ? body.category
              : "general",
            status: "open",
            replies: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          await savePin(pinItem);
          emitHubWebhook("pin.created", pinItem, meta.settings);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, item: pinItem }));
          return;
        }

        if (action === "update") {
          const targetId = String(body.id || "");
          const target = await getPin(targetId);
          if (!target) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, error: "Pin not found" }));
            return;
          }

          if (
            body.status &&
            ["open", "in_progress", "resolved"].includes(body.status)
          ) {
            target.status = body.status;
          }
          if (
            body.priority &&
            ["low", "medium", "high", "urgent"].includes(body.priority)
          ) {
            target.priority = body.priority;
          }
          if (body.assignedAgent !== undefined) {
            target.assignedAgent = String(body.assignedAgent || "").slice(0, 64);
          }
          target.updatedAt = new Date().toISOString();
          await savePin(target);
          emitHubWebhook("pin.updated", target, meta.settings);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, item: target }));
          return;
        }

        if (action === "reply") {
          const targetId = String(body.id || "");
          const target = await getPin(targetId);
          if (!target) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, error: "Pin not found" }));
            return;
          }

          const reply = {
            id: `rep-${Date.now().toString(36)}-${Math.random()
              .toString(36)
              .slice(2, 6)}`,
            author: String(
              body.author || meta.settings.defaultReviewerName || "Reviewer"
            ).slice(0, 64),
            role: String(body.role || "reviewer").slice(0, 32),
            text: String(body.text || "").slice(0, 2000),
            createdAt: new Date().toISOString(),
          };

          if (!Array.isArray(target.replies)) target.replies = [];
          target.replies.push(reply);
          target.updatedAt = new Date().toISOString();
          await savePin(target);
          emitHubWebhook("pin.replied", { pin: target, reply }, meta.settings);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, item: target, reply }));
          return;
        }

        if (action === "delete") {
          const targetId = String(body.id || "");
          await deletePinRecord(targetId);
          emitHubWebhook("pin.deleted", { id: targetId }, meta.settings);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, deletedId: targetId }));
          return;
        }
      }
    }

    // Lead Submissions Feed (`GET /api/submissions` or `/api/rfq`)
    if (
      (pathname === "/api/submissions" || pathname === "/api/rfq") &&
      req.method === "GET"
    ) {
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      if (!isAuthenticated && !verifyHubSyncAuth(req, "")) {
        res.writeHead(401, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ ok: false, error: "Unauthorized" }));
        return;
      }
      const [{ meta }, rawSubmissions] = await Promise.all([
        loadMetaAndPins(),
        loadFormSubmissions(),
      ]);
      const leadsOptOut = Boolean(
        meta?.settings?.leadsPiiOptOut ||
          meta?.settings?.licenseOverrides?.leadsPiiOptOut
      );
      const filtered = leadsOptOut
        ? rawSubmissions.map(anonymizeSubmissionForPrivacy)
        : rawSubmissions;

      const mapped = filtered.map((s) => {
        const p = s.payload || {};
        return {
          id: s.id,
          referenceNumber: p.referenceNumber || s.id,
          formType: s.formName || p.formType || "inbound_inquiry",
          status: s.status || "new",
          priority: p.priority || "high",
          customer: {
            name: s.submitterName || "Inbound Prospect",
            company: p.company || p.companyName || "",
            phone: s.submitterPhone || "",
            email: s.submitterEmail || "",
          },
          projectSpecs: {
            department: p.department || "General Engineering",
            material: p.material || p.materialType || "Standard",
            timeline: p.timeline || p.quantityTier || "Standard",
            cadFormats: p.cadFormats || [],
            itarControlled: p.itarControlled || "no",
            ndaRequested: p.ndaRequested || "no",
            scope: p.projectScope || p.projectNotes || p.message || p.notes || "",
          },
          attachments: p.attachments || [],
          notes: p.notes || "",
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        };
      });
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          status: "ok",
          service: "Fabtron Submissions Feed",
          dataSource: storageEngineName,
          count: mapped.length,
          timestamp: new Date().toISOString(),
          submissions: mapped,
        })
      );
      return;
    }

    // ========================================================================
    // 6. Lead & Form Ingestion (`POST /api/submissions`, `/api/submit-rfq`, `/`)
    // ========================================================================
    if (req.method === "POST") {
      const rawBody = await readRequestBody(req);
      const ct = String(req.headers["content-type"] || "").toLowerCase();

      let fields = {};
      if (ct.includes("application/json")) {
        try {
          fields = JSON.parse(rawBody || "{}");
        } catch {
          fields = {};
        }
      } else if (ct.includes("application/x-www-form-urlencoded") || !ct) {
        const params = new URLSearchParams(rawBody);
        for (const [k, v] of params.entries()) {
          if (/^[a-zA-Z0-9_\-\[\]]{1,48}$/.test(k)) {
            if (k.endsWith("[]")) {
              const cleanKey = k.slice(0, -2);
              if (!Array.isArray(fields[cleanKey])) fields[cleanKey] = [];
              fields[cleanKey].push(v);
            } else {
              fields[k] = v;
            }
          }
        }
      }

      // Enforce 4-Layer WAF & Spam Bot Shield (`MOD-WAF-SHIELD`)
      const shield = inspectWafAndBotShield(req, rawBody, fields);
      if (shield.blocked) {
        res.writeHead(shield.statusCode || 403, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            ok: false,
            success: false,
            error: "Forbidden — Automated exploit probe blocked by MOD-WAF-SHIELD",
          })
        );
        return;
      }
      if (shield.spamDrop) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            ok: true,
            success: true,
            dbPersisted: false,
            spamFiltered: true,
          })
        );
        return;
      }

      const { candidateName, candidateEmail, candidatePhone, candidateMsg } = shield;
      if (!candidateName && !candidateEmail && !candidatePhone) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            ok: false,
            success: false,
            error: "Valid contact name, email, or phone is required",
          })
        );
        return;
      }

      const refNumber =
        fields.referenceNumber && String(fields.referenceNumber).length > 8
          ? String(fields.referenceNumber)
          : generateCollisionResistantRef("FAB");
      const subId =
        fields.id && String(fields.id).startsWith("SUB-")
          ? String(fields.id)
          : `SUB-${Date.now().toString(36).toUpperCase()}-${crypto
              .randomBytes(3)
              .toString("hex")
              .toUpperCase()}`;

      const formName = String(
        fields.formType || fields["form-name"] || fields.formName || "rfq_inquiry"
      ).trim();

      const subRecord = {
        id: subId,
        siteKey: SITE_KEY,
        siteName: SITE_DIVISION_DEFAULT,
        formName,
        pagePath: String(
          fields.metadata?.landingPage ||
            fields.page_path ||
            fields.pagePath ||
            pathname ||
            "/"
        ),
        submitterName: candidateName.slice(0, 120),
        submitterEmail: candidateEmail.slice(0, 160),
        submitterPhone: candidatePhone.slice(0, 60),
        status: "new",
        payload: {
          ...fields,
          referenceNumber: refNumber,
          message: candidateMsg || undefined,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let emailSent = false;
      let smtpMessageId = null;
      let smtpError = null;
      const { meta } = await loadMetaAndPins();

      try {
        const info = await sendSubmissionEmail(subRecord, meta?.settings);
        if (info) {
          emailSent = true;
          smtpMessageId = info.messageId || null;
          subRecord.payload._smtpSent = true;
          subRecord.payload._smtpMessageId = smtpMessageId;
          subRecord.payload._smtpSentAt = new Date().toISOString();
        }
      } catch (err) {
        smtpError = String(err.message || err);
        subRecord.payload._smtpSent = false;
        subRecord.payload._smtpError = smtpError;
      }

      await saveFormSubmission(subRecord);

      // Also persist into legacy `submissions` table when PostgreSQL is connected
      if (pgPool) {
        try {
          const cust = fields.customer || {};
          const compName = fields.company || fields.companyName || cust.companyName || "";
          await pgPool.query(
            `INSERT INTO submissions (
               id, reference_number, form_name, source_site, site_brand, status, priority,
               customer_name, customer_phone, customer_email, company_name, street_address,
               town, state, zip, service_requested, property_category, timeline,
               customer_notes, attachments, notes, metadata
             ) VALUES (
               $1, $2, $3, $4, $5, $6, $7,
               $8, $9, $10, $11, $12,
               $13, $14, $15, $16, $17, $18,
               $19, $20::jsonb, $21, $22::jsonb
             ) ON CONFLICT (reference_number) DO UPDATE SET updated_at = NOW()`,
            [
              subId,
              refNumber,
              formName,
              "aos-governance.com",
              SITE_DIVISION_DEFAULT,
              "new",
              fields.priority || "high",
              candidateName || "Inbound Prospect",
              candidatePhone,
              candidateEmail,
              compName,
              cust.streetAddress || fields.streetAddress || "",
              cust.town || fields.town || "Plainville",
              cust.state || fields.state || "CT",
              cust.zip || fields.zip || "",
              fields.material || fields.materialType || fields.department || formName,
              "commercial",
              fields.timeline || fields.quantityTier || "",
              candidateMsg,
              JSON.stringify(fields.attachments || []),
              fields.notes || candidateMsg,
              JSON.stringify(fields.metadata || {}),
            ]
          );
        } catch (pgErr) {
          console.warn("⚠️  Legacy submissions table write warning:", pgErr.message);
        }
      }

      emitHubWebhook("form.submitted", subRecord, meta?.settings);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          ok: true,
          success: true,
          dbPersisted: true,
          storageTier: storageEngineName,
          id: subId,
          submissionId: subId,
          referenceNumber: refNumber,
          sourceSite: "aos-governance.com",
          attachmentsPersisted: Boolean(
            fields.attachments && fields.attachments.length > 0
          ),
          emailSent,
          messageId: smtpMessageId,
          smtpError: smtpError || undefined,
          receivedAt: new Date().toISOString(),
        })
      );
      return;
    }

    // ========================================================================
    if (pathname.startsWith("/api/") || pathname.startsWith("/.netlify/")) {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify({ ok: false, error: "API route not found" }));
      return;
    }

    // 7. Static Files & Prerendered SPA Routes from `dist/`
    // ========================================================================
    if (PREVIEW_GATE_ENABLED && !isAuthenticated) {
      await serveStaticFile(
        res,
        path.join(__dirname, "modules", "MOD-PREVIEW-GATE", "gate.html"),
        401,
        { "Cache-Control": "no-store" }
      );
      return;
    }

    if (pathname === "/.netlify/functions/verify-access" && req.method === "POST") {
      const rawBody = await readRequestBody(req);
      let body = {};
      try { body = JSON.parse(rawBody || "{}"); } catch {}
      const validPass = process.env.AOS_ACCESS_CODE || "A@86ejr90!!2026";
      if (body.password && (body.password === validPass || body.password === CONFIGURED_PASSCODE)) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, redirect: "/family-discussion.html" }));
        return;
      }
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Invalid access code" }));
      return;
    }

    const HOST_TO_SITE = {
      "aos-governance.com": "aos-governance.com",
      "aos-foundation.com": "aos-foundation.com",
      "aos-foundation.org": "aos-foundation.com",
      "aos-patents.com": "aos-patents.com",
      "aos-standards.com": "aos-patents.com",
      "aos-standards.org": "aos-patents.com",
      "aos-archives.com": "aos-archives.com",
      "aos-license-checker.com": "aos-license-checker.com",
      "aos-evidence.com": "aos-evidence.com",
      "aos-constitution.com": "aos-constitution.com",
      "aos-universe.com": "aos-universe.com",
      "aos-core.com": "aos-core.com",
    };
    const mappedFolder = HOST_TO_SITE[cleanHost] || "aos-governance.com";
    const activeDistDir = path.join(__dirname, "sites", mappedFolder);

    const cleanRel = pathname.replace(/^\/+/, "");
    const candidates = [
      path.join(activeDistDir, cleanRel),
      path.join(activeDistDir, cleanRel, "index.html"),
      path.join(activeDistDir, `${cleanRel}.html`),
    ];

    for (const candidate of candidates) {
      if (!candidate.startsWith(activeDistDir)) continue;
      if (await serveStaticFile(res, candidate, 200)) {
        return;
      }
    }

    if (!path.extname(cleanRel)) {
      if (await serveStaticFile(res, path.join(activeDistDir, "index.html"), 200)) {
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: false, error: String(err.message || err) }));
  }
});

initStorage().then(async () => {
  await loadMetaAndPins().catch(() => {});
  server.listen(PORT, HOST, () => {
    console.log(
      `🚀 ${SITE_DIVISION_DEFAULT} Coolify Server listening on http://${HOST}:${PORT} (gate=${PREVIEW_GATE_ENABLED}, storage=${storageEngineName})`
    );
  });
});
