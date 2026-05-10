import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Sitemap Modal ──────────────────────────────────────────────────────────
function SitemapModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-[560px] max-w-[90vw] max-h-[80vh] overflow-y-auto animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div>
                        <h2 className="font-bold text-lg">Site Map</h2>
                        <p className="text-sm text-gray-400">aos-governance.com</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors text-xl leading-none p-1" aria-label="Close">✕</button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        {/* Left Column - Standard */}
                        <div className="space-y-5">
                            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Standard</div>
                            <SitemapLink href="/" label="Home" desc="The open standard overview" internal onClick={onClose} />
                            <SitemapLink href="/why" label="Why Governance" desc="Evidence library" internal onClick={onClose} />
                            <SitemapLink href="/#manifesto" label="Manifesto" desc="The core thesis" internal onClick={onClose} />
                            <SitemapLink href="/#how-it-works" label="How It Works" desc="Verifiable Safety Pipeline" internal onClick={onClose} />
                            <SitemapLink href="/#standard" label="The Constitution" desc="Five governing principles" internal onClick={onClose} />
                            <SitemapLink href="/#mars" label="Mars Precedent" desc="Claude on Mars case study" internal onClick={onClose} />
                            <SitemapLink href="/#get-started" label="Get Started" desc="Adopt the standard" internal onClick={onClose} />
                            <SitemapLink href="/policy-response" label="Policy Response" desc="OpenAI Industrial Policy alignment" internal onClick={onClose} />
                        </div>

                        {/* Right Column - Learn */}
                        <div className="space-y-5">
                            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Resources</div>
                            <SitemapLink href="https://github.com/genesalvatore/aos-gate.com" label="GitHub Repository" desc="Source code & SKILL.md" onClick={onClose} />
                            <SitemapLink href="https://github.com/genesalvatore/aos-gate.com/blob/main/skill/SKILL.md" label="SKILL.md" desc="Agent governance recipe" onClick={onClose} />
                            <SitemapLink href="https://www.anthropic.com/features/claude-on-mars" label="Claude on Mars" desc="Anthropic announcement" onClick={onClose} />
                            <SitemapLink href="https://arxiv.org/abs/2602.14740" label="KCL Wargame Study" desc="arXiv:2602.14740" onClick={onClose} />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 mt-8 pt-6">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {/* AOS Quartet */}
                            <div className="space-y-5">
                                <div className="text-xs font-mono uppercase tracking-wider text-gray-400">AOS Quartet <ExtIcon /></div>
                                <SitemapLink href="https://aos-governance.com" label="Governance" desc="Deterministic verification standard" highlight onClick={onClose} />
                                <SitemapLink href="https://aos-evidence.com" label="Evidence" desc="Verifiable documentation" onClick={onClose} />
                                <SitemapLink href="https://aos-foundation.com" label="Foundation" desc="AI safety for humanity" onClick={onClose} />
                                <SitemapLink href="https://aos-constitution.com" label="Constitution" desc="The constitutional framework" onClick={onClose} />
                            </div>

                            {/* Ecosystem */}
                            <div className="space-y-5">
                                <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Ecosystem <ExtIcon /></div>
                                <SitemapLink href="https://aos-patents.com" label="Patent Registry" desc="145 AI governance patents" onClick={onClose} />
                                <SitemapLink href="https://governanceforwp.com" label="GovernanceForWP" desc="WordPress governance plugin" onClick={onClose} />
                                <SitemapLink href="https://git-legacy.com" label="Git Legacy" desc="Multi-generational archives" onClick={onClose} />
                                <SitemapLink href="https://git-iscommunity.com" label="Community" desc="Cathedral gathering" onClick={onClose} />
                                <SitemapLink href="https://salvatoresystems.com" label="Salvatore Systems" desc="The developer" onClick={onClose} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between rounded-b-2xl">
                    <span className="text-xs text-gray-400">8 pages</span>
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1">
                        View Source <ExtIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}

