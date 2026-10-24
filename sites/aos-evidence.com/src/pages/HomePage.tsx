import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AchievementSlider from '../components/AchievementSlider';
import DocumentSlider from '../components/DocumentSlider';
import SEO from '../components/SEO';
import SitemapDropdown from '../components/SitemapDropdown';

const heroSlides: {
    badge: string;
    title: React.ReactNode;
    description: string;
    stats: { value: string; label: string; green?: boolean }[];
    primaryCta: { label: string; href?: string; to?: string };
    secondaryCta: { label: string; href?: string; to?: string; external?: boolean };
}[] = [
        {
            badge: 'Verifiable Evidence',
            title: <>Public Record of <br /><span className="italic text-gray-500">AI Safety Achievement.</span></>,
            description: 'Cryptographically anchored, independently auditable documentation of the first production-approved constitutional AI governance system.',
            stats: [
                { value: '36', label: 'Vulnerabilities Fixed' },
                { value: '5', label: 'Hostile Audit Passes' },
                { value: '✓', label: 'Production Approved', green: true },
            ],
            primaryCta: { label: 'View Evidence', href: '#documents' },
            secondaryCta: { label: 'Verify It Yourself', to: '/verification' },
        },
        {
            badge: 'Legal Framework',
            title: <>Open Source for Peace.<br /><span className="italic text-gray-500">Closed Forever to Harm.</span></>,
            description: 'The AOS Humanitarian License v1.0.1 — an irrevocable open-source license permanently restricting AI to peaceful civilian use. 40 prohibited categories. Mandatory copyleft. Patent-backed enforcement.',
            stats: [
                { value: '40', label: 'Prohibited Categories' },
                { value: '0', label: 'Military Exceptions' },
                { value: '∞', label: 'Irrevocable Duration' },
            ],
            primaryCta: { label: 'Read the License', to: '/license' },
            secondaryCta: { label: 'View on GitHub', href: 'https://github.com/genesalvatore/aos-openclaw-constitutional/blob/main/LICENSE', external: true },
        },
        {
            badge: 'Vendor Agnostic',
            title: <>Governance That Works<br /><span className="italic text-gray-500">With Any AI Platform.</span></>,
            description: 'The AOS Constitutional Governance Skill for OpenClaw — published February 1, 2026. The first reference implementation proving deterministic governance integrates with real-world agentic infrastructure.',
            stats: [
                { value: '15', label: 'Public Commits' },
                { value: 'Feb 1', label: 'Published Date' },
                { value: '✓', label: 'Vendor Agnostic', green: true },
            ],
            primaryCta: { label: 'View Evidence', to: '/evidence/openclaw-governance' },
            secondaryCta: { label: 'View Repository', href: 'https://github.com/genesalvatore/aos-openclaw-constitutional', external: true },
        },
        {
            badge: 'Cross-Platform Validation',
            title: <>Independent Review.<br /><span className="italic text-gray-500">Architectural Recognition.</span></>,
            description: 'A brand-new ChatGPT session analyzed the AOS ecosystem from zero context — websites, articles, and patents — and concluded it represents a "constitutional AI civilization stack."',
            stats: [
                { value: '5', label: 'Thesis Documents' },
                { value: '0', label: 'Prior Context' },
                { value: '✓', label: 'Cross-Platform', green: true },
            ],
            primaryCta: { label: 'Read the Review', to: '/evidence/architectural-review' },
            secondaryCta: { label: 'View Source Files', to: '/evidence/architectural-review' },
        },
    ];

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [heroSlide, setHeroSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setHeroSlide((s) => (s + 1) % heroSlides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const slide = heroSlides[heroSlide];

    return (
        <div className="min-h-screen bg-canvas font-sans text-[#111] selection:bg-black selection:text-white">
            <SEO />
            {/* Navigation */}
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
                            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-gray-500 mt-1 uppercase transition-colors">Evidence</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 items-center">
                        <a href="#documents" className="hover:text-black transition-colors">Documents</a>
                        <a href="#verification" className="hover:text-black transition-colors">Verification</a>
                        <a href="#about" className="hover:text-black transition-colors">About</a>

                        {/* Quartet nav */}
                        <div className="w-px h-4 bg-black/15 mx-1" />
                        <a href="https://aos-constitution.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Constitution</a>
                        <a href="https://aos-governance.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Governance</a>
                        <a href="https://aos-foundation.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Foundation</a>
                        <a href="https://aos-patents.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Patents</a>
                        <a href="https://aos-gate.com" className="text-gray-400 hover:text-black transition-colors text-xs font-mono uppercase tracking-wider">Gate</a>

                        <SitemapDropdown />

                        <a href="https://github.com/genesalvatore/aos-evidence.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">View on GitHub</a>
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
                    <div className="md:hidden border-t border-black/5 bg-[#f5f2eb]/95 backdrop-blur-lg max-h-[80vh] overflow-y-auto">
                        <div className="px-6 py-4 space-y-1">
                            {/* Page sections */}
                            <a href="#documents" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Documents</a>
                            <a href="#verification" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">Verification</a>
                            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-black/5">About</a>

                            {/* Sitemap pages — organized by category */}
                            <div className="pt-4 pb-2">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Evidence Documents</div>
                                <Link to="/audit/what-we-built" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">What We Built</Link>
                                <Link to="/audit/report" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">ChatGPT Audit Report</Link>
                                <Link to="/audit/threat-model" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Threat Model v1.0</Link>
                                <Link to="/evidence/openclaw-governance" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">OpenClaw Governance Skill</Link>
                                <Link to="/evidence/architectural-review" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Cross-Platform Architectural Review</Link>
                            </div>
                            <div className="pb-2">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Legal & Licensing</div>
                                <Link to="/license" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Humanitarian License v1.0.1</Link>
                                <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</Link>
                                <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Terms of Service</Link>
                                <Link to="/cookie-policy" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Cookie Policy</Link>
                            </div>
                            <div className="pb-2 border-b border-black/5">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">Learn & Verify</div>
                                <Link to="/learn/constitutional-ai" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Understanding Constitutional AI</Link>
                                <Link to="/verification" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">Verification Guide</Link>
                                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-500 hover:text-black transition-colors">About AOS</Link>
                            </div>

                            {/* Ecosystem links */}
                            <div className="pt-3 mt-1 border-t border-black/10">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-2">AOS Ecosystem</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <a href="https://aos-governance.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Governance</a>
                                    <a href="https://aos-evidence.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Evidence</a>
                                    <a href="https://aos-foundation.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Foundation</a>
                                    <a href="https://aos-patents.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Patents</a>
                                    <a href="https://aos-gate.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Gate</a>
                                    <a href="https://aos-constitution.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">Constitution</a>
                                    <a href="https://aos-license-checker.com" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors">License Checker</a>
                                </div>
                            </div>

                            <a href="https://github.com/genesalvatore/aos-evidence.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-md font-medium text-sm hover:bg-gray-800 transition-colors">View on GitHub</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* HERO — Sliding */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div key={heroSlide} className="space-y-8 animate-fade-in-up">
                        <div className="inline-block px-3 py-1 text-xs font-mono border border-black/20 rounded-full uppercase tracking-wider">
                            {slide.badge}
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight">
                            {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                            {slide.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-4">
                            {slide.stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className={`text-4xl font-bold tracking-tight ${stat.green ? 'text-green-700' : ''}`}>{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            {slide.primaryCta.to ? (
                                <Link to={slide.primaryCta.to} className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-center">
                                    {slide.primaryCta.label}
                                </Link>
                            ) : (
                                <a href={slide.primaryCta.href} className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-center">
                                    {slide.primaryCta.label}
                                </a>
                            )}
                            {slide.secondaryCta.to ? (
                                <Link to={slide.secondaryCta.to} className="px-6 py-3 border border-black/20 text-black rounded-lg font-medium hover:bg-black/5 transition-colors text-center">
                                    {slide.secondaryCta.label}
                                </Link>
                            ) : (
                                <a href={slide.secondaryCta.href} target={slide.secondaryCta.external ? '_blank' : undefined} rel={slide.secondaryCta.external ? 'noopener noreferrer' : undefined} className="px-6 py-3 border border-black/20 text-black rounded-lg font-medium hover:bg-black/5 transition-colors text-center">
                                    {slide.secondaryCta.label}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Slide indicators */}
                    <div className="flex gap-2 pt-4">
                        {heroSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setHeroSlide(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === heroSlide ? 'w-10 bg-black' : 'w-6 bg-black/15 hover:bg-black/30'}`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CANONICAL ANCHOR */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-6">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Canonical Anchor — Cite This</div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <div className="text-xs text-gray-400 mb-1 font-mono">Evidence Release</div>
                                <code className="text-sm bg-white/10 px-2 py-1 rounded font-mono">evidence-2026-02-06</code>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1 font-mono">Primary Commit</div>
                                <code className="text-sm bg-white/10 px-2 py-1 rounded font-mono">d534af9</code>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1 font-mono">Evidence Path</div>
                                <code className="text-sm bg-white/10 px-2 py-1 rounded font-mono">chatgpt_security_audit_feb_5_2026/</code>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-4">
                            <Link to="/verification" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                                2-minute verification guide →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT THIS REPOSITORY */}
            <section className="py-24 border-b border-black/5">
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    <div className="space-y-4">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">About This Repository</div>
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                            Transparency <span className="italic text-gray-400">by default.</span>
                        </h2>
                    </div>
                    <div className="text-lg text-gray-600 leading-relaxed max-w-3xl space-y-4">
                        <p>
                            This is the <strong className="text-gray-900">official evidence repository</strong> for the AOS project. We publish verifiable, cryptographically-anchored documentation of all major achievements, security audits, and technical milestones.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-4">
                        <div className="p-5 rounded-xl border border-gray-200 bg-white">
                            <div className="font-bold text-sm mb-1">Dec 31, 2025 – Jan 2026</div>
                            <div className="text-sm text-gray-500">Constitutional Gate v1.0 developed</div>
                        </div>
                        <div className="p-5 rounded-xl bg-gray-900 text-white">
                            <div className="font-bold text-sm mb-1">February 5, 2026</div>
                            <div className="text-sm text-gray-300">Security audit by ChatGPT (OpenAI)</div>
                        </div>
                        <div className="p-5 rounded-xl border border-green-200 bg-green-50">
                            <div className="font-bold text-sm text-green-900 mb-1">February 6, 2026</div>
                            <div className="text-sm text-green-700">Evidence publication (this release)</div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 italic pt-4">
                        <strong>Note:</strong> The Constitutional Gate was built over several weeks starting Dec 31, 2025. This repository documents the <strong>February 5 security audit</strong> of that existing system by ChatGPT, which validated production-readiness after fixing 36 vulnerabilities.
                    </p>
                </div>
            </section>

            {/* ACHIEVEMENT SLIDER */}
            <AchievementSlider />

            {/* EVIDENCE DOCUMENTS SLIDER */}
            <DocumentSlider />

            {/* VERIFICATION */}
            <section id="verification" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Independent Verification</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Don't Trust. <span className="italic text-gray-400">Verify.</span></h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">All evidence is cryptographically anchored and publicly verifiable.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mb-16">
                        {[
                            { step: 1, title: 'Clone Repository', code: 'git clone https://github.com/genesalvatore/aos-evidence.com.git' },
                            { step: 2, title: 'Verify Timestamps', code: 'git log --format=fuller' },
                            { step: 3, title: 'Check Commit Hash', code: 'git show <commit-hash>' },
                            { step: 4, title: 'Audit Timeline', desc: 'Cross-reference industry announcements and public records' },
                        ].map(item => (
                            <div key={item.step} className="group p-6 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                {item.code ? (
                                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 overflow-x-auto">
                                        {item.code}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Evidence Standards */}
                    <div className="p-8 rounded-xl border border-gray-100 bg-white">
                        <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-8 text-center">Evidence Standards</h3>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { label: 'Verifiable', desc: 'Git timestamps, external validations' },
                                { label: 'Falsifiable', desc: 'Can be proven wrong if inaccurate' },
                                { label: 'Immutable', desc: 'Cryptographically anchored, permanent' },
                                { label: 'Public', desc: 'Open to independent audit' },
                            ].map(s => (
                                <div key={s.label} className="flex items-start gap-3">
                                    <span className="text-green-600 mt-0.5 font-bold">✓</span>
                                    <div>
                                        <strong className="text-sm">{s.label}</strong>
                                        <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 rounded-xl bg-gray-900 text-white text-center">
                        <h3 className="font-serif text-2xl mb-3">Complete Verification Guide</h3>
                        <p className="text-gray-400 mb-6 max-w-xl mx-auto">Step-by-step instructions for independent verification, falsifiability tests, and audit checklist.</p>
                        <Link to="/verification" className="inline-block px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                            View Verification Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section id="timeline" className="py-24 bg-white border-y border-black/5">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Timeline & Context</div>
                        <h2 className="font-serif text-4xl md:text-5xl">The Priority Record</h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">Establishing first-mover position through verifiable timestamps.</p>
                    </div>

                    <div className="space-y-0 relative">
                        <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                        {[
                            { date: 'Dec 31, 2025', title: 'Initial Discovery', desc: 'Deterministic agent state reconstruction protocol invented — first tamper-evident AI identity verification', highlight: false },
                            { date: 'Jan 10, 2026', title: 'Patent Applications Filed', desc: 'Provisional patents for constitutional AI governance (AOS-015, AOS-120)', highlight: true },
                            { date: 'Jan 21, 2026', title: 'Industry Convergence', desc: 'Anthropic, OpenAI, Google announce constitutional AI frameworks', highlight: false },
                            { date: 'Feb 1, 2026', title: 'OpenClaw Governance Skill', desc: 'First constitutional governance integration for an open-source agentic platform — publicly published', highlight: true },
                            { date: 'Feb 5, 2026', title: 'ChatGPT Security Audit', desc: 'First AI-to-AI collaboration, 36 vulnerabilities fixed, production approved', highlight: true },
                            { date: 'Feb 6, 2026', title: 'Public Evidence Release', desc: 'Complete transparency — All evidence published and verifiable', highlight: true },
                            { date: 'Mar 11, 2026', title: 'Cross-Platform Architectural Review', desc: 'ChatGPT independently validates AOS as "constitutional AI civilization stack" from zero prior context', highlight: true },
                        ].map((item, i) => (
                            <div key={i} className="relative pl-10 pb-10 last:pb-0">
                                <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 ${item.highlight ? 'bg-black border-black' : 'bg-white border-gray-300'}`} />
                                <div className="text-sm font-mono font-bold text-gray-400 mb-1">{item.date}</div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 rounded-xl border-2 border-black text-center">
                        <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">99 Patents</div>
                        <div className="text-gray-500 max-w-lg mx-auto">
                            AOS filed patents establishing the world's first deterministic AI governance architecture.
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT AOS */}
            <section id="about" className="py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">About AOS</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Constitutional Governance <span className="italic text-gray-400">for AI.</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-3">What is AOS?</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                AOS (Agent Operating System) is a constitutional governance framework that provides <strong className="text-gray-900">deterministic enforcement</strong> of AI behavioral constraints. Unlike training-based approaches, AOS makes violations <strong className="text-gray-900">mathematically detectable</strong> and <strong className="text-gray-900">cryptographically provable</strong>.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-3">Key Innovation</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                First system to combine <strong className="text-gray-900">tamper-evident verification</strong>, <strong className="text-gray-900">persistent audit trails</strong>, and <strong className="text-gray-900">enforcement-layer governance</strong> to create verifiable AI safety. Together: defense-in-depth for AI safety.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-3">Transparency Principle</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                <em>"Transparency is strength. Verifiable claims build trust."</em>
                                <br /><br />
                                This repository embodies that principle: complete disclosure, independent verification, falsifiable claims, and permanent public record.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <h2 className="font-serif text-4xl md:text-5xl">Ready to Verify?</h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">All evidence is public, immutable, and independently verifiable.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="https://github.com/genesalvatore/aos-evidence.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-transform active:scale-95 text-lg">
                            Clone Repository
                        </a>
                        <Link to="/verification" className="px-8 py-4 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-lg">
                            Verification Guide
                        </Link>
                    </div>
                </div>
            </section>

            {/* AOS ECOSYSTEM */}
            <section className="py-24 border-b border-black/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-16">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">AOS Ecosystem</div>
                        <h2 className="font-serif text-4xl md:text-5xl">Constitutional AI <span className="italic text-gray-400">Across Platforms.</span></h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: '📜', title: 'Constitution', desc: 'Constitutional AI framework', url: 'https://aos-constitution.com' },
                            { icon: '⚖️', title: 'Governance', desc: 'Verifiable governance standard', url: 'https://aos-governance.com' },
                            { icon: '🏛️', title: 'Foundation', desc: 'Verifiable AI safety for humanity', url: 'https://aos-foundation.com' },
                            { icon: '✓', title: 'License Checker', desc: 'Real-time compliance', url: 'https://aos-license-checker.com' },
                            { icon: '📋', title: 'Patent Registry', desc: '99 AI governance patents', url: 'https://aos-patents.com' },
                            { icon: '📚', title: 'Git Legacy', desc: 'Multi-generational archives', url: 'https://git-legacy.com' },
                            { icon: '🏕️', title: 'Community', desc: 'Cathedral Network gathering', url: 'https://git-iscommunity.com' },
                            { icon: '🔍', title: 'HijackRadar', desc: 'Domain security monitoring', url: 'https://hijackradar.com' },
                            { icon: '⛪', title: 'Cathedral Network', desc: '15-node Git philosophy', url: 'https://git-cathedral.com' },
                        ].map(item => (
                            <a key={item.title} href={item.url} target="_blank" rel="noopener noreferrer" className="group p-5 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300 text-center">
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="font-bold text-sm mb-4">AOS Evidence Repository</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Verifiable, immutable public record of AI safety achievement.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Documents</h4>
                            <div className="space-y-2">
                                <Link to="/audit/what-we-built" className="block text-sm text-gray-500 hover:text-black transition-colors">What We Built</Link>
                                <Link to="/audit/report" className="block text-sm text-gray-500 hover:text-black transition-colors">ChatGPT Audit Report</Link>
                                <Link to="/audit/threat-model" className="block text-sm text-gray-500 hover:text-black transition-colors">Threat Model v1.0</Link>
                                <Link to="/evidence/openclaw-governance" className="block text-sm text-gray-500 hover:text-black transition-colors">OpenClaw Governance</Link>
                                <Link to="/evidence/architectural-review" className="block text-sm text-gray-500 hover:text-black transition-colors">Architectural Review</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Legal</h4>
                            <div className="space-y-2">
                                <Link to="/privacy" className="block text-sm text-gray-500 hover:text-black transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="block text-sm text-gray-500 hover:text-black transition-colors">Terms of Service</Link>
                                <Link to="/cookie-policy" className="block text-sm text-gray-500 hover:text-black transition-colors">Cookie Policy</Link>
                                <Link to="/verification" className="block text-sm text-gray-500 hover:text-black transition-colors">Verification</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4">Resources</h4>
                            <div className="space-y-2">
                                <Link to="/about" className="block text-sm text-gray-500 hover:text-black transition-colors">About</Link>
                                <a href="https://github.com/genesalvatore/aos-evidence.com" className="block text-sm text-gray-500 hover:text-black transition-colors">GitHub Repository</a>
                                <a href="https://aos-patents.com" className="block text-sm text-gray-500 hover:text-black transition-colors">Patent Registry</a>
                                <a href="https://git-cathedral.com" className="block text-sm text-gray-500 hover:text-black transition-colors">Cathedral Network</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-gray-400">
                            © 2026 AOS Foundation. Documentation: CC BY 4.0 ·{' '}
                            <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link> ·{' '}
                            <Link to="/terms" className="hover:text-black transition-colors">Terms</Link>
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                            Last updated: February 16, 2026
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
