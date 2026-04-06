import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── Policy Response Registry ───────────────────────────────────────────────
// Add new policy responses here. Newest first.
interface PolicyEntry {
    slug: string;
    date: string;
    respondingTo: string;
    respondingOrg: string;
    title: string;
    summary: string;
    tags: string[];
    patentsCited: number;
    badge?: string;
}

const POLICY_RESPONSES: PolicyEntry[] = [
    {
        slug: 'openai-industrial-policy-april-2026',
        date: 'April 6, 2026',
        respondingTo: 'Industrial Policy for the Intelligence Age',
        respondingOrg: 'OpenAI',
        title: 'AOS Policy Response — OpenAI\'s Industrial Policy for the Intelligence Age',
        summary: 'Formal alignment mapping of OpenAI\'s April 2026 governance framework to existing AOS architectural implementations, including the Deterministic Policy Gate, AOS Attest, and Constitutional Governance Framework. Covers trust verification, auditing infrastructure, model containment, incident reporting, and accountability.',
        tags: ['Trust Stack', 'Model Containment', 'Auditing', 'Accountability'],
        patentsCited: 12,
        badge: 'Latest',
    },
];

// ─── Policy Response Index Page ─────────────────────────────────────────────
export default function PolicyResponsePage() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors font-medium">
                        ← Back to Standard
                    </Link>
                    <div className="inline-block px-3 py-1 text-xs font-mono border border-black/20 rounded-full uppercase tracking-wider">
                        Policy Responses
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
                        Institutional<br />
                        <span className="italic text-gray-500">Engagement.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        Formal policy responses mapping industry governance proposals to existing AOS architectural implementations and patent portfolio. Each response documents the alignment between stated policy requirements and available technical infrastructure.
                    </p>
                </div>
            </section>

            {/* Response Count Bar */}
            <section className="border-y border-black/5 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                        {POLICY_RESPONSES.length} {POLICY_RESPONSES.length === 1 ? 'Response' : 'Responses'} Published
                    </span>
                    <span className="text-xs font-mono text-gray-400">Newest First</span>
                </div>
            </section>

            {/* Response List */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    {POLICY_RESPONSES.map((entry) => (
                        <Link
                            key={entry.slug}
                            to={`/policy-response/${entry.slug}`}
                            className="block group"
                        >
                            <article className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 bg-white p-6 md:p-8">
                                {/* Header Row */}
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="inline-block px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                        {entry.respondingOrg}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">{entry.date}</span>
                                    {entry.badge && (
                                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                            {entry.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-3 group-hover:text-gray-700 transition-colors">
                                    {entry.title}
                                </h2>

                                {/* Responding To */}
                                <div className="text-sm text-gray-500 mb-4">
                                    Responding to: <span className="italic">"{entry.respondingTo}"</span>
                                </div>

                                {/* Summary */}
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {entry.summary}
                                </p>

                                {/* Footer Row */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-2">
                                        {entry.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded bg-gray-100 text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono text-gray-400">
                                            {entry.patentsCited} patents cited
                                        </span>
                                        <span className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors flex items-center gap-1">
                                            Read Response <span className="transition-transform group-hover:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-50 border-t border-black/5">
                <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
                    <h2 className="font-serif text-3xl md:text-4xl">
                        The architecture exists.<br />
                        <span className="italic text-gray-500">The conversation is open.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto">
                        Policy frameworks describe governance requirements. AOS provides the architectural implementations. Both are necessary. Neither is sufficient alone.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-lg">
                            Get the Standard
                        </a>
                        <Link to="/" className="px-8 py-4 border border-black/20 text-black rounded-lg font-medium hover:bg-black/5 transition-colors text-lg">
                            Read the Manifesto
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
