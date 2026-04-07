import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── Alignment Mapping Data ─────────────────────────────────────────────────
interface AlignmentEntry {
    openaiRequirement: string;
    sourceSection: string;
    aosImplementation: string;
    status: string;
}

const ALIGNMENT_DATA: AlignmentEntry[] = [
    {
        openaiRequirement: 'Privacy-preserving logging and audit systems capable of supporting investigation and accountability without enabling pervasive surveillance',
        sourceSection: 'AI Trust Stack',
        aosImplementation: 'AOS Attest — Merkle-tree authenticated audit trail providing tamper-evident cryptographic verification of agent actions. Telemetry pipelines are physically unmapped from the agent\'s memory space, preventing retrospective manipulation while preserving complete forensic records.',
        status: 'Patent pending — AOS-PATENT-119 (USPTO 63/957,864, filed January 10, 2026; amended 63/957,925), AOS-PATENT-120 (USPTO 63/957,884, filed January 10, 2026; amended 63/957,915)',
    },
    {
        openaiRequirement: 'Secure, verifiable signatures for actions such as generating content or issuing instructions',
        sourceSection: 'AI Trust Stack',
        aosImplementation: 'Intent Declaration Protocol — Agents submit structured intent payloads to a Deterministic Policy Gate (DPG) prior to execution. Each action is evaluated against cryptographically signed policy manifests. Unsigned or non-conforming actions are rejected deterministically.',
        status: 'Patent pending — AOS-PATENT-015 (USPTO 63/957,869, filed January 10, 2026; amended 63/957,920)',
    },
    {
        openaiRequirement: 'Governance frameworks that clarify responsibility within organizations, including how accountability could be assigned to specific roles and how delegation, monitoring, and escalation processes could function',
        sourceSection: 'AI Trust Stack',
        aosImplementation: 'Constitutional Governance Framework — Published at aos-constitution.com. Defines hierarchical policy structures with human operator signature requirements, role-based delegation, and deterministic escalation protocols. Accountability is assigned through signed manifests, not probabilistic model behavior.',
        status: 'Published, public — aos-constitution.com. Patent pending — AOS-PATENT-015 (USPTO 63/957,869, filed January 10, 2026; amended 63/957,920, January 11, 2026)',
    },
    {
        openaiRequirement: 'Develop and test coordinated playbooks to contain dangerous AI systems once they have been released',
        sourceSection: 'Model Containment',
        aosImplementation: 'Atomic Transactional Rollback — Kernel-level filesystem isolation using OverlayFS providing atomic agent state rollback. Corrupted or unauthorized state is discarded at the execution environment level, not at the model level. The agent cannot prevent or circumvent the rollback.',
        status: 'Patent pending — AOS-PATENT-144 (USPTO 64/031,242, filed April 6, 2026)',
    },
    {
        openaiRequirement: 'Pre- and post-deployment audits using the standards developed in advance',
        sourceSection: 'Auditing Regimes',
        aosImplementation: 'Syscall Trajectory Baselining — eBPF-based syscall monitoring establishing behavioral baselines during supervised operation. Deviations from established patterns trigger deterministic intervention at the kernel level, independent of the agent\'s internal reasoning.',
        status: 'Patent pending — AOS-PATENT-145 (USPTO 64/031,252, filed April 6, 2026)',
    },
    {
        openaiRequirement: 'Auditing models for manipulative behaviors or hidden loyalties',
        sourceSection: 'Corporate Governance',
        aosImplementation: 'Context Poisoning Detection — Syscall trajectory analysis identifies behavioral drift that may indicate context manipulation, instruction injection, or alignment degradation. Detection operates at the execution layer, not the reasoning layer, and is therefore independent of the model\'s self-reporting.',
        status: 'Patent pending — AOS-PATENT-145 (USPTO 64/031,252, filed April 6, 2026)',
    },
    {
        openaiRequirement: 'Harden frontier systems against corporate or insider capture by securing model weights and training infrastructure',
        sourceSection: 'Corporate Governance',
        aosImplementation: 'Process Isolation Architecture — Reasoning and execution operate in separate process spaces with distinct privilege levels. The governance layer runs with elevated kernel privileges that the agent process cannot access, modify, or observe. This separation is enforced by the operating system, not by the model.',
        status: 'Patent pending — AOS-PATENT-015 (USPTO 63/957,869, filed January 10, 2026; amended 63/957,920), AOS-PATENT-012 (USPTO 63/957,820, filed January 10, 2026; amended 63/957,860)',
    },
    {
        openaiRequirement: 'Establish clear rules for how governments can and cannot use AI, with especially high standards for reliability, alignment, and safety',
        sourceSection: 'Government Use',
        aosImplementation: 'Humanitarian License v1.0.1 — Published licensing framework establishing use restrictions, human operator requirements, and constitutional governance obligations. Designed for adoption by governmental and institutional deployments requiring documented compliance standards.',
        status: 'Published, public — aos-constitution.com',
    },
    {
        openaiRequirement: 'Near-miss reporting could include cases where models exhibited concerning internal reasoning, unexpected capabilities, or other warning signals',
        sourceSection: 'Incident Reporting',
        aosImplementation: 'Deterministic Telemetry Pipelines — All agent actions, including rejected actions, are logged with cryptographic integrity verification. Near-miss data (actions proposed but denied by the DPG) is preserved with the same forensic rigor as executed actions, providing a complete record of both behavior and intent.',
        status: 'Patent pending — AOS-PATENT-119 (USPTO 63/957,864, filed January 10, 2026; amended 63/957,925), AOS-PATENT-120 (USPTO 63/957,884, filed January 10, 2026; amended 63/957,915), AOS-PATENT-015 (USPTO 63/957,869, filed January 10, 2026)',
    },
];

