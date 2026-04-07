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
                    {/* Top Row: Symmetrical side-by-side featured cards */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                        
                        {/* ─── LEFT COLUMN: Standard Card ─── */}
                        <Link to="/policy/aos-standard" className="block group h-full">
                            <div className="border border-gray-200 rounded-[2rem] p-8 md:p-10 bg-[#f5f2eb] hover:bg-[#eae6d9] hover:border-transparent transition-colors shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col h-full">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-black/10 transition-colors"></div>
                                
                                <div className="flex-1 flex flex-col items-start gap-4 relative z-10 w-full mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="inline-block px-3 py-1 text-[10px] font-mono border border-black/20 rounded-full uppercase tracking-wider bg-black text-white shrink-0">
                                            OFFICIAL ARCHITECTURE
                                        </div>
                                    </div>
                                    
                                    <h2 className="font-serif text-4xl md:text-5xl text-black leading-[1.05] mt-4">
                                        AOS Standard 1.0
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed mt-4 text-lg">
                                        The definitive architectural specification for deterministic AI governance. Defining the five-layer stack required for safe enterprise, physical, and orbital deployment.
                                    </p>
                                </div>

                                <div className="mt-auto flex justify-between items-end relative z-10 w-full pt-6 border-t border-black/10">
                                    <span className="text-xs font-mono uppercase tracking-wider text-black font-semibold">View Standard</span>
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-300 text-black group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-sm shrink-0">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* ─── RIGHT COLUMN: Latest Response Card ─── */}
                        {(() => {
                            const latest = POLICY_RESPONSES[0];
                            if (!latest) return null;
                            return (
                                <Link to={`/policy-response/${latest.slug}`} className="block group h-full">
                                    <article className="border border-gray-200 rounded-[2rem] p-8 md:p-10 bg-white hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-xl relative flex flex-col h-full">
                                        
                                        <div className="flex-1 flex flex-col items-start relative z-10 w-full mb-8">
                                            {/* Header Row matched to Left Card */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="inline-block px-3 py-1 text-[10px] font-mono border border-blue-200 rounded-full uppercase tracking-wider bg-blue-50 text-blue-700 shrink-0 flex items-center gap-2">
                                                    <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                                                        <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                                                        <span className="relative inline-flex w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                                    </div>
                                                    LATEST RESPONSE
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-mono tracking-wider">{latest.date}</span>
                                            </div>

                                            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4 group-hover:text-gray-700 transition-colors">
                                                {latest.title}
                                            </h2>

                                            <div className="text-sm text-gray-500 mb-6 bg-gray-50 px-4 py-3 rounded-xl border border-black/5 w-full">
                                                Formal mapping: <span className="italic font-medium text-black">{latest.respondingTo}</span>
                                            </div>

                                            <p className="text-gray-600 leading-relaxed text-lg line-clamp-4">
                                                {latest.summary}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 pt-6 border-t border-gray-100 w-full relative z-10">
                                            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400 tracking-wider">
                                                {latest.patentsCited} PATENTS CITED
                                            </div>
                                            <div className="shrink-0">
                                                <span className="text-sm font-medium text-black group-hover:bg-black group-hover:text-white px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 border border-black/10">
                                                    Read Response <span>→</span>
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })()}
                    </div>

                    {/* ─── NEW ROW: Other Responses List ─── */}
                    {POLICY_RESPONSES.length > 1 && (
                        <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
                            <section className="space-y-6">
                                <div className="border-b border-gray-200 pb-4 mb-8">
                                    <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500">Response Archive ({POLICY_RESPONSES.length - 1})</h3>
                                </div>
                                <div className="space-y-6">
                                    {POLICY_RESPONSES.slice(1).map((entry) => (
                                        <Link key={entry.slug} to={`/policy-response/${entry.slug}`} className="block group">
                                            <article className="border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300 bg-white p-6 md:p-8 relative">
                                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                                                    <div className="sm:w-32 shrink-0 space-y-3">
                                                        <span className="block px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-blue-50 text-blue-700 text-center border border-blue-100">
                                                            {entry.respondingOrg}
                                                        </span>
                                                        <div className="text-xs text-gray-400 font-mono text-center tracking-wider">{entry.date}</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-serif text-2xl leading-tight mb-3 group-hover:text-gray-700 transition-colors pr-8">
                                                            {entry.title}
                                                        </h4>
                                                        <p className="text-gray-500 leading-relaxed mb-4">
                                                            {entry.summary}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            {entry.tags.map((tag, i) => (
                                                                <span key={i} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-gray-50 border border-black/5 rounded text-gray-500">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}
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
