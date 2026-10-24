import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface DocumentItem {
    icon: string;
    wordCount: string;
    title: string;
    description: string;
    meta: string[];
    link: string;
    category: string;
}

const documents: DocumentItem[] = [
    {
        icon: '⚖️',
        wordCount: '3,500 words',
        title: 'Humanitarian License v1.0.1',
        description:
            'The irrevocable open-source license restricting AI to peaceful civilian use. 40 prohibited categories, mandatory copyleft, patent notice, and audit requirements.',
        meta: ['✓ Published Feb 1, 2026', '✓ Irrevocable restrictions'],
        link: '/license',
        category: 'Legal Framework',
    },
    {
        icon: '🧠',
        wordCount: '5 documents',
        title: 'Cross-Platform Architectural Review',
        description:
            'A brand-new ChatGPT session analyzed the AOS ecosystem from zero context and produced five thesis documents concluding it represents a "constitutional AI civilization stack."',
        meta: ['✓ March 11, 2026', '✓ Zero prior context'],
        link: '/evidence/architectural-review',
        category: 'Cross-Platform Validation',
    },
    {
        icon: '🤝',
        wordCount: '2,500 words',
        title: 'OpenClaw Governance Skill',
        description:
            'Evidence record of the first constitutional governance integration for an open-source agentic platform. Vendor-agnostic. 15 public commits.',
        meta: ['✓ Published Feb 1, 2026', '✓ Verifiable on GitHub'],
        link: '/evidence/openclaw-governance',
        category: 'Integration Evidence',
    },
    {
        icon: '📚',
        wordCount: '12,000 words',
        title: 'What We Built',
        description:
            'Complete story of the February 5 security audit achievement. Documents the external validation process, architectural overview, and significance.',
        meta: ['✓ Patent-safe disclosure', '✓ Technical + accessible'],
        link: '/audit/what-we-built',
        category: 'Complete Story',
    },
    {
        icon: '🎓',
        wordCount: '3,000 words',
        title: 'Understanding Constitutional AI',
        description:
            'Beginner-friendly primer on constitutional AI governance. Core concepts, threat models, and verification methods explained in accessible language.',
        meta: ['✓ Published Feb 15, 2026', '✓ Beginner-friendly'],
        link: '/learn/constitutional-ai',
        category: 'Educational Resources',
    },
    {
        icon: '🔍',
        wordCount: '5,000 words',
        title: 'ChatGPT Audit Report',
        description:
            'Official security audit summary with direct quotes from ChatGPT. All 11 security areas reviewed, final approval statement, verification trail.',
        meta: ['✓ External validation', '✓ Production approval'],
        link: '/audit/report',
        category: 'Technical Deep Dive',
    },
    {
        icon: '🛡️',
        wordCount: '8,500 words',
        title: 'Threat Model v1.0',
        description:
            'All 36 vulnerabilities cataloged with descriptions, fixes, and verification. Organized chronologically across 5 audit passes.',
        meta: ['✓ Complete transparency', '✓ All vulnerabilities fixed'],
        link: '/audit/threat-model',
        category: 'Security Analysis',
    },
    {
        icon: '✅',
        wordCount: 'Interactive',
        title: 'Verification Guide',
        description:
            'Step-by-step instructions to independently verify the audit claims. Includes Git commit verification and timestamp checking.',
        meta: ['✓ Independently verifiable', '✓ Falsifiable claims'],
        link: '/verification',
        category: 'Verification Guide',
    },
];

const DOCS_PER_PAGE = 3;

export default function DocumentSlider() {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(documents.length / DOCS_PER_PAGE);
    const displayed = documents.slice(page * DOCS_PER_PAGE, page * DOCS_PER_PAGE + DOCS_PER_PAGE);

    const nextPage = useCallback(() => {
        setPage((p) => (p + 1) % totalPages);
    }, [totalPages]);

    const prevPage = useCallback(() => {
        setPage((p) => (p - 1 + totalPages) % totalPages);
    }, [totalPages]);

    return (
        <section id="documents" className="py-24 bg-white border-y border-black/5">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center space-y-4 mb-16">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Evidence Documents</div>
                    <h2 className="font-serif text-4xl md:text-5xl">Evidence Archive</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Complete, verifiable documentation — Security audits, architectural reviews, and governance records
                    </p>
                </div>

                {/* Slider container */}
                <div className="relative">
                    {/* Arrow controls */}
                    <button
                        onClick={prevPage}
                        className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        aria-label="Previous documents"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={nextPage}
                        className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-black/10 shadow-md flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        aria-label="Next documents"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {displayed.map((doc, idx) => {
                            const isComingSoon = !doc.link;
                            return (
                                <div
                                    key={`${page}-${idx}`}
                                    className="group p-8 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 80}ms` }}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="text-3xl">{doc.icon}</div>
                                        <span
                                            className={`text-xs font-mono px-2 py-1 rounded-full ${isComingSoon
                                                ? 'bg-amber-50 text-amber-600 border border-amber-200'
                                                : 'bg-gray-100 text-gray-500'
                                                }`}
                                        >
                                            {doc.wordCount}
                                        </span>
                                    </div>

                                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                                        {doc.category}
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{doc.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm mb-6">{doc.description}</p>
                                    <div className="space-y-1 text-xs text-green-700 mb-6">
                                        {doc.meta.map((m) => (
                                            <div key={m}>{m}</div>
                                        ))}
                                    </div>

                                    {isComingSoon ? (
                                        <span className="text-sm font-medium text-gray-400 cursor-not-allowed">Coming Soon →</span>
                                    ) : (
                                        <Link to={doc.link} className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
                                            Read Document →
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Page indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-8 h-1.5 rounded-full transition-all duration-300 ${i === page ? 'bg-black' : 'bg-black/15 hover:bg-black/30'
                                    }`}
                                aria-label={`Page ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Roadmap */}
                <div className="mt-16 p-8 rounded-xl bg-gray-50 border border-gray-100">
                    <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-6 text-center">Repository Roadmap</h3>
                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                        This repository serves as the <strong className="text-gray-900">permanent evidence archive</strong> for all AOS achievements.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        {[
                            { date: 'May 19', item: 'IP Transparency Page' },
                            { date: 'May 22', item: 'Policy Gate Spec v1.0' },
                            { date: 'May 22', item: 'Bypass Test Suite v1.0' },
                        ].map((r) => (
                            <div key={r.item} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                <span className="text-xs font-mono font-bold bg-black text-white px-2 py-1 rounded shrink-0">{r.date}</span>
                                <span className="text-sm text-gray-600">{r.item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
