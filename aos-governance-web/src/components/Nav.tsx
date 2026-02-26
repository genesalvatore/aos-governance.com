import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2eb] backdrop-blur-md border-b border-black/5 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="font-bold tracking-tight text-lg">AOS GOVERNANCE</Link>
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                    <Link to="/why" className="hover:text-black transition-colors">Why Governance</Link>
                    <a href="/#how-it-works" className="hover:text-black transition-colors">How It Works</a>
                    <a href="/#standard" className="hover:text-black transition-colors">The Standard</a>

                    {/* Divider */}
                    <div className="w-px h-4 bg-black/15 mx-1" />

                    {/* Ecosystem */}
                    <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Constitution</a>
                    <a href="https://aos-evidence.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Evidence</a>
                    <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Foundation</a>

                    {/* Sitemap icon */}
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors" title="Sitemap" aria-label="Sitemap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </a>

                    <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">Get the Standard</a>
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
                        <Link to="/why" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Why Governance</Link>
                        <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">How It Works</a>
                        <a href="/#standard" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">The Standard</a>
                        <div className="pt-2 flex gap-3 text-xs font-mono uppercase tracking-wider">
                            <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black">Constitution</a>
                            <a href="https://aos-evidence.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black">Evidence</a>
                            <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black">Foundation</a>
                        </div>
                        <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="block mt-3 text-center py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">Get the Standard</a>
                    </div>
                </div>
            )}
        </nav>
    );
}
