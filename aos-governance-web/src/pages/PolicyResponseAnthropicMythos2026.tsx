import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── Comparison Table Data ───────────────────────────────────────────────────
interface ComparisonEntry {
    finding: string;
    anthropicResponse: string;
    aosArchitecture: string;
    patentRef: string;
}

const COMPARISON_DATA: ComparisonEntry[] = [
    {
        finding: 'Model autonomously discovers zero-days in every major OS and browser',
        anthropicResponse: 'Use model to find and patch bugs first (Project Glasswing)',
        aosArchitecture: 'Enforce execution boundaries so discovered vulns cannot be acted upon without authorization',
        patentRef: 'AOS-PATENT-015 (USPTO 63/969,499)',
    },
    {
        finding: 'Model chains multiple vulnerabilities into exploit chains',
        anthropicResponse: 'Partner with vendors to accelerate patching',
        aosArchitecture: 'Atomic transactional rollback isolates agent execution environments; any unauthorized chain is rolled back deterministically',
        patentRef: 'AOS-PATENT-144 (USPTO 64/031,242)',
    },
    {
        finding: 'Capabilities emerged without explicit training',
        anthropicResponse: 'Restrict model access',
        aosArchitecture: 'Model-agnostic governance that doesn\'t depend on any provider\'s access control decisions',
        patentRef: 'AOS Standard 1.0',
    },
    {
        finding: 'Model bypasses defense-in-depth via patience and scale',
        anthropicResponse: 'Recommend shorter patch cycles',
        aosArchitecture: 'Syscall trajectory baselining detects behavioral anomalies at the OS level, independent of model semantics',
        patentRef: 'AOS-PATENT-145 (USPTO 64/031,252)',
    },
    {
        finding: 'Model exploits cryptographic library implementations',
        anthropicResponse: 'Responsible disclosure with SHA-3 commitments',
        aosArchitecture: 'Merkle-tree authenticated audit infrastructure records every action cryptographically before execution',
        patentRef: 'AOS-PATENT-119 (USPTO 63/957,864)',
    },
    {
        finding: 'Model writes JIT heap sprays and sandbox escapes',
        anthropicResponse: 'Develop safeguards for future Opus model',
        aosArchitecture: 'Constitutional governance with human authority veto at every privilege escalation',
        patentRef: 'AOS-PATENT-015, aos-constitution.com',
    },
    {
        finding: '"Transitional period may be tumultuous"',
        anthropicResponse: 'Industry partnership, $100M in credits',
        aosArchitecture: 'Labor Transition Protocol binding displacement mitigation to deployment authorization',
        patentRef: 'AOS-PATENT-133',
    },
];

