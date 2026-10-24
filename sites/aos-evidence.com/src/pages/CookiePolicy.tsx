import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

export default function CookiePolicy() {
    return (
        <DocumentLayout title="Cookie Policy">
            <SEO title="Cookie Policy" description="Cookie policy for AOS Evidence Repository. Minimal first-party cookies, self-hosted Matomo analytics, no third-party tracking." path="/cookie-policy" />
            <h1 className="font-serif text-3xl md:text-4xl mb-6">Cookie Policy</h1>

            <p><strong>Effective Date:</strong> February 6, 2026<br /><strong>Last Updated:</strong> February 6, 2026</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Cookies We Use</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">1. Essential Cookies (Always Active)</h3>
            <p>These cookies are necessary for the site to function. <strong>You cannot opt out.</strong></p>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left p-3 border border-black/10 font-semibold">Cookie Name</th>
                            <th className="text-left p-3 border border-black/10 font-semibold">Purpose</th>
                            <th className="text-left p-3 border border-black/10 font-semibold">Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 border border-black/10"><code>aos_evidence_consent</code></td>
                            <td className="p-3 border border-black/10">Stores your cookie preference</td>
                            <td className="p-3 border border-black/10">365 days</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">2. Analytics Cookies (Optional)</h3>
            <p>These cookies help us understand how visitors use our site. <strong>You can opt out.</strong></p>
            <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left p-3 border border-black/10 font-semibold">Cookie Name</th>
                            <th className="text-left p-3 border border-black/10 font-semibold">Purpose</th>
                            <th className="text-left p-3 border border-black/10 font-semibold">Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: '_pk_id', purpose: 'Matomo visitor ID', expires: '13 months' },
                            { name: '_pk_ses', purpose: 'Matomo session tracking', expires: '30 minutes' },
                            { name: '_pk_ref', purpose: 'Referrer attribution', expires: '6 months' },
                            { name: '_pk_cvar', purpose: 'Custom variables', expires: 'Session' },
                            { name: '_pk_hsr', purpose: 'Heartbeat session record', expires: 'Session' },
                        ].map(c => (
                            <tr key={c.name}>
                                <td className="p-3 border border-black/10"><code>{c.name}</code></td>
                                <td className="p-3 border border-black/10">{c.purpose}</td>
                                <td className="p-3 border border-black/10">{c.expires}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p><strong>Provider:</strong> Matomo Analytics (self-hosted at <code>analytics.git-cathedral.com</code>)</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">How to Manage Cookies</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Option 1: Cookie Banner</h3>
            <p>When you first visit, you'll see a cookie banner. Choose:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Accept</strong> — Enable analytics</li>
                <li><strong>Decline</strong> — Disable analytics</li>
                <li><strong>Customize</strong> — Choose specific categories</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Option 2: Browser Settings</h3>
            <p>Most browsers let you:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Block all cookies</li>
                <li>Delete existing cookies</li>
                <li>Allow cookies only from specific sites</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Third-Party Cookies</h2>
            <p>We <strong>DO NOT</strong> use third-party cookies from:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>❌ Google Analytics</li>
                <li>❌ Facebook Pixel</li>
                <li>❌ Advertising networks</li>
                <li>❌ Social media trackers</li>
            </ul>
            <p>All cookies are <strong>first-party</strong> (served from our domain or our self-hosted analytics).</p>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Legal Basis (GDPR)</h2>
            <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Consent</strong> (analytics cookies) — You opt in via the banner</li>
                <li><strong>Legitimate interest</strong> (essential cookies) — Required for site function</li>
            </ul>

            <hr className="my-8 border-black/10" />

            <h2 className="font-serif text-2xl mt-10 mb-4">Contact Us</h2>
            <p>Questions about cookies?</p>
            <p><strong>Email:</strong> <a href="mailto:privacy@aos-evidence.com" className="text-blue-600 hover:underline">privacy@aos-evidence.com</a><br /><strong>GitHub:</strong> <a href="https://github.com/genesalvatore/aos-evidence.com/issues" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Report an Issue</a></p>

            <hr className="my-8 border-black/10" />
            <p className="text-center text-sm text-gray-500 italic">This cookie policy demonstrates AOS's commitment to transparency.</p>
        </DocumentLayout>
    );
}
