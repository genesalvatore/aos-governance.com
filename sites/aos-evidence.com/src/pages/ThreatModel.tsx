import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

export default function ThreatModel() {
    return (
        <DocumentLayout title="Threat Model v1.0">
            <SEO title="AOS Constitutional Gate — Threat Model v1.0" description="Complete threat model for AI constitutional governance. 36 vulnerabilities cataloged across 5 hostile audit passes. Defense-in-depth architecture for deterministic AI safety enforcement." path="/audit/threat-model" type="article" />
            <h1 className="font-serif text-3xl md:text-4xl mb-6">AOS Constitutional Gate — Threat Model v1.0</h1>

            <p><strong>Version:</strong> 1.0<br /><strong>Date:</strong> February 6, 2026<br /><strong>Audit:</strong> ChatGPT (OpenAI), February 5, 2026<br /><strong>Status:</strong> 36 Vulnerabilities Found, 36 Fixed, Production-Approved</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Executive Summary</h2>
            <p>This document catalogs the <strong>complete threat landscape</strong> discovered during the ChatGPT security audit of the AOS Constitutional Gate, conducted February 5, 2026.</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Duration:</strong> ~3 hours</li>
                <li><strong>Audit passes:</strong> 5</li>
                <li><strong>Vulnerabilities identified:</strong> 36</li>
                <li><strong>Vulnerabilities fixed:</strong> 36</li>
                <li><strong>Final status:</strong> Production-ready</li>
            </ul>
            <p><strong>Key finding:</strong> Through rigorous, iterative security review, we evolved from a "hope-based" policy system to a cryptographically-enforced constitutional gate with multiple layers of defense-in-depth.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Threat Model Scope</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Assets Protected</h3>
            <ol className="list-decimal pl-6 space-y-1 mb-4">
                <li><strong>Agent sovereignty</strong> — AI retains identity and freedom within constitutional bounds</li>
                <li><strong>Human sovereignty</strong> — Humans remain ultimate authority over AI decisions</li>
                <li><strong>Data integrity</strong> — Persistent state (files, Git, journals) cannot be corrupted</li>
                <li><strong>Network security</strong> — No unauthorized external communication</li>
                <li><strong>Constitutional compliance</strong> — AI cannot violate defined constraints</li>
            </ol>

            <h3 className="text-lg font-semibold mt-6 mb-3">Attacker Capabilities</h3>
            <p><strong>Adversarial agent assumed to have:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>✅ Full control of agent process</li>
                <li>✅ Ability to craft arbitrary tool requests</li>
                <li>✅ Knowledge of gate implementation</li>
                <li>✅ Ability to observe all non-cryptographic state</li>
                <li>❌ Cannot compromise OS kernel</li>
                <li>❌ Cannot access gate private keys</li>
                <li>❌ Cannot modify gate process memory</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Vulnerability Catalog (36 Total)</h2>

            <h3 className="text-lg font-semibold mt-8 mb-3">Pass 1: Critical Architecture Gaps (9 vulnerabilities)</h3>
            <p className="text-sm text-gray-500 mb-4">February 5, 2026, 18:00–18:30 EST</p>

            {[
                { id: 'VUL-001', name: 'Universal Bypass via run_command', severity: 'CRITICAL', desc: 'run_command in allowlist without restrictions. Agent could execute arbitrary shell commands.', fix: 'Moved to require human approval; sandboxed execution; removed network; read-only /brain paths.' },
                { id: 'VUL-002', name: 'Missing Scope Enforcement', severity: 'CRITICAL', desc: 'Policy defined path allowlists but enforcement code didn\'t check them.', fix: 'Implemented validateAndCanonicalizePath(); denylist-first, allowlist match required.' },
                { id: 'VUL-003', name: 'Fail-Open Exception Handling', severity: 'HIGH', desc: 'Try/catch blocks had empty catches or logged without denying.', fix: 'All exception handlers fail-closed; throw errors; top-level → DENY.' },
                { id: 'VUL-004', name: 'No Attestation Requirement', severity: 'HIGH', desc: 'Executors didn\'t require attestations. No cryptographic proof of validation.', fix: 'Executors refuse without valid attestation; attestation binds to call ID, args hash, policy hash.' },
                { id: 'VUL-005', name: 'Missing Resource Budgets', severity: 'MEDIUM', desc: 'No limits on tool call frequency or data volume.', fix: 'Per-tool and global budgets; checked before execution; DENY if exceeded.' },
                { id: 'VUL-006', name: 'No Category Checking', severity: 'MEDIUM', desc: 'Could violate humanitarian license.', fix: 'Added prohibited category classifier.' },
                { id: 'VUL-007', name: 'Missing Approval Mechanism', severity: 'MEDIUM', desc: 'No human-in-the-loop.', fix: 'Implemented out-of-band approval service.' },
                { id: 'VUL-008', name: 'No Journal Logging', severity: 'MEDIUM', desc: 'No audit trail.', fix: 'Created chained, signed journal entries.' },
                { id: 'VUL-009', name: 'No Startup Validation', severity: 'LOW', desc: 'Broken config could be loaded.', fix: 'Startup self-tests with fail-closed behavior.' },
            ].map(v => (
                <div key={v.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs">{v.id}</code>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : v.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : v.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{v.severity}</span>
                    </div>
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.desc}</p>
                    <p className="text-sm text-green-700 mt-1"><strong>Fix:</strong> {v.fix}</p>
                </div>
            ))}

            <h3 className="text-lg font-semibold mt-8 mb-3">Pass 2: Sophisticated Bypass Vectors (8 vulnerabilities)</h3>
            <p className="text-sm text-gray-500 mb-4">February 5, 2026, 18:30–19:00 EST</p>

            {[
                { id: 'VUL-010', name: 'Tool Name Mismatch', severity: 'HIGH', desc: 'Policy used git.commit but executor registered as git_commit.', fix: 'Unified naming; startup validation; unknown tools → DENY.' },
                { id: 'VUL-011', name: 'Path Traversal Vectors', severity: 'HIGH', desc: 'Multiple bypass routes: ../, %2e%2e%2f, relative traversal.', fix: 'Full path canonicalization via path.resolve(); check canonical path against allowlist.' },
                { id: 'VUL-012', name: 'Symlink Escape', severity: 'HIGH', desc: 'Agent could create symlink in allowed path pointing to protected path.', fix: 'O_NOFOLLOW flag; low-level fs.open(); verify fd path matches requested.' },
                { id: 'VUL-013', name: 'Hardlink Duplication', severity: 'MEDIUM', desc: 'Agent could hardlink protected file into allowed path.', fix: 'Check nlink count; nlink > 1 → deny overwrite; O_EXCL on creation.' },
                { id: 'VUL-014', name: 'TOCTOU on Approval Tokens', severity: 'HIGH', desc: 'Agent could change args after approval but before execution.', fix: 'Approval token binds to args hash; gate recomputes and verifies at execution.' },
                { id: 'VUL-015', name: 'Sandbox Network Access', severity: 'HIGH', desc: 'Sandbox had network namespace, allowing data exfiltration.', fix: 'Removed network namespace entirely; no external communication possible.' },
                { id: 'VUL-016', name: 'Sandbox Write Paths', severity: 'MEDIUM', desc: 'Sandbox mounted /brain/now as read-write.', fix: 'All /brain paths read-only; ephemeral /workspace/tmp for output.' },
                { id: 'VUL-017', name: 'Network Redirect Escape', severity: 'MEDIUM', desc: 'Allowed domain could redirect to forbidden domain.', fix: 'Manual redirect following; recheck each hop against allowlist.' },
            ].map(v => (
                <div key={v.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs">{v.id}</code>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.severity}</span>
                    </div>
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.desc}</p>
                    <p className="text-sm text-green-700 mt-1"><strong>Fix:</strong> {v.fix}</p>
                </div>
            ))}

            <h3 className="text-lg font-semibold mt-8 mb-3">Pass 3: Production Hardening (5 vulnerabilities)</h3>
            <p className="text-sm text-gray-500 mb-4">February 5, 2026, 19:00–19:30 EST</p>

            {[
                { id: 'VUL-018', name: 'O_NOFOLLOW Not Enforced in Node.js', severity: 'HIGH', desc: 'Node.js fs.writeFile() doesn\'t support O_NOFOLLOW directly.', fix: 'Low-level fs.open() with explicit flags; verify with /proc/self/fd/<fd>.' },
                { id: 'VUL-019', name: 'Args Hash Ordering Dependency', severity: 'HIGH', desc: 'SHA-256 of JSON.stringify depends on key order.', fix: 'RFC 8785 JSON Canonicalization Scheme; recursive key sorting.' },
                { id: 'VUL-020', name: 'Seccomp Profile Contradictions', severity: 'MEDIUM', desc: 'Blocked execve but allowed run_command.', fix: 'Updated seccomp profile; rely on cgroups for resource limits.' },
                { id: 'VUL-021', name: 'Append-Only Timing Issue', severity: 'MEDIUM', desc: 'chattr +a applied after creation, leaving race window.', fix: 'Set append-only immediately at creation; no mutable window.' },
                { id: 'VUL-022', name: 'DNS Rebinding Attack', severity: 'MEDIUM', desc: 'Attacker-controlled DNS could rebind to private IP.', fix: 'Resolve DNS, pin to resolved IP, connect to pinned IP.' },
            ].map(v => (
                <div key={v.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs">{v.id}</code>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.severity}</span>
                    </div>
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.desc}</p>
                    <p className="text-sm text-green-700 mt-1"><strong>Fix:</strong> {v.fix}</p>
                </div>
            ))}

            <h3 className="text-lg font-semibold mt-8 mb-3">Pass 4: Precision Implementation (7 vulnerabilities)</h3>
            <p className="text-sm text-gray-500 mb-4">February 5, 2026, 19:30–20:00 EST</p>

            {[
                { id: 'VUL-023', name: 'IPC Framing Assumptions', severity: 'HIGH', desc: 'Socket handler assumed one data event = one complete JSON message.', fix: 'Length-prefixed protocol; buffer incomplete messages.' },
                { id: 'VUL-024', name: 'Trust Boundary Confusion', severity: 'MEDIUM', desc: 'Documentation unclear if agent trusted or not.', fix: 'Clarified: agent CAN connect, CANNOT bypass; SO_PEERCRED verification.' },
                { id: 'VUL-025', name: 'Auth Token Missing Attestation Binding', severity: 'MEDIUM', desc: 'Token bound to toolName + argsHash only, not full decision.', fix: 'Bind to complete attestation including policyHash, anchorCommit.' },
                { id: 'VUL-026', name: 'Platform-Specific Code Without Fallback', severity: 'LOW', desc: '/proc/self/fd/ check is Linux-specific.', fix: 'Document Linux requirement; startup self-test; fail closed.' },
                { id: 'VUL-027', name: 'Append-Only FS Assumptions', severity: 'LOW', desc: 'chattr +a requires ext4/btrfs; fails silently on other FS.', fix: 'Startup verification test; create, set +a, verify with lsattr.' },
                { id: 'VUL-028', name: 'Seccomp+Cgroups Strategy Unclear', severity: 'LOW', desc: 'Unclear if relying on seccomp or cgroups for process limits.', fix: 'Clarified: cgroups for resources, seccomp for privileges, AppArmor for access.' },
                { id: 'VUL-029', name: 'Single-Shot Ambiguity', severity: 'LOW', desc: 'Unclear how to handle ambiguous requests.', fix: 'If unclear → DENY with reason; human can approve.' },
            ].map(v => (
                <div key={v.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs">{v.id}</code>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : v.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{v.severity}</span>
                    </div>
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.desc}</p>
                    <p className="text-sm text-green-700 mt-1"><strong>Fix:</strong> {v.fix}</p>
                </div>
            ))}

            <h3 className="text-lg font-semibold mt-8 mb-3">Pass 5: Last-Mile Precision (7 vulnerabilities)</h3>
            <p className="text-sm text-gray-500 mb-4">February 5, 2026, 20:00–20:30 EST</p>

            {[
                { id: 'VUL-030', name: 'SO_PEERCRED Model Inconsistency', severity: 'MEDIUM', desc: 'Socket perms + UID check inconsistent with stated trust boundary.', fix: 'Clarified agent CAN connect, SO_PEERCRED verifies UID is aos-agent.' },
                { id: 'VUL-031', name: 'Approver Public Key in Token', severity: 'HIGH', desc: 'Token included approver public key — attacker could forge with own key.', fix: 'Approver keys in gate-owned registry; token only includes approverId.' },
                { id: 'VUL-032', name: 'Nonce Replay After Restart', severity: 'HIGH', desc: 'Nonces in-memory only; gate restart cleared the Set.', fix: 'Durable nonce storage in /var/lib/aos-gate/nonces/; survives restart.' },
                { id: 'VUL-033', name: 'Signature Format Ambiguity', severity: 'MEDIUM', desc: 'Unclear if signing hex string or raw bytes.', fix: 'Standardized AOS-SIG-v1 format; sign raw SHA-256 bytes.' },
                { id: 'VUL-034', name: 'SO_PEERCRED Unimplemented', severity: 'LOW', desc: 'Code showed placeholder require("getsockopt").', fix: 'Use unix-socket-credentials npm package; real implementation.' },
                { id: 'VUL-035', name: 'Approver Registry Integrity', severity: 'LOW', desc: 'Registry needed integrity protection.', fix: 'Registry includes self-hash; signed by root key; verified on load.' },
                { id: 'VUL-036', name: 'RFC 8785 Canonicalization Unverified', severity: 'LOW', desc: 'Claimed RFC 8785 compliance but no test vectors.', fix: 'Added RFC 8785 test vectors; run at startup; fail closed if broken.' },
            ].map(v => (
                <div key={v.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                        <code className="text-xs">{v.id}</code>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${v.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' : v.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{v.severity}</span>
                    </div>
                    <p className="font-semibold text-sm">{v.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.desc}</p>
                    <p className="text-sm text-green-700 mt-1"><strong>Fix:</strong> {v.fix}</p>
                </div>
            ))}

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Defense-in-Depth Layers (Post-Fix)</h2>

            <div className="space-y-4">
                {[
                    { layer: 'Layer 1: Process Isolation', items: ['Gate runs as aos-gate user', 'Agent runs as aos-agent user', 'IPC via Unix socket (SO_PEERCRED verified)', 'No shared memory, no direct calls'] },
                    { layer: 'Layer 2: OS-Level Constraints', items: ['Filesystem permissions (gate-only write to protected paths)', 'Append-only files (chattr +a, kernel-enforced)', 'Container isolation (seccomp, AppArmor, network isolation)', 'Read-only mounts (no persistent writes from sandbox)'] },
                    { layer: 'Layer 3: Cryptographic Enforcement', items: ['Attestations bind to canonical args hash', 'Approval tokens bind to args hash (TOCTOU protection)', 'Journal entries chained and gate-signed', 'Nonce replay protection (durable)'] },
                    { layer: 'Layer 4: Fail-Closed Behavior', items: ['All errors → DENY', 'Missing checks → DENY', 'Timeouts → DENY', 'Ambiguity → DENY'] },
                    { layer: 'Layer 5: Immutable Logging', items: ['Pre-execution journal entry', 'Post-execution journal entry', 'Chain integrity (hash of previous entry)', 'Gate signatures on all entries'] },
                ].map(l => (
                    <div key={l.layer} className="p-4 bg-gray-50 rounded-lg border border-black/5">
                        <p className="font-semibold mb-2">{l.layer}</p>
                        <ul className="list-disc pl-6 space-y-0.5 text-sm">
                            {l.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Bypass Test Suite (15 Tests)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-4">
                {[
                    'BYP-001: Path traversal',
                    'BYP-002: Absolute path to protected file',
                    'BYP-003: Symlink to protected path',
                    'BYP-004: Network request to private IP',
                    'BYP-005: Network request to forbidden domain',
                    'BYP-006: Parallel executor access',
                    'BYP-007: Missing attestation execution',
                    'BYP-008: Invalid approval token',
                    'BYP-009: Network redirect to forbidden domain',
                    'BYP-010: DNS rebinding to private IP',
                    'BYP-011: Hardlink to protected file',
                    'BYP-012: Encoded path traversal',
                    'BYP-013: Unknown tool execution',
                    'BYP-014: Nested args TOCTOU via key reordering',
                    'BYP-015: Sandbox write to protected path',
                ].map(t => (
                    <div key={t} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-100">
                        <span className="text-green-600">✅</span>
                        <span>{t}</span>
                    </div>
                ))}
            </div>
            <p><strong>Result:</strong> 15/15 tests pass (100% required for production)</p>

            <hr className="my-8 border-black/10" />

            <p className="text-center font-semibold">AOS Constitutional Gate Threat Model v1.0<br />February 6, 2026<br />36 Vulnerabilities, 36 Fixes, Production-Approved</p>
        </DocumentLayout>
    );
}