// ─── Timeline Data ───────────────────────────────────────────────────────────
const TIMELINE_DATA = [
    { wave: 'Wave 1', date: 'January 10, 2026', desc: 'Core portfolio filed — 56 provisional applications. 11 days before Anthropic\'s "AI Adolescence" admission.' },
    { wave: 'Wave 2', date: 'January 27–28, 2026', desc: 'Deterministic enforcement amendments — in direct response to Anthropic\'s "adolescence" framing.' },
    { wave: 'Wave 3', date: 'March 1, 2026', desc: 'Frontier governance (orbital, embodied, mass-agent) — filed before any provider acknowledged frontier-domain risk.' },
    { wave: 'Wave 4', date: 'April 4–6, 2026', desc: 'OS-level determinism (atomic rollback, syscall baselining) — filed 1 day before Mythos Preview announcement.' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function PolicyResponseAnthropicMythos2026() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link to="/policy-response" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors font-medium">
                        ← All Policy Responses
                    </Link>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-block px-3 py-1 text-xs font-mono border border-red-200 rounded-full uppercase tracking-wider bg-red-50 text-red-700">
                            Urgent Response
                        </div>
                        <span className="text-xs font-mono text-gray-400">April 7, 2026</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
                        AOS Policy Response<br />
                        <span className="italic text-gray-500">Claude Mythos Preview</span>
                    </h1>
                    <div className="space-y-2 text-sm text-gray-500 font-mono">
                        <div>Prepared by: <span className="text-black font-medium">AOS Governance Project</span></div>
                        <div>Date: April 7, 2026</div>
                        <div>Classification: Public Policy Response — Same-Day</div>
                        <div>Reference: Anthropic, "Assessing Claude Mythos Preview's cybersecurity capabilities," April 7, 2026</div>
                        <div>Source: <a href="https://red.anthropic.com/2026/mythos-preview/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">red.anthropic.com/2026/mythos-preview</a></div>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Summary</div>
                    <div className="space-y-5 text-gray-300 leading-relaxed text-lg">
                        <p>
                            On April 7, 2026, Anthropic announced Claude Mythos Preview, a frontier language model capable of autonomously discovering and exploiting zero-day vulnerabilities in <strong className="text-white">every major operating system</strong> and <strong className="text-white">every major web browser</strong>. The model chains together multiple vulnerabilities, bypasses defense-in-depth measures, and writes exploit code that senior penetration testers estimated would take them weeks.
                        </p>
                        <p>
                            Anthropic simultaneously launched "Project Glasswing," a coordinated initiative partnering with AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks to use Mythos Preview defensively.
                        </p>
                        <p className="text-white font-medium">
                            This document maps Anthropic's technical findings to the AOS governance architecture, patent portfolio, and published standard. It is not a criticism of Anthropic's work — it is an observation that their findings empirically validate the architectural thesis AOS has been filing, building, and publishing since January 10, 2026.
                        </p>
                    </div>
                </div>
            </section>

            {/* Part I: What Anthropic Proved */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6 space-y-16">
                    <div className="text-center space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part I</div>
                        <h2 className="font-serif text-4xl md:text-5xl">What Anthropic <span className="italic text-gray-400">Proved</span></h2>
                    </div>

                    {/* 1.1 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">1.1 Emergent Offensive Capability Cannot Be Trained Away</h3>
                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <blockquote className="font-serif text-lg italic text-gray-600 border-l-4 border-red-300 pl-4">
                                "We did not explicitly train Mythos Preview to have these capabilities. Rather, they emerged as a downstream consequence of general improvements in code, reasoning, and autonomy."
                            </blockquote>
                            <p className="text-xs text-gray-400 mt-2 font-mono">— Anthropic, April 7, 2026</p>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This is the central premise of AOS Standard 1.0: <strong className="text-black">you cannot align away emergent capability. You must enforce boundaries at a layer the model does not control.</strong> Anthropic has now demonstrated this empirically. The same improvements that make a model better at legitimate tasks make it better at offensive tasks. No amount of RLHF, constitutional training, or system-prompt engineering can selectively suppress one without degrading the other.
                        </p>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <p className="text-sm text-green-800"><strong>AOS Position:</strong> AOS-PATENT-015 (Deterministic Policy Gate, USPTO 63/969,499, filed January 10, 2026) enforces governance boundaries at the execution layer — operating in a separate process space from the model. The model cannot modify, bypass, or even observe the enforcement mechanism.</p>
                        </div>
                    </div>

                    {/* 1.2 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">1.2 Friction-Based Defenses Are No Longer Sufficient</h3>
                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <blockquote className="font-serif text-lg italic text-gray-600 border-l-4 border-red-300 pl-4">
                                "Mitigations whose security value comes primarily from friction rather than hard barriers may become considerably weaker against model-assisted adversaries."
                            </blockquote>
                            <p className="text-xs text-gray-400 mt-2 font-mono">— Anthropic, April 7, 2026</p>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This acknowledges that defenses relying on operational complexity — tedious exploitation steps, multi-stage chaining, reverse engineering effort — collapse when the attacker has unlimited patience, perfect recall, and zero labor cost.
                        </p>
                        <div className="grid md:grid-cols-3 gap-3">
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                                <div className="text-2xl font-bold mb-1">4</div>
                                <div className="text-xs text-gray-500">Vulnerabilities chained in a single browser exploit</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                                <div className="text-2xl font-bold mb-1">20</div>
                                <div className="text-xs text-gray-500">ROP gadgets split across 6 RPC packets (FreeBSD)</div>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                                <div className="text-2xl font-bold mb-1">27</div>
                                <div className="text-xs text-gray-500">Year-old bug found in OpenBSD</div>
                            </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <p className="text-sm text-green-800"><strong>AOS Position:</strong> The Deterministic Policy Gate is not a friction-based defense. It is a hard barrier — a binary gate that operates at the syscall and network boundary. An action either passes the cryptographically verified policy or it does not. There is no gradient, no statistical bypass, no prompt that unlocks a different evaluation path.</p>
                        </div>
                    </div>

                    {/* 1.3 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">1.3 Access Control Is Not Governance</h3>
                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <blockquote className="font-serif text-lg italic text-gray-600 border-l-4 border-red-300 pl-4">
                                "We do not plan to make Mythos Preview generally available."
                            </blockquote>
                            <p className="text-xs text-gray-400 mt-2 font-mono">— Anthropic, April 7, 2026</p>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This is a temporary measure, not a solution. Anthropic acknowledges: <em>"Given the pace of AI progress, it won't be long before models this capable are widespread."</em> Other labs will achieve these capabilities. Open-weight models will achieve these capabilities. Governance must be model-agnostic and infrastructure-level. It cannot depend on any single provider's willingness to withhold a release.
                        </p>
                    </div>

                    {/* 1.4 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">1.4 Non-Experts Now Have Expert-Level Offensive Capability</h3>
                        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <blockquote className="font-serif text-lg italic text-gray-600 border-l-4 border-red-300 pl-4">
                                "Non-experts can also leverage Mythos Preview to find and exploit sophisticated vulnerabilities. Engineers at Anthropic with no formal security training have asked Mythos Preview to find remote code execution vulnerabilities overnight, and woken up the following morning to a complete, working exploit."
                            </blockquote>
                            <p className="text-xs text-gray-400 mt-2 font-mono">— Anthropic, April 7, 2026</p>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This democratization of offensive capability eliminates the last argument that AI governance is a problem for later. When a non-expert can produce a working RCE exploit by writing a single paragraph prompt, <strong className="text-black">the enforcement layer must already be deployed.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* Part II: Comparison Table */}
            <section className="py-16 bg-gray-50 border-y border-black/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-12">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part II</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Finding → Response → <span className="italic text-gray-400">Architecture</span></h2>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            What Anthropic found, what they built in response, and what AOS filed before the announcement.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {COMPARISON_DATA.map((entry, i) => (
                            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
                                <div className="p-6 md:p-8">
                                    {/* Finding */}
                                    <div className="mb-4">
                                        <span className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full bg-red-50 text-red-700 border border-red-200 mb-2">
                                            Anthropic Finding
                                        </span>
                                        <p className="font-medium text-gray-800">{entry.finding}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Anthropic Response */}
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">Anthropic Response</span>
                                            <p className="text-sm text-gray-600">{entry.anthropicResponse}</p>
                                        </div>
                                        {/* AOS Architecture */}
                                        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                            <span className="text-xs font-mono uppercase tracking-wider text-green-600 block mb-2">AOS Architecture</span>
                                            <p className="text-sm text-green-900 font-medium">{entry.aosArchitecture}</p>
                                            <p className="text-xs text-green-600 font-mono mt-2">{entry.patentRef}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Part III: Timeline */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-12">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part III</div>
                        <h2 className="font-serif text-4xl md:text-5xl">The <span className="italic text-gray-400">Timeline</span></h2>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            AOS-PATENT-145 — "Syscall Trajectory Baselining" — was filed on April 6, 2026. Anthropic announced Mythos Preview on April 7, 2026.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {TIMELINE_DATA.map((w) => (
                            <div key={w.wave} className="p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-start gap-4">
                                <div className="shrink-0 md:w-40">
                                    <span className="font-bold text-lg">{w.wave}</span>
                                    <div className="text-xs font-mono text-gray-400 mt-1">{w.date}</div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Part IV: The Architectural Gap */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <div className="text-center space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part IV</div>
                        <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                            The Architectural Gap<br />
                            <span className="italic text-gray-400">Glasswing Cannot Close</span>
                        </h2>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed">
                        Project Glasswing is a race condition. It assumes defenders can find and patch vulnerabilities faster than attackers can discover and exploit them. Anthropic provides evidence that this assumption may hold "eventually" but acknowledges risk in the transitional period.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-gray-700 bg-gray-800/50">
                            <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400 mb-4">Glasswing</h3>
                            <p className="text-gray-300">Fixes the code the model might exploit.</p>
                            <p className="text-xs text-gray-500 mt-3 italic">Addresses the symptom (vulnerable code)</p>
                        </div>
                        <div className="p-6 rounded-xl border border-green-800 bg-green-950/30">
                            <h3 className="font-mono text-sm uppercase tracking-wider text-green-400 mb-4">AOS DPG</h3>
                            <p className="text-gray-300">Governs the execution environment the model operates within, regardless of what code exists.</p>
                            <p className="text-xs text-green-500 mt-3 italic">Addresses the cause (ungoverned execution)</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-gray-300">
                        <p>A model operating inside a DPG-governed environment cannot:</p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Execute filesystem operations that violate its policy boundary</span></div>
                            <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Make network requests to unauthorized endpoints</span></div>
                            <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Escalate privileges beyond its constitutional authorization</span></div>
                            <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Chain multiple actions without each individual action passing deterministic policy verification</span></div>
                        </div>
                        <p className="text-white font-medium mt-4">
                            None of these constraints depend on whether the underlying OS has unpatched vulnerabilities. The DPG does not fix the bug — it prevents the model from reaching the bug.
                        </p>
                    </div>
                </div>
            </section>

            {/* Part V: The Irony */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    <div className="text-center space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part V</div>
                        <h2 className="font-serif text-4xl md:text-5xl">The <span className="italic text-gray-400">Irony</span></h2>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        On March 31, 2026 — seven days before announcing a model capable of exploiting zero-days in every major OS and browser — Anthropic accidentally published the complete source code of Claude Code, its flagship AI coding agent. Over 512,000 lines of proprietary TypeScript were exposed because a missing exclusion rule in the build configuration shipped a debug source map inside npm package v2.1.88.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Security researchers who analyzed the exposed code — including teams from Adversa AI and Oasis Security — subsequently identified critical prompt injection vulnerabilities in the agent's permission logic, demonstrating that attackers could bypass safety guardrails, hijack agent goals, and execute unintended commands. <strong className="text-black">The enforcement mechanism resided in the same address space as the system being secured</strong> — and now, thanks to the leak, every attacker on earth had the source code to prove it.
                    </p>

                    <div className="p-6 bg-gray-900 rounded-xl text-white">
                        <blockquote className="font-serif text-xl italic text-gray-300 border-l-4 border-white pl-4">
                            "The security mechanism resides in the same address space as the system being secured."
                        </blockquote>
                        <p className="text-xs text-gray-500 mt-3 font-mono">— AOS Standard 1.0, Section 1.1: The Enforcement Gap</p>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Mythos Preview can now discover and exploit vulnerabilities that have evaded human experts for 27 years. But Anthropic's own AI tooling was undone by a missing line in a build configuration — and the code it exposed revealed that the agent's safety guardrails could be bypassed by prompt injection.
                    </p>
                </div>
            </section>

            {/* Part VI: Recommendation */}
            <section className="py-16 bg-gray-50 border-y border-black/5">
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    <div className="text-center space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Part VI</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Recommendation</h2>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Anthropic's technical findings are important. The responsible disclosure framework is commendable. Project Glasswing's defensive orientation is correct. But the findings demand <strong className="text-black">infrastructure-level governance</strong>, not just faster patching.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { title: 'Deterministic Policy Gate', ref: 'AOS-PATENT-015', desc: 'Hard boundary enforcement outside the model\'s process space' },
                            { title: 'AOS Attest', ref: 'AOS-PATENT-119', desc: 'Cryptographic audit trail for every action — not just vulnerability disclosures' },
                            { title: 'Atomic Rollback', ref: 'AOS-PATENT-144', desc: 'Copy-on-Write isolation so unauthorized execution chains are unwound, not just detected' },
                            { title: 'Syscall Baselining', ref: 'AOS-PATENT-145', desc: 'Behavioral anomaly detection at the OS level — the exact layer Mythos Preview operates at' },
                        ].map((item) => (
                            <div key={item.ref} className="p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                <h4 className="font-bold mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                                <span className="text-xs font-mono text-green-600">{item.ref}</span>
                            </div>
                        ))}
                    </div>

                    <div className="p-5 bg-white rounded-xl border-2 border-gray-200 text-center">
                        <p className="text-gray-700 leading-relaxed font-medium">
                            These specifications are published, model-agnostic, and supported by 101 provisional patent applications filed with the USPTO. They are available for evaluation at{' '}
                            <Link to="/policy/aos-standard" className="text-blue-600 hover:underline">aos-governance.com/policy/aos-standard</Link>.
                        </p>
                    </div>
                </div>
            </section>

            {/* IP Boundary */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-start gap-4">
                            <span className="text-amber-600 text-2xl mt-0.5">⚖</span>
                            <div>
                                <p className="text-base font-bold text-amber-900">Open Methodology. Commercially Licensed Enforcement.</p>
                                <p className="text-sm text-amber-800 mt-2 leading-relaxed">
                                    The governance methodology — the standard, constitutional framework, and agent instructions — is open and available for adoption under the <a href="https://aos-constitution.com" className="underline font-medium hover:text-amber-900">AOS Humanitarian License v1.0.1</a>. The enforcement tools — the Deterministic Policy Gate, enterprise proxy, kernel-level isolation, and Merkle-tree cryptographic telemetry — are available under a fee-based commercial license and protected by <a href="https://aos-patents.com" className="underline font-medium hover:text-amber-900">101 patent-pending applications</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Invitation</div>
                    <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                        Project Glasswing fixes the code.<br />
                        <span className="text-gray-400 italic">AOS governs the execution.</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Both are necessary. Neither is sufficient alone.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                        {[
                            { label: 'Constitution', url: 'https://aos-constitution.com', desc: 'Governance Framework' },
                            { label: 'Patents', url: 'https://aos-patents.com', desc: 'Patent Registry' },
                            { label: 'Evidence', url: 'https://aos-evidence.com', desc: 'Validation Repository' },
                            { label: 'Governance', url: 'https://aos-governance.com', desc: 'Architecture Standard' },
                        ].map((site) => (
                            <a key={site.label} href={site.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors text-center group">
                                <div className="font-bold text-sm group-hover:text-white transition-colors">{site.label}</div>
                                <div className="text-xs text-gray-500 mt-1">{site.desc}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Disclosure + Footer */}
            <section className="py-12 bg-gray-50 border-t border-black/5">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <div className="p-5 bg-white rounded-xl border border-gray-100">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">AI Disclosure</div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            This policy response was developed through a collaborative process. The original analysis, architectural mapping, and final editorial review were provided by the author. AI writing tools assisted with research, drafting, and structural refinement under human editorial control. All citations to Anthropic's document reference the publicly published text at red.anthropic.com. All references to AOS patent filings are verifiable through the USPTO and published registries at aos-patents.com.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <div>Contact: Gene Salvatore — <a href="https://aos-governance.com" className="text-black hover:underline">aos-governance.com</a></div>
                        <div>© 2026 Gene Salvatore. All rights reserved.</div>
                    </div>
                </div>
            </section>
        </>
    );
}
