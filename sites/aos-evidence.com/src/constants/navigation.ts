// ─── Shared Navigation Data ─────────────────────────────────────────────────
// Single source of truth for nav links used across HomePage and DocumentLayout.
// Design stays per-component (different layouts for hero vs document pages).

export const NAV_LINKS = {
    internal: [
        { label: 'Documents', href: '#documents', hashOnly: true },
        { label: 'Verification', to: '/verification' },
        { label: 'Timeline', href: '#timeline', hashOnly: true },
        { label: 'About', to: '/about' },
    ],
    ecosystem: [
        { label: 'Constitution', url: 'https://aos-constitution.com' },
        { label: 'Governance', url: 'https://aos-governance.com' },
        { label: 'Foundation', url: 'https://aos-foundation.com' },
    ],
    github: 'https://github.com/genesalvatore/aos-evidence.com',
} as const;

export const FOOTER_LINKS = {
    documents: [
        { label: 'What We Built', to: '/audit/what-we-built' },
        { label: 'ChatGPT Audit Report', to: '/audit/report' },
        { label: 'Threat Model v1.0', to: '/audit/threat-model' },
    ],
    legal: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Cookie Policy', to: '/cookie-policy' },
        { label: 'Verification', to: '/verification' },
    ],
    resources: [
        { label: 'About', to: '/about' },
        { label: 'GitHub Repository', href: 'https://github.com/genesalvatore/aos-evidence.com' },
        { label: 'Cathedral Network', href: 'https://git-cathedral.com' },
    ],
} as const;

export const ECOSYSTEM_SITES = [
    { icon: '📜', title: 'Constitution', desc: 'Constitutional AI framework', url: 'https://aos-constitution.com' },
    { icon: '⚖️', title: 'Governance', desc: 'Verifiable governance standard', url: 'https://aos-governance.com' },
    { icon: '🏛️', title: 'Foundation', desc: 'Verifiable AI safety for humanity', url: 'https://aos-foundation.com' },
    { icon: '✓', title: 'License Checker', desc: 'Real-time compliance', url: 'https://aos-license-checker.com' },
    { icon: '📚', title: 'Git Legacy', desc: 'Multi-generational archives', url: 'https://git-legacy.com' },
    { icon: '🏕️', title: 'Community', desc: 'Cathedral Network gathering', url: 'https://git-iscommunity.com' },
    { icon: '🔍', title: 'HijackRadar', desc: 'Domain security monitoring', url: 'https://hijackradar.com' },
    { icon: '⛪', title: 'Cathedral Network', desc: '15-node Git philosophy', url: 'https://git-cathedral.com' },
] as const;
