import { Link } from 'react-router-dom';
import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

const PRIMER_JSON_LD = [
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "name": "Understanding Constitutional AI: A Beginner's Guide",
        "headline": "Understanding Constitutional AI: What It Is, Why It Matters, and How AOS Does It Differently",
        "datePublished": "2026-02-15",
        "dateModified": "2026-02-15",
        "inLanguage": "en-US",
        "description": "An accessible educational primer on constitutional AI governance. Learn the core concepts behind deterministic AI safety, threat models, and how AOS enforces rules with code instead of hoping they hold through training.",
        "author": {
            "@type": "Organization",
            "name": "AOS Foundation",
            "url": "https://aos-foundation.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AOS Evidence Repository",
            "url": "https://aos-evidence.com"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://aos-evidence.com/learn/constitutional-ai"
        },
        "proficiencyLevel": "Beginner",
        "keywords": [
            "constitutional AI",
            "AI governance",
            "AI safety",
            "deterministic enforcement",
            "policy gate",
            "RLHF",
            "jailbreaking",
            "AI alignment"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is constitutional AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Constitutional AI is a method of governing AI behavior by defining explicit rules (a 'constitution') that the AI must follow. Rather than relying solely on training an AI to be helpful and harmless, constitutional AI embeds enforceable constraints into the system architecture itself."
                }
            },
            {
                "@type": "Question",
                "name": "What is the difference between probabilistic and deterministic AI safety?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Probabilistic safety (used by most AI companies) relies on training techniques like RLHF to make AI 'usually' follow rules — but these can be bypassed through jailbreaking. Deterministic safety (the AOS approach) enforces rules through code, cryptography, and OS-level process isolation, making violations architecturally impossible rather than statistically unlikely."
                }
            },
            {
                "@type": "Question",
                "name": "What is a Constitutional Policy Gate?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A Constitutional Policy Gate is an enforcement mechanism that sits between an AI agent and the real world. Every action the AI wants to take — writing a file, making a network request, running a command — must pass through the gate. The gate checks the action against constitutional rules, creates a cryptographic attestation, and only then allows execution. If any check fails, the action is denied. The AI cannot bypass the gate because it physically does not have the ability to execute actions directly."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "AOS Evidence", "item": "https://aos-evidence.com/" },
            { "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://aos-evidence.com/learn" },
            { "@type": "ListItem", "position": 3, "name": "Understanding Constitutional AI", "item": "https://aos-evidence.com/learn/constitutional-ai" }
        ]
    }
];

