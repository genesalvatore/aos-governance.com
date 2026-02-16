import { useState, useRef, useEffect } from 'react';

const sitemapSections = [
    {
        title: 'This Site',
        links: [
            { label: 'Manifesto', href: '#manifesto', desc: 'Why deterministic governance matters' },
            { label: 'How It Works', href: '#how-it-works', desc: 'Intercept → Verify → Gate' },
            { label: 'The Mars Precedent', href: '#mars', desc: 'AI on another planet' },
            { label: 'The Standard', href: '#standard', desc: 'Five constitutional principles' },
            { label: 'Get Started', href: '#get-started', desc: 'Adopt the governance standard' },
        ],
    },
    {
        title: 'AOS Quartet',
        external: true,
        links: [
            { label: 'Constitution', href: 'https://aos-constitution.com', desc: 'Constitutional AI framework' },
            { label: 'Evidence', href: 'https://aos-evidence.com', desc: 'Verifiable documentation' },
            { label: 'Foundation', href: 'https://aos-foundation.com', desc: 'AI safety for humanity' },
        ],
    },
    {
        title: 'Ecosystem',
        external: true,
        links: [
            { label: 'License Checker', href: 'https://aos-license-checker.com', desc: 'Real-time compliance' },
            { label: 'Git Legacy', href: 'https://git-legacy.com', desc: 'Multi-generational archives' },
            { label: 'Community', href: 'https://git-iscommunity.com', desc: 'Cathedral gathering' },
            { label: 'HijackRadar', href: 'https://hijackradar.com', desc: 'Domain security' },
            { label: 'Cathedral Network', href: 'https://git-cathedral.com', desc: '15-node philosophy' },
        ],
    },
    {
        title: 'Resources',
        external: true,
        links: [
            { label: 'GitHub Repository', href: 'https://github.com/genesalvatore/aos-governance.com', desc: 'Source code' },
            { label: 'SKILL.md', href: 'https://github.com/genesalvatore/aos-governance.com/blob/main/aos-governance/SKILL.md', desc: 'Agent skill spec' },
            { label: 'Claude on Mars', href: 'https://www.anthropic.com/features/claude-on-mars', desc: 'Anthropic case study' },
            { label: 'Salvatore Systems', href: 'https://salvatoresystems.com', desc: 'Infrastructure partner' },
        ],
    },
];

export default function SitemapDropdown() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) {
            if (
                panelRef.current && !panelRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    useEffect(() => {
        if (!open) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [open]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 ${open
                    ? 'bg-black text-white'
                    : 'hover:bg-black/5 text-gray-500 hover:text-black'
                    }`}
                aria-label="Sitemap"
                aria-expanded={open}
                title="Browse all pages"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="1" width="5" height="5" rx="1" />
                    <rect x="10" y="1" width="5" height="5" rx="1" />
                    <rect x="1" y="10" width="5" height="5" rx="1" />
                    <rect x="10" y="10" width="5" height="5" rx="1" />
                </svg>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />
                    <div
                        ref={panelRef}
                        className="absolute right-0 top-full mt-2 z-50 w-[90vw] max-w-2xl bg-white rounded-xl border border-black/10 shadow-2xl overflow-hidden"
                        style={{ animation: 'fadeIn 0.2s ease-out' }}
                    >
                        <div className="px-5 py-3 bg-gray-50 border-b border-black/5 flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm">Site Map</div>
                                <div className="text-xs text-gray-400 font-mono">aos-governance.com</div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-6 h-6 rounded-md hover:bg-black/5 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                                aria-label="Close sitemap"
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2 2l8 8M10 2l-8 8" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-5 grid md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                            {sitemapSections.map((section) => (
                                <div key={section.title}>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-3">
                                        {section.title}
                                        {section.external && <span className="ml-1 opacity-50">↗</span>}
                                    </div>
                                    <div className="space-y-1">
                                        {section.links.map((link) => {
                                            const isExternal = link.href.startsWith('http');
                                            if (isExternal) {
                                                return (
                                                    <a
                                                        key={link.label}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors truncate">
                                                                {link.label}
                                                                <span className="text-gray-300 ml-1 text-xs">↗</span>
                                                            </div>
                                                            <div className="text-xs text-gray-400 truncate">{link.desc}</div>
                                                        </div>
                                                    </a>
                                                );
                                            }
                                            return (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors truncate">
                                                            {link.label}
                                                        </div>
                                                        <div className="text-xs text-gray-400 truncate">{link.desc}</div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="px-5 py-3 bg-gray-50 border-t border-black/5 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                {sitemapSections.reduce((acc, s) => acc + s.links.length, 0)} pages
                            </span>
                            <a
                                href="https://github.com/genesalvatore/aos-governance.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-gray-400 hover:text-black transition-colors font-mono"
                            >
                                View Source ↗
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
