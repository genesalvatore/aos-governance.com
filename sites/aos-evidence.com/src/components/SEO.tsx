import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    type?: string;
    keywords?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'AOS Evidence Repository';
const BASE_URL = 'https://aos-evidence.com';

export default function SEO({
    title,
    description = 'Public, verifiable evidence of the first ChatGPT-audited constitutional AI governance system. 36 vulnerabilities found and fixed. Production-approved February 5, 2026.',
    path = '/',
    type = 'website',
    keywords,
    publishedTime,
    modifiedTime,
    author,
    section,
    jsonLd,
}: SEOProps) {
    const fullTitle = title
        ? `${title} — ${SITE_NAME}`
        : `${SITE_NAME} — Verifiable AI Safety Documentation`;
    const url = `${BASE_URL}${path}`;

    const jsonLdScripts = jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
        : [];

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            {/* Article-specific OG */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}
            {section && <meta property="article:section" content={section} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="@genesalvatore" />
            <meta name="twitter:creator" content="@genesalvatore" />

            {/* JSON-LD Structured Data */}
            {jsonLdScripts.map((ld, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(ld)}
                </script>
            ))}
        </Helmet>
    );
}
