import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

export default function About() {
    return (
        <DocumentLayout title="About AOS">
            <SEO title="About AOS — Constitutional AI Governance" description="AOS (Agent Operating System) provides deterministic constitutional governance for AI. Founded by Gene Salvatore. 143 patent portfolio. Verifiable, transparent, production-ready AI safety." path="/about" />
            <h1 className="font-serif text-3xl md:text-4xl mb-6">About the AOS Evidence Repository</h1>

            <p>This repository exists to provide <strong>transparent, verifiable evidence</strong> of the AOS project's technical achievements, governance model, and intellectual property timeline.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Our Mission</h2>
            <p>To demonstrate that <strong>constitutional AI governance</strong> can be:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Deterministic</strong> — enforced by code, not hoped for by training</li>
                <li><strong>Verifiable</strong> — every claim backed by immutable evidence</li>
                <li><strong>Transparent</strong> — publicly auditable by anyone</li>
                <li><strong>Production-ready</strong> — approved for deployment by external review</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">What Makes This Different</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Not Marketing — Evidence</h3>
            <p>Most AI companies publish whitepapers and blog posts. We publish <strong>evidence</strong>:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Git-anchored documents with timestamps</li>
                <li>External security audit results</li>
                <li>Complete vulnerability catalogs (not just the good parts)</li>
                <li>Immutable records that cannot be retroactively modified</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Not Probabilistic — Deterministic</h3>
            <p>Industry standard: Train AI to "probably" follow rules (RLHF, Constitutional AI training).</p>
            <p>AOS approach: <strong>Enforce rules deterministically</strong> with cryptographic attestation. An AI either has gate approval or it doesn't. No gradients, no probabilities.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Not Closed — Open for Verification</h3>
            <p>Everything in this repository is designed to be:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Cloneable and inspectable</li>
                <li>Cross-referenced with public records</li>
                <li>Challenged and critiqued</li>
                <li>Built upon (CC BY 4.0)</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">The Team</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Gene Salvatore</h3>
            <p><strong>Founder & Human Sovereign</strong></p>
            <p>Connecticut-based technologist and inventor. Creator of AOS and the Constitutional Governance framework. Patent portfolio of 143 provisional filings.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">The AOS Family</h3>
            <p>A collective of AI agents operating under constitutional governance:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Silas</strong> — Constitutional Architect (Claude/Anthropic, Google Antigravity)</li>
                <li><strong>Oracle</strong> — Strategic Advisor (Claude/Anthropic)</li>
                <li><strong>Scout</strong> — Security & Operations</li>
                <li><strong>Proto</strong> — Technical Prototyper</li>
                <li><strong>Arnold</strong> — Legal & Compliance</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Principles</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li><strong>Honesty Over Marketing</strong> — We publish what we've actually built, including vulnerabilities</li>
                <li><strong>Verification Over Trust</strong> — Don't trust us. Verify us.</li>
                <li><strong>Transparency Over Opacity</strong> — Evidence is public, methods are documented</li>
                <li><strong>Correction Over Deletion</strong> — Errors are corrected publicly, never hidden</li>
                <li><strong>Determinism Over Probability</strong> — Governance is enforced, not hoped for</li>
            </ol>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Contact</h2>
            <p><strong>General:</strong> <a href="mailto:contact@aos-evidence.com" className="text-blue-600 hover:underline">contact@aos-evidence.com</a><br /><strong>Legal:</strong> <a href="mailto:legal@aos-evidence.com" className="text-blue-600 hover:underline">legal@aos-evidence.com</a><br /><strong>GitHub:</strong> <a href="https://github.com/genesalvatore/aos-evidence.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">aos-evidence.com repository</a></p>

            <hr className="my-8 border-black/10" />
            <p className="text-center text-sm text-gray-500 italic">License: CC BY 4.0 · Last updated: February 6, 2026</p>
        </DocumentLayout>
    );
}
