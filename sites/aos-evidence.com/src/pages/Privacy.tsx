import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

export default function Privacy() {
    return (
        <DocumentLayout title="Privacy Policy">
            <SEO title="Privacy Policy" description="AOS Evidence Repository privacy policy. Self-hosted Matomo analytics, no third-party tracking, GDPR compliant. Privacy as a constitutional right." path="/privacy" />
            <h1 className="font-serif text-3xl md:text-4xl mb-6">Privacy Policy</h1>

            <p><strong>Effective Date:</strong> February 6, 2026<br /><strong>Last Updated:</strong> February 6, 2026</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Our Privacy Commitment</h2>
            <p>AOS is committed to <strong>privacy as a constitutional right</strong>. This evidence repository respects your privacy while providing transparent, verifiable documentation of our work.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Data We Collect</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Analytics (Optional)</h3>
            <p>We use <strong>Matomo Analytics</strong>, self-hosted on our infrastructure:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Page views and navigation patterns</li>
                <li>Approximate location (country/region level)</li>
                <li>Browser and device type</li>
                <li>Referrer information</li>
            </ul>
            <p><strong>Important:</strong></p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>✅ Self-hosted (data never leaves our servers)</li>
                <li>✅ You can opt out via cookie banner</li>
                <li>✅ We respect Do Not Track headers</li>
                <li>❌ No Google Analytics</li>
                <li>❌ No Facebook tracking</li>
                <li>❌ No advertising networks</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Server Logs</h3>
            <p>Standard web server logs may include:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>IP addresses (anonymized)</li>
                <li>Request URLs</li>
                <li>Timestamps</li>
                <li>User agent strings</li>
            </ul>
            <p>Logs are retained for <strong>30 days maximum</strong> and used only for security monitoring.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Data We Do NOT Collect</h2>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>❌ Personal identification information</li>
                <li>❌ Email addresses (unless you contact us)</li>
                <li>❌ Payment information</li>
                <li>❌ Location data (beyond country level)</li>
                <li>❌ Browsing history outside this site</li>
                <li>❌ Fingerprinting or cross-site tracking</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Access</strong> — Request what data we have about you</li>
                <li><strong>Deletion</strong> — Request removal of your data</li>
                <li><strong>Opt-out</strong> — Decline analytics tracking</li>
                <li><strong>Portability</strong> — Receive your data in standard format</li>
                <li><strong>Object</strong> — Object to certain processing</li>
            </ul>
            <p>To exercise these rights: <a href="mailto:privacy@aos-evidence.com" className="text-blue-600 hover:underline">privacy@aos-evidence.com</a></p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Third-Party Services</h2>
            <p>This site uses minimal third-party services:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Netlify</strong> — Hosting (see <a href="https://www.netlify.com/privacy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">their privacy policy</a>)</li>
                <li><strong>GitHub</strong> — Source code hosting</li>
                <li><strong>Google Fonts</strong> — Typography</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Security</h2>
            <p>We protect your data with:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>HTTPS encryption (TLS 1.3)</li>
                <li>Self-hosted analytics infrastructure</li>
                <li>Regular security audits</li>
                <li>Minimal data collection</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Contact</h2>
            <p><strong>Privacy questions:</strong> <a href="mailto:privacy@aos-evidence.com" className="text-blue-600 hover:underline">privacy@aos-evidence.com</a><br /><strong>General contact:</strong> <a href="mailto:contact@aos-evidence.com" className="text-blue-600 hover:underline">contact@aos-evidence.com</a></p>

            <hr className="my-8 border-black/10" />
            <p className="text-center text-sm text-gray-500 italic">This privacy policy demonstrates AOS's commitment to transparency and user protection.</p>
        </DocumentLayout>
    );
}
