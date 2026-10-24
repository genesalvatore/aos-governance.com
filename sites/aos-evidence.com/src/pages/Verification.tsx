import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

export default function Verification() {
    return (
        <DocumentLayout title="Verification Guide">
            <SEO title="How to Verify AI Governance Evidence" description="Step-by-step guide to independently verify AOS constitutional AI governance claims. Git-based cryptographic verification, timeline auditing, and falsifiability testing." path="/verification" />
            <h1 className="font-serif text-3xl md:text-4xl mb-6">How to Verify This Evidence</h1>

            <p>This page explains <strong>how to independently verify</strong> every claim made in the AOS Evidence Repository. We designed this repository to be <strong>trustless</strong> — you don't need to trust us, you can verify everything yourself.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Quick Start: 5 Minutes</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li><strong>Clone the repo:</strong> <code>git clone https://github.com/genesalvatore/aos-evidence.com</code></li>
                <li><strong>Check timestamps:</strong> <code>git log --format="%H %ai %s" -20</code></li>
                <li><strong>Verify commit integrity:</strong> <code>git fsck --full</code></li>
                <li><strong>Read the evidence:</strong> Browse the documents in your local copy</li>
            </ol>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">What You Can Verify</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">1. Timeline Claims</h3>
            <p><strong>What we claim:</strong> Key innovations were documented before industry announcements.</p>
            <p><strong>How to verify:</strong></p>
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm mb-6"><code>{`# See all commits with timestamps
git log --format="%H %ai %s"

# Verify a specific commit date
git show --format="%H%nAuthor Date: %ai%nCommit Date: %ci" <commit-hash>

# Check for any rebase or force-push (these would be visible)
git reflog`}</code></pre>

            <h3 className="text-lg font-semibold mt-6 mb-3">2. Document Integrity</h3>
            <p><strong>What we claim:</strong> Documents have not been modified after initial publication.</p>
            <p><strong>How to verify:</strong></p>
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm mb-6"><code>{`# Show when a file was first committed
git log --follow --diff-filter=A -- <filename>

# Show all changes to a file
git log --follow -p -- <filename>

# Verify file hasn't changed since initial commit
git diff <first-commit>..<latest-commit> -- <filename>`}</code></pre>

            <h3 className="text-lg font-semibold mt-6 mb-3">3. Cross-Reference External Sources</h3>
            <p><strong>What to check:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Industry announcements</strong> — Compare our commit dates to public announcements</li>
                <li><strong>Patent filings</strong> — Verify our provisional patent dates (filed January 10, 2026)</li>
                <li><strong>GitHub API</strong> — Use GitHub's API to independently verify push timestamps</li>
                <li><strong>Web archives</strong> — Check Wayback Machine for our public pages</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">4. Git Integrity Verification</h3>
            <p><strong>Git provides built-in integrity checks:</strong></p>
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm mb-6"><code>{`# Full integrity check
git fsck --full --strict

# Verify object hashes
git verify-pack -v .git/objects/pack/*.idx

# Check for unsigned commits (we sign with GPG)
git log --show-signature`}</code></pre>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">What We Cannot Fake</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li><strong>Git commit timestamps</strong> — While author dates can be set manually, GitHub's push timestamps are server-side and cannot be manipulated</li>
                <li><strong>GitHub push events</strong> — The GitHub Events API records when pushes happen, independently of commit dates</li>
                <li><strong>Commit hash chains</strong> — Each commit hash includes the parent hash, creating a tamper-evident chain</li>
                <li><strong>External references</strong> — Industry announcements, news articles, and third-party timestamps cannot be retroactively modified</li>
            </ol>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Key Evidence Anchors</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Canonical Anchor</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-black/5 mb-4">
                <p className="font-mono text-sm"><strong>Tag:</strong> evidence-2026-02-06</p>
                <p className="font-mono text-sm"><strong>Commit:</strong> 9f4b0d9</p>
                <p className="text-sm text-gray-600 mt-2">This is the first complete evidence package. All documents present at this commit represent the baseline public record.</p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">ChatGPT Audit Evidence</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-black/5 mb-4">
                <p className="font-mono text-sm"><strong>Initial:</strong> 8c685ee</p>
                <p className="font-mono text-sm"><strong>Correction:</strong> aaffd3c</p>
                <p className="font-mono text-sm"><strong>Path:</strong> EVIDENCE/chatgpt_security_audit_feb_5_2026/</p>
                <p className="text-sm text-gray-600 mt-2">12 documents, 9,323 insertions — the complete record of the world's first AI-to-AI security audit of constitutional governance.</p>
            </div>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Reporting Issues</h2>
            <p><strong>If you find inconsistencies, please report:</strong></p>
            <p><strong>Email:</strong> <a href="mailto:contact@aos-evidence.com" className="text-blue-600 hover:underline">contact@aos-evidence.com</a><br /><strong>GitHub Issues:</strong> <a href="https://github.com/genesalvatore/aos-evidence.com/issues" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Open an issue</a><br /><strong>Public disclosure:</strong> Encouraged</p>

            <p className="mt-4"><strong>We commit to:</strong></p>
            <ol className="list-decimal pl-6 space-y-1 mb-4">
                <li>Acknowledge all valid critiques</li>
                <li>Correct errors publicly</li>
                <li>Update documents with corrections noted</li>
                <li>Never delete evidence (only append corrections)</li>
            </ol>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Verification Checklist</h2>
            <ul className="space-y-2 mb-4">
                {[
                    'Clone repository locally',
                    'Check Git commit timestamps',
                    'Verify timeline consistency across docs',
                    'Cross-reference industry announcements',
                    'Review technical claim plausibility',
                    'Check for Git history manipulation',
                    'Test reproducibility (when code available)',
                    'Search for external confirmations/denials',
                    'Compare claimed dates to public records',
                    'Archive for future reference',
                ].map(item => (
                    <li key={item} className="flex items-center gap-3">
                        <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                        <span className="text-sm">{item}</span>
                    </li>
                ))}
            </ul>
            <p className="text-sm text-gray-500"><strong>Time required:</strong> 1–2 hours for thorough verification</p>

            <hr className="my-8 border-black/10" />
            <p className="text-center font-semibold">Remember: We designed this repository to BE verifiable.<br />If you can't verify our claims, we failed our mission.</p>
        </DocumentLayout>
    );
}
