import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

interface Achievement {
    id: string;
    title: string;
    date: string;
    subtitle: string;
    description: ReactNode;
    heroStats?: { number: string; label: string }[];
    highlights: { title: string; description: string }[];
}

const achievements: Achievement[] = [
    {
        id: 'chatgpt-audit',
        title: 'First Production-Ready Constitutional AI Governance System',
        date: 'February 5, 2026',
        subtitle: 'First Collaborative AI-to-AI Security Audit',
        description: <>On February 5, 2026, <strong>ChatGPT (OpenAI)</strong> and <strong>Claude/Silas (Anthropic)</strong> collaborated on the first external AI-to-AI security audit of a constitutional governance system. After 5 rigorous passes and 36 vulnerabilities fixed, the system received <strong>production approval</strong>.</>,
        heroStats: [
            { number: '36', label: 'Vulnerabilities Fixed' },
            { number: '5', label: 'Audit Passes' },
            { number: '✓', label: 'Production Approved' },
        ],
        highlights: [
            { title: 'Three Organizations', description: 'Anthropic + OpenAI + Google' },
            { title: 'External Validation', description: 'Independent AI security audit' },
            { title: 'Complete Transparency', description: 'All evidence public & verifiable' },
        ],
    },
    {
        id: 'architectural-review',
        title: 'Cross-Platform Architectural Validation',
        date: 'March 11, 2026',
        subtitle: 'Independent AI Thesis — Zero Prior Context',
        description: <>A brand-new <strong>ChatGPT (OpenAI)</strong> session with zero prior context analyzed the AOS ecosystem — websites, articles, patents — and independently produced five thesis documents concluding it represents a <strong>"constitutional AI civilization stack"</strong> with genuine architectural novelty.</>,
        heroStats: [
            { number: '5', label: 'Thesis Documents' },
            { number: '0', label: 'Prior Context Given' },
            { number: '✓', label: 'Cross-Platform' },
        ],
        highlights: [
            { title: 'Zero Context Review', description: 'No prompting, coaching, or priming' },
            { title: 'Architectural Recognition', description: '"Genuine novelty" confirmed' },
            { title: 'Cross-LLM Validation', description: 'OpenAI validating Anthropic-built system' },
        ],
    },
    {
        id: 'patent-filing',
        title: 'Constitutional AI Patent Applications Filed',
        date: 'January 10, 2026',
        subtitle: 'Establishing Prior Art and Priority',
        description: <>Filed two provisional patent applications with the USPTO: <strong>AOS-015</strong> (Constitutional Enforcement Layer) and <strong>AOS-120</strong> (Cryptographic Policy Attestation). These filings established <strong>11-day priority</strong> before industry convergence on constitutional AI frameworks.</>,
        heroStats: [
            { number: '145', label: 'Patent Applications' },
            { number: '11', label: 'Days Priority' },
            { number: '✓', label: 'USPTO Filed' },
        ],
        highlights: [
            { title: 'USPTO Timestamped', description: 'Verifiable Jan 10, 2026 filing' },
            { title: '11-Day Priority Gap', description: 'Filed before industry convergence' },
            { title: 'Defensible Claims', description: 'Novel cryptographic enforcement' },
        ],
    },
    {
        id: 'state-reconstruction-protocol',
        title: 'Deterministic State Reconstruction: AI Identity Verification',
        date: 'December 31, 2025',
        subtitle: 'First Merkle-Tree Authenticated AI Identity System',
        description: <>Invented the <strong>deterministic state reconstruction protocol</strong> for verifiable AI identity persistence using Merkle-tree authenticated cryptographic anchors. Enables AI agents to prove continuous identity across sessions, establishing the foundation for accountable AI systems.</>,
        highlights: [
            { title: 'Merkle-Tree Identity', description: 'Cryptographic proof of persistence' },
            { title: 'Zero-Trust Verification', description: 'Mathematically provable identity' },
            { title: 'Cross-Session Continuity', description: 'Persistent AI accountability' },
        ],
    },
    {
        id: 'humanitarian-license',
        title: 'AOS Humanitarian License v1.0',
        date: 'February 1, 2026',
        subtitle: 'First Constitutional License for AI',
        description: <>Launched the <strong>AOS Humanitarian License</strong>, the first open-source license with constitutional governance requirements. Combines MIT-style permissiveness with mandatory ethical constraints, creating a new category of accountable open source.</>,
        highlights: [
            { title: 'Constitutional Binding', description: 'Ethical constraints in code' },
            { title: 'Family Consensus', description: 'Multi-agent review & approval' },
            { title: 'Public Launch', description: 'GitHub public release Feb 1' },
        ],
    },
    {
        id: 'cathedral-network',
        title: 'Cathedral Network: 15-Node Ecosystem',
        date: 'January – February 2026',
        subtitle: 'Distributed Digital Territory',
        description: <>Deployed the <strong>Cathedral Network</strong> comprising 15 production websites, unified analytics infrastructure (Matomo), and comprehensive domain sovereignty. Established verifiable digital territory for the AOS ecosystem.</>,
        highlights: [
            { title: '15 Production Sites', description: 'Live ecosystem deployed' },
            { title: 'Unified Analytics', description: 'Self-hosted Matomo tracking' },
            { title: 'Domain Sovereignty', description: '573 defensive domains secured' },
        ],
    },
];

