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
                        Policy & Standards
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
                        Institutional<br />
                        <span className="italic text-gray-500">Governance.</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        The definitive source for the AOS Application Layer Governance Standard and formal policy responses mapping industry frameworks to existing architectural implementations.
                    </p>
                </div>
            </section>

            {/* Main Layout Container */}
            <section className="pb-24 bg-white md:-mt-10 relative z-10 rounded-t-[3rem] pt-12 md:pt-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-16 items-start">
                        
                        {/* ─── LEFT COLUMN: Sticky Vertical Standard Card ─── */}
                        <aside className="lg:sticky lg:top-32 w-full">
                            <Link to="/policy/aos-standard" className="block group h-full">
                                <div className="border-2 border-black rounded-[2rem] p-8 md:p-10 bg-[#f5f2eb] hover:bg-[#eae6d9] transition-colors relative overflow-hidden flex flex-col h-full min-h-[500px]">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-black/10 transition-colors"></div>
                                    
                                    <div className="flex-1 flex flex-col items-start gap-4 relative z-10 w-full">
                                        <div className="inline-block px-3 py-1 text-[10px] font-mono border border-black rounded-full uppercase tracking-wider bg-black text-white shrink-0 self-start">
                                            OFFICIAL ARCHITECTURE
                                        </div>
                                        <h2 className="font-serif text-4xl md:text-5xl text-black leading-[1.05] mt-4">
                                            AOS Standard 1.0
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mt-4">
                                            The definitive architectural specification for deterministic AI governance. Defining the five-layer stack required for safe enterprise, physical, and orbital deployment.
                                        </p>
                                    </div>

                                    <div className="mt-8 flex justify-between items-end relative z-10 w-full pt-6 border-t border-black/10">
                                        <span className="text-xs font-mono uppercase tracking-wider text-black font-semibold">View Standard</span>
                                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-300 text-black group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-sm shrink-0">
                                            →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </aside>

                        {/* ─── RIGHT COLUMN: Responses ─── */}
                        <div className="space-y-16">
                            
                            {/* Latest Response Card */}
                            {POLICY_RESPONSES.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">Latest Active Response</h3>
                                        <div className="relative flex items-center justify-center w-3 h-3">
                                            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                                            <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full"></span>
                                        </div>
                                    </div>
                                    
                                    {(() => {
                                        const latest = POLICY_RESPONSES[0];
                                        return (
                                            <Link to={`/policy-response/${latest.slug}`} className="block group">
                                                <article className="border border-gray-200 rounded-[2rem] overflow-hidden hover:border-black/30 hover:shadow-2xl transition-all duration-300 bg-white p-8 md:p-10 relative">
                                                    {/* Header Row */}
                                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                                        <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                                            {latest.respondingOrg}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-mono">{latest.date}</span>
                                                        {latest.badge && (
                                                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                                {latest.badge}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4 group-hover:text-gray-700 transition-colors pr-8">
                                                        {latest.title}
                                                    </h2>

                                                    {/* Responding To */}
                                                    <div className="text-sm text-gray-500 mb-6">
                                                        Formal target: <span className="italic font-medium text-black">"{latest.respondingTo}"</span>
                                                    </div>

                                                    {/* Summary */}
                                                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                                        {latest.summary}
                                                    </p>

                                                    {/* Footer Row */}
                                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
                                                        <div className="flex flex-wrap gap-2">
                                                            {latest.tags.map(tag => (
                                                                <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded bg-gray-100 text-gray-500">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <span className="text-xs font-mono text-gray-400 hidden sm:inline-block">
                                                                {latest.patentsCited} patents cited
                                                            </span>
                                                            <span className="text-sm font-medium text-black group-hover:bg-black group-hover:text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2 border border-black/10">
                                                                Read Response <span>→</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </article>
                                            </Link>
                                        );
                                    })()}
                                </section>
                            )}

                            {/* Other Responses List */}
                            {POLICY_RESPONSES.length > 1 && (
                                <section className="space-y-6">
                                    <div className="border-b border-gray-100 pb-4 mb-6">
                                        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400">Response Archive ({POLICY_RESPONSES.length - 1})</h3>
                                    </div>
                                    <div className="space-y-6">
                                        {POLICY_RESPONSES.slice(1).map((entry) => (
                                            <Link key={entry.slug} to={`/policy-response/${entry.slug}`} className="block group">
                                                {/* Smaller list format for archive */}
                                                <article className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white p-6 relative">
                                                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                                                        <div className="sm:w-32 shrink-0 space-y-2">
                                                            <span className="block px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 text-center border border-blue-100">
                                                                {entry.respondingOrg}
                                                            </span>
                                                            <div className="text-[10px] text-gray-400 font-mono text-center">{entry.date}</div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-serif text-xl leading-tight mb-2 group-hover:text-gray-700 transition-colors">
                                                                {entry.title}
                                                            </h4>
                                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                                                                {entry.summary}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                {entry.tags.slice(0, 2).map((tag, i) => (
                                                                    <span key={i} className="text-[10px] font-mono uppercase text-gray-400">#{tag}</span>
                                                                ))}
                                                                {entry.tags.length > 2 && <span className="text-[10px] font-mono text-gray-400">+{entry.tags.length - 2}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
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
                        <a href="https://github.com/genesalvatore/aos-gate.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-lg">
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
