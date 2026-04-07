import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AOSStandardPage() {
    useEffect(() => { 
        window.scrollTo(0, 0); 
        
        // --- SEO & GEO Metadata Injection ---
        document.title = "AOS Standard 1.0 | Deterministic AI Governance Architecture";
        
        const metaTags: Record<string, string> = {
            'description': 'The definitive architectural specification for deterministic AI governance. Defining the five-layer stack required for safe enterprise, physical, and orbital AI deployment.',
            'keywords': 'AOS Standard, AI Governance, Deterministic Policy Gate, AI Safety, Autonomous Agents, LLM Auditing, Constitutional AI',
            'og:title': 'AOS Standard 1.0 | AI Governance Architecture',
            'og:description': 'The definitive architectural specification for deterministic AI governance. Defining the five-layer stack required for safe enterprise, physical, and orbital AI deployment.',
            'og:image': 'https://aos-governance.com/standard-cover.png',
            'og:url': 'https://aos-governance.com/policy/aos-standard',
            'og:type': 'article',
            'twitter:card': 'summary_large_image',
        };

        const injectedTags: HTMLElement[] = [];
        
        Object.entries(metaTags).forEach(([name, content]) => {
            const isOg = name.startsWith('og:');
            const selector = isOg ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let tag = document.querySelector(selector) as HTMLMetaElement;
            if (!tag) {
                tag = document.createElement('meta');
                if (isOg) tag.setAttribute('property', name);
                else tag.setAttribute('name', name);
                document.head.appendChild(tag);
                injectedTags.push(tag);
            }
            tag.content = content;
        });

        // --- JSON-LD Schema defined for LLM / Search retrieval ---
        const schema = {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "AOS Standard 1.0: A Governance Architecture for the Intelligence Age",
            "author": {
                "@type": "Person",
                "name": "Gene Salvatore"
            },
            "publisher": {
                "@type": "Organization",
                "name": "AOS Governance",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://aos-governance.com/standard-cover.png"
                }
            },
            "datePublished": "2026-04-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "description": "The definitive architectural specification for deterministic AI governance. Defining the five-layer stack required for safe enterprise, physical, and orbital deployment.",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://aos-governance.com/policy/aos-standard"
            }
        };

        let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptTag);
            injectedTags.push(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(schema);
        
        return () => {
            // Document title reset or other tear-down if necessary
            injectedTags.forEach(tag => tag.remove());
        };
    }, []);

    return (
        <div className="bg-canvas min-h-screen text-fg-default font-sans print:bg-white print:text-black">
            
            {/* ─── PRINT CSS GLOBALS ─── */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { margin: 1in 1.25in 1.25in 1.25in; size: letter; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white !important; font-family: 'Inter', system-ui, sans-serif !important; }
                    nav, footer, header { display: none !important; }
                    .print-hidden-override { display: none !important; }
                    .page-break { page-break-after: always; }
                    
                    /* The persistent corporate footer */
                    .print-footer { 
                        position: fixed; bottom: -0.75in; left: 0; right: 0; 
                        display: flex; justify-content: space-between; align-items: center;
                        font-size: 8pt; color: #64748b; font-family: 'Inter', system-ui, sans-serif;
                    }
                    .page-number::after { content: counter(page); }
                }
            `}} />

            {/* ─── SCREEN-ONLY HERO ─── */}
            <section className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 print:hidden border-b border-black/5 bg-gray-50">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link to="/policy-response" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors font-medium">
                        ← Back to Policy & Standards
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="inline-block px-3 py-1 text-xs font-mono border border-black/20 rounded-full uppercase tracking-wider bg-black text-white">
                            Official Document
                        </div>
                        <span className="text-sm font-mono text-gray-400">Version 1.0</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight">
                        AOS Standard 1.0
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
                        A Governance Architecture for the Intelligence Age.
                    </p>
                </div>
            </section>

            {/* ─── PRINT-ONLY COVER PAGE ─── */}
            {/* Extremely precise cover sheet formatting resolving Chromuim scale-down overflow bugs */}
            <div className="hidden print:flex flex-col -mx-[1.25in] -mt-[1in] -mb-[1.25in] h-[11.1in] bg-[#f2f6fa] overflow-hidden flex-shrink-0 z-50 page-break">
                <div className="w-full h-[54%] relative flex-shrink-0">
                    <img src="/standard-cover.png" alt="AOS Standard Cover" className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 px-[1.25in] py-[0.8in] flex flex-col justify-start text-[#162a45] font-sans relative z-50">
                    <div className="mt-8">
                        <h1 className="text-[3.25rem] font-bold leading-[1.1] tracking-tight text-[#162a45]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            AOS Standard 1.0:<br/>
                            A Governance<br/>
                            Architecture for the<br/>
                            Intelligence Age
                        </h1>
                        <p className="mt-16 text-[1.1rem] font-semibold text-[#4e6b91]">
                            April 2026
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── DOCUMENT BODY (Used for both Print and Screen) ─── */}
            <article className="pt-10 pb-16 md:pt-16 md:pb-24 px-6 md:px-12 lg:px-24 print:py-0 print:px-0 bg-transparent relative z-10">
                <div className="max-w-4xl mx-auto print:max-w-none">
                    
                    {/* Fixed footer applied to all pages */}
                    <div className="hidden print:flex print-footer">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-[#162a45]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                                <polygon points="50,40 70,55 50,80" fill="currentColor" />
                                <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                            </svg>
                        </div>
                        <span className="font-semibold tracking-wide uppercase text-[7pt]">AOS Standard 1.0: A Governance Architecture for the Intelligence Age</span>
                        <span className="page-number font-semibold"></span>
                    </div>

                    <div className="max-w-none print:text-black print:leading-[1.8] text-gray-800 text-lg leading-relaxed [&_p]:mb-6 print:[&_p]:mb-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:mb-3 [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:mt-16 [&_h2]:mb-8 [&_h3]:font-bold [&_h3]:text-2xl [&_h3]:mt-12 [&_h3]:mb-6 print:[&_h2]:font-sans print:[&_h2]:font-bold print:[&_h2]:text-[1.8rem] print:[&_h3]:text-[1.2rem] print:[&_h3]:font-bold font-sans">
                        <h2 className="!mt-0">Abstract</h2>
                        <p>
                            This document defines the AOS governance standard for autonomous AI systems. It specifies a five-layer architecture — deterministic policy enforcement, cryptographic audit infrastructure, kernel-level containment, constitutional governance, and frontier-domain scaling — that provides verifiable governance for AI agents operating in enterprise, physical, orbital, and mass-deployment environments. The standard is model-agnostic, operates outside the model's process space, and is supported by 101 provisional patent applications filed with the USPTO beginning January 10, 2026. It is published for evaluation, criticism, and adoption.
                        </p>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        <h2>Preamble</h2>
                        <p>
                            The deployment of autonomous AI agents into production environments — enterprise workflows, consumer applications, critical infrastructure, and physical systems — is accelerating faster than the governance infrastructure required to regulate them.
                        </p>
                        <p className="font-serif text-xl border-l-4 border-black pl-4 my-6 italic text-gray-700 print:text-black print:font-sans print:font-bold print:not-italic print:border-none print:pl-0">
                            This is not a policy proposal. This is a technical standard.
                        </p>
                        <p>
                            The AOS project has spent the first quarter of 2026 building, filing, and publishing the architectural specifications for deterministic AI governance. This document describes what we built, why we built it, and how it works. It is supported by 101 provisional patent applications filed with the United States Patent and Trademark Office (USPTO) beginning January 10, 2026, a published constitutional governance framework, a humanitarian licensing model, and production infrastructure deployed across five governance sites.
                        </p>
                        <p>
                            The standard presented here is model-agnostic. It governs the execution environment, not the model. It works equally with GPT, Claude, Gemini, open-source models, or any future architecture. It cannot be captured by any single model provider because it operates at a layer no model provider controls.
                        </p>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        {/* Force page break for print safely before major sections */}
                        <div className="print:page-break-before-always">
                            <h2>Part I: The Problem</h2>
                            
                            <h3>1.1 The Enforcement Gap</h3>
                            <p>
                                The AI industry has converged on a consensus that governance is necessary. Policy frameworks from OpenAI, Anthropic, Google DeepMind, and regulatory bodies worldwide describe governance outcomes — trust verification, model containment, accountability, incident reporting — without specifying where the enforcement layer resides relative to the model.
                            </p>
                            <p>
                                This is the central architectural question in AI governance: <strong>Who enforces the rules, and where does the enforcer live?</strong>
                            </p>
                            <p>Current approaches rely on mechanisms that reside within the model's own context:</p>
                            <ul>
                                <li><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> — Adjusts model behavior probabilistically through reward signals. The model internalizes alignment preferences but retains the statistical capacity to deviate.</li>
                                <li><strong>Constitutional AI (Anthropic)</strong> — Trains models to evaluate their own outputs against a set of principles. The enforcement mechanism and the system being enforced are the same process.</li>
                                <li><strong>System prompts and guardrails</strong> — Instruction-level constraints that can be circumvented through prompt injection, context overflow, or adversarial input.</li>
                                <li><strong>Content filters</strong> — Post-hoc output screening that operates after the action has been planned and, in many architectures, partially executed.</li>
                            </ul>
                            <p>
                                All of these approaches share a structural vulnerability: <strong>the security mechanism resides in the same address space as the system being secured.</strong> When the mechanism is disclosed, bypassed, or overwhelmed, the security guarantee disappears.
                            </p>
                            <p>
                                This is not a theoretical concern. On March 31, 2026, over 500,000 lines of Anthropic's internal agent infrastructure source code were exposed to the public internet through an agentic workflow that bypassed instruction-based containment boundaries. The disclosure revealed that the security architecture depended on the secrecy of its own implementation — a direct violation of Kerckhoffs's Principle (1883), which holds that a system should remain secure even if everything about it, except the key, is public knowledge.
                            </p>
                        </div>

                        <h3 className="print:break-before-avoid">1.2 The Scale Problem</h3>
                        <p>The governance gap is compounding. As of April 2026:</p>
                        <ul>
                            <li><strong>Enterprise "Shadow AI"</strong> — Developers are connecting raw LLM APIs to corporate networks through workflow automation tools (N8N, Make, Zapier) without governance infrastructure between the agent and the execution environment. Every one of these connections represents an ungoverned action surface.</li>
                            <li><strong>Embodied AI</strong> — Autonomous systems (robots, vehicles, IoT devices) are entering physical environments where the consequences of ungoverned actions are measured in property damage, injury, and death — not token costs.</li>
                            <li><strong>Mass agent deployments</strong> — Production systems are running hundreds of thousands of concurrent agent instances with emergent behavioral properties that no single-instance governance model can address.</li>
                            <li><strong>Orbital compute</strong> — AI infrastructure is being deployed in orbital environments where physics-imposed communication latency (1.3 seconds Earth-Moon, 4-24 minutes Earth-Mars) eliminates the possibility of real-time human oversight.</li>
                        </ul>
                        <p>
                            Each of these domains amplifies the enforcement gap. The governance architecture required for a single chatbot conversation is categorically insufficient for an autonomous agent operating a robotic arm, routing financial transactions, or managing a satellite constellation.
                        </p>

                        <h3 className="print:break-before-avoid">1.3 The Labor Transition</h3>
                        <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                            Patent basis: AOS-PATENT-133 (USPTO 63/958,268, filed Jan 12, 2026)
                        </p>
                        <p>
                            AI automation will displace workers. This is not a debate — it is a mathematical certainty as agent capabilities increase. The question is whether the transition is managed or abandoned.
                        </p>
                        <p>
                            Current discourse treats labor displacement as an externality — a cost to be absorbed by the workers themselves, by retraining programs that do not yet exist, or by universal basic income proposals that have no legislative pathway. No governance standard currently requires the entity deploying AI automation to fund, manage, or participate in the transition of the workers it displaces.
                        </p>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        <div className="print:page-break-before-always">
                            <h2>Part II: The Architecture</h2>
                            <p>
                                The AOS standard addresses the enforcement gap through five architectural layers, each backed by specific provisional patent filings. The layers are designed to operate independently and compose into a unified governance stack.
                            </p>

                            <h3>2.1 Layer 1: The Deterministic Policy Gate (DPG)</h3>
                            <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                                Patent basis: AOS-PATENT-015 (USPTO 63/957,869, filed Jan 10, 2026; amended 63/969,499, Jan 27, 2026)
                            </p>
                            <p>
                                The Deterministic Policy Gate is the core enforcement mechanism of the AOS architecture. It operates as a mandatory intermediary between an AI agent's intent and its execution, evaluating every proposed action against a cryptographically signed policy manifest before permitting execution.
                            </p>
                            <ul>
                                <li><strong>Process isolation</strong> — The DPG runs in a separate process space from the agent with elevated kernel privileges. The agent cannot observe, modify, or circumvent the gate.</li>
                                <li><strong>Deterministic evaluation</strong> — Policy checks produce binary pass/fail results. There is no probabilistic judgment, no "confidence score," and no negotiation. An action either conforms to the signed policy or it is rejected.</li>
                                <li><strong>Cryptographic signing</strong> — Policy manifests are signed by designated human operators. The DPG will not evaluate actions against unsigned or tampered policies. This provides a forensic chain linking every enforcement decision to a human authorization.</li>
                                <li><strong>Model independence</strong> — The DPG does not interpret the model's reasoning. It evaluates the action the model proposes to take. This means the same DPG instance governs GPT, Claude, Gemini, or any other model identically.</li>
                            </ul>
                            <p>
                                <strong>What this means in practice:</strong> An agent cannot bypass the DPG any more than a userspace process can bypass the operating system kernel. The separation is architectural, not behavioral. It does not depend on the model being "aligned" — it works regardless of the model's internal state.
                            </p>
                        </div>

                        <h3 className="print:break-before-avoid">2.2 Layer 2: AOS Attest — Cryptographic Audit Infrastructure</h3>
                        <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                            Patent basis: AOS-PATENT-119 (USPTO 63/957,864, filed Jan 10, 2026), AOS-PATENT-120 (USPTO 63/957,884)
                        </p>
                        <p>
                            AOS Attest is a Merkle-tree authenticated audit trail providing tamper-evident cryptographic verification of all agent actions. Every action — permitted, denied, or modified by the DPG — is recorded with the following properties:
                        </p>
                        <ul>
                            <li><strong>Immutability</strong> — Records are stored in a content-addressable data structure where any modification invalidates the cryptographic hash chain. Retroactive manipulation is detectable.</li>
                            <li><strong>Physical separation</strong> — Telemetry pipelines are unmapped from the agent's memory space. The agent cannot access, modify, or delete its own audit trail.</li>
                            <li><strong>Near-miss preservation</strong> — Actions proposed by the agent but denied by the DPG (near-misses) are logged with the same forensic rigor as executed actions. This provides a complete record of both behavior and intent — the difference between what an agent did and what it tried to do.</li>
                            <li><strong>Cryptographic verification</strong> — Any stakeholder (regulator, auditor, operator) can independently verify the integrity of the audit trail using standard cryptographic methods without requiring access to the original system.</li>
                        </ul>

                        <h3 className="print:break-before-avoid">2.3 Layer 3: Containment — Atomic Rollback and Behavioral Baselining</h3>
                        <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                            Patent basis: AOS-PATENT-144 (USPTO 64/031,242), AOS-PATENT-145 (USPTO 64/031,252, filed Apr 6, 2026)
                        </p>
                        <p>
                            <strong>Atomic Transactional Rollback:</strong> Kernel-level filesystem isolation using Copy-on-Write (CoW) filesystems (OverlayFS) provides atomic agent state rollback. The agent operates within an ephemeral filesystem layer. If the DPG detects a policy violation, the entire execution environment is rolled back to a byte-identical pre-execution baseline.
                        </p>
                        <p>
                            <strong>Syscall Trajectory Baselining:</strong> eBPF-based syscall monitoring establishes behavioral baselines during supervised operation. The system learns the normative pattern of an agent's system calls — file access patterns, network requests, memory allocation behavior — and detects deviations that may indicate context poisoning, instruction injection, or alignment degradation. Detection operates entirely at the execution layer, independent of the model's semantic outputs.
                        </p>

                        <div className="print:page-break-before-always">
                            <h3 className="print:break-before-avoid">2.4 Layer 4: Constitutional Governance — The Human Authority Layer</h3>
                            <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                                Published at: aos-constitution.com | Patent basis: AOS-PATENT-015 | License: AOS Humanitarian License v1.0.1
                            </p>
                            <p>The AOS Constitutional Framework defines the governance structure within which the DPG operates. It establishes:</p>
                            <ul>
                                <li><strong>Human Operator Signature Protocol</strong> — Every policy manifest deployed to a DPG instance must be cryptographically signed by an authorized human operator. No policy can be autonomously generated, modified, or deployed without human authorization.</li>
                                <li><strong>Constitutional Amendment Process</strong> — Governance rules can evolve through a documented, versioned amendment process. The current AOS Constitution has been amended 84 times since its adoption, with each amendment recorded, timestamped, and preserved in the Merkle-tree audit trail.</li>
                                <li><strong>Hierarchical Delegation</strong> — Operators can delegate authority within defined boundaries, with deterministic escalation protocols for actions that exceed delegated authority.</li>
                                <li><strong>40-Category Humanitarian Restrictions</strong> — Permanently prohibited use cases including autonomous weapons, mass surveillance, labor exploitation, and 37 additional categories. These restrictions are irrevocable and propagate through all derivative works under the copyleft license.</li>
                            </ul>
                            
                            <h3 className="print:break-before-avoid">2.5 Layer 5: Frontier Governance — Scaling Beyond Single Instances</h3>
                            <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                                Patent basis: AOS-PATENT-141 (USPTO 63/993,715), AOS-PATENT-142 (USPTO 63/993,716), AOS-PATENT-143 (USPTO 63/993,718) — filed Mar 1, 2026
                            </p>
                            <p>The AOS standard extends governance to frontier deployment domains that current frameworks do not address:</p>
                            <ul>
                                <li><strong>Orbital and Interplanetary AI</strong> — Governance architecture adapted for latency-constrained environments where real-time human oversight is physically impossible. Includes radiation-hardened cryptographic verification and latency-adaptive enforcement models for Earth-orbit and Earth-Mars communication delays.</li>
                                <li><strong>Mass Agent Governance</strong> — Governance at population scale (millions of concurrent agents), with emergent behavior detection and containment. Single-instance governance models cannot address collective behavioral phenomena that emerge at scale.</li>
                                <li><strong>Embodied AI Governance</strong> — Governance for AI agents operating in physical environments (robots, autonomous vehicles, IoT infrastructure), where the consequences of ungoverned actions have physical, irreversible effects.</li>
                            </ul>
                        </div>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        <div className="print:page-break-before-always">
                            <h2>Part III: The Human Compact</h2>

                            <h3 className="print:break-before-avoid pt-2">3.1 Labor Transition Protocol</h3>
                            <p className="text-sm font-mono text-gray-500 bg-gray-50 p-3 rounded print:border print:border-gray-200 print:bg-transparent !mb-6">
                                Patent basis: AOS-PATENT-133 (USPTO 63/958,268, filed Jan 12, 2026)
                            </p>
                            <p>
                                The AOS standard includes a binding requirement: any entity deploying AI automation under the AOS governance framework must provision for the transition of displaced workers. This is not advisory guidance — it is an enforceable condition of the license.
                            </p>
                            <p>The Labor Transition Protocol requires:</p>
                            <ul>
                                <li><strong>Impact assessment prior to deployment</strong> — Quantification of the workforce segments affected by the automation.</li>
                                <li><strong>Funded retraining programs</strong> — The deploying entity funds transition programs proportional to the displacement impact.</li>
                                <li><strong>No-displacement guarantees during transition</strong> — Workers are not terminated during the transition period.</li>
                                <li><strong>Reporting and accountability</strong> — Compliance with the Labor Transition Protocol is subject to the same audit and verification requirements as all other governance provisions.</li>
                            </ul>
                            <p className="font-bold print:font-bold">
                                This is the AOS position: AI automation that destroys livelihoods without providing a path forward is not innovation. It is extraction.
                            </p>

                            <h3 className="print:break-before-avoid">3.2 The Revenue Redistribution Model</h3>
                            <p>
                                The AOS economic doctrine allocates 70% of commercial enterprise licensing revenue to humanitarian impact programs — environmental restoration, human dignity projects, and workforce transition support. The technology that generates market value must serve the species' survival.
                            </p>

                            <h3 className="print:break-before-avoid">3.3 Open Access with Mandatory Governance</h3>
                            <p>
                                The AOS Humanitarian License preserves open access to governance infrastructure. Academic, personal, and research use is free and unrestricted. Commercial use requires compliance with the governance provisions, audit requirements, and humanitarian restrictions.
                            </p>
                        </div>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        <div className="print:page-break-before-always">
                            <h2>Part IV: The Standard in Practice</h2>

                            <h3 className="print:break-before-avoid pt-2">4.1 Implementations</h3>
                            <p>The AOS governance standard has been implemented across multiple deployment targets:</p>
                            <ul>
                                <li><strong>AOS Constitutional Governance for OpenClaw</strong> — The first published implementation, integrating constitutional governance into the OpenClaw agentic relay framework.</li>
                                <li><strong>AOS WordPress Plugin</strong> — Governance integration for WordPress-based AI workflows.</li>
                                <li><strong>AOS Gate</strong> — The current flagship implementation: a transparent deterministic audit proxy that sits between AI workflow tools (N8N, Make, Zapier) and LLM API endpoints.</li>
                            </ul>

                            <h3 className="print:break-before-avoid">4.2 Production Governance Network</h3>
                            <p>The AOS governance standard is published and maintained across five production sites:</p>
                            <div className="overflow-x-auto print:overflow-visible">
                                <table className="min-w-full border border-gray-200">
                                    <tbody className="divide-y divide-gray-200">
                                        <tr><td className="p-3 font-medium whitespace-nowrap"><a href="https://aos-governance.com" className="text-blue-600 hover:underline">aos-governance.com</a></td><td className="p-3 text-gray-600">The standard — technical specifications and policy responses</td></tr>
                                        <tr><td className="p-3 font-medium whitespace-nowrap"><a href="https://aos-constitution.com" className="text-blue-600 hover:underline">aos-constitution.com</a></td><td className="p-3 text-gray-600">Constitutional governance framework and Humanitarian License</td></tr>
                                        <tr><td className="p-3 font-medium whitespace-nowrap"><a href="https://aos-patents.com" className="text-blue-600 hover:underline">aos-patents.com</a></td><td className="p-3 text-gray-600">Full patent portfolio registry with USPTO application numbers</td></tr>
                                        <tr><td className="p-3 font-medium whitespace-nowrap"><a href="https://aos-evidence.com" className="text-blue-600 hover:underline">aos-evidence.com</a></td><td className="p-3 text-gray-600">Evidence preservation and validation repository</td></tr>
                                        <tr><td className="p-3 font-medium whitespace-nowrap"><a href="https://aos-foundation.com" className="text-blue-600 hover:underline">aos-foundation.com</a></td><td className="p-3 text-gray-600">Humanitarian mission and organizational governance</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <hr className="my-10 print:my-8 border-gray-200" />

                        <div className="print:page-break-before-always">
                            <h2>Part V: Filing Record</h2>
                            <p>The AOS patent portfolio was filed in four waves, each responding to specific market developments:</p>
                            <div className="overflow-x-auto print:overflow-visible">
                                <table className="min-w-full border border-gray-200 text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200 print:bg-transparent">
                                        <tr>
                                            <th className="p-3 text-left font-bold text-gray-700">Wave</th>
                                            <th className="p-3 text-left font-bold text-gray-700">Date</th>
                                            <th className="p-3 text-left font-bold text-gray-700">Filings</th>
                                            <th className="p-3 text-left font-bold text-gray-700">Focus</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="p-3 whitespace-nowrap font-medium">Wave 1</td>
                                            <td className="p-3 whitespace-nowrap text-gray-600">Jan 10–12, 2026</td>
                                            <td className="p-3 text-gray-600">56 provisional applications</td>
                                            <td className="p-3 text-gray-600">Core governance, agent state persistence, constitutional framework.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 whitespace-nowrap font-medium">Wave 2</td>
                                            <td className="p-3 whitespace-nowrap text-gray-600">Jan 27–28, 2026</td>
                                            <td className="p-3 text-gray-600">Omnibus filings + amendments</td>
                                            <td className="p-3 text-gray-600">Deterministic enforcement hardening. Cryptographic execution boundary specifications.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 whitespace-nowrap font-medium">Wave 3</td>
                                            <td className="p-3 whitespace-nowrap text-gray-600">Mar 1, 2026</td>
                                            <td className="p-3 text-gray-600">3 provisional applications</td>
                                            <td className="p-3 text-gray-600">Frontier governance — orbital, embodied, and mass-agent systems.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 whitespace-nowrap font-medium">Wave 4</td>
                                            <td className="p-3 whitespace-nowrap text-gray-600">Apr 6, 2026</td>
                                            <td className="p-3 text-gray-600">2 provisional applications<br/><span className="text-xs text-gray-400">(USPTO 64/031,242; 64/031,252)</span></td>
                                            <td className="p-3 text-gray-600">OS-level determinism — kernel-level enforcement primitives.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 font-bold">Total: 101 provisional patent applications filed with the USPTO.</p>
                            
                            <hr className="my-10 print:my-8 border-gray-200" />

                            <h2>Part VI: Invitation</h2>
                            <p>
                                The challenges described in this document are urgent. The governance gap is widening as agent capabilities increase. No single entity — including AOS — can close this gap alone.
                            </p>
                            <p>This standard is published for evaluation, criticism, and adoption:</p>
                            <ul>
                                <li>Enterprises deploying AI agents into production environments can evaluate the DPG architecture as a governance layer for their workflows.</li>
                                <li>Model providers can evaluate the model-agnostic enforcement pattern as complementary infrastructure to their alignment efforts.</li>
                                <li>Regulators can evaluate the standard as a reference architecture for policy implementation.</li>
                                <li>Researchers can evaluate the architectural claims against the published specifications and patent filings.</li>
                            </ul>
                            <p>
                                The governance infrastructure exists. The patent filings are public. The constitutional framework is published. The implementations are available.
                            </p>
                            <p className="font-serif text-xl border-l-4 border-black pl-4 my-6 italic text-gray-700 print:text-black print:font-sans print:not-italic print:border-none print:pl-0 font-bold">
                                The question is no longer whether AI governance is necessary. The question is whether the governance architecture will be built before the consequences of its absence become irreversible.
                            </p>
                        </div>
                        
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <div className="bg-gray-50 p-6 rounded-xl print:bg-transparent print:p-0">
                                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">AI Disclosure</h4>
                                <p className="text-sm text-gray-600 print:text-black">
                                    This document was developed through a collaborative process. The original architecture, strategic analysis, patent filings, and editorial review were provided by the author. AI writing tools assisted with research, drafting, and structural refinement under human editorial control. All patent references are independently verifiable through the USPTO and published registries at aos-patents.com.
                                </p>
                            </div>

                            <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Contact</h4>
                                    <address className="not-italic text-gray-600 space-y-1 print:text-black">
                                        <strong>Gene Salvatore</strong>, Founder<br />
                                        Agentic Operating System (AOS)<br />
                                        <a href="mailto:gene@aos-governance.com" className="text-blue-600 hover:underline">gene@aos-governance.com</a><br />
                                        <a href="https://aos-governance.com" className="text-blue-600 hover:underline">aos-governance.com</a>
                                    </address>
                                </div>
                                <div className="text-right flex flex-col justify-end">
                                    <div className="text-sm text-gray-500 print:text-black">© 2026 Gene Salvatore. All rights reserved.</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        </div>
    );
}
