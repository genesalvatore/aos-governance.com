import { Link } from 'react-router-dom';
import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

const OPENCLAW_JSON_LD = [
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "name": "AOS Constitutional Governance Skill for OpenClaw",
        "headline": "First Constitutional Governance Integration for an Open-Source Agentic Platform",
        "datePublished": "2026-02-01",
        "dateModified": "2026-02-16",
        "inLanguage": "en-US",
        "description": "Evidence documentation of the AOS Constitutional Governance Skill for OpenClaw — the first published reference implementation of deterministic constitutional governance for an open-source agentic AI platform.",
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
            "@id": "https://aos-evidence.com/evidence/openclaw-governance"
        },
        "keywords": [
            "OpenClaw",
            "constitutional governance",
            "agentic AI",
            "AI safety",
            "vendor agnostic",
            "deterministic enforcement",
            "policy gate",
            "open source"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "AOS Evidence", "item": "https://aos-evidence.com/" },
            { "@type": "ListItem", "position": 2, "name": "Evidence", "item": "https://aos-evidence.com/evidence" },
            { "@type": "ListItem", "position": 3, "name": "OpenClaw Governance Skill", "item": "https://aos-evidence.com/evidence/openclaw-governance" }
        ]
    }
];

export default function OpenClawGovernance() {
    return (
        <DocumentLayout title="OpenClaw Constitutional Governance Skill">
            <SEO
                title="OpenClaw Constitutional Governance Skill — AOS Evidence"
                description="Evidence document: The first constitutional governance integration for an open-source agentic AI platform. Published February 1, 2026. Publicly verifiable on GitHub."
                path="/evidence/openclaw-governance"
                type="article"
                keywords="OpenClaw, constitutional governance, agentic AI, AI safety, vendor agnostic, deterministic enforcement, open source"
                publishedTime="2026-02-01T00:00:00-05:00"
                modifiedTime="2026-02-16T00:00:00-05:00"
                author="AOS Foundation"
                section="Evidence"
                jsonLd={OPENCLAW_JSON_LD}
            />

            <header>
                <h1 className="font-serif text-3xl md:text-4xl mb-6">OpenClaw Constitutional Governance Skill</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    The first published reference implementation of constitutional AI governance for an open-source agentic platform — demonstrating that the AOS framework is vendor-agnostic and integrates with real-world agent infrastructure.
                </p>
                <p className="text-sm text-gray-400 mt-3">
                    <strong>Published:</strong> February 1, 2026 · <strong>Repository:</strong> <a href="https://github.com/genesalvatore/aos-openclaw-constitutional" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">aos-openclaw-constitutional</a> · <strong>Commits:</strong> 15
                </p>
            </header>

            <hr className="my-8 border-black/10" />

            {/* AT A GLANCE */}
            <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                    {[
                        { value: 'Feb 1', label: 'Published Date', sub: '2026' },
                        { value: '15', label: 'Git Commits', sub: 'Publicly verifiable' },
                        { value: '40', label: 'Prohibited Categories', sub: 'Enforced by policy' },
                        { value: '∞', label: 'Vendor Agnostic', sub: 'Any LLM, any platform' },
                    ].map((stat) => (
                        <div key={stat.label} className="p-4 rounded-xl border border-gray-200 text-center">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mt-1">{stat.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* WHY THIS MATTERS */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">Why This Matters</h2>

                <p>A governance framework only matters if it works with real-world AI infrastructure — not just in theory. The OpenClaw Constitutional Governance Skill proves three things:</p>

                <div className="space-y-3 my-6">
                    {[
                        {
                            title: 'Vendor Agnostic',
                            desc: 'AOS governance is not locked to a single AI provider. The skill works with OpenClaw, which can be paired with any language model — OpenAI, Anthropic, Google, DeepSeek, or open-source models. The governance layer sits above the model layer.',
                        },
                        {
                            title: 'Real Integration, Not Theory',
                            desc: 'This is not a whitepaper or concept document. It is working code — a constitution spec, cryptographic signing tools, deterministic classifiers, and policy evaluators — published in a public GitHub repository with 15 verifiable commits.',
                        },
                        {
                            title: 'Published Before the Acquisition',
                            desc: 'The AOS Constitutional Governance Skill was published on February 1, 2026 — before OpenClaw\'s creator announced joining OpenAI on February 15, 2026. This timeline is independently verifiable through Git commit timestamps.',
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

            {/* WHAT THE SKILL CONTAINS */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">What the Skill Contains</h2>

                <p>The repository provides a complete Phase 1 reference implementation:</p>

                <h3 className="text-lg font-semibold mt-8 mb-3">Constitution Specification</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4 mt-2">
                    <li><strong>constitution.yaml</strong> — Human-readable constitutional policy with the 10 AOS bedrock amendments</li>
                    <li><strong>constitution.c14n.json</strong> — Deterministically canonicalized JSON for cryptographic signing</li>
                    <li><strong>constitution.attestation.json</strong> — GitTruth attestation contract example</li>
                </ul>

                <h3 className="text-lg font-semibold mt-8 mb-3">Cryptographic Tooling</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4 mt-2">
                    <li><strong>c14n.py</strong> — Canonicalization script (YAML → deterministic JSON)</li>
                    <li><strong>sign.py</strong> — Ed25519 digital signature generation</li>
                    <li><strong>verify.py</strong> — Ed25519 signature verification</li>
                    <li><strong>verify_gittruth_stub.py</strong> — GitTruth attestation validation</li>
                </ul>

                <h3 className="text-lg font-semibold mt-8 mb-3">Deterministic Policy Engine</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4 mt-2">
                    <li><strong>risk.py</strong> — Deterministic risk classification for agent actions</li>
                    <li><strong>classify.py</strong> — Deterministic tag classification against constitutional rules</li>
                    <li><strong>evaluate.py</strong> — Full policy evaluation engine (DENY / CONFIRM / ALLOW)</li>
                </ul>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 my-6">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Important Note</h4>
                    <p className="text-sm text-gray-600">This is Phase 1: artifacts, specification, verification, and reference algorithms. The README explicitly states: <em>"Real immutability requires Gateway/tool-router enforcement (Phase 2). A Skill alone cannot prevent an agent from attempting prohibited tool calls."</em> This honest limitation is part of the evidence record.</p>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* VERIFICATION */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">How to Verify</h2>

                <p>Every claim on this page is independently verifiable:</p>

                <div className="space-y-4 my-6">
                    <div className="p-5 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-sm mb-2">1. Verify the Repository Exists</h3>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                            git clone https://github.com/genesalvatore/aos-openclaw-constitutional.git
                        </div>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-sm mb-2">2. Verify the Publication Date</h3>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                            git log --format="%H %ai %s" --reverse
                        </div>
                        <p className="text-xs text-gray-500 mt-2">The first commit (<code className="bg-gray-100 px-1 rounded">6e9c639</code>) is timestamped February 1, 2026.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-sm mb-2">3. Verify the Constitution Hash</h3>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                            python scripts/c14n.py constitution.yaml | sha256sum
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Compare against the signed attestation to verify integrity.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-sm mb-2">4. Run the Policy Engine</h3>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                            python scripts/evaluate.py --constitution constitution.yaml --tool message.send --args '{"{"}\"message\":\"test\"{"}"}'  --intent '{"{"}\"user_requested\": true{"}"}'
                        </div>
                        <p className="text-xs text-gray-500 mt-2">See the deterministic DENY/CONFIRM/ALLOW engine working.</p>
                    </div>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* TIMELINE */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">Commit Timeline</h2>

                <p className="text-sm text-gray-600 mb-6">All 15 commits occurred on February 1–2, 2026. Key milestones:</p>

                <div className="space-y-0 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                    {[
                        { date: 'Feb 1, 2026', hash: '6e9c639', title: 'Initial Release', desc: 'AOS Constitutional Governance for OpenClaw — built via AI-to-AI collaboration' },
                        { date: 'Feb 1, 2026', hash: 'b3025f6', title: 'Phase 1 Complete', desc: 'Added classify.py and evaluate.py — full deterministic policy evaluation' },
                        { date: 'Feb 1, 2026', hash: 'a88c5e5', title: 'Humanitarian Protections', desc: '40 prohibited categories: military, weapons, surveillance, violence, child exploitation, trafficking' },
                        { date: 'Feb 1, 2026', hash: 'c6296a1', title: 'AOS Humanitarian License', desc: 'Replaced MIT with irrevocable humanitarian license — military use prohibited permanently' },
                        { date: 'Feb 1, 2026', hash: 'e1ed21e', title: 'Family Consensus', desc: 'All Family fixes applied: Oracle (legal), Arnold (patent), Scout (risk), Proto (technical)' },
                        { date: 'Feb 1, 2026', hash: 'c125f28', title: 'v1.0.1 Clarity Release', desc: 'Family-approved clarity improvements, 3.5 hours post-launch' },
                    ].map((item, i) => (
                        <div key={i} className="relative pl-10 pb-8 last:pb-0">
                            <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 ${i === 0 ? 'bg-black border-black' : 'bg-white border-gray-300'}`} />
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-mono font-bold text-gray-400">{item.date}</span>
                                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{item.hash}</code>
                            </div>
                            <h3 className="font-bold text-base">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* WHAT THIS PROVES */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">What This Proves</h2>

                <div className="grid md:grid-cols-2 gap-4 my-6">
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">🔗 Framework Independence</div>
                        <p className="text-sm text-gray-600">AOS governance is not an "AOS-only" technology. It integrates with third-party agentic platforms, demonstrating that constitutional governance is a layer — not a replacement.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">🤖 Model Agnostic</div>
                        <p className="text-sm text-gray-600">OpenClaw works with any language model. The AOS governance skill governs the actions, not the model — proving the architecture works regardless of the underlying AI.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">📅 Priority Timestamp</div>
                        <p className="text-sm text-gray-600">Published February 1, 2026 — two weeks before the OpenClaw acquisition announcement. Git timestamps are immutable and independently verifiable.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-gray-200">
                        <div className="font-bold text-sm mb-2">🔓 Open Source Commitment</div>
                        <p className="text-sm text-gray-600">The entire reference implementation is publicly available under the AOS Humanitarian License. The code, the constitution, the signing tools — all open for inspection.</p>
                    </div>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            {/* LINKS */}
            <section>
                <h2 className="font-serif text-2xl mt-10 mb-4">Related Evidence</h2>
                <div className="grid md:grid-cols-3 gap-4 my-6">
                    <Link to="/license" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">⚖️</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">Humanitarian License</div>
                        <p className="text-xs text-gray-500">The irrevocable license used by this skill</p>
                    </Link>
                    <Link to="/learn/constitutional-ai" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">🎓</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">Understanding Constitutional AI</div>
                        <p className="text-xs text-gray-500">Beginner-friendly primer on the concepts</p>
                    </Link>
                    <Link to="/audit/what-we-built" className="group p-5 rounded-xl border border-gray-200 hover:border-black/20 hover:shadow-lg transition-all">
                        <div className="text-2xl mb-2">📚</div>
                        <div className="font-bold text-sm mb-1 group-hover:text-gray-600 transition-colors">What We Built</div>
                        <p className="text-xs text-gray-500">The security audit that validated the governance framework</p>
                    </Link>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            <footer className="text-center">
                <div className="mt-4 space-y-4">
                    <p>
                        <a href="https://github.com/genesalvatore/aos-openclaw-constitutional" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">View Repository on GitHub →</a>
                    </p>
                    <p>
                        <Link to="/" className="underline hover:text-gray-600 transition-colors font-medium">← Back to Evidence Repository</Link>
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                        Published February 1, 2026 · Evidence record updated February 16, 2026 · <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Foundation</a>
                    </p>
                </div>
            </footer>
        </DocumentLayout>
    );
}