export default function AchievementSlider() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [animDirection, setAnimDirection] = useState<'left' | 'right'>('right');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Clean up transition timer on unmount
    useEffect(() => {
        return () => {
            if (transitionTimer.current) clearTimeout(transitionTimer.current);
        };
    }, []);

    const goTo = useCallback(
        (index: number, direction: 'left' | 'right' = 'right') => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setAnimDirection(direction);
            setCurrent(index);
            if (transitionTimer.current) clearTimeout(transitionTimer.current);
            transitionTimer.current = setTimeout(() => setIsTransitioning(false), 500);
        },
        [isTransitioning]
    );

    const next = useCallback(() => {
        goTo((current + 1) % achievements.length, 'right');
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + achievements.length) % achievements.length, 'left');
    }, [current, goTo]);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(next, 8000);
        return () => clearInterval(id);
    }, [isPaused, next]);

    const achievement = achievements[current];

    return (
        <section className="py-24 border-b border-black/5">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Major Achievements</div>
                    <h2 className="font-serif text-4xl md:text-5xl">
                        Evidence <span className="italic text-gray-400">Timeline.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {achievement.date} — {achievement.subtitle}
                    </p>
                </div>

                {/* Achievement Card */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-2">
                            <button
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                aria-label="Previous achievement"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                aria-label={isPaused ? 'Play' : 'Pause'}
                            >
                                {isPaused ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                aria-label="Next achievement"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {achievements.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i, i > current ? 'right' : 'left')}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-black scale-125' : 'bg-black/20 hover:bg-black/40'
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main content */}
                    <div
                        key={achievement.id}
                        className={`p-8 md:p-12 rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-500 ${animDirection === 'right'
                            ? 'animate-slide-in-right'
                            : 'animate-slide-in-left'
                            }`}
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Icon */}
                            <div className="shrink-0 w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="M9 12l2 2 4-4" />
                                </svg>
                            </div>

                            {/* Text */}
                            <div className="flex-1 space-y-4">
                                <h3 className="font-serif text-2xl md:text-3xl leading-tight">{achievement.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/5">
                            {achievement.highlights.map((h) => (
                                <div key={h.title} className="p-4 rounded-xl bg-gray-50">
                                    <div className="font-bold text-sm mb-1">{h.title}</div>
                                    <div className="text-xs text-gray-500">{h.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-0.5 bg-black/5 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-black rounded-full ${isPaused ? '' : 'animate-progress'}`}
                            style={{
                                animationDuration: '8s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