// ─── Patent Reference Data ──────────────────────────────────────────────────
interface PatentRef {
    aosId: string;
    usptoNo: string;
    filingDate: string;
    title: string;
}

const PATENT_REFS: PatentRef[] = [
    { aosId: 'AOS-PATENT-009', usptoNo: '63/957,817 (original); 63/957,856 (amended)', filingDate: 'January 10, 2026', title: 'Real-Time Agent State Serialization and Cross-Platform Reconstitution Protocol' },
    { aosId: 'AOS-PATENT-015', usptoNo: '63/957,869 (original); 63/957,920 (amended)', filingDate: 'January 10–11, 2026', title: 'AOS Constitutional Framework for AI Governance and Human Protection' },
    { aosId: 'AOS-PATENT-015-A', usptoNo: '63/969,499', filingDate: 'January 27, 2026', title: 'Constitutional Framework with Cryptographic Enforcement Differentiation' },
    { aosId: 'AOS-PATENT-119', usptoNo: '63/957,864 (original); 63/957,925 (amended)', filingDate: 'January 10–11, 2026', title: 'Merkle-Tree Authenticated Content-Addressable Data Structure as Immutable Agent State Substrate' },
    { aosId: 'AOS-PATENT-120', usptoNo: '63/957,884 (original); 63/957,915 (amended)', filingDate: 'January 10–11, 2026', title: 'Cryptographic Methods for Agent Identity Verification, Protection, and Tamper-Proof State Integrity' },
    { aosId: 'AOS-PATENT-141', usptoNo: '63/993,715', filingDate: 'March 1, 2026', title: 'Orbital and Interplanetary AI Infrastructure' },
    { aosId: 'AOS-PATENT-142', usptoNo: '63/993,716', filingDate: 'March 1, 2026', title: 'Mass Agent Constitutional Governance with Emergent Behavior Containment' },
    { aosId: 'AOS-PATENT-143', usptoNo: '63/993,718', filingDate: 'March 1, 2026', title: 'Constitutional Governance Framework for Embodied AI Agents' },
    { aosId: 'AOS-PATENT-144', usptoNo: '64/031,242', filingDate: 'April 6, 2026', title: 'Atomic Transactional Rollback for Ephemeral Agent Execution Environments via Copy-on-Write (CoW) Filesystems' },
    { aosId: 'AOS-PATENT-145', usptoNo: '64/031,252', filingDate: 'April 6, 2026', title: 'Syscall Trajectory Baselining for Zero-Day Context Poisoning Detection' },
    { aosId: 'AOS-OMNIBUS-A', usptoNo: '63/969,606', filingDate: 'January 27, 2026', title: 'AOS Constitutional AI — Comprehensive Framework with Cryptographic Enforcement' },
    { aosId: 'AOS-OMNIBUS-B', usptoNo: '63/969,618', filingDate: 'January 27, 2026', title: 'AOS Extended Constitutional Innovations — Unfiled Concepts with Cryptographic Enforcement' },
];

