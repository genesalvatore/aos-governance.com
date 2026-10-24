/**
 * GreenTree Visual Pin Board & Preview Session Client (`assets/pin-board.js`)
 * Standalone, zero-dependency drop-in script for any website hosted on Netlify.
 *
 * Optional Configuration before loading this script:
 * <script>
 *   window.GREENTREE_PIN_CONFIG = {
 *     siteDivision: "Client Brand Name",
 *     defaultReviewer: "Client",
 *     sharedCookieDomain: "greentreehosting.com",
 *     boardUrl: "/admin/#feedback-board"
 *   };
 * </script>
 */
(function () {
  'use strict';

  const CFG = Object.assign(
    {
      siteDivision: document.title.split('|')[0].trim() || 'Client Staging Preview',
      defaultReviewer: 'Client',
      sharedCookieDomain: 'greentreehosting.com',
      boardUrl: '/admin/#feedback-board',
      sessionTtlMs: 24 * 60 * 60 * 1000 // 24 hours matching server cookie Max-Age
    },
    window.GREENTREE_PIN_CONFIG || {}
  );

  const SESSION_STORAGE_KEY = 'gt_preview_session_deadline_v1';
  const FEEDBACK_STORAGE_KEY = 'gt_feedback_items_v1';
  const REVIEWER_STORAGE_KEY = 'gt_reviewer_name_v1';
  const REVIEWER_CONFIRMED_KEY = 'gt_reviewer_confirmed_v1';
  const PIN_DRAFT_KEY = 'gt_pin_draft_v1';
  const PINS_VISIBLE_KEY = 'gt_pins_visible_v1';
  const DOCK_COLLAPSED_KEY = 'gt_dock_collapsed_v1';
  const DOCK_POS_KEY = 'gt_dock_pos_v1';

  let feedbackItems = [];
  let feedbackSettings = {
    portalTitle: CFG.siteDivision + ' — Review & Intake Portal',
    portalSlug: '/admin/',
    defaultReviewerName: CFG.defaultReviewer,
    overlayEnabled: true,
    overlayMode: 'preview'
  };
  let pinModeActive = false;
  let pinsVisible = (function () {
    try {
      const v = localStorage.getItem(PINS_VISIBLE_KEY);
      if (v === '0') return false;
    } catch (_) {}
    return true;
  })();
  let pendingPinTarget = null;
  let pendingScreenshotDataUrl = '';
  let serverVerifiedReviewer = '';

  // 1. Expire any legacy host-only modz_reviewer cookie so only the server's Domain cookie applies
  try {
    if (window.location.hostname.indexOf(CFG.sharedCookieDomain) !== -1) {
      document.cookie = 'modz_reviewer=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'modz_reviewer=; path=/; max-age=0; Secure; SameSite=Lax';
    }
  } catch (_) {}

  // 2. 24-Hour Session Countdown Timer Helper
  function getSessionDeadline() {
    try {
      const raw = Number(localStorage.getItem(SESSION_STORAGE_KEY) || '0');
      if (raw > Date.now()) return raw;
    } catch (_) {}
    const next = Date.now() + CFG.sessionTtlMs;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, String(next));
    } catch (_) {}
    return next;
  }

  function resetSessionDeadline() {
    const next = Date.now() + CFG.sessionTtlMs;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, String(next));
    } catch (_) {}
    updateSessionTimerUI();
    return next;
  }

  function updateSessionTimerUI() {
    if (window.location.pathname.indexOf('/gate') === 0) return;
    const deadline = getSessionDeadline();
    const remainingMs = Math.max(0, deadline - Date.now());
    const totalSec = Math.ceil(remainingMs / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const label = document.getElementById('modzSessionTimerLabel');
    if (label) {
      if (remainingMs > 0) {
        label.textContent =
          hrs > 0
            ? 'Session: ' + hrs + 'h ' + String(mins).padStart(2, '0') + 'm'
            : 'Session: ' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
      } else {
        label.textContent = 'Renew Session (+24h)';
      }
    }
  }

  if (window.location.pathname.indexOf('/gate') !== 0) {
    setInterval(updateSessionTimerUI, 1000);
  }

  // 3. Reviewer Identity & Cookie Helpers
  function getCookieVal(name) {
    if (typeof document.cookie !== 'string') return '';
    const parts = document.cookie.split(';');
    const matches = [];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i].trim();
      if (p.indexOf(name + '=') === 0) {
        try {
          matches.push(decodeURIComponent(p.slice(name.length + 1)).trim());
        } catch (_) {
          matches.push(p.slice(name.length + 1).trim());
        }
      }
    }
    if (!matches.length) return '';
    if (name === 'modz_reviewer') {
      for (let j = 0; j < matches.length; j++) {
        const low = (matches[j] || '').toLowerCase();
        if (low && low !== 'modz' && low !== 'client') {
          return matches[j];
        }
      }
    }
    return matches[0] || '';
  }

  function getCurrentReviewerName() {
    const fromCookie = (getCookieVal('modz_reviewer') || '').trim();
    if (fromCookie && fromCookie.toLowerCase() !== 'modz' && fromCookie.toLowerCase() !== 'client') {
      return fromCookie;
    }
    if (
      serverVerifiedReviewer &&
      serverVerifiedReviewer.toLowerCase() !== 'modz' &&
      serverVerifiedReviewer.toLowerCase() !== 'client'
    ) {
      return serverVerifiedReviewer;
    }
    let saved = '';
    try {
      saved = (localStorage.getItem(REVIEWER_STORAGE_KEY) || '').trim();
    } catch (_) {}
    if (saved && saved.toLowerCase() !== 'modz' && saved.toLowerCase() !== 'client') {
      return saved;
    }
    return fromCookie || serverVerifiedReviewer || saved || CFG.defaultReviewer;
  }

  function setCurrentReviewerName(name, writeCookie) {
    const cleaned =
      String(name || '')
        .replace(/[<>"]/g, '')
        .trim()
        .slice(0, 48) || CFG.defaultReviewer;
    serverVerifiedReviewer = cleaned;
    try {
      localStorage.setItem(REVIEWER_STORAGE_KEY, cleaned);
    } catch (_) {}
    if (writeCookie) {
      try {
        const isShared = window.location.hostname.indexOf(CFG.sharedCookieDomain) !== -1;
        const domainPart = isShared ? '; domain=.' + CFG.sharedCookieDomain : '';
        document.cookie =
          'modz_reviewer=' +
          encodeURIComponent(cleaned) +
          domainPart +
          '; path=/; max-age=86400; Secure; SameSite=Lax';
      } catch (_) {}
    }
    const badge = document.getElementById('modzDockReviewerName');
    if (badge) badge.textContent = cleaned;
    return cleaned;
  }

  function isReviewerNameConfirmed() {
    try {
      const current = getCurrentReviewerName().toLowerCase();
      if (current && current !== 'modz' && current !== 'client') return true;
      if (localStorage.getItem(REVIEWER_CONFIRMED_KEY) === '1') return true;
    } catch (_) {}
    return false;
  }

  function markReviewerNameConfirmed() {
    try {
      localStorage.setItem(REVIEWER_CONFIRMED_KEY, '1');
    } catch (_) {}
  }

  function loadPinDraft() {
    try {
      const raw = localStorage.getItem(PIN_DRAFT_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }

  function savePinDraft(draftObj) {
    try {
      localStorage.setItem(PIN_DRAFT_KEY, JSON.stringify(draftObj));
    } catch (_) {}
  }

  function clearPinDraft() {
    try {
      localStorage.removeItem(PIN_DRAFT_KEY);
    } catch (_) {}
  }

  function formatPageLabel(pagePath) {
    if (!pagePath || pagePath === '/') return 'Home';
    const clean = pagePath.replace(/^\/+|\/+$/g, '');
    const seg = clean.split('/').pop() || clean;
    return seg
      .split('-')
      .map(function (w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(' ');
  }

  function loadLocalFeedback() {
    try {
      const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) feedbackItems = parsed;
      }
    } catch (_) {}
    return feedbackItems;
  }

  function saveLocalFeedback(items) {
    if (Array.isArray(items)) feedbackItems = items;
    try {
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackItems));
    } catch (_) {}
  }

  // 4. DOM Selector & Real Pixel Screenshot Engine (html2canvas + Fallback)
  function getElementSelector(el) {
    if (!el || el.nodeType !== 1) return 'body';
    if (el.id) return '#' + el.id;
    const parts = [];
    let cur = el;
    let depth = 0;
    while (cur && cur.nodeType === 1 && cur.tagName !== 'HTML' && depth < 5) {
      let part = cur.tagName.toLowerCase();
      if (cur.id) {
        parts.unshift('#' + cur.id);
        break;
      }
      if (cur.parentElement) {
        const siblings = Array.from(cur.parentElement.children).filter(function (c) {
          return c.tagName === cur.tagName;
        });
        if (siblings.length > 1) {
          const idx = siblings.indexOf(cur) + 1;
          part += ':nth-of-type(' + idx + ')';
        }
      }
      parts.unshift(part);
      cur = cur.parentElement;
      depth++;
    }
    return parts.join(' > ') || 'body';
  }

  function findRelatedImage(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.tagName === 'IMG') return el;
    if (el.querySelector) {
      const childImg = el.querySelector('img');
      if (childImg) return childImg;
    }
    const card = el.closest && el.closest('figure, article, .group, section');
    if (card && card.querySelector) {
      return card.querySelector('img');
    }
    return null;
  }

  function getElementSnippet(el) {
    if (!el) return '';
    if (el.tagName === 'IMG') {
      return 'Image: ' + (el.getAttribute('alt') || el.getAttribute('src') || 'Photo');
    }
    const img = findRelatedImage(el);
    const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (txt) return txt.slice(0, 140);
    if (img) return 'Image: ' + (img.getAttribute('alt') || img.getAttribute('src') || 'Photo');
    return el.tagName.toLowerCase();
  }

  let html2CanvasLoading = false;
  let html2CanvasCallbacks = [];
  function ensureHtml2Canvas(cb) {
    if (typeof window.html2canvas === 'function') {
      return cb(window.html2canvas);
    }
    html2CanvasCallbacks.push(cb);
    if (html2CanvasLoading) return;
    html2CanvasLoading = true;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = function () {
      const list = html2CanvasCallbacks.slice();
      html2CanvasCallbacks = [];
      list.forEach(function (fn) {
        try {
          fn(window.html2canvas);
        } catch (_) {
          fn(null);
        }
      });
    };
    script.onerror = function () {
      const list = html2CanvasCallbacks.slice();
      html2CanvasCallbacks = [];
      list.forEach(function (fn) {
        fn(null);
      });
    };
    document.head.appendChild(script);
  }

  function generateElementSnapshot(el, relX, relY, callback) {
    try {
      if (!el || el.nodeType !== 1) return callback('');
      let captureTarget = el;
      const enclosingCard = el.closest && el.closest('figure, article, [data-subgallery-card]');
      if (enclosingCard && enclosingCard.offsetHeight > 0 && enclosingCard.offsetHeight < 900) {
        captureTarget = enclosingCard;
      } else if (
        el.parentElement &&
        el.parentElement !== document.body &&
        el.offsetHeight < 90 &&
        el.parentElement.offsetHeight < 650
      ) {
        captureTarget = el.parentElement;
      }

      ensureHtml2Canvas(function (h2c) {
        if (typeof h2c === 'function') {
          const hoverBox = document.getElementById('modzPinHoverBox');
          const prevHoverDisplay = hoverBox ? hoverBox.style.display : '';
          if (hoverBox) hoverBox.style.display = 'none';

          const targetRect = captureTarget.getBoundingClientRect();
          const compStyle = window.getComputedStyle(captureTarget);
          const bgColor =
            compStyle.backgroundColor &&
            compStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
            compStyle.backgroundColor !== 'transparent'
              ? compStyle.backgroundColor
              : '#0F172A';

          h2c(captureTarget, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: bgColor,
            scale: Math.min(1.5, window.devicePixelRatio || 1),
            logging: false,
            width: Math.min(1200, Math.max(120, Math.ceil(targetRect.width))),
            height: Math.min(900, Math.max(60, Math.ceil(targetRect.height)))
          })
            .then(function (renderedCanvas) {
              if (hoverBox) hoverBox.style.display = prevHoverDisplay;
              const out = document.createElement('canvas');
              const maxW = 720;
              const maxH = 480;
              const ratio = Math.min(maxW / renderedCanvas.width, maxH / renderedCanvas.height, 1);
              out.width = Math.max(320, Math.round(renderedCanvas.width * ratio));
              out.height = Math.max(180, Math.round(renderedCanvas.height * ratio));
              const ctx = out.getContext('2d');
              ctx.fillStyle = bgColor;
              ctx.fillRect(0, 0, out.width, out.height);
              ctx.drawImage(renderedCanvas, 0, 0, out.width, out.height);

              const elRect = el.getBoundingClientRect();
              const pinX = Math.max(
                16,
                Math.min(
                  out.width - 16,
                  Math.round(
                    ((elRect.left - targetRect.left + elRect.width * (relX || 0.5)) /
                      Math.max(1, targetRect.width)) *
                      out.width
                  )
                )
              );
              const pinY = Math.max(
                16,
                Math.min(
                  out.height - 16,
                  Math.round(
                    ((elRect.top - targetRect.top + elRect.height * (relY || 0.5)) /
                      Math.max(1, targetRect.height)) *
                      out.height
                  )
                )
              );
              ctx.beginPath();
              ctx.arc(pinX, pinY, 10, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
              ctx.fill();
              ctx.lineWidth = 2.5;
              ctx.strokeStyle = '#FFFFFF';
              ctx.stroke();

              callback(out.toDataURL('image/jpeg', 0.82));
            })
            .catch(function () {
              if (hoverBox) hoverBox.style.display = prevHoverDisplay;
              fallbackCanvasSnapshot(el, callback);
            });
          return;
        }
        fallbackCanvasSnapshot(el, callback);
      });
    } catch (_) {
      callback('');
    }
  }

  function fallbackCanvasSnapshot(el, callback) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return callback('');
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 640, 360);

      const snippet = getElementSnippet(el);
      const imgEl = findRelatedImage(el);
      if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
        try {
          const scale = Math.min(600 / imgEl.naturalWidth, 240 / imgEl.naturalHeight);
          const dw = imgEl.naturalWidth * scale;
          const dh = imgEl.naturalHeight * scale;
          ctx.drawImage(imgEl, (640 - dw) / 2, 20 + (240 - dh) / 2, dw, dh);
        } catch (_) {}
      }

      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.fillRect(0, 275, 640, 85);
      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText((snippet || 'Selected Element').slice(0, 78), 16, 305);
      callback(canvas.toDataURL('image/jpeg', 0.8));
    } catch (_) {
      callback('');
    }
  }

  // 5. Server Sync & Top-Right Corner Marker Rendering
  function syncFeedbackWithServer(callback) {
    loadLocalFeedback();
    fetch('/api/feedback', { method: 'GET', credentials: 'same-origin' })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (data) {
        if (data && data.ok) {
          if (data.settings) feedbackSettings = Object.assign(feedbackSettings, data.settings);
          if (data.reviewerName) {
            serverVerifiedReviewer = data.reviewerName;
            const low = data.reviewerName.toLowerCase();
            if ((low !== 'modz' && low !== 'client') || !localStorage.getItem(REVIEWER_STORAGE_KEY)) {
              setCurrentReviewerName(data.reviewerName, false);
            } else {
              const badge = document.getElementById('modzDockReviewerName');
              if (badge) badge.textContent = getCurrentReviewerName();
            }
          }
          if (Array.isArray(data.items)) {
            saveLocalFeedback(data.items);
          }
        }
        renderPagePins();
        if (callback) callback(feedbackItems);
      })
      .catch(function () {
        renderPagePins();
        if (callback) callback(feedbackItems);
      });
  }

  function getPageItems() {
    const curPath = window.location.pathname;
    return feedbackItems.filter(function (i) {
      return i.pagePath === curPath;
    });
  }

  function renderPagePins() {
    if (window.location.pathname.indexOf('/gate') === 0) return;

    let layer = document.getElementById('modzPinsOverlayLayer');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'modzPinsOverlayLayer';
      layer.className = 'pointer-events-none';
      layer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:0;z-index:85;';
      document.body.appendChild(layer);
    }
    layer.innerHTML = '';

    const pageItems = getPageItems();
    const countBadge = document.getElementById('modzDockPinCount');
    if (countBadge) countBadge.textContent = String(pageItems.length);
    const miniCount = document.getElementById('modzDockMiniCount');
    if (miniCount) miniCount.textContent = String(pageItems.length);
    const stateBadge = document.getElementById('modzDockPinsStateBadge');
    if (stateBadge) {
      stateBadge.textContent = pinsVisible ? 'ON' : 'OFF';
      stateBadge.style.background = pinsVisible ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)';
      stateBadge.style.color = pinsVisible ? '#6EE7B7' : '#FDA4AF';
      stateBadge.style.borderColor = pinsVisible ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)';
    }

    if (!pinsVisible) return;

    const sameElementCounts = {};
    pageItems.forEach(function (item) {
      let targetEl = null;
      try {
        targetEl = document.querySelector(item.elementSelector);
      } catch (_) {}
      if (!targetEl) targetEl = document.body;

      let rect = targetEl.getBoundingClientRect();
      let walkEl = targetEl;
      while (rect.width === 0 && rect.height === 0 && walkEl && walkEl.parentElement && walkEl !== document.body) {
        walkEl = walkEl.parentElement;
        rect = walkEl.getBoundingClientRect();
      }
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      const selKey = item.elementSelector || 'body';
      const idxOnEl = sameElementCounts[selKey] || 0;
      sameElementCounts[selKey] = idxOnEl + 1;

      // Anchor marker to the element's top-right corner, OUTSIDE the text box
      const rawRight = rect.right + scrollX + 6 - idxOnEl * 30;
      const leftPx = Math.max(14, Math.min(document.documentElement.clientWidth - 34, rawRight));
      const topPx = Math.max(52, rect.top + scrollY - 14);

      const pinBtn = document.createElement('button');
      pinBtn.type = 'button';
      pinBtn.setAttribute('data-pin-id', item.id);
      pinBtn.title =
        '#' +
        item.pinNumber +
        ' (' +
        formatPageLabel(item.pagePath) +
        ') by ' +
        item.reviewerName +
        ': ' +
        item.commentText;

      const bgColor =
        item.status === 'resolved' ? '#10B981' : item.status === 'in_progress' ? '#3B82F6' : '#F59E0B';
      const txtColor = item.status === 'in_progress' ? '#FFFFFF' : '#0F172A';

      pinBtn.style.cssText =
        'position:absolute;left:' +
        (leftPx - 14) +
        'px;top:' +
        (topPx - 14) +
        'px;z-index:86;pointer-events:auto;width:28px;height:28px;border-radius:9999px;background:' +
        bgColor +
        ';color:' +
        txtColor +
        ';border:2px solid #0F172A;font-family:monospace;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 15px -3px rgba(0,0,0,0.4);';
      pinBtn.textContent = item.status === 'resolved' ? '✓' : String(item.pinNumber || '•');

      pinBtn.addEventListener('mouseenter', function () {
        if (walkEl && walkEl !== document.body) {
          walkEl.setAttribute('data-prev-outline', walkEl.style.outline || '');
          walkEl.style.outline = '2px dashed #F59E0B';
          walkEl.style.outlineOffset = '4px';
        }
      });
      pinBtn.addEventListener('mouseleave', function () {
        if (walkEl && walkEl !== document.body) {
          walkEl.style.outline = walkEl.getAttribute('data-prev-outline') || '';
          walkEl.style.outlineOffset = '';
        }
      });
      pinBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPinThreadModal(item.id);
      });

      layer.appendChild(pinBtn);
    });
  }

  function setPinMode(active) {
    pinModeActive = !!active;
    const banner = document.getElementById('modzPinModeBanner');
    const hoverBox = document.getElementById('modzPinHoverBox');
    const dockPinBtn = document.getElementById('modzDockAddPinBtn');

    if (pinModeActive) {
      document.body.style.cursor = 'crosshair';
      if (banner) banner.style.display = 'flex';
      if (dockPinBtn) {
        dockPinBtn.style.background = '#DC2626';
        dockPinBtn.style.color = '#FFFFFF';
        dockPinBtn.innerHTML = '<span>Cancel Pin (ESC)</span>';
      }
    } else {
      document.body.style.cursor = '';
      if (banner) banner.style.display = 'none';
      if (hoverBox) hoverBox.style.display = 'none';
      if (dockPinBtn) {
        dockPinBtn.style.background = '#F59E0B';
        dockPinBtn.style.color = '#0F172A';
        dockPinBtn.innerHTML = '<span>+ Pin Comment</span>';
      }
    }
  }

  // 6. Composer & Thread Modals
  function openPinComposerModal(targetInfo) {
    pendingPinTarget = targetInfo;
    pendingScreenshotDataUrl = '';
    resetSessionDeadline();

    let modal = document.getElementById('modzPinComposerModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modzPinComposerModal';
      modal.style.cssText =
        'position:fixed;inset:0;z-index:115;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,23,0.82);backdrop-filter:blur(4px);font-family:system-ui,-apple-system,sans-serif;';
      modal.innerHTML = `
        <div style="width:100%;max-width:512px;background:#FFFFFF;border-radius:16px;border:2px solid #F59E0B;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);max-height:90vh;overflow-y:auto;" onclick="event.stopPropagation()">
          <div style="background:#0F172A;color:#FFFFFF;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;">
            <div>
              <div style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#FBBF24;font-weight:700;">In-Page Visual Review Pin</div>
              <div style="font-size:16px;font-weight:800;margin-top:2px;">Drop a Comment on This Element</div>
            </div>
            <button type="button" id="modzComposerCloseBtn" style="padding:6px 10px;border-radius:8px;background:#1E293B;color:#CBD5E1;border:1px solid #475569;font-family:monospace;font-size:12px;cursor:pointer;">Close &times;</button>
          </div>
          <form id="modzPinComposerForm" style="padding:20px;display:flex;flex-direction:column;gap:14px;font-size:12px;color:#1E293B;">
            <div style="padding:10px 12px;border-radius:10px;background:#F1F5F9;border:1px solid #E2E8F0;">
              <div style="font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#475569;">Pinned Element Target</div>
              <div id="modzComposerTargetSnippet" style="font-weight:600;color:#0F172A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;"></div>
              <div id="modzComposerTargetSelector" style="font-family:monospace;font-size:10px;color:#64748B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <label style="display:block;font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#334155;margin-bottom:4px;">Your Name</label>
                <input id="modzComposerReviewer" type="text" maxlength="48" placeholder="Your name" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #CBD5E1;font-weight:600;color:#0F172A;box-sizing:border-box;" />
              </div>
              <div>
                <label style="display:block;font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#334155;margin-bottom:4px;">Category</label>
                <select id="modzComposerCategory" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #CBD5E1;font-weight:600;color:#0F172A;box-sizing:border-box;">
                  <option value="Copy / Text Edit">Copy / Text Edit</option>
                  <option value="Photo / Caption">Photo / Caption</option>
                  <option value="Design / Layout">Design / Layout</option>
                  <option value="Approved / Looks Great">Approved / Looks Great</option>
                </select>
              </div>
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <label style="font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#334155;">Your Comment</label>
                <span id="modzDraftStatusLabel" style="font-family:monospace;font-size:10px;color:#047857;font-weight:700;display:none;">✓ Draft saved</span>
              </div>
              <textarea id="modzComposerText" rows="3" required placeholder="Type what you'd like changed here..." style="width:100%;padding:10px;border-radius:10px;border:2px solid #CBD5E1;color:#0F172A;font-size:13px;box-sizing:border-box;"></textarea>
            </div>
            <div style="padding:10px;border-radius:10px;background:#F8FAFC;border:1px solid #E2E8F0;">
              <div style="font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#334155;margin-bottom:6px;">Real Element Screenshot</div>
              <div id="modzComposerSnapPreviewWrap" style="display:none;border-radius:8px;overflow:hidden;border:1px solid #CBD5E1;background:#020617;">
                <img id="modzComposerSnapPreview" src="" alt="Snapshot preview" style="width:100%;max-height:140px;object-fit:contain;display:block;" />
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;padding-top:4px;">
              <button type="button" id="modzComposerCancelBtn" style="padding:10px 16px;border-radius:10px;background:#F1F5F9;border:none;color:#334155;font-weight:700;cursor:pointer;">Cancel</button>
              <button type="submit" style="padding:10px 18px;border-radius:10px;background:#F59E0B;border:none;color:#0F172A;font-weight:800;text-transform:uppercase;cursor:pointer;">Post Pin &rarr;</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      function closeComposer() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeComposer();
      });
      modal.querySelector('#modzComposerCloseBtn').addEventListener('click', closeComposer);
      modal.querySelector('#modzComposerCancelBtn').addEventListener('click', closeComposer);

      function handleDraftChange() {
        resetSessionDeadline();
        const revVal = modal.querySelector('#modzComposerReviewer').value || '';
        const catVal = modal.querySelector('#modzComposerCategory').value || 'Copy / Text Edit';
        const txtVal = modal.querySelector('#modzComposerText').value || '';
        savePinDraft({ reviewer: revVal, category: catVal, text: txtVal, updatedAt: Date.now() });
        const draftLbl = modal.querySelector('#modzDraftStatusLabel');
        if (draftLbl && txtVal.trim().length > 0) draftLbl.style.display = 'inline';
      }

      modal.querySelector('#modzComposerText').addEventListener('input', handleDraftChange);
      modal.querySelector('#modzComposerReviewer').addEventListener('input', handleDraftChange);

      modal.querySelector('#modzPinComposerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const reviewerInput = modal.querySelector('#modzComposerReviewer');
        const catSelect = modal.querySelector('#modzComposerCategory');
        const textInput = modal.querySelector('#modzComposerText');
        const reviewerName = setCurrentReviewerName(
          reviewerInput.value || getCurrentReviewerName() || CFG.defaultReviewer,
          true
        );
        markReviewerNameConfirmed();
        const commentText = (textInput.value || '').trim();
        if (!commentText) return;
        clearPinDraft();

        const nextPinNum =
          feedbackItems.reduce(function (m, i) {
            return Math.max(m, i.pinNumber || 0);
          }, 0) + 1;

        const payload = {
          action: 'create',
          id: 'pin-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
          pinNumber: nextPinNum,
          siteDivision: CFG.siteDivision,
          pagePath: window.location.pathname,
          pageTitle: document.title,
          elementSelector: pendingPinTarget ? pendingPinTarget.selector : 'body',
          elementSnippet: pendingPinTarget ? pendingPinTarget.snippet : '',
          imageSrc: pendingPinTarget ? pendingPinTarget.imageSrc : '',
          relX: pendingPinTarget ? pendingPinTarget.relX : 0.5,
          relY: pendingPinTarget ? pendingPinTarget.relY : 0.5,
          reviewerName: reviewerName,
          category: catSelect.value || 'Copy / Text Edit',
          status: 'open',
          commentText: commentText,
          screenshotDataUrl: pendingScreenshotDataUrl || '',
          reactions: {},
          replies: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        feedbackItems.unshift(payload);
        saveLocalFeedback(feedbackItems);
        renderPagePins();
        closeComposer();

        fetch('/api/feedback', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (r) {
            return r.ok ? r.json() : null;
          })
          .then(function (resp) {
            if (resp && Array.isArray(resp.items)) {
              saveLocalFeedback(resp.items);
              renderPagePins();
            }
          })
          .catch(function () {});
      });
    }

    modal.querySelector('#modzComposerTargetSnippet').textContent =
      targetInfo.snippet || 'Selected Page Element';
    modal.querySelector('#modzComposerTargetSelector').textContent = targetInfo.selector || 'body';

    const revInput = modal.querySelector('#modzComposerReviewer');
    const txtInput = modal.querySelector('#modzComposerText');
    const savedDraft = loadPinDraft();
    revInput.value = getCurrentReviewerName();
    txtInput.value = savedDraft && savedDraft.text ? savedDraft.text : '';

    generateElementSnapshot(targetInfo.el, targetInfo.relX, targetInfo.relY, function (dataUrl) {
      pendingScreenshotDataUrl = dataUrl || '';
      const wrap = modal.querySelector('#modzComposerSnapPreviewWrap');
      const img = modal.querySelector('#modzComposerSnapPreview');
      if (pendingScreenshotDataUrl) {
        img.src = pendingScreenshotDataUrl;
        wrap.style.display = 'block';
      } else {
        wrap.style.display = 'none';
      }
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function openPinThreadModal(pinId) {
    const item = feedbackItems.find(function (i) {
      return i.id === pinId;
    });
    if (!item) return;

    let modal = document.getElementById('modzPinThreadModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modzPinThreadModal';
      modal.style.cssText =
        'position:fixed;inset:0;z-index:115;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(2,6,23,0.82);backdrop-filter:blur(4px);font-family:system-ui,-apple-system,sans-serif;';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    }

    function escHtml(v) {
      return String(v ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    const repliesHtml =
      item.replies && item.replies.length
        ? item.replies
            .map(function (rep) {
              return (
                '<div style="padding:10px;border-radius:10px;background:#F8FAFC;border:1px solid #E2E8F0;margin-bottom:8px;">' +
                '<div style="display:flex;justify-content:space-between;font-family:monospace;font-size:11px;">' +
                '<strong>' +
                escHtml(rep.author) +
                '</strong><span style="color:#64748B;">' +
                escHtml((rep.createdAt || '').slice(0, 16).replace('T', ' ')) +
                '</span></div>' +
                '<div style="margin-top:4px;font-size:12px;color:#334155;">' +
                escHtml(rep.text) +
                '</div></div>'
              );
            })
            .join('')
        : '<div style="font-size:12px;color:#94A3B8;font-style:italic;">No replies yet.</div>';

    modal.innerHTML = `
      <div style="width:100%;max-width:512px;background:#FFFFFF;border-radius:16px;border:2px solid #F59E0B;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);max-height:90vh;overflow-y:auto;" onclick="event.stopPropagation()">
        <div style="background:#0F172A;color:#FFFFFF;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-family:monospace;font-size:10px;text-transform:uppercase;color:#FBBF24;font-weight:700;">Pin #${escHtml(item.pinNumber)} &bull; ${escHtml(formatPageLabel(item.pagePath))} &bull; ${escHtml(item.category)}</div>
            <div style="font-size:15px;font-weight:800;margin-top:2px;">Posted by ${escHtml(item.reviewerName)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <select id="modzThreadStatusSelect" style="background:#1E293B;color:#FBBF24;border:1px solid #475569;border-radius:8px;padding:4px 8px;font-family:monospace;font-size:11px;font-weight:700;">
              <option value="open" ${item.status === 'open' ? 'selected' : ''}>OPEN</option>
              <option value="in_progress" ${item.status === 'in_progress' ? 'selected' : ''}>IN PROGRESS</option>
              <option value="resolved" ${item.status === 'resolved' ? 'selected' : ''}>RESOLVED ✓</option>
            </select>
            <button type="button" id="modzThreadCloseBtn" style="padding:4px 10px;border-radius:8px;background:#1E293B;color:#CBD5E1;border:1px solid #475569;cursor:pointer;">&times;</button>
          </div>
        </div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:14px;font-size:12px;color:#1E293B;">
          <div style="padding:12px;border-radius:10px;background:#FFFBEB;border:1px solid #FDE68A;">
            <div style="font-size:14px;font-weight:600;color:#0F172A;">${escHtml(item.commentText)}</div>
            <div style="font-family:monospace;font-size:10px;color:#64748B;margin-top:4px;">Target: ${escHtml(item.elementSnippet || item.elementSelector)}</div>
          </div>
          ${
            item.screenshotDataUrl
              ? `<div style="border-radius:10px;overflow:hidden;border:1px solid #E2E8F0;background:#020617;"><img src="${item.screenshotDataUrl}" alt="Pin snapshot" style="width:100%;max-height:190px;object-fit:contain;display:block;" /></div>`
              : ''
          }
          <div>
            <div style="font-family:monospace;font-size:10px;font-weight:700;text-transform:uppercase;color:#64748B;margin-bottom:6px;">Replies (${(item.replies || []).length})</div>
            <div style="max-height:160px;overflow-y:auto;">${repliesHtml}</div>
          </div>
          <form id="modzThreadReplyForm" style="display:flex;gap:8px;padding-top:8px;border-top:1px solid #E2E8F0;">
            <input type="text" id="modzThreadReplyInput" required placeholder="Reply as ${getCurrentReviewerName()}..." style="flex:1;padding:8px 12px;border-radius:10px;border:1px solid #CBD5E1;font-size:12px;" />
            <button type="submit" style="padding:8px 16px;border-radius:10px;background:#0F172A;color:#FBBF24;border:none;font-family:monospace;font-weight:700;font-size:12px;cursor:pointer;">Reply</button>
          </form>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    modal.querySelector('#modzThreadCloseBtn').addEventListener('click', function () {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    modal.querySelector('#modzThreadStatusSelect').addEventListener('change', function () {
      item.status = this.value;
      saveLocalFeedback(feedbackItems);
      renderPagePins();
      fetch('/api/feedback', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status', id: item.id, status: item.status })
      }).catch(function () {});
    });

    modal.querySelector('#modzThreadReplyForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const inp = modal.querySelector('#modzThreadReplyInput');
      const txt = (inp.value || '').trim();
      if (!txt) return;
      const author = getCurrentReviewerName();
      if (!item.replies) item.replies = [];
      item.replies.push({
        id: 'rep-' + Date.now(),
        author: author,
        text: txt,
        createdAt: new Date().toISOString()
      });
      saveLocalFeedback(feedbackItems);
      openPinThreadModal(item.id);
      fetch('/api/feedback', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reply', id: item.id, author: author, text: txt })
      }).catch(function () {});
    });
  }

  // 7. Initialize Floating Dock & Element Picker
  function initInPageReviewOverlay() {
    if (window.location.pathname.indexOf('/gate') === 0) return;

    const modeBanner = document.createElement('div');
    modeBanner.id = 'modzPinModeBanner';
    modeBanner.style.cssText =
      'position:fixed;top:0;left:0;right:0;z-index:105;background:#0F172A;color:#FBBF24;border-bottom:2px solid #F59E0B;padding:10px 16px;text-align:center;font-family:monospace;font-size:12px;font-weight:800;display:none;align-items:center;justify-content:center;gap:12px;box-shadow:0 10px 25px rgba(0,0,0,0.4);';
    modeBanner.innerHTML =
      '<span>📌 TAP OR CLICK ANY PHOTO, TEXT, OR SECTION TO DROP A PIN</span>' +
      '<button type="button" id="modzBannerCancelPinBtn" style="padding:4px 10px;border-radius:6px;background:#DC2626;color:#FFFFFF;border:none;font-family:monospace;font-size:11px;font-weight:700;cursor:pointer;">Cancel</button>';
    document.body.appendChild(modeBanner);
    modeBanner.querySelector('#modzBannerCancelPinBtn').addEventListener('click', function () {
      setPinMode(false);
    });

    const hoverBox = document.createElement('div');
    hoverBox.id = 'modzPinHoverBox';
    hoverBox.style.cssText =
      'position:fixed;pointer-events:none;z-index:104;border:2px dashed #F59E0B;background:rgba(245,158,11,0.10);border-radius:8px;display:none;transition:all 0.05s ease-out;';
    document.body.appendChild(hoverBox);

    let dockCollapsed = false;
    try {
      dockCollapsed = localStorage.getItem(DOCK_COLLAPSED_KEY) === '1';
    } catch (_) {}

    const dock = document.createElement('div');
    dock.id = 'modzReviewDock';
    dock.style.cssText =
      'position:fixed;bottom:14px;right:14px;z-index:95;color:#FFFFFF;font-family:system-ui,-apple-system,sans-serif;user-select:none;touch-action:none;';
    dock.innerHTML = `
      <div id="modzDockExpandedWrap" style="background:rgba(15,23,42,0.96);backdrop-filter:blur(8px);border:2px solid #F59E0B;border-radius:16px;padding:6px 8px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);display:${dockCollapsed ? 'none' : 'flex'};align-items:center;gap:6px;">
        <div id="modzDockDragHandle" style="padding:6px 5px;border-radius:8px;color:#94A3B8;cursor:grab;font-family:monospace;font-size:13px;line-height:1;" title="Drag to move Pin Bar anywhere on screen">&#8942;&#8942;</div>
        <button type="button" id="modzDockReviewerBtn" style="padding:7px 9px;border-radius:12px;background:#1E293B;border:1px solid #334155;font-family:monospace;font-size:11px;color:#CBD5E1;display:flex;align-items:center;gap:6px;cursor:pointer;" title="Tap to set your reviewer name">
          <span style="width:8px;height:8px;border-radius:9999px;background:#34D399;display:inline-block;"></span>
          <span id="modzDockReviewerName" style="font-weight:700;color:#FBBF24;">${getCurrentReviewerName()}</span>
        </button>
        <button type="button" id="modzDockAddPinBtn" style="background:#F59E0B;color:#0F172A;border:none;font-family:monospace;font-size:12px;font-weight:800;padding:8px 12px;border-radius:12px;cursor:pointer;">
          <span>+ Pin Comment</span>
        </button>
        <button type="button" id="modzDockTogglePinsBtn" style="padding:7px 10px;border-radius:12px;background:#1E293B;border:1px solid #334155;font-family:monospace;font-size:11px;color:#E2E8F0;cursor:pointer;display:flex;align-items:center;gap:5px;" title="Toggle Pin Markers ON or OFF on this page">
          <span>Pins (<strong id="modzDockPinCount" style="color:#FBBF24;">0</strong>):</span>
          <span id="modzDockPinsStateBadge" style="padding:2px 6px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid ${pinsVisible ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)'};background:${pinsVisible ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'};color:${pinsVisible ? '#6EE7B7' : '#FDA4AF'};">${pinsVisible ? 'ON' : 'OFF'}</span>
        </button>
        <a href="${CFG.boardUrl}" style="padding:7px 10px;border-radius:12px;background:#311042;border:1px solid #6B21A8;font-family:monospace;font-size:11px;font-weight:700;color:#FDE047;text-decoration:none;">
          Board &nearr;
        </a>
        <button type="button" id="modzDockHelpBtn" style="width:30px;height:30px;border-radius:10px;background:#1E293B;border:1px solid rgba(251,191,36,0.6);color:#FBBF24;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;cursor:pointer;" title="How to use Pin Comments & Review Board" aria-label="How to use Pin Comments">?</button>
        <button type="button" id="modzDockCollapseBtn" style="padding:6px 8px;border-radius:10px;background:#1E293B;border:1px solid #334155;color:#94A3B8;font-family:monospace;font-size:13px;font-weight:700;line-height:1;cursor:pointer;" title="Minimize Pin Bar to small icon">&ndash;</button>
      </div>
      <button type="button" id="modzDockCollapsedBtn" style="display:${dockCollapsed ? 'flex' : 'none'};align-items:center;gap:6px;background:rgba(15,23,42,0.96);border:2px solid #F59E0B;color:#FBBF24;border-radius:9999px;padding:10px 14px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);cursor:grab;" title="Click to expand Pin Bar (or drag to move)">
        <span style="font-size:15px;line-height:1;pointer-events:none;">&#128204;</span>
        <span id="modzDockMiniCount" style="font-family:monospace;font-size:11px;font-weight:800;background:#F59E0B;color:#0F172A;padding:2px 6px;border-radius:9999px;pointer-events:none;">0</span>
      </button>
    `;
    document.body.appendChild(dock);

    function measureDockSize() {
      const prevLeft = dock.style.left;
      const prevRight = dock.style.right;
      dock.style.width = 'max-content';
      dock.style.maxWidth = 'calc(100vw - 16px)';
      dock.style.left = '0px';
      dock.style.right = 'auto';
      const rect = dock.getBoundingClientRect();
      const w = Math.max(rect.width || 0, dock.offsetWidth || 0, dock.scrollWidth || 0, 52);
      const h = Math.max(rect.height || 0, dock.offsetHeight || 0, 48);
      dock.style.left = prevLeft;
      dock.style.right = prevRight;
      return { w: w, h: h };
    }

    function applyDockPosition(leftPx, topPx, save) {
      const size = measureDockSize();
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = document.documentElement.clientHeight || window.innerHeight;
      const maxLeft = Math.max(8, vw - size.w - 8);
      const maxTop = Math.max(8, vh - size.h - 8);
      const clampedLeft = Math.max(8, Math.min(maxLeft, Math.round(leftPx)));
      const clampedTop = Math.max(8, Math.min(maxTop, Math.round(topPx)));
      dock.style.left = clampedLeft + 'px';
      dock.style.top = clampedTop + 'px';
      dock.style.right = 'auto';
      dock.style.bottom = 'auto';
      if (save) {
        try {
          localStorage.setItem(
            DOCK_POS_KEY,
            JSON.stringify({ left: clampedLeft, top: clampedTop })
          );
        } catch (_) {}
      }
    }

    function applySavedDockPos() {
      try {
        const raw = localStorage.getItem(DOCK_POS_KEY);
        if (!raw) return;
        const pos = JSON.parse(raw);
        if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
          applyDockPosition(pos.left, pos.top, false);
        }
      } catch (_) {}
    }
    setTimeout(applySavedDockPos, 20);
    window.addEventListener('resize', applySavedDockPos, { passive: true });

    function setDockCollapsedState(collapsed, preserveAnchor) {
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const prevRect = dock.getBoundingClientRect();
      const hadCustomPos = !!(dock.style.left && dock.style.left !== 'auto');
      const onRightHalf = prevRect.left + prevRect.width / 2 > vw / 2;

      dockCollapsed = !!collapsed;
      try {
        localStorage.setItem(DOCK_COLLAPSED_KEY, dockCollapsed ? '1' : '0');
      } catch (_) {}
      const exp = dock.querySelector('#modzDockExpandedWrap');
      const col = dock.querySelector('#modzDockCollapsedBtn');
      if (exp && col) {
        exp.style.display = dockCollapsed ? 'none' : 'flex';
        col.style.display = dockCollapsed ? 'flex' : 'none';
      }
      if (preserveAnchor || hadCustomPos) {
        const newSize = measureDockSize();
        const targetLeft = onRightHalf ? prevRect.right - newSize.w : prevRect.left;
        applyDockPosition(targetLeft, prevRect.top, true);
      } else {
        setTimeout(applySavedDockPos, 10);
      }
    }

    let dragState = null;
    let suppressNextClick = false;
    let lastExpandAt = 0;
    function startDockDrag(e) {
      if (e.button !== undefined && e.button !== 0) return;
      const rect = dock.getBoundingClientRect();
      dragState = {
        startX: e.clientX,
        startY: e.clientY,
        origLeft: rect.left,
        origTop: rect.top,
        moved: false,
        captured: false,
        targetEl: e.currentTarget,
        startedOnCollapsed: e.currentTarget && e.currentTarget.id === 'modzDockCollapsedBtn',
        pointerId: e.pointerId
      };
    }
    function moveDockDrag(e) {
      if (!dragState) return;
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      if (!dragState.moved && Math.hypot(dx, dy) > 6) {
        dragState.moved = true;
        if (!dragState.captured && dragState.targetEl && dragState.targetEl.setPointerCapture) {
          dragState.captured = true;
          try {
            dragState.targetEl.setPointerCapture(dragState.pointerId);
          } catch (_) {}
        }
      }
      if (!dragState.moved) return;
      e.preventDefault();
      const maxLeft = Math.max(8, window.innerWidth - dock.offsetWidth - 8);
      const maxTop = Math.max(8, window.innerHeight - dock.offsetHeight - 8);
      const nextLeft = Math.min(Math.max(8, dragState.origLeft + dx), maxLeft);
      const nextTop = Math.min(Math.max(8, dragState.origTop + dy), maxTop);
      dock.style.left = Math.round(nextLeft) + 'px';
      dock.style.top = Math.round(nextTop) + 'px';
      dock.style.right = 'auto';
      dock.style.bottom = 'auto';
    }
    function endDockDrag(e) {
      if (!dragState) return;
      const wasMoved = dragState.moved;
      const wasCollapsedTap = !wasMoved && dragState.startedOnCollapsed && e && e.type === 'pointerup';
      if (wasMoved) {
        suppressNextClick = true;
        setTimeout(function () {
          suppressNextClick = false;
        }, 120);
        const rect = dock.getBoundingClientRect();
        try {
          localStorage.setItem(
            DOCK_POS_KEY,
            JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) })
          );
        } catch (_) {}
      }
      if (dragState.captured && dragState.targetEl && dragState.targetEl.releasePointerCapture) {
        try {
          dragState.targetEl.releasePointerCapture(dragState.pointerId);
        } catch (_) {}
      }
      dragState = null;
      if (wasCollapsedTap) {
        setTimeout(function () {
          if (dockCollapsed) {
            lastExpandAt = Date.now();
            setDockCollapsedState(false, true);
          }
        }, 20);
      }
    }

    const dragHandle = dock.querySelector('#modzDockDragHandle');
    const collapsedBtn = dock.querySelector('#modzDockCollapsedBtn');
    [dragHandle, collapsedBtn].forEach(function (el) {
      if (!el) return;
      el.addEventListener('pointerdown', startDockDrag);
      el.addEventListener('pointermove', moveDockDrag);
      el.addEventListener('pointerup', endDockDrag);
      el.addEventListener('pointercancel', endDockDrag);
    });

    dock.querySelector('#modzDockCollapseBtn').addEventListener('click', function (e) {
      if (Date.now() - lastExpandAt < 250) return;
      e.stopPropagation();
      setDockCollapsedState(true, true);
    });
    collapsedBtn.addEventListener('click', function (e) {
      if (suppressNextClick) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      lastExpandAt = Date.now();
      setDockCollapsedState(false, true);
    });

    dock.querySelector('#modzDockReviewerBtn').addEventListener('click', function () {
      const nextName = window.prompt('Enter your reviewer name:', getCurrentReviewerName());
      if (nextName !== null) {
        setCurrentReviewerName(nextName, true);
        markReviewerNameConfirmed();
      }
    });

    dock.querySelector('#modzDockAddPinBtn').addEventListener('click', function () {
      setPinMode(!pinModeActive);
    });

    dock.querySelector('#modzDockTogglePinsBtn').addEventListener('click', function () {
      pinsVisible = !pinsVisible;
      try {
        localStorage.setItem(PINS_VISIBLE_KEY, pinsVisible ? '1' : '0');
      } catch (_) {}
      renderPagePins();
    });

    function openPinHelpModal() {
      let modal = document.getElementById('modzPinHelpModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modzPinHelpModal';
        modal.style.cssText =
          'position:fixed;inset:0;z-index:120;background:rgba(2,6,23,0.82);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,sans-serif;';
        modal.innerHTML = `
          <div style="background:#FFFFFF;border:2px solid #F59E0B;border-radius:18px;max-width:600px;width:100%;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.65);color:#0F172A;max-height:90vh;overflow-y:auto;">
            <div style="background:#130D24;color:#FFFFFF;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #3B0764;">
              <div>
                <div style="font-family:monospace;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#FBBF24;">GreenTree Visual Pin Board (MOD-PIN-BOARD v2)</div>
                <div style="font-size:17px;font-weight:800;margin-top:2px;">How to Use the In-Page Pin Comment Board</div>
              </div>
              <button type="button" id="modzHelpCloseTop" style="padding:6px 10px;border-radius:8px;background:#0F172A;color:#CBD5E1;border:1px solid #334155;font-family:monospace;font-size:11px;cursor:pointer;">Close &times;</button>
            </div>
            <div style="padding:20px;display:flex;flex-direction:column;gap:12px;font-size:13px;color:#334155;">
              <div style="padding:12px 14px;border-radius:12px;background:#FFFBEB;border:1px solid #FDE68A;color:#0F172A;line-height:1.5;">
                <strong>Why we built this for you:</strong> Instead of writing long emails or trying to describe which photo or paragraph needs an edit, click <strong>directly on any photo, headline, or section</strong> to drop a numbered pin with an automatic visual snapshot.
              </div>
              <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:#F8FAFC;border:1px solid #E2E8F0;align-items:flex-start;">
                <span style="width:26px;height:26px;border-radius:9999px;background:#F59E0B;color:#0F172A;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">1</span>
                <div>
                  <div style="font-weight:800;color:#0F172A;">Click "+ Pin Comment"</div>
                  <div style="font-size:12px;color:#475569;margin-top:2px;">Tap the gold <strong>+ Pin Comment</strong> button on the floating bar. Your cursor turns into a crosshair.</div>
                </div>
              </div>
              <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:#F8FAFC;border:1px solid #E2E8F0;align-items:flex-start;">
                <span style="width:26px;height:26px;border-radius:9999px;background:#F59E0B;color:#0F172A;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">2</span>
                <div>
                  <div style="font-weight:800;color:#0F172A;">Tap Any Photo, Caption, or Paragraph</div>
                  <div style="font-size:12px;color:#475569;margin-top:2px;">Click the exact item you want to comment on. The system captures a real-pixel snapshot and records the exact page location.</div>
                </div>
              </div>
              <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:#F8FAFC;border:1px solid #E2E8F0;align-items:flex-start;">
                <span style="width:26px;height:26px;border-radius:9999px;background:#F59E0B;color:#0F172A;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">3</span>
                <div>
                  <div style="font-weight:800;color:#0F172A;">Type Your Note &amp; Post Pin</div>
                  <div style="font-size:12px;color:#475569;margin-top:2px;">Enter your reviewer name once, type your note, and click <strong>Post Pin</strong>. It saves to your dedicated PostgreSQL database and notifies the team immediately.</div>
                </div>
              </div>
              <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:#F8FAFC;border:1px solid #E2E8F0;align-items:flex-start;">
                <span style="width:26px;height:26px;border-radius:9999px;background:#10B981;color:#0F172A;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">&#10003;</span>
                <div>
                  <div style="font-weight:800;color:#0F172A;">Track Replies &amp; Resolutions on the Command Center</div>
                  <div style="font-size:12px;color:#475569;margin-top:2px;">Click any numbered badge on a page to reply, or click <strong>Board &nearr;</strong> to view all pins inside your site's <code>/admin</code> Command Center.</div>
                </div>
              </div>
              <div style="display:flex;gap:12px;padding:12px;border-radius:12px;background:#F8FAFC;border:1px solid #E2E8F0;align-items:flex-start;">
                <span style="width:26px;height:26px;border-radius:9999px;background:#7E22CE;color:#FFFFFF;font-family:monospace;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">&#128204;</span>
                <div>
                  <div style="font-weight:800;color:#0F172A;">Hide Pins (ON/OFF), Shrink to Circle (&ndash;) &amp; Drag Anywhere (&#8942;&#8942;)</div>
                  <div style="font-size:12px;color:#475569;margin-top:2px;">Click <strong>Pins: ON / OFF</strong> to hide or show markers on the page, click <strong>&ndash;</strong> to collapse the bar into a small floating <strong>&#128204;</strong> circle (click <strong>&#128204;</strong> to expand it back), or grab <strong>&#8942;&#8942;</strong> to drag the bar anywhere on your screen.</div>
                </div>
              </div>
              <div style="padding-top:12px;border-top:1px solid #E2E8F0;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                <button type="button" id="modzHelpStartPinBtn" style="padding:10px 16px;border-radius:10px;background:#F59E0B;color:#0F172A;border:none;font-family:monospace;font-size:12px;font-weight:800;cursor:pointer;">+ Start Dropping a Pin Now</button>
                <div style="display:flex;gap:8px;">
                  <a href="${CFG.boardUrl}" style="padding:10px 14px;border-radius:10px;background:#130D24;color:#FBBF24;font-family:monospace;font-size:12px;font-weight:700;text-decoration:none;">Open /admin Board &nearr;</a>
                  <button type="button" id="modzHelpCloseBottom" style="padding:10px 14px;border-radius:10px;background:#F1F5F9;color:#334155;border:1px solid #CBD5E1;font-size:12px;font-weight:700;cursor:pointer;">Got It</button>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        const closeHelp = function () {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        };
        modal.addEventListener('click', function (e) {
          if (e.target === modal) closeHelp();
        });
        modal.querySelector('#modzHelpCloseTop').addEventListener('click', closeHelp);
        modal.querySelector('#modzHelpCloseBottom').addEventListener('click', closeHelp);
        modal.querySelector('#modzHelpStartPinBtn').addEventListener('click', function () {
          closeHelp();
          setPinMode(true);
        });
      }
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    window.openModzPinHelp = openPinHelpModal;
    const helpBtn = dock.querySelector('#modzDockHelpBtn');
    if (helpBtn) helpBtn.addEventListener('click', openPinHelpModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pinModeActive) setPinMode(false);
    });

    document.addEventListener(
      'mousemove',
      function (e) {
        if (!pinModeActive) return;
        const target = e.target;
        if (
          !target ||
          target.closest('#modzReviewDock, #modzPinComposerModal, #modzPinThreadModal, #modzPinModeBanner')
        ) {
          hoverBox.style.display = 'none';
          return;
        }
        const rect = target.getBoundingClientRect();
        hoverBox.style.display = 'block';
        hoverBox.style.left = rect.left + 'px';
        hoverBox.style.top = rect.top + 'px';
        hoverBox.style.width = rect.width + 'px';
        hoverBox.style.height = rect.height + 'px';
      },
      { passive: true }
    );

    document.addEventListener(
      'click',
      function (e) {
        if (!pinModeActive) return;
        const target = e.target;
        if (
          !target ||
          target.closest('#modzReviewDock, #modzPinComposerModal, #modzPinThreadModal, #modzPinModeBanner')
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();

        const rect = target.getBoundingClientRect();
        const relX = rect.width > 0 ? Math.max(0.05, Math.min(0.95, (e.clientX - rect.left) / rect.width)) : 0.5;
        const relY = rect.height > 0 ? Math.max(0.05, Math.min(0.95, (e.clientY - rect.top) / rect.height)) : 0.5;
        const imgEl = target.tagName === 'IMG' ? target : target.querySelector ? target.querySelector('img') : null;

        setPinMode(false);
        openPinComposerModal({
          el: target,
          selector: getElementSelector(target),
          snippet: getElementSnippet(target),
          imageSrc: imgEl ? imgEl.getAttribute('src') : '',
          relX: Number(relX.toFixed(3)),
          relY: Number(relY.toFixed(3))
        });
      },
      true
    );

    window.addEventListener('resize', renderPagePins, { passive: true });
    window.addEventListener('scroll', renderPagePins, { passive: true });

    syncFeedbackWithServer(function () {
      const params = new URLSearchParams(window.location.search);
      const jumpPinId = params.get('pin');
      if (jumpPinId) {
        const targetItem = feedbackItems.find(function (i) {
          return i.id === jumpPinId;
        });
        if (targetItem) {
          try {
            const el = document.querySelector(targetItem.elementSelector);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (_) {}
          setTimeout(function () {
            openPinThreadModal(targetItem.id);
          }, 450);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateSessionTimerUI();
      initInPageReviewOverlay();
    });
  } else {
    updateSessionTimerUI();
    initInPageReviewOverlay();
  }
})();
