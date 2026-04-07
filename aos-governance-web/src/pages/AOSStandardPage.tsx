import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AOSStandardPage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-gray-100 min-h-[100vh] py-12 print:py-0 print:bg-white text-[#111111]">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { margin: 0; size: letter; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; }
                    .page-break { page-break-after: always; }
                    .print-header { display: none; }
                }
                .doc-page { position: relative; }
                .doc-footer { position: absolute; bottom: 0.75in; left: 1in; right: 1in; display: flex; justify-content: space-between; align-items: center; font-size: 0.6rem; color: #555; border-top: 1px solid #eaeaea; padding-top: 0.5in; }
            `}} />

            {/* Print & Navigation Header (Hidden in Print) */}
            <div className="max-w-[8.5in] mx-auto mb-6 px-4 flex items-center justify-between print-header">
                <Link to="/policy-response" className="text-sm font-medium text-gray-500 hover:text-black">
                    ← Back to Policy & Standards
                </Link>
                <button onClick={() => window.print()} className="px-5 py-2 bg-black text-white rounded-lg text-sm font-medium shadow hover:bg-gray-800 transition-colors flex items-center gap-2">
                    Print to PDF
                </button>
            </div>

            {/* Document Container */}
            <div className="max-w-[8.5in] mx-auto space-y-8 print:space-y-0">
                
                {/* ─── PAGE 1: COVER PAGE ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col page-break">
                    {/* Cover Image */}
                    <div className="w-full h-[45%] relative">
                        <img src="/standard-cover.png" alt="AOS Standard Cover" className="w-full h-full object-cover object-center border-b border-gray-100" />
                    </div>
                    
                    {/* Cover Content */}
                    <div className="flex-1 p-[1in] flex flex-col bg-white">
                        <div className="mt-4">
                            <h1 className="text-[3.25rem] font-bold leading-[1.05] tracking-tight text-[#111111]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                AOS Standard<br/>
                                1.0: A Governance<br/>
                                Architecture for the<br/>
                                Intelligence Age
                            </h1>
                            <p className="mt-16 text-[0.95rem] font-medium text-gray-600">
                                April 2026
                            </p>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-[1.5rem] font-bold tracking-tight text-[#111111]">
                                AOS Governance
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ─── PAGE 2: PREAMBLE & PROBLEM ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col p-[1in] page-break">
                    <div className="max-w-[5.5in] mx-auto text-[#222222] font-sans text-[0.85rem] leading-[1.65] space-y-6 flex-1">
                        <h2 className="text-[2rem] font-bold leading-tight text-black mb-8 tracking-tight font-sans">
                            Abstract & Preamble
                        </h2>
                        <p>
                            This document defines the AOS governance standard for autonomous AI systems. It specifies a five-layer architecture — deterministic policy enforcement, cryptographic audit infrastructure, kernel-level containment, constitutional governance, and frontier-domain scaling — that provides verifiable governance for AI agents operating in enterprise, physical, orbital, and mass-deployment environments. The standard is model-agnostic, operates outside the model's process space, and is supported by 101 provisional patent applications filed with the USPTO beginning January 10, 2026. It is published for evaluation, criticism, and adoption.
                        </p>
                        <p>
                            The deployment of autonomous AI agents into production environments — enterprise workflows, consumer applications, critical infrastructure, and physical systems — is accelerating faster than the governance infrastructure required to regulate them.
                        </p>
                        <p className="font-semibold text-black">
                            This is not a policy proposal. This is a technical standard.
                        </p>
                        <p>
                            The AOS project has spent the first quarter of 2026 building, filing, and publishing the architectural specifications for deterministic AI governance. This document describes what we built, why we built it, and how it works. It is supported by 101 provisional patent applications, a published constitutional governance framework, a humanitarian licensing model, and production infrastructure deployed across five governance sites.
                        </p>
                        <p>
                            The standard presented here is model-agnostic. It governs the execution environment, not the model. It works equally with GPT, Claude, Gemini, open-source models, or any future architecture. It cannot be captured by any single model provider because it operates at a layer no model provider controls.
                        </p>

                        <h3 className="text-[1.2rem] font-bold tracking-tight text-black pt-4 mb-2">Part I: The Problem</h3>
                        <p className="font-semibold text-black">1.1 The Enforcement Gap</p>
                        <p>
                            The AI industry has converged on a consensus that governance is necessary. Policy frameworks from OpenAI, Anthropic, Google DeepMind, and regulatory bodies worldwide describe governance outcomes — trust verification, model containment, accountability, incident reporting — without specifying where the enforcement layer resides relative to the model.
                        </p>
                        <p className="font-semibold text-black">
                            This is the central architectural question in AI governance: Who enforces the rules, and where does the enforcer live?
                        </p>
                        <p>Current approaches rely on mechanisms that reside within the model's own context. RLHF adjusts model behavior probabilistically through reward signals. Constitutional AI trains models to evaluate their own outputs against a set of principles. The enforcement mechanism and the system being enforced are the same process. System prompts and guardrails are instruction-level constraints that can be circumvented through prompt injection, context overflow, or adversarial input. Content filters are post-hoc output screening that operates after the action has been planned.</p>
                    </div>

                    <div className="doc-footer">
                        <div className="flex gap-4 items-center">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="font-semibold text-gray-500">AOS Standard 1.0</span>
                        </div>
                        <span>2</span>
                    </div>
                </div>

                {/* ─── PAGE 3: THE SCALE PROBLEM ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col p-[1in] page-break">
                    <div className="max-w-[5.5in] mx-auto text-[#222222] font-sans text-[0.85rem] leading-[1.65] space-y-6 flex-1">
                        <h2 className="text-[2rem] font-bold leading-tight text-black mb-8 tracking-tight font-sans">
                            Structural Vulnerability & Scale
                        </h2>
                        
                        <p>
                            All of these approaches share a structural vulnerability: <strong>the security mechanism resides in the same address space as the system being secured.</strong> When the mechanism is disclosed, bypassed, or overwhelmed, the security guarantee disappears.
                        </p>
                        <p>
                            This is not a theoretical concern. On March 31, 2026, over 500,000 lines of Anthropic's internal agent infrastructure source code were exposed to the public internet through an agentic workflow that bypassed instruction-based containment boundaries. The disclosure revealed that the security architecture depended on the secrecy of its own implementation — a direct violation of Kerckhoffs's Principle (1883), which holds that a system should remain secure even if everything about it, except the key, is public knowledge.
                        </p>

                        <p className="font-semibold text-black mt-6">1.2 The Scale Problem</p>
                        <p>
                            The governance gap is compounding. As of April 2026, the industry faces an unprecedented scaling of risk vectors. Enterprise "Shadow AI" sees developers connecting raw LLM APIs to corporate networks through workflow automation tools without governance infrastructure between the agent and the execution environment. Every one of these connections represents an ungoverned action surface.
                        </p>
                        <p>
                            Embodied AI introduces autonomous systems into physical environments where the consequences of ungoverned actions are measured in property damage, injury, and death rather than token costs. Mass agent deployments are running hundreds of thousands of concurrent agent instances with emergent behavioral properties that no single-instance governance model can address.
                        </p>
                        <p>
                            Furthermore, Orbital compute infrastructure is being deployed in environments where physics-imposed communication latency (1.3 seconds Earth-Moon, 4-24 minutes Earth-Mars) eliminates the possibility of real-time human oversight.
                        </p>
                        <p>
                            Each of these domains amplifies the enforcement gap. The governance architecture required for a single chatbot conversation is categorically insufficient for an autonomous agent operating a robotic arm, routing financial transactions, or managing a satellite constellation.
                        </p>

                        <p className="font-semibold text-black mt-6">1.3 The Labor Transition</p>
                        <p>
                            AI automation will displace workers. This is not a debate — it is a mathematical certainty as agent capabilities increase. The question is whether the transition is managed or abandoned. Current discourse treats labor displacement as an externality — a cost to be absorbed by the workers themselves. No governance standard currently requires the entity deploying AI automation to fund, manage, or participate in the transition of the workers it displaces.
                        </p>
                    </div>

                    <div className="doc-footer">
                        <div className="flex gap-4 items-center">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="font-semibold text-gray-500">AOS Standard 1.0</span>
                        </div>
                        <span>3</span>
                    </div>
                </div>

                {/* ─── PAGE 4: THE ARCHITECTURE ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col p-[1in] page-break">
                    <div className="max-w-[5.5in] mx-auto text-[#222222] font-sans text-[0.85rem] leading-[1.65] space-y-6 flex-1">
                        <h2 className="text-[2rem] font-bold leading-tight text-black mb-8 tracking-tight font-sans">
                            Part II: The Architecture
                        </h2>
                        
                        <p>
                            The AOS standard addresses the enforcement gap through five architectural layers, each backed by specific provisional patent filings. The layers are designed to operate independently and compose into a unified governance stack.
                        </p>

                        <p className="font-semibold text-black mt-6">2.1 Layer 1: The Deterministic Policy Gate (DPG)</p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono">Patent basis: AOS-PATENT-015</p>
                        <p>
                            The Deterministic Policy Gate is the core enforcement mechanism of the AOS architecture. It operates as a mandatory intermediary between an AI agent's intent and its execution, evaluating every proposed action against a cryptographically signed policy manifest before permitting execution.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Process isolation:</strong> The DPG runs in a separate process space from the agent with elevated kernel privileges. The agent cannot observe, modify, or circumvent the gate.</li>
                            <li><strong>Deterministic evaluation:</strong> Policy checks produce binary pass/fail results. There is no probabilistic judgment, no "confidence score," and no negotiation. An action either conforms to the signed policy or it is rejected.</li>
                            <li><strong>Cryptographic signing:</strong> Policy manifests are signed by designated human operators. The DPG will not evaluate actions against unsigned or tampered policies.</li>
                            <li><strong>Model independence:</strong> The DPG does not interpret the model's reasoning. It evaluates the action the model proposes to take.</li>
                        </ul>
                        <p>
                            <strong>What this means in practice:</strong> An agent cannot bypass the DPG any more than a userspace process can bypass the operating system kernel. The separation is architectural, not behavioral.
                        </p>

                        <p className="font-semibold text-black mt-6">2.2 Layer 2: AOS Attest — Cryptographic Audit Infrastructure</p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono">Patent basis: AOS-PATENT-119, AOS-PATENT-120</p>
                        <p>
                            AOS Attest is a Merkle-tree authenticated audit trail providing tamper-evident cryptographic verification of all agent actions. Every action — permitted, denied, or modified by the DPG — is recorded with the following properties: Immutability, Physical separation, Near-miss preservation, and Cryptographic verification.
                        </p>
                    </div>

                    <div className="doc-footer">
                        <div className="flex gap-4 items-center">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="font-semibold text-gray-500">AOS Standard 1.0</span>
                        </div>
                        <span>4</span>
                    </div>
                </div>

                {/* ─── PAGE 5: CONTAINMENT & CONSTITUTION ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col p-[1in] page-break">
                    <div className="max-w-[5.5in] mx-auto text-[#222222] font-sans text-[0.85rem] leading-[1.65] space-y-6 flex-1">
                        <h2 className="text-[2rem] font-bold leading-tight text-black mb-8 tracking-tight font-sans">
                            Containment & Governance
                        </h2>
                        
                        <p className="font-semibold text-black mt-6">2.3 Layer 3: Containment — Atomic Rollback and Behavioral Baselining</p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono">Patent basis: AOS-PATENT-144, AOS-PATENT-145</p>
                        <p>
                            Containment addresses the question: what happens when an agent acts outside its authorized boundaries?
                        </p>
                        <p>
                            <strong>Atomic Transactional Rollback:</strong> Kernel-level filesystem isolation using Copy-on-Write (CoW) filesystems (OverlayFS) provides atomic agent state rollback. The agent operates within an ephemeral filesystem layer. If the DPG detects a policy violation, the entire execution environment is rolled back to a byte-identical pre-execution baseline.
                        </p>
                        <p>
                            <strong>Syscall Trajectory Baselining:</strong> eBPF-based syscall monitoring establishes behavioral baselines during supervised operation. The system learns the normative pattern of an agent's system calls — file access patterns, network requests, memory allocation behavior — and detects deviations independent of the model's semantic outputs.
                        </p>

                        <p className="font-semibold text-black mt-8">2.4 Layer 4: Constitutional Governance</p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono">Published at: aos-constitution.com | Patent: AOS-PATENT-015</p>
                        <p>
                            The AOS Constitutional Framework defines the governance structure within which the DPG operates. It establishes the <strong>Human Operator Signature Protocol</strong>, a documented <strong>Constitutional Amendment Process</strong>, <strong>Hierarchical Delegation</strong>, and <strong>40-Category Humanitarian Restrictions</strong>. No policy can be autonomously generated without human authorization.
                        </p>

                        <p className="font-semibold text-black mt-8">2.5 Layer 5: Frontier Governance</p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2 font-mono">Patent basis: AOS-PATENT-141, AOS-PATENT-142, AOS-PATENT-143</p>
                        <p>
                            The standard extends governance to frontier deployment domains: Orbital and Interplanetary AI (latency-constrained environments), Mass Agent Governance (population scale synchronization), and Embodied AI Governance (physical world consequences).
                        </p>
                    </div>

                    <div className="doc-footer">
                        <div className="flex gap-4 items-center">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="font-semibold text-gray-500">AOS Standard 1.0</span>
                        </div>
                        <span>5</span>
                    </div>
                </div>

                {/* ─── PAGE 6: THE HUMAN COMPACT & COMPLETION ─── */}
                <div className="doc-page bg-white shadow-xl print:shadow-none w-[8.5in] h-[11in] mx-auto relative overflow-hidden flex flex-col p-[1in]">
                    <div className="max-w-[5.5in] mx-auto text-[#222222] font-sans text-[0.85rem] leading-[1.65] space-y-6 flex-1">
                        <h2 className="text-[2rem] font-bold leading-tight text-black mb-8 tracking-tight font-sans">
                            Part III: The Human Compact
                        </h2>
                        
                        <p className="font-semibold text-black mt-6">3.1 Labor Transition Protocol</p>
                        <p>
                            The AOS standard includes a binding requirement: any entity deploying AI automation under the AOS governance framework must provision for the transition of displaced workers. This is not advisory guidance — it is an enforceable condition of the license. The Protocol requires impact assessments, funded retraining programs, and no-displacement guarantees.
                        </p>
                        <p className="font-medium text-black">
                            AI automation that destroys livelihoods without providing a path forward is not innovation. It is extraction.
                        </p>

                        <h3 className="text-[1.5rem] font-bold tracking-tight text-black pt-8 mb-4">Part IV: The Standard in Practice</h3>
                        <p>
                            The AOS governance standard has been implemented across multiple deployment targets: AOS Constitutional Governance for OpenClaw, AOS WordPress Plugin, and AOS Gate.
                        </p>
                        <p>
                            It is maintained across five production sites: aos-governance.com, aos-constitution.com, aos-patents.com, aos-evidence.com, and aos-foundation.com. The architecture has been validated through cross-platform deployments running Anthropic (Claude), Google (Gemini), and OpenAI (GPT) models simultaneously.
                        </p>

                        <h3 className="text-[1.5rem] font-bold tracking-tight text-black pt-8 mb-4">Part VI: Invitation</h3>
                        <p>
                            The challenges described in this document are urgent. The governance gap is widening as agent capabilities increase. No single entity — including AOS — can close this gap alone.
                        </p>
                        <p>
                            This standard is published for evaluation, criticism, and adoption. Enterprises can evaluate the DPG architecture. Model providers can evaluate the model-agnostic enforcement pattern. Regulators can evaluate the standard as a reference architecture.
                        </p>
                        <p className="font-medium text-black mt-4">
                            The question is no longer whether AI governance is necessary. The question is whether the governance architecture will be built before the consequences of its absence become irreversible.
                        </p>
                    </div>

                    <div className="doc-footer border-t-0 p-0 mb-6 text-gray-400">
                        © 2026 Gene Salvatore. All rights reserved. • Contact: gene@aos-governance.com
                    </div>

                    <div className="doc-footer">
                        <div className="flex gap-4 items-center">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 100 100" fill="currentColor">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="font-semibold text-gray-500">AOS Standard 1.0</span>
                        </div>
                        <span>6</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