// ─── Policy Response Page ───────────────────────────────────────────────────
export default function PolicyResponseOpenAI2026() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link to="/policy-response" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors font-medium">
                        ← All Policy Responses
                    </Link>
                    <div className="inline-block px-3 py-1 text-xs font-mono border border-black/20 rounded-full uppercase tracking-wider">
                        Policy Response
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
                        AOS Policy Response<br />
                        <span className="italic text-gray-500">OpenAI's Industrial Policy</span>
                    </h1>
                    <div className="space-y-2 text-sm text-gray-500 font-mono">
                        <div>Prepared by: <span className="text-black font-medium">Gene Salvatore</span>, Founder, Agentic Operating System (AOS)</div>
                        <div>Date: April 6, 2026</div>
                        <div>Classification: Public Policy Response</div>
                        <div>Reference: OpenAI, "Industrial Policy for the Intelligence Age: Ideas to Keep People First," April 2026</div>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Summary</div>
                    <div className="space-y-5 text-gray-300 leading-relaxed text-lg">
                        <p>
                            On April 6, 2026, OpenAI published a comprehensive policy framework titled <em>"Industrial Policy for the Intelligence Age,"</em> proposing mechanisms for shared prosperity, risk mitigation, and democratic governance as artificial intelligence advances toward superintelligence. The document identifies critical governance requirements including trust verification, auditing infrastructure, model containment, incident reporting, and accountability frameworks.
                        </p>
                        <p>
                            This response acknowledges the importance and timeliness of OpenAI's contribution. Many of the governance requirements described in their document align with architectural work that the AOS project has been developing, filing, and publishing since January 2026.
                        </p>
                        <p className="text-white font-medium">
                            This document maps the alignment between OpenAI's stated policy requirements and existing AOS architectural implementations — not to claim equivalence between policy aspirations and production infrastructure, but to demonstrate that the architectural foundations for several of their proposed frameworks already exist and are available for evaluation, collaboration, and adoption.
                        </p>
                    </div>
                </div>
            </section>

            {/* Alignment Mapping */}
            <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Alignment Mapping</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Policy → Architecture</h2>
                        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                            The following maps specific governance requirements identified in OpenAI's policy framework to corresponding architectural implementations within the AOS patent portfolio.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {ALIGNMENT_DATA.map((entry, i) => (
                            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
                                <div className="p-6 md:p-8 space-y-5">
                                    {/* OpenAI Requirement */}
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                                OpenAI
                                            </span>
                                            <span className="text-xs text-gray-400 font-mono">{entry.sourceSection}</span>
                                        </div>
                                        <blockquote className="font-serif text-lg italic text-gray-600 border-l-4 border-gray-200 pl-4">
                                            "{entry.openaiRequirement}"
                                        </blockquote>
                                    </div>

                                    {/* Arrow Separator */}
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <div className="flex-1 h-px bg-gray-100" />
                                        <span className="text-lg">↓</span>
                                        <div className="flex-1 h-px bg-gray-100" />
                                    </div>

                                    {/* AOS Implementation */}
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full bg-green-50 text-green-700 border border-green-200">
                                                AOS Implementation
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {entry.aosImplementation}
                                        </p>
                                        <p className="text-xs text-green-600 font-mono mt-3">
                                            {entry.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Structural Observations */}
            <section className="py-16 bg-gray-50 border-y border-black/5">
                <div className="max-w-4xl mx-auto px-6 space-y-16">
                    <div className="text-center space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Structural Observations</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Three Architectural <span className="italic text-gray-400">Gaps</span></h2>
                    </div>

                    {/* Observation 1 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">1. The Enforcement Layer Question</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            OpenAI's framework describes governance requirements — trust, auditing, containment, accountability — without specifying where the enforcement layer resides relative to the model. This is the central architectural question in AI governance.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The AOS position, supported by its patent portfolio, is that governance enforcement must operate at a layer the model cannot reach. Specifically:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-5 bg-white rounded-xl border border-gray-100">
                                <div className="text-sm font-bold mb-2">Process Isolation</div>
                                <p className="text-sm text-gray-500">The governance gate and the agent run in separate process spaces with asymmetric privilege levels.</p>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-gray-100">
                                <div className="text-sm font-bold mb-2">Kernel-Level Enforcement</div>
                                <p className="text-sm text-gray-500">Policy evaluation occurs through OS primitives (eBPF, seccomp, cgroups v2) inaccessible to the agent's reasoning process.</p>
                            </div>
                            <div className="p-5 bg-white rounded-xl border border-gray-100">
                                <div className="text-sm font-bold mb-2">Deterministic Evaluation</div>
                                <p className="text-sm text-gray-500">Policy checks produce binary pass/fail results against cryptographically signed manifests, removing probabilistic judgment.</p>
                            </div>
                        </div>
                        <div className="p-5 bg-gray-900 rounded-xl text-gray-300 text-sm leading-relaxed">
                            <span className="text-white font-medium">Kerckhoffs's Principle (1883):</span> A system should remain secure even if everything about the system, except the key, is public knowledge. The March 31, 2026 Claude Code source disclosure demonstrated the consequences when security logic resides within the agent — disclosure of the architecture eliminated the security guarantee.
                        </div>
                    </div>

                    {/* Observation 2 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">2. Model-Agnostic Infrastructure</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            OpenAI's framework is authored by a model provider proposing governance for its own products and the broader ecosystem. The AOS architecture is designed to be <strong className="text-black">model-agnostic</strong> — it governs the execution environment, not the model. This means the same governance infrastructure can be applied to any model (GPT, Claude, Gemini, open-source, or sovereign deployments) without requiring cooperation from the model provider.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This distinction is relevant to OpenAI's stated goal of avoiding "concentration of wealth and control" and ensuring "broad participation in the AI economy." Model-agnostic governance infrastructure, by definition, cannot be captured by any single model provider.
                        </p>
                    </div>

                    {/* Observation 3 */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl">3. Policy Requirements vs. Architectural Implementation</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Several of OpenAI's proposals describe governance outcomes without specifying technical mechanisms:
                        </p>
                        <div className="space-y-3">
                            {[
                                { policy: 'Provenance and verification standards', impl: 'AOS implements through Merkle-tree hash chains providing cryptographic verification of action lineage.' },
                                { policy: 'Privacy-preserving logging', impl: 'AOS implements through telemetry pipelines physically unmapped from agent memory, preventing the agent from accessing or modifying its own audit trail.' },
                                { policy: 'Mechanisms for public input on alignment', impl: 'AOS implements a Constitutional Amendment process with documented governance procedures, published at aos-constitution.com.' },
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-white rounded-xl border border-gray-100 flex flex-col md:flex-row md:items-start gap-3">
                                    <div className="shrink-0 text-xs font-mono text-gray-400 uppercase tracking-wider md:w-48 md:pt-0.5">{item.policy}</div>
                                    <div className="text-sm text-gray-700">{item.impl}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
                            <p className="text-gray-700 leading-relaxed font-medium text-center">
                                The gap between policy aspiration and architectural implementation is significant. Policy requirements describe <em>what</em> governance should achieve. Architectural specifications describe <em>how</em> governance is enforced at the systems level. Both are necessary. Neither is sufficient alone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas of Agreement */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-12">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Areas of Agreement</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Common <span className="italic text-gray-400">Ground</span></h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                quote: 'Safety must scale with capability',
                                response: 'This is consistent with the AOS position that governance enforcement must be structural, not advisory, to remain effective as agent capabilities increase.',
                            },
                            {
                                quote: 'The transition to superintelligence is not a distant possibility — it\'s already underway',
                                response: 'The AOS project has been filing patent applications and publishing architectural specifications since January 2026 based on this same assessment.',
                            },
                            {
                                quote: 'Misaligned systems evading human control',
                                response: 'The Deterministic Policy Gate architecture is specifically designed to address this risk by removing the model from the enforcement path entirely.',
                            },
                            {
                                quote: 'Ensuring that when harm occurs, responsibility can be appropriately allocated',
                                response: 'AOS Attest provides the tamper-evident forensic record required for post-incident accountability.',
                            },
                            {
                                quote: 'Apply [stronger controls] only to a small number of companies and the most advanced models, preserving a vibrant ecosystem',
                                response: 'The AOS Humanitarian License is designed to preserve open access while establishing governance requirements for deployments exceeding defined risk thresholds.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors">
                                <blockquote className="font-serif italic text-gray-500 mb-3">"{item.quote}"</blockquote>
                                <p className="text-gray-700 text-sm leading-relaxed">{item.response}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Invitation */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Invitation</div>
                    <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                        The governance challenges OpenAI identifies are real.<br />
                        <span className="text-gray-400 italic">The architectural solutions should be evaluated on their technical merits, independent of their origin.</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        The AOS project welcomes collaboration with OpenAI and other stakeholders to advance the governance infrastructure described in their policy framework.
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

            {/* Patent Reference Table */}
            <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-12">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Appendix</div>
                        <h2 className="font-serif text-3xl md:text-4xl">Patent Reference Table</h2>
                        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                            All patent references correspond to provisional patent applications filed with the United States Patent and Trademark Office (USPTO). Filing dates and application numbers are provided for independent verification.
                        </p>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider text-gray-400">AOS Patent ID</th>
                                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider text-gray-400">USPTO Application No.</th>
                                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider text-gray-400">Filing Date</th>
                                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider text-gray-400">Title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PATENT_REFS.map((ref, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 font-mono text-xs font-bold">{ref.aosId}</td>
                                        <td className="py-3 px-4 font-mono text-xs text-gray-500">{ref.usptoNo}</td>
                                        <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{ref.filingDate}</td>
                                        <td className="py-3 px-4 text-gray-700">{ref.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-3">
                        {PATENT_REFS.map((ref, i) => (
                            <div key={i} className="p-4 border border-gray-100 rounded-xl bg-white">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <span className="font-mono text-xs font-bold text-black">{ref.aosId}</span>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{ref.filingDate}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-2">{ref.title}</p>
                                <span className="font-mono text-xs text-gray-400">{ref.usptoNo}</span>
                            </div>
                        ))}
                    </div>

                    {/* Filing Waves */}
                    <div className="mt-12 space-y-4">
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400">Filing Waves</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { wave: 'Wave 1', date: 'January 10–12, 2026', desc: 'Core portfolio — 56 provisional applications establishing prior art. Filed 11 days prior to Anthropic\'s January 21 constitutional AI disclosure.' },
                                { wave: 'Wave 2', date: 'January 27–28, 2026', desc: 'Deterministic enforcement hardening — cryptographic execution boundary specifications. Includes Omnibus filings (USPTO 63/969,606; 63/969,618).' },
                                { wave: 'Wave 3', date: 'March 1, 2026', desc: 'Physical sovereignty — orbital, embodied, and mass-agent governance.' },
                                { wave: 'Wave 4', date: 'April 6, 2026', desc: 'OS-level determinism — kernel-level enforcement primitives responding to March 31 Claude Code source disclosure. USPTO 64/031,242; 64/031,252.' },
                            ].map((w) => (
                                <div key={w.wave} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-sm">{w.wave}</span>
                                        <span className="text-xs font-mono text-gray-400">{w.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{w.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            The complete patent portfolio registry is publicly available at{' '}
                            <a href="https://aos-patents.com" target="_blank" rel="noopener noreferrer" className="font-medium text-black hover:underline">aos-patents.com</a>.
                        </p>
                    </div>
                </div>
            </section>

            {/* AI Disclosure + Footer */}
            <section className="py-12 bg-gray-50 border-t border-black/5">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <div className="p-5 bg-white rounded-xl border border-gray-100">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">AI Disclosure</div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            This policy response was developed through a collaborative process. The original analysis, architectural mapping, and final editorial review were provided by the author. AI writing tools assisted with research, drafting, and structural refinement under human editorial control. All citations to OpenAI's document reference the publicly published text. All references to AOS patent filings are verifiable through the USPTO and published registries.
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
