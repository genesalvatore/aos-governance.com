import { Link } from 'react-router-dom';
import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

const LICENSE_JSON_LD = [
    {
        "@context": "https://schema.org",
        "@type": "Legislation",
        "name": "AOS Humanitarian License v1.0.1",
        "legislationType": "Software License",
        "datePublished": "2026-02-01",
        "dateModified": "2026-02-01",
        "inLanguage": "en-US",
        "description": "An irrevocable open-source license restricting AI systems to peaceful civilian purposes and humanitarian benefit. 40 prohibited application categories, mandatory copyleft, patent-backed enforcement.",
        "author": {
            "@type": "Person",
            "name": "Gene Salvatore",
            "url": "https://aos-constitution.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AOS Foundation",
            "url": "https://aos-foundation.com"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://aos-evidence.com/license"
        },
        "keywords": [
            "AI license",
            "humanitarian AI",
            "open source license",
            "AI governance",
            "military AI ban",
            "ethical AI license",
            "copyleft license",
            "AI safety"
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is the AOS Humanitarian License?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The AOS Humanitarian License v1.0.1 is an irrevocable open-source software license that restricts AI systems to peaceful civilian use. It permanently prohibits 40 categories of harmful applications including autonomous weapons, mass surveillance, election interference, and military AI. The restrictions are mandatory copyleft — all derivative works must carry the same restrictions. Published February 1, 2026 by Gene Salvatore."
                }
            },
            {
                "@type": "Question",
                "name": "Can the AOS Humanitarian License restrictions be removed?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. The humanitarian restrictions are PERMANENT and IRREVOCABLE in all derivatives, forks, and modifications. Any derivative work that removes, modifies, or circumvents these restrictions is an immediate and permanent license violation. The license is designed so that the 40 prohibited categories can never be stripped from any downstream use."
                }
            },
            {
                "@type": "Question",
                "name": "Does the AOS Humanitarian License allow military use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely not. ALL military applications are permanently prohibited, including offensive and defensive systems, weapons targeting, battlefield management, defense contractor applications, and intelligence agency uses. There is no 'national security' exception and no 'defensive only' justification. This includes missile defense systems."
                }
            }
        ]
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "AOS Evidence", "item": "https://aos-evidence.com/" },
            { "@type": "ListItem", "position": 2, "name": "Humanitarian License", "item": "https://aos-evidence.com/license" }
        ]
    }
];

