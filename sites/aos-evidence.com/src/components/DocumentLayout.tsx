import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SitemapDropdown from './SitemapDropdown';

interface DocumentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function DocumentLayout({ title, children }: DocumentLayoutProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${title} — AOS Evidence Repository`;
    }, [title, location.pathname]);

    return (
        <div className="min-h-screen bg-[var(--canvas)] flex flex-col">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[var(--canvas)]/90 backdrop-blur border-b border-black/5">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <svg className="w-6 h-6 text-black transition-colors" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,20 80,40 50,100" fill="none" stroke="currentColor" strokeWidth="8"/>
                            <polygon points="50,40 70,55 50,80" fill="currentColor" />
                            <line x1="35" y1="10" x2="35" y2="90" stroke="currentColor" strokeWidth="12" />
                        </svg>
                        <div className="flex flex-col pt-0.5">
                            <span className="font-sans text-[16px] font-extrabold leading-none text-black tracking-tight transition-colors">AOS</span>
                            <span className="font-mono text-[7px] font-bold tracking-[0.2em] text-gray-500 mt-0.5 uppercase transition-colors">Evidence</span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <Link to="/verification" className="hover:text-black transition-colors">Verification</Link>
                        <Link to="/about" className="hover:text-black transition-colors">About</Link>

                        <div className="w-px h-4 bg-black/15 mx-1" />
                        <a href="https://aos-constitution.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Constitution</a>
                        <a href="https://aos-governance.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Governance</a>
                        <a href="https://aos-foundation.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Foundation</a>
                        <a href="https://aos-gate.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Gate</a>

                        <SitemapDropdown />

                        <a href="https://github.com/genesalvatore/aos-evidence.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm">GitHub</a>
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2" aria-label="Toggle menu">
                        <div className="space-y-1.5">
                            <span className={`block w-5 h-0.5 bg-black transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-5 h-0.5 bg-black transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-5 h-0.5 bg-black transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-black/5 bg-[var(--canvas)]">
                        <div className="px-6 py-4 space-y-1">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Home</Link>
                            <Link to="/verification" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Verification</Link>
                            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">About</Link>
                            <div className="pt-3 mt-1 border-t border-black/10">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">AOS Ecosystem</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <a href="https://aos-governance.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Governance</a>
                                    <a href="https://aos-evidence.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Evidence</a>
                                    <a href="https://aos-foundation.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Foundation</a>
                                    <a href="https://aos-patents.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Patents</a>
                                    <a href="https://aos-gate.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Gate</a>
                                    <a href="https://aos-constitution.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors col-span-2">Constitution</a>
                                </div>
                            </div>
                            <a href="https://github.com/genesalvatore/aos-evidence.com" target="_blank" rel="noopener noreferrer" className="block mt-3 text-center py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">GitHub</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Content */}
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-16">
                <div className="mb-6">
                    <Link to="/" className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-black transition-colors">← Back to Evidence</Link>
                </div>
                <article className="bg-white rounded-2xl border border-black/5 p-8 md:p-12 shadow-sm doc-content">
                    {children}
                </article>
            </main>

            {/* Footer */}
            <footer className="border-t border-black/5 py-16 mt-auto">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <p className="font-serif text-xl mb-3">AOS Evidence</p>
                            <p className="text-sm text-gray-500 leading-relaxed">Official evidence repository for the AOS Foundation. All materials published under verifiable cryptographic anchors.</p>
                        </div>
                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">Documentation</p>
                            <div className="space-y-2">
                                <Link to="/" className="block text-sm text-gray-600 hover:text-black transition-colors">Overview</Link>
                                <Link to="/about" className="block text-sm text-gray-600 hover:text-black transition-colors">About AOS</Link>
                                <Link to="/verification" className="block text-sm text-gray-600 hover:text-black transition-colors">Verification Guide</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">Legal</p>
                            <div className="space-y-2">
                                <Link to="/privacy" className="block text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="block text-sm text-gray-600 hover:text-black transition-colors">Terms of Service</Link>
                                <Link to="/cookie-policy" className="block text-sm text-gray-600 hover:text-black transition-colors">Cookie Policy</Link>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-black/5 flex flex-wrap justify-between gap-4 text-xs text-gray-400">
                        <span>© 2026 AOS Foundation · CC BY 4.0</span>
                        <span>Last updated: February 16, 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