function SitemapLink({ href, label, desc, internal, highlight, onClick }: { href: string; label: string; desc: string; internal?: boolean; highlight?: boolean; onClick?: () => void }) {
    const isExternal = !internal && href.startsWith('http');
    const content = (
        <div className="group cursor-pointer">
            <div className={`font-semibold text-sm ${highlight ? 'text-black' : 'text-gray-800'} group-hover:text-black flex items-center gap-1.5`}>
                {label}
                {isExternal && <ExtIcon />}
            </div>
            <div className="text-xs text-gray-400">{desc}</div>
        </div>
    );

    if (internal) {
        return <Link to={href} className="block" onClick={onClick}>{content}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block" onClick={onClick}>{content}</a>;
}

function ExtIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block text-blue-400 ml-0.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    );
}

// ─── Nav ────────────────────────────────────────────────────────────────────
export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sitemapOpen, setSitemapOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2eb] backdrop-blur-md border-b border-black/5 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <svg className="w-8 h-8 text-black transition-colors" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                            <polygon points="50,40 70,55 50,80" fill="currentColor" />
                            <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                        </svg>
                        <div className="flex flex-col pt-0.5">
                            <span className="font-sans text-[22px] font-extrabold leading-none text-black tracking-tight transition-colors">AOS</span>
                            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-gray-500 mt-1 uppercase transition-colors">Governance</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                        <Link to="/why" className="hover:text-black transition-colors">Why</Link>
                        <a href="/#how-it-works" className="hover:text-black transition-colors">How</a>
                        <Link to="/policy-response" className="hover:text-black transition-colors">Policy</Link>
                        <a href="/#standard" className="hover:text-black transition-colors">The Standard</a>

                        {/* Divider */}
                        <div className="w-px h-4 bg-black/15 mx-1" />

                        {/* Ecosystem */}
                        <a href="https://aos-constitution.com" className="text-gray-400 hover:text-black transition-colors text-[13px] font-mono uppercase tracking-wider">Constitution</a>
                        <a href="https://aos-evidence.com" className="text-gray-400 hover:text-black transition-colors text-[13px] font-mono uppercase tracking-wider">Evidence</a>
                        <a href="https://aos-foundation.com" className="text-gray-400 hover:text-black transition-colors text-[13px] font-mono uppercase tracking-wider">Foundation</a>
                        <a href="https://aos-patents.com" className="text-gray-400 hover:text-black transition-colors text-[13px] font-mono uppercase tracking-wider">Patents</a>
                        <a href="https://aos-gate.com" className="text-gray-400 hover:text-black transition-colors text-[13px] font-mono uppercase tracking-wider">Gate</a>

                        {/* Sitemap icon — opens modal */}
                        <button onClick={() => setSitemapOpen(true)} className="text-gray-400 hover:text-black transition-colors" title="Site Map" aria-label="Site Map">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </button>

                        <a href="https://aos-gate.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">Get the Standard</a>
                    </div>

                    {/* Mobile hamburger */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
                        <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-black/5 bg-[#f5f2eb]/95 backdrop-blur-lg">
                        <div className="px-6 py-4 space-y-1">
                            <Link to="/why" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Why</Link>
                            <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">How</a>
                            <Link to="/policy-response" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Policy</Link>
                            <a href="/#standard" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">The Standard</a>
                            <div className="pt-3 mt-1 border-t border-black/10">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">AOS Ecosystem</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <a href="https://aos-constitution.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Constitution</a>
                                    <a href="https://aos-evidence.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Evidence</a>
                                    <a href="https://aos-foundation.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Foundation</a>
                                    <a href="https://aos-patents.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Patents</a>
                                    <a href="https://aos-gate.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Gate</a>
                                </div>
                            </div>
                            <button onClick={() => { setMobileMenuOpen(false); setSitemapOpen(true); }} className="block pt-2 text-xs text-gray-400 hover:text-black transition-colors">
                                View Site Map
                            </button>
                            <a href="https://aos-gate.com" target="_blank" rel="noopener noreferrer" className="block mt-3 text-center py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">Get the Standard</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Sitemap Modal */}
            {sitemapOpen && <SitemapModal onClose={() => setSitemapOpen(false)} />}
        </>
    );
}