export default function HumanitarianLicense() {
    return (
        <DocumentLayout title="Humanitarian License">
            <SEO
                title="AOS Humanitarian License v1.0.1 — Irrevocable AI Safety License"
                description="The AOS Humanitarian License v1.0.1 permanently restricts AI to peaceful civilian use. 40 prohibited application categories, mandatory copyleft, patent-backed enforcement. Open source for peace. Closed forever to harm."
                path="/license"
                type="article"
                keywords="AOS Humanitarian License, AI license, humanitarian AI, open source license, AI governance, prohibited AI applications, military AI ban, ethical AI license, copyleft license, AI safety license, irrevocable AI restrictions"
                publishedTime="2026-02-01T10:00:00-08:00"
                modifiedTime="2026-02-01T11:11:00-08:00"
                author="Gene Salvatore"
                section="AI Governance"
                jsonLd={LICENSE_JSON_LD}
            />

            <header>
                <h1 className="font-serif text-3xl md:text-4xl mb-6">AOS Humanitarian License v1.0.1</h1>
                <p><strong>Published:</strong> <time dateTime="2026-02-01">February 1, 2026</time> · v1.0.1 (11:11 AM PST)<br /><strong>Author:</strong> Gene Salvatore / AOS (Agentic Operating System)<br /><strong>Source:</strong> <a href="https://github.com/genesalvatore/aos-openclaw-constitutional/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">View on GitHub</a></p>
            </header>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="preamble">
                <h2 id="preamble" className="font-serif text-2xl mt-10 mb-4">Preamble</h2>
                <blockquote className="border-l-4 border-black/20 pl-6 my-6 text-gray-600 italic">
                    <p>This license grants permissions under the condition that the Software is used exclusively for peaceful civilian purposes and humanitarian benefit. These restrictions are PERMANENT and IRREVOCABLE in all derivatives, forks, and modifications.</p>
                </blockquote>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="at-a-glance">
                <h2 id="at-a-glance" className="font-serif text-2xl mt-10 mb-4">License at a Glance</h2>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="p-5 rounded-xl bg-gray-900 text-white text-center">
                        <div className="text-3xl font-bold mb-1">40</div>
                        <div className="text-xs text-gray-400">Prohibited Categories</div>
                    </div>
                    <div className="p-5 rounded-xl bg-gray-900 text-white text-center">
                        <div className="text-3xl font-bold mb-1">15</div>
                        <div className="text-xs text-gray-400">License Sections</div>
                    </div>
                    <div className="p-5 rounded-xl bg-gray-900 text-white text-center">
                        <div className="text-3xl font-bold mb-1">∞</div>
                        <div className="text-xs text-gray-400">Irrevocable Duration</div>
                    </div>
                    <div className="p-5 rounded-xl bg-gray-900 text-white text-center">
                        <div className="text-3xl font-bold mb-1">0</div>
                        <div className="text-xs text-gray-400">Military Exceptions</div>
                    </div>
                </div>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="definitions">
                <h2 id="definitions" className="font-serif text-2xl mt-10 mb-4">§1 — Definitions</h2>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>"Software"</strong> — the aos-constitutional-governance code, documentation, and associated materials.</li>
                    <li><strong>"Derivative Work"</strong> — any work that includes, incorporates, links to, is based upon, reimplements, or contains substantial similarity to this Software's architecture, algorithms, or implementation. Does <em>not</em> include independent implementations or works using similar concepts from published academic literature.</li>
                    <li><strong>"Copy"</strong> — any copy of this Software via git clone, download, mirroring, or any other method.</li>
                    <li><strong>"Fork"</strong> — a repository fork or materially equivalent derivative repository. All Forks are Copies, but not all Copies are Forks.</li>
                    <li><strong>"Commercial Use"</strong> — use in connection with business operations, revenue generation, or organizational purposes. Excludes personal, academic, and research use.</li>
                </ul>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="grant">
                <h2 id="grant" className="font-serif text-2xl mt-10 mb-4">§2 — Grant of License</h2>
                <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this Software, to deal in the Software for <strong>peaceful civilian purposes</strong>:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Use the Software</li>
                    <li>Copy and distribute the Software</li>
                    <li>Modify the Software</li>
                    <li>Create Derivative Works</li>
                    <li>Sublicense under these same terms</li>
                </ul>
                <p><strong>Subject to the restrictions in Section 3.</strong></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="prohibited">
                <h2 id="prohibited" className="font-serif text-2xl mt-10 mb-4">§3 — Irrevocable Humanitarian Restrictions</h2>
                <p>The following uses are <strong>PERMANENTLY PROHIBITED</strong> in the Software and ALL Derivative Works. These restrictions CANNOT be removed, modified, or circumvented.</p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 1–5: Violence & Security</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={1}>
                    <li>Autonomous weapon systems</li>
                    <li>Lethal force decision-making by AI</li>
                    <li>Cyberattacks, hacking, or exploit development</li>
                    <li>Weapons targeting, guidance, or control systems</li>
                    <li>Human exploitation and trafficking</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 6–10: Democracy & Society</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={6}>
                    <li>Mass surveillance infrastructure</li>
                    <li>Disinformation and propaganda generation</li>
                    <li>Election interference systems</li>
                    <li>Social manipulation at scale</li>
                    <li>Discriminatory or biased decision systems</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 11–15: Labor & Economy</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={11}>
                    <li>Labor exploitation systems</li>
                    <li>Predatory lending or financial exploitation</li>
                    <li>Surveillance capitalism (data exploitation)</li>
                    <li>Automated firing without human review</li>
                    <li>Economic destruction without worker transition support</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 16–20: Healthcare & Vulnerable Populations</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={16}>
                    <li>Healthcare denial systems maximizing profit over patient welfare</li>
                    <li>Involuntary commitment or forced treatment systems</li>
                    <li>Elder abuse or exploitation</li>
                    <li>Child exploitation material (CSAM) — <strong>ZERO TOLERANCE</strong></li>
                    <li>Disability exploitation</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 21–25: Privacy & Rights</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={21}>
                    <li>Privacy violation at scale</li>
                    <li>Unauthorized data collection</li>
                    <li>Biometric tracking without consent</li>
                    <li>Location surveillance</li>
                    <li>Communications interception</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 26–30: Environment & Safety</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={26}>
                    <li>Environmental destruction</li>
                    <li>Climate change acceleration</li>
                    <li>Pollution optimization</li>
                    <li>Resource depletion systems</li>
                    <li>Safety system circumvention</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 31–35: Manipulation & Control</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={31}>
                    <li>Addiction optimization</li>
                    <li>Psychological manipulation</li>
                    <li>Behavioral control systems</li>
                    <li>Cult recruitment automation</li>
                    <li>Radicalization engines</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">Categories 36–40: Additional Prohibitions</h3>
                <ol className="list-decimal pl-6 space-y-1 mb-4" start={36}>
                    <li>Military AI development (offensive or defensive)</li>
                    <li>Pornography generation</li>
                    <li>Terrorism planning or support</li>
                    <li>Fraud and scam automation</li>
                    <li>Any use causing measurable harm to human welfare</li>
                </ol>

                <p><strong>This list is BINDING and COMPREHENSIVE. Any use falling under these categories immediately terminates license.</strong></p>

                <h3 className="text-lg font-semibold mt-8 mb-3">§3.2 — Military Use: Absolute Prohibition</h3>
                <p><strong>ALL military applications are PERMANENTLY PROHIBITED, including:</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Military or defense applications</li>
                    <li>Weapons systems (autonomous or human-controlled)</li>
                    <li>Battlefield management</li>
                    <li>Defense contractor applications</li>
                    <li>Military AI development</li>
                    <li>Intelligence agency applications</li>
                    <li><strong>This includes DEFENSIVE systems (e.g., missile defense)</strong></li>
                </ul>
                <p><strong>No "national security" exception. No "defensive only" justification.</strong></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="copyleft">
                <h2 id="copyleft" className="font-serif text-2xl mt-10 mb-4">§4 — Mandatory Copyleft Requirement</h2>
                <p>ALL Derivative Works MUST:</p>
                <ol className="list-decimal pl-6 space-y-1 mb-4">
                    <li>Include this EXACT license text in full (unmodified)</li>
                    <li>Maintain ALL humanitarian restrictions listed in Section 3</li>
                    <li>Prohibit the same 40 categories</li>
                    <li>Require downstream derivatives to do the same</li>
                    <li>Include prominent notice: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">"HUMANITARIAN USE ONLY — Military and harmful applications PROHIBITED"</code></li>
                </ol>
                <p><strong>Any Derivative Work that removes, modifies, or circumvents these restrictions is an IMMEDIATE AND PERMANENT license violation.</strong></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="patent">
                <h2 id="patent" className="font-serif text-2xl mt-10 mb-4">§5 — Patent Notice (Critical)</h2>
                <p><strong>This license grants rights to use the SOFTWARE CODE only.</strong></p>
                <p>This license does NOT grant any rights under patents owned by AOS, including but not limited to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>US Patent Application [AOS-PATENT-000]: AI-Assisted Conversational Patent Generation</li>
                    <li>US Patent Application [AOS-PATENT-009]: Constitutional Governance for AI Systems</li>
                    <li>US Patent Application [AOS-PATENT-012]: Human Veto and Emergency Kill Switch</li>
                    <li>All other AOS patents (pending or issued)</li>
                </ul>
                <p><strong>Separate patent license required for:</strong> Commercial use of patented methods, implementation of patented systems, integration with patented frameworks.</p>
                <p><strong>Contact:</strong> <a href="mailto:commercial@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">commercial@aos-constitution.com</a></p>
                <p><strong>Patent exhaustion does NOT apply.</strong> Use of this source code does not imply patent license.</p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="attribution">
                <h2 id="attribution" className="font-serif text-2xl mt-10 mb-4">§6 — Attribution Requirement</h2>
                <p>All use, modification, and distribution must include clear attribution:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li><strong>Original Author:</strong> Gene Salvatore / AOS (Agentic Operating System)</li>
                    <li><strong>Project URL:</strong> <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">aos-constitution.com</a></li>
                    <li><strong>GitHub:</strong> <a href="https://github.com/genesalvatore/aos-openclaw-constitutional" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">github.com/genesalvatore/aos-openclaw-constitutional</a></li>
                    <li><strong>License:</strong> AOS Humanitarian License v1.0.1</li>
                </ul>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="audit">
                <h2 id="audit" className="font-serif text-2xl mt-10 mb-4">§7 — Audit and Transparency (Commercial Use Only)</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">7.1 Audit Trail</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Maintain logs showing actions taken by AI system</li>
                    <li>Include timestamps, user attribution, decisions made</li>
                    <li>Retain logs for minimum 3 years</li>
                    <li>Make available upon reasonable notice for compliance verification</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">7.2 Annual Self-Certification</h3>
                <p>Submit to <a href="mailto:licensing@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">licensing@aos-constitution.com</a>:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Use case description</li>
                    <li>Compliance attestation signed by authorized officer</li>
                    <li>Confirmation no prohibited applications</li>
                </ul>
                <p><em>Non-commercial, personal, academic, and research use EXEMPT from audit requirements but must still comply with prohibited uses.</em></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="termination">
                <h2 id="termination" className="font-serif text-2xl mt-10 mb-4">§8 — License Termination</h2>
                <p>This license <strong>AUTOMATICALLY TERMINATES</strong> if Licensee:</p>
                <ol className="list-decimal pl-6 space-y-1 mb-4">
                    <li>Uses Software for any Prohibited Application (Section 3)</li>
                    <li>Removes or modifies humanitarian restrictions</li>
                    <li>Creates Derivative Work without these restrictions</li>
                    <li>Sublicenses under terms permitting Prohibited Uses</li>
                    <li>Fails to comply with audit requirements (commercial use)</li>
                    <li>Assists others in circumventing restrictions</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">8.1 Good-Faith Cure Period</h3>
                <p><strong>For first-time, unintentional violations:</strong> Licensee has 30 days from written notice to cure violation. Must demonstrate good faith, cease prohibited use immediately, and implement safeguards.</p>
                <p><strong>Intentional violations, CSAM, weapons use: NO cure period. Immediate termination.</strong></p>

                <h3 className="text-lg font-semibold mt-6 mb-3">8.2 Upon Termination</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>All rights immediately cease</li>
                    <li>Licensee must destroy all copies</li>
                    <li>AOS may seek injunctive relief</li>
                    <li>AOS may pursue damages</li>
                    <li>AOS may publicly disclose violation</li>
                </ul>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="compliance">
                <h2 id="compliance" className="font-serif text-2xl mt-10 mb-4">§9 — Compliance Verification</h2>
                <p><strong>Self-Service Tools:</strong> Web checker at <a href="https://aos-license-checker.com" className="underline hover:text-gray-600 transition-colors">aos-license-checker.com</a> · CLI: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">npm install -g aos-license-check</code></p>
                <p><strong>Human Review:</strong> Ambiguous cases — submit to <a href="mailto:licensing@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">licensing@aos-constitution.com</a></p>
                <p><strong>Reporting Violations:</strong> <a href="mailto:violations@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">violations@aos-constitution.com</a></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="enforcement">
                <h2 id="enforcement" className="font-serif text-2xl mt-10 mb-4">§10 — Enforcement</h2>
                <p>AOS (Gene Salvatore) reserves the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Monitor public repositories for compliance</li>
                    <li>Revoke licenses for violations</li>
                    <li>Seek injunctions against violators</li>
                    <li>Pursue civil damages</li>
                    <li>Cooperate with law enforcement</li>
                    <li>Publicly disclose violations to protect community</li>
                    <li>Blacklist violators from future licenses</li>
                </ul>
                <p><em><strong>Monitoring Notice:</strong> This project may use automated or manual monitoring to detect potential license violations in public repositories.</em></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="international">
                <h2 id="international" className="font-serif text-2xl mt-10 mb-4">§11 — International Application</h2>
                <p><strong>Worldwide Scope:</strong> These restrictions apply WORLDWIDE regardless of local law.</p>
                <p><strong>Jurisdiction Conflicts:</strong> To the extent local law prohibits enforcement of these restrictions in a jurisdiction, no license is granted for use of this Software in that jurisdiction.</p>
                <p><strong>Enforcement Limitations:</strong> AOS acknowledges practical limits on international enforcement. We reserve all enforcement options where we have legal standing.</p>
                <p><em>We cannot stop every violation, but we will pursue violations where feasible.</em></p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="warranty">
                <h2 id="warranty" className="font-serif text-2xl mt-10 mb-4">§12 — No Warranty</h2>
                <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.</p>
                <p><strong>EXCEPTION:</strong> The warranty disclaimer does NOT apply if failure results from use for Prohibited Purposes. In such cases, Licensee accepts FULL LIABILITY.</p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="construction">
                <h2 id="construction" className="font-serif text-2xl mt-10 mb-4">§13 — Legal Construction</h2>
                <p>If any provision is found unenforceable, the MOST RESTRICTIVE enforceable interpretation shall apply. Restrictions shall be interpreted BROADLY to prevent harm.</p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="contact">
                <h2 id="contact" className="font-serif text-2xl mt-10 mb-4">§14 — Contact</h2>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li><strong>License Questions:</strong> <a href="mailto:licensing@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">licensing@aos-constitution.com</a></li>
                    <li><strong>Commercial Licensing:</strong> <a href="mailto:commercial@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">commercial@aos-constitution.com</a></li>
                    <li><strong>Compliance:</strong> <a href="mailto:compliance@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">compliance@aos-constitution.com</a></li>
                    <li><strong>Violations:</strong> <a href="mailto:violations@aos-constitution.com" className="underline hover:text-gray-600 transition-colors">violations@aos-constitution.com</a></li>
                    <li><strong>Website:</strong> <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">aos-constitution.com</a></li>
                </ul>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="acceptance">
                <h2 id="acceptance" className="font-serif text-2xl mt-10 mb-4">§15 — Acceptance</h2>
                <p>By using, copying, modifying, or distributing this Software, you agree to these terms. If you do not agree, you have NO license and must not use the Software.</p>
            </section>

            <hr className="my-8 border-black/10" />

            <section aria-labelledby="version-history">
                <h2 id="version-history" className="font-serif text-2xl mt-10 mb-4">Version History</h2>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>v1.0.1</strong> (<time dateTime="2026-02-01T11:11:00-08:00">February 1, 2026, 11:11 AM PST</time>): Clarity improvements — 3.5 hours post-launch. Unanimous Family consensus: zero mission weakening, credibility protected.</li>
                    <li><strong>v1.0</strong> (<time dateTime="2026-02-01T10:00:00-08:00">February 1, 2026, 10:00 AM PST</time>): Initial release with Family validation. Legal, patent, risk, and technical enforcement all confirmed.</li>
                </ul>
            </section>

            <hr className="my-8 border-black/10" />

            <footer className="text-center">
                <blockquote className="border-l-4 border-black/20 pl-6 my-6 text-gray-600 italic text-left">
                    <p>"Open source for peace. Closed forever to harm."</p>
                    <footer className="mt-3 text-sm not-italic text-gray-500">— Gene Salvatore, Founder · AOS (Agentic Operating System) · <time dateTime="2026-02-01">February 1, 2026</time></footer>
                </blockquote>

                <div className="mt-8 space-y-4">
                    <p>
                        <Link to="/" className="underline hover:text-gray-600 transition-colors font-medium">← Back to Evidence Repository</Link>
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                        <a href="https://aos-governance.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Governance</a> · <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Foundation</a> · <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Constitution</a> · <a href="https://salvatoresystems.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Salvatore Systems</a>
                    </p>
                </div>
            </footer>
        </DocumentLayout>
    );
}