export default function UnderstandingConstitutionalAI() {
    return (
        <DocumentLayout title="Understanding Constitutional AI">
            <SEO
                title="Understanding Constitutional AI — A Beginner's Guide"
                description="An accessible primer on constitutional AI governance. Learn the difference between probabilistic and deterministic AI safety, understand threat models, and discover how AOS enforces rules with code instead of hoping they hold through training."
                path="/learn/constitutional-ai"
                type="article"
                keywords="constitutional AI, AI governance, AI safety, deterministic enforcement, policy gate, RLHF, jailbreaking, AI alignment, AI ethics, beginner guide"
                publishedTime="2026-02-15T00:00:00-05:00"
                modifiedTime="2026-02-15T00:00:00-05:00"
                author="AOS Foundation"
                section="Educational Resources"
                jsonLd={PRIMER_JSON_LD}
            />

            <header>
                <h1 className="font-serif text-3xl md:text-4xl mb-6">Understanding Constitutional AI</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    A beginner-friendly guide to constitutional AI governance — what it is, why it matters, and how the AOS approach differs from the industry standard.
                </p>
                <p className="text-sm text-gray-400 mt-3">
                    <strong>Reading time:</strong> ~12 minutes · <strong>Level:</strong> Beginner · No technical background required
                </p>
            </header>

            <hr className="my-8 border-black/10" />

            {/* TABLE OF CONTENTS */}
            <nav aria-label="Table of contents" className="p-6 rounded-xl bg-gray-50 border border-gray-100 mb-10">
                <h2 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-4">In This Guide</h2>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                    <li><a href="#problem" className="underline hover:text-gray-600 transition-colors">The Problem: AI Without Guardrails</a></li>
                    <li><a href="#what-is" className="underline hover:text-gray-600 transition-colors">What Is Constitutional AI?</a></li>
                    <li><a href="#two-approaches" className="underline hover:text-gray-600 transition-colors">Two Approaches: Probabilistic vs. Deterministic</a></li>
                    <li><a href="#how-it-works" className="underline hover:text-gray-600 transition-colors">How AOS Constitutional Governance Works</a></li>
                    <li><a href="#threat-models" className="underline hover:text-gray-600 transition-colors">Threat Models: What Can Go Wrong</a></li>
                    <li><a href="#verification" className="underline hover:text-gray-600 transition-colors">Verification: Don't Trust, Verify</a></li>
                    <li><a href="#why-different" className="underline hover:text-gray-600 transition-colors">Why This Is Different</a></li>
                    <li><a href="#faq" className="underline hover:text-gray-600 transition-colors">Frequently Asked Questions</a></li>
                </ol>
            </nav>

            {/* 1. THE PROBLEM */}
            <section aria-labelledby="problem">
                <h2 id="problem" className="font-serif text-2xl mt-10 mb-4">1. The Problem: AI Without Guardrails</h2>

                <p>AI systems are becoming powerful enough to write code, make decisions, and take real-world actions. But there's a fundamental problem: <strong>most AI safety measures are hopes, not guarantees.</strong></p>

                <p className="mt-4">Consider this analogy:</p>

                <div className="grid md:grid-cols-2 gap-4 my-6">
                    <div className="p-5 rounded-xl border border-red-200 bg-red-50">
                        <div className="text-lg font-bold text-red-900 mb-2">🚨 The Industry Standard</div>
                        <p className="text-sm text-red-800">Like asking someone to promise they won't open a safe full of valuables. They <em>probably</em> won't — but a clever enough argument might change their mind.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-green-200 bg-green-50">
                        <div className="text-lg font-bold text-green-900 mb-2">✅ The AOS Approach</div>
                        <p className="text-sm text-green-800">Like changing the combination on the safe and only giving it to a separate security officer. No matter what anyone says, <em>only the officer can open it</em> — and only after verifying authorization.</p>
                    </div>
                </div>

                <p>When AI systems can browse the web, write files, send emails, and execute code, the difference between "probably safe" and "provably safe" isn't academic — it's critical.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Why This Matters Right Now</h3>
                <p>Autonomous AI agents — tools that can manage your email, browse the web, and execute tasks on your behalf — are growing rapidly. Open-source agentic platforms are being adopted by millions of users worldwide, paired with a variety of language models, and deployed across industries.</p>
                <p className="mt-2">Security researchers have publicly raised concerns about the governance gaps in these tools: users can customize agent behavior with few constraints, and there are limited mechanisms to prevent misuse at scale. The question of <em>who governs the agent</em> is becoming as important as the question of <em>how capable the agent is</em>.</p>
                <p className="mt-2">This is the problem constitutional AI governance was built to solve.</p>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 2. WHAT IS CONSTITUTIONAL AI? */}
            <section aria-labelledby="what-is">
                <h2 id="what-is" className="font-serif text-2xl mt-10 mb-4">2. What Is Constitutional AI?</h2>

                <p>Constitutional AI is a method of governing AI behavior by defining explicit rules — a "constitution" — that the AI must follow. Think of it like a country's constitution:</p>

                <ul className="list-disc pl-6 space-y-2 mb-4 mt-4">
                    <li><strong>It defines what is and isn't allowed</strong> — clear boundaries, not vague guidelines</li>
                    <li><strong>It applies equally to everyone</strong> — no special exceptions, no loopholes</li>
                    <li><strong>It is enforceable</strong> — violations have real consequences</li>
                    <li><strong>It is verifiable</strong> — anyone can check whether it's being followed</li>
                </ul>

                <p>In the context of AI, a constitution defines things like:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4 mt-4">
                    <li>Which actions the AI is allowed to take</li>
                    <li>What categories of use are permanently prohibited (weapons, surveillance, etc.)</li>
                    <li>When human approval is required</li>
                    <li>How every action must be logged and verified</li>
                    <li>What happens when a rule is violated</li>
                </ul>

                <blockquote className="border-l-4 border-black/20 pl-6 my-6 text-gray-600 italic">
                    <p>"The question isn't whether AI will be powerful enough to cause harm. It already is. The question is whether the safety mechanisms are strong enough to prevent it — and whether you can <em>prove</em> they are."</p>
                </blockquote>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 3. TWO APPROACHES */}
            <section aria-labelledby="two-approaches">
                <h2 id="two-approaches" className="font-serif text-2xl mt-10 mb-4">3. Two Approaches: Probabilistic vs. Deterministic</h2>

                <p>This is the most important distinction in AI safety today. Understanding it changes how you evaluate every AI product you use.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Probabilistic Safety (The Industry Standard)</h3>
                <p>Most major AI companies (OpenAI, Anthropic, Google) use <strong>probabilistic</strong> safety measures:</p>

                <ul className="list-disc pl-6 space-y-2 mb-4 mt-4">
                    <li><strong>RLHF (Reinforcement Learning from Human Feedback)</strong> — Train the AI to prefer safe responses by having humans rate outputs. The AI learns to avoid harmful content <em>most of the time</em>.</li>
                    <li><strong>System Prompts</strong> — Give the AI instructions like "You are a helpful assistant. Don't do harmful things." The AI follows these <em>usually</em>, but creative prompting can bypass them.</li>
                    <li><strong>Constitutional AI Training</strong> (Anthropic's term) — Train the AI using a set of principles to self-evaluate and improve. Better than raw RLHF, but still probabilistic — the AI <em>probably</em> follows the rules.</li>
                </ul>

                <p><strong>The fundamental weakness:</strong> All these methods work by adjusting probabilities. They make harmful outputs <em>less likely</em> but never <em>impossible</em>. That's why jailbreaking exists — and why it keeps working.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Deterministic Safety (The AOS Approach)</h3>
                <p>AOS takes a fundamentally different approach: <strong>don't try to train the AI not to do bad things — physically prevent it from doing them.</strong></p>

                <ul className="list-disc pl-6 space-y-2 mb-4 mt-4">
                    <li><strong>The AI cannot execute actions directly.</strong> Every action — every file write, every network request, every command — must pass through an external gate that the AI has no control over.</li>
                    <li><strong>Rules are enforced by code, not by training.</strong> The gate checks every action against the constitution. If a rule says "no military applications," the gate blocks military-related actions — not because the AI was trained to avoid them, but because the gate physically won't allow them.</li>
                    <li><strong>Every action is cryptographically signed and logged.</strong> You can prove what happened, when, and whether it was constitutional.</li>
                </ul>

                <div className="p-6 rounded-xl bg-gray-900 text-white my-6">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-4">Side-by-Side Comparison</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-2 pr-4 text-gray-400 font-mono text-xs">Property</th>
                                    <th className="text-left py-2 pr-4 text-gray-400 font-mono text-xs">Probabilistic</th>
                                    <th className="text-left py-2 text-gray-400 font-mono text-xs">Deterministic (AOS)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-white/10">
                                    <td className="py-3 pr-4 font-medium text-white">Can be jailbroken?</td>
                                    <td className="py-3 pr-4">Yes — creative prompts bypass training</td>
                                    <td className="py-3">No — gate enforcement is code, not training</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 pr-4 font-medium text-white">Safety guarantee</td>
                                    <td className="py-3 pr-4">"Probably safe" (statistical)</td>
                                    <td className="py-3">"Provably safe" (mathematical)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 pr-4 font-medium text-white">Audit trail</td>
                                    <td className="py-3 pr-4">Logs may exist, but aren't signed</td>
                                    <td className="py-3">Every action cryptographically signed, chained</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                    <td className="py-3 pr-4 font-medium text-white">Human control</td>
                                    <td className="py-3 pr-4">Hope the AI respects instructions</td>
                                    <td className="py-3">Kill switch + mandatory approval for sensitive ops</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-4 font-medium text-white">Independent verification</td>
                                    <td className="py-3 pr-4">Difficult — internal model behavior</td>
                                    <td className="py-3">Anyone can verify the journal and attestations</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 4. HOW IT WORKS */}
            <section aria-labelledby="how-it-works">
                <h2 id="how-it-works" className="font-serif text-2xl mt-10 mb-4">4. How AOS Constitutional Governance Works</h2>

                <p>The AOS system has four key components. Think of them as layers of a security system:</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Component 1: The Constitutional Policy Gate</h3>
                <p>The gate is the core enforcement mechanism. It sits between the AI agent and the real world — literally. The AI runs as one process; the gate runs as a separate, isolated process with different permissions. The AI can only communicate with the gate through a secure channel.</p>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 my-4 font-mono text-sm overflow-x-auto">
                    <div className="text-gray-400 mb-2">// Simplified flow:</div>
                    <div className="text-gray-800">
                        AI Agent → "I want to write a file" →<br />
                        &nbsp;&nbsp;Gate: ✅ Is this tool allowed? <br />
                        &nbsp;&nbsp;Gate: ✅ Is the file path within bounds?<br />
                        &nbsp;&nbsp;Gate: ✅ Is this a prohibited category? (checks 40 categories)<br />
                        &nbsp;&nbsp;Gate: ✅ Is the budget within limits?<br />
                        &nbsp;&nbsp;Gate: ✅ Does this need human approval?<br />
                        &nbsp;&nbsp;Gate: 🔐 Sign attestation → 📝 Log entry → ✅ Execute<br />
                        <br />
                        <span className="text-red-500">If ANY check fails → DENIED. No action occurs.</span>
                    </div>
                </div>

                <p><strong>Key design principle:</strong> The gate <em>fails closed</em>. If anything goes wrong — a timeout, an error, an unknown tool — the default is DENY. The AI has to prove it deserves permission, not the other way around.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Component 2: Cryptographic Attestation</h3>
                <p>Every action the AI takes produces a digitally signed receipt — an "attestation" — that proves:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4 mt-2">
                    <li>Exactly what action was requested</li>
                    <li>Which policy was used to evaluate it</li>
                    <li>Whether human approval was given (if required)</li>
                    <li>The exact timestamp</li>
                    <li>A unique nonce (preventing replay attacks)</li>
                </ul>
                <p>These attestations are like <strong>notarized receipts for every AI action</strong>. They can't be forged, and they can be independently verified by anyone.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Component 3: Immutable Journal</h3>
                <p>Every action is logged in an append-only journal — a file that can only have new entries <em>added</em> to it, never edited or deleted. This is enforced at the operating system level.</p>
                <p className="mt-2">Each journal entry contains a hash of the previous entry, creating a chain. If anyone tampers with any single entry, the chain breaks — and the tampering is immediately detectable.</p>
                <p className="mt-2">Think of it like a blockchain, but simpler and purpose-built for AI governance.</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Component 4: Human Veto & Emergency Kill Switch</h3>
                <p>Certain actions always require explicit human approval — the AI literally cannot proceed until a human reviews the request and clicks "Approve" through a separate, secure channel that the AI cannot access or manipulate.</p>
                <p className="mt-2">An emergency kill switch can halt all AI operations instantly. This is a <strong>patented mechanism</strong> designed to be un-circumventable.</p>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 5. THREAT MODELS */}
            <section aria-labelledby="threat-models">
                <h2 id="threat-models" className="font-serif text-2xl mt-10 mb-4">5. Threat Models: What Can Go Wrong</h2>

                <p>Good security isn't just about protection — it's about understanding <em>what</em> you're protecting against. Here are the key threat models that constitutional AI addresses:</p>

                <div className="space-y-4 my-6">
                    {[
                        {
                            threat: 'Jailbreaking',
                            desc: 'Creative prompting that tricks an AI into ignoring its safety training.',
                            prob: 'Effective against training-based safety — new jailbreaks are discovered regularly.',
                            det: 'Irrelevant. The AI can be "jailbroken" all it wants — the gate still blocks prohibited actions because enforcement is in separate code, not in the AI\'s training.'
                        },
                        {
                            threat: 'Prompt Injection',
                            desc: 'Malicious instructions hidden in data the AI processes (websites, documents, emails).',
                            prob: 'Major attack vector. A doctored webpage can instruct the AI to take harmful actions.',
                            det: 'The injected instructions can change what the AI wants to do, but the gate still enforces the constitution on every resulting action.'
                        },
                        {
                            threat: 'Privilege Escalation',
                            desc: 'The AI attempts to gain more permissions than it should have.',
                            prob: 'Possible if the AI has direct access to system resources.',
                            det: 'Impossible by architecture. The AI runs in a separate process with restricted permissions. It physically cannot access the gate\'s resources.'
                        },
                        {
                            threat: 'Log Tampering',
                            desc: 'Hiding evidence of what the AI actually did.',
                            prob: 'If logs aren\'t cryptographically protected, they can be modified.',
                            det: 'Append-only files (OS-enforced) + chained hashes + cryptographic signatures = tamper-evident.'
                        },
                        {
                            threat: 'Policy Circumvention',
                            desc: 'Modifying the rules to allow previously-prohibited actions.',
                            prob: 'If the AI can access its own configuration, it could potentially modify safety settings.',
                            det: 'Policy files are owned by the gate user. The AI user cannot modify them. Policy hash is verified at startup.'
                        },
                    ].map((item) => (
                        <div key={item.threat} className="p-5 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-base mb-2">{item.threat}</h3>
                            <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="text-sm">
                                    <span className="text-xs font-mono uppercase tracking-wider text-red-500 block mb-1">Probabilistic Response</span>
                                    <span className="text-gray-600">{item.prob}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-xs font-mono uppercase tracking-wider text-green-600 block mb-1">Deterministic Response</span>
                                    <span className="text-gray-600">{item.det}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p>During the <Link to="/audit/report" className="underline hover:text-gray-600 transition-colors">February 5 security audit</Link>, ChatGPT (OpenAI) tested the AOS system across five hostile-auditor passes and found <strong>36 vulnerabilities</strong>. All 36 were fixed and verified — resulting in the first production-approved constitutional AI governance system.</p>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 6. VERIFICATION */}
            <section aria-labelledby="verification">
                <h2 id="verification" className="font-serif text-2xl mt-10 mb-4">6. Verification: Don't Trust, Verify</h2>

                <p>A key principle of constitutional AI is that you should <strong>never have to take anyone's word for it</strong> — including ours. Everything should be independently verifiable.</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">What You Can Verify</h3>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">📋 The Constitution Itself</div>
                        <p className="text-sm text-gray-600">Read the <Link to="/license" className="underline hover:text-gray-600 transition-colors">Humanitarian License</Link> — all 40 prohibited categories are listed in plain language. No legalese trap doors.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">🔒 The Audit Trail</div>
                        <p className="text-sm text-gray-600">Every AI action produces cryptographically signed journal entries. You can verify the chain integrity yourself.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">📅 The Timeline</div>
                        <p className="text-sm text-gray-600">Git commit timestamps prove when things were built. These are immutable and independently verifiable.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">🔍 The Security Audit</div>
                        <p className="text-sm text-gray-600">The complete <Link to="/audit/threat-model" className="underline hover:text-gray-600 transition-colors">threat model</Link> is published — all 36 vulnerabilities, including how they were found and fixed.</p>
                    </div>
                </div>

                <p>This is what separates evidence from marketing. We publish our vulnerabilities, our fixes, and our verification methods — because we believe <strong>transparency creates trust, and trust creates adoption</strong>.</p>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 7. WHY DIFFERENT */}
            <section aria-labelledby="why-different">
                <h2 id="why-different" className="font-serif text-2xl mt-10 mb-4">7. Why This Is Different</h2>

                <p>Several things make the AOS approach unique in the AI governance landscape:</p>

                <div className="space-y-3 my-6">
                    {[
                        {
                            title: 'Code, Not Training',
                            desc: 'Rules are enforced by architecture. You don\'t need to trust that the AI "learned" to be good — the gate won\'t let it be bad.',
                        },
                        {
                            title: 'Open, Not Opaque',
                            desc: 'The constitution is public. The license is public. The audit results are public. The threat model is public. You can read everything.',
                        },
                        {
                            title: 'Irrevocable, Not Adjustable',
                            desc: 'The humanitarian restrictions in the AOS license cannot be removed — not by us, not by anyone who uses our code. The restrictions are permanent and copyleft.',
                        },
                        {
                            title: 'Externally Audited, Not Self-Assessed',
                            desc: 'ChatGPT (OpenAI) — a completely independent AI from a different company — performed the security audit. This isn\'t a self-assessment; it\'s external validation.',
                        },
                        {
                            title: 'Patent-Protected, Not Just Licensed',
                            desc: 'AOS has 143 provisional patent filings covering the governance framework. This means the enforcement mechanisms have IP protection, not just the code.',
                        },
                        {
                            title: 'Already Integrated with Agentic Platforms',
                            desc: 'On January 31, 2026, AOS published the first Constitutional Governance Skill for the OpenClaw agentic platform — publicly verifiable in the aos-openclaw-constitutional GitHub repository. This demonstrates that the governance framework works with real-world agent infrastructure, not just in theory.',
                        },
                    ].map((item) => (
                        <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-black/20 transition-colors">
                            <span className="text-green-600 font-bold mt-0.5 shrink-0">✓</span>
                            <div>
                                <strong className="text-sm">{item.title}</strong>
                                <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* 8. FAQ */}
            <section aria-labelledby="faq">
                <h2 id="faq" className="font-serif text-2xl mt-10 mb-4">8. Frequently Asked Questions</h2>

                <div className="space-y-6 my-6">
                    <div>
                        <h3 className="font-bold mb-2">Is this only for AOS-built AI systems?</h3>
                        <p className="text-gray-600 text-sm">The constitutional governance framework is designed to work with <em>any</em> AI system. AOS provides the governance layer — it doesn't replace your AI, it governs it. Think of it like adding a constitution to an existing government.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Doesn't this slow the AI down?</h3>
                        <p className="text-gray-600 text-sm">Gate evaluation adds milliseconds per action. For the vast majority of use cases, this overhead is imperceptible. And when the alternative is "the AI might do something catastrophic" — the tradeoff is clear.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">What about Anthropic's "Constitutional AI"? Isn't that the same thing?</h3>
                        <p className="text-gray-600 text-sm">Anthropic's Constitutional AI is a <em>training method</em> — it uses a constitution to guide RLHF training, making the AI more likely to follow rules. AOS's Constitutional Governance is an <em>enforcement mechanism</em> — it uses a gate to make rule violations architecturally impossible. The names are similar; the approaches are fundamentally different. Anthropic persuades; AOS enforces.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Can the gate itself be hacked?</h3>
                        <p className="text-gray-600 text-sm">If an attacker has root access to the operating system, they could theoretically compromise the gate. This is true of any software system. AOS mitigates this through process isolation, container sandboxing, and OS-level protections (Seccomp, AppArmor). The key point: the AI <em>agent itself</em> cannot hack the gate, because it runs as a different user with restricted permissions.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">What happens if the AI finds a way around the gate?</h3>
                        <p className="text-gray-600 text-sm">By architecture, the AI has no path to the real world except through the gate. It cannot write files, make network requests, or execute commands on its own — those capabilities only exist in the gate process. This is enforced by the operating system, not by the AI's training.</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Is this open source?</h3>
                        <p className="text-gray-600 text-sm">Yes — under the <Link to="/license" className="underline hover:text-gray-600 transition-colors">AOS Humanitarian License v1.0.1</Link>. The code is freely available for peaceful civilian use. Military and harmful applications are permanently and irrevocably prohibited.</p>
                    </div>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* CLOSING */}
            <section aria-labelledby="next-steps">
                <h2 id="next-steps" className="font-serif text-2xl mt-10 mb-4">Continue Learning</h2>
                <p>Now that you understand the core concepts, explore the evidence:</p>

                <div className="grid md:grid-cols-3 gap-4 my-6">
                    <Link to="/audit/what-we-built" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">📚</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">What We Built</div>
                        <p className="text-xs text-gray-500">The complete story of the February 5 security audit</p>
                    </Link>
                    <Link to="/license" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">⚖️</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">Humanitarian License</div>
                        <p className="text-xs text-gray-500">The full license with all 40 prohibited categories</p>
                    </Link>
                    <Link to="/verification" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">✅</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">Verification Guide</div>
                        <p className="text-xs text-gray-500">Step-by-step independent verification instructions</p>
                    </Link>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            <footer className="text-center">
                <blockquote className="border-l-4 border-black/20 pl-6 my-6 text-gray-600 italic text-left">
                    <p>"Governance is enforced, not hoped for."</p>
                    <footer className="mt-3 text-sm not-italic text-gray-500">— AOS Principle #5</footer>
                </blockquote>

                <div className="mt-8 space-y-4">
                    <p>
                        <Link to="/" className="underline hover:text-gray-600 transition-colors font-medium">← Back to Evidence Repository</Link>
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                        Published February 15, 2026 · <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Foundation</a> · <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Constitution</a>
                    </p>
                </div>
            </footer>
        </DocumentLayout>
    );
}
