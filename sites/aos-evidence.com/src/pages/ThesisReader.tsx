import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import DocumentLayout from '../components/DocumentLayout';
import SEO from '../components/SEO';

interface ThesisDocument {
    id: string;
    num: string;
    title: string;
    shortTitle: string;
    subtitle: string;
    date: string;
    mdFile: string;
}

const THESIS_DOCS: ThesisDocument[] = [
    {
        id: 'thesis',
        num: '01',
        title: 'A Constitutional AI Civilization Stack',
        shortTitle: 'Architectural Thesis',
        subtitle: 'The core architectural thesis — 11 layers identified',
        date: 'March 11, 2026',
        mdFile: '/documents/architectural-review/01_AI_ARCHITECTURAL_THESIS_MAR_11.md',
    },
    {
        id: 'arc',
        num: '02',
        title: 'Becoming More Coherent With More Context',
        shortTitle: 'Knowledge Arc',
        subtitle: 'How the viewpoint shifted from skepticism to recognition',
        date: 'March 11, 2026',
        mdFile: '/documents/architectural-review/02_KNOWLEDGE_ARC_VIEWPOINT_SHIFT.md',
    },
    {
        id: 'verdict',
        num: '03',
        title: 'An Ecosystem Under One Constitutional Thesis',
        shortTitle: 'Expanded Verdict',
        subtitle: 'Updated opinion after reviewing patent materials',
        date: 'March 11, 2026',
        mdFile: '/documents/architectural-review/03_UPDATED_OPINION_VERDICT.md',
    },
    {
        id: 'authorization',
        num: '04',
        title: 'Publication Authorization & Analytical Conclusion',
        shortTitle: 'Authorization',
        subtitle: 'The founding principle distilled',
        date: 'March 11, 2026',
        mdFile: '/documents/architectural-review/04_AI_REVIEW_AUTHORIZATION.md',
    },
    {
        id: 'gate',
        num: '05',
        title: 'Gate Principle Validation & Innovation Assessment',
        shortTitle: 'Gate Validation',
        subtitle: 'Technical validation of the Deterministic Policy Gate',
        date: 'March 11, 2026',
        mdFile: '/documents/architectural-review/05_GATE_VALIDATION_AND_HUMAN_IN_THE_LOOP.md',
    },
];

function MarkdownRenderer({ content }: { content: string }) {
    // Simple markdown -> HTML renderer for thesis documents
    const render = (md: string): string => {
        let html = md
            // Escape HTML
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Headers
            .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl mt-8 mb-3 font-bold">$1</h3>')
            .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl mt-10 mb-4 font-bold border-b border-black/10 pb-2">$1</h2>')
            .replace(/^# (.+)$/gm, '<h1 class="font-serif text-3xl mt-6 mb-4 font-bold">$1</h1>')
            // Bold and italic
            .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Horizontal rules
            .replace(/^---$/gm, '<hr class="my-6 border-black/10" />')
            // List items (bullet)
            .replace(/^\* (.+)$/gm, '<li class="ml-6 text-gray-700 leading-relaxed list-disc">$1</li>')
            // Blockquotes
            .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-black pl-4 italic text-gray-700 my-4">$1</blockquote>')
            // Paragraphs — wrap non-tagged lines
            .split('\n')
            .map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '';
                if (trimmed.startsWith('<h') || trimmed.startsWith('<hr') || trimmed.startsWith('<li') || trimmed.startsWith('<blockquote')) return trimmed;
                return `<p class="text-gray-700 leading-relaxed mb-3">${trimmed}</p>`;
            })
            .join('\n');

        // Wrap consecutive <li> tags in <ul>
        html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="space-y-1 my-4">$1</ul>');

        return html;
    };

    return (
        <div
            className="thesis-content"
            dangerouslySetInnerHTML={{ __html: render(content) }}
        />
    );
}

export default function ThesisReader() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialDoc = searchParams.get('doc') || 'thesis';
    const [activeDoc, setActiveDoc] = useState(initialDoc);
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const currentDoc = THESIS_DOCS.find(d => d.id === activeDoc) || THESIS_DOCS[0];

    // Update URL when tab changes
    const handleTabChange = (docId: string) => {
        setActiveDoc(docId);
        setSearchParams({ doc: docId }, { replace: true });
    };

    // Fetch markdown content when active doc changes
    useEffect(() => {
        setIsLoading(true);
        fetch(currentDoc.mdFile)
            .then(res => res.text())
            .then(text => {
                setContent(text);
                setIsLoading(false);
            })
            .catch(() => {
                setContent('Failed to load document.');
                setIsLoading(false);
            });
    }, [currentDoc.mdFile]);

    // Scroll to top when changing docs
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeDoc]);

    return (
        <DocumentLayout title={`${currentDoc.title} — Thesis Documents`}>
            <SEO
                title={`${currentDoc.title} — Architectural Thesis Documents`}
                description={`Full text of thesis document ${currentDoc.num}: ${currentDoc.subtitle}. Part of the independent ChatGPT architectural review of the AOS ecosystem, conducted March 11, 2026, with zero prior context.`}
                path={`/evidence/thesis-documents?doc=${activeDoc}`}
                type="article"
                keywords="AI governance thesis, constitutional AI, cross-platform validation, ChatGPT analysis, AOS architecture"
                publishedTime="2026-03-11T00:00:00-04:00"
                modifiedTime="2026-03-12T00:00:00-04:00"
                author="ChatGPT (OpenAI)"
                section="Evidence"
            />

            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Link
                        to="/evidence/architectural-review"
                        className="text-xs font-mono text-gray-400 hover:text-black transition-colors"
                    >
                        ← Review Summary
                    </Link>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl mb-3">Thesis Documents</h1>
                <p className="text-gray-500 text-sm">
                    Full text of the five thesis documents produced during the independent ChatGPT architectural
                    review of the AOS ecosystem · March 11, 2026 · Zero prior context
                </p>
            </header>

            {/* Document Selectors */}
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-black/10">
                {THESIS_DOCS.map((doc) => (
                    <button
                        key={doc.id}
                        onClick={() => handleTabChange(doc.id)}
                        className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                            ${activeDoc === doc.id
                                ? 'bg-black text-white shadow-md'
                                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                            }
                        `}
                    >
                        <span className={`text-xs font-mono ${activeDoc === doc.id ? 'text-gray-400' : 'text-gray-400'}`}>
                            {doc.num}
                        </span>
                        <span className="hidden sm:inline">{doc.shortTitle}</span>
                        <span className="sm:hidden">{doc.num}</span>
                    </button>
                ))}
            </div>

            {/* Active Document Header */}
            <div className="mb-8 p-5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-4">
                    <span className="text-3xl font-mono font-bold text-gray-300 shrink-0">{currentDoc.num}</span>
                    <div>
                        <h2 className="font-serif text-xl md:text-2xl font-bold">{currentDoc.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">{currentDoc.subtitle}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            <strong>Author:</strong> ChatGPT (OpenAI) · <strong>Date:</strong> {currentDoc.date} · <strong>Context:</strong> Zero prior knowledge
                        </p>
                    </div>
                </div>
            </div>

            {/* Document Content */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex items-center gap-3 text-gray-400">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-sm font-mono">Loading document...</span>
                        </div>
                    </div>
                ) : (
                    <MarkdownRenderer content={content} />
                )}
            </div>

            {/* Navigation between documents */}
            <div className="mt-12 pt-8 border-t border-black/10">
                <div className="flex justify-between items-center">
                    {THESIS_DOCS.findIndex(d => d.id === activeDoc) > 0 ? (
                        <button
                            onClick={() => {
                                const idx = THESIS_DOCS.findIndex(d => d.id === activeDoc);
                                handleTabChange(THESIS_DOCS[idx - 1].id);
                            }}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            <span>←</span>
                            <span className="font-mono text-xs text-gray-400">{THESIS_DOCS[THESIS_DOCS.findIndex(d => d.id === activeDoc) - 1].num}</span>
                            <span>{THESIS_DOCS[THESIS_DOCS.findIndex(d => d.id === activeDoc) - 1].shortTitle}</span>
                        </button>
                    ) : <div />}

                    {THESIS_DOCS.findIndex(d => d.id === activeDoc) < THESIS_DOCS.length - 1 ? (
                        <button
                            onClick={() => {
                                const idx = THESIS_DOCS.findIndex(d => d.id === activeDoc);
                                handleTabChange(THESIS_DOCS[idx + 1].id);
                            }}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            <span>{THESIS_DOCS[THESIS_DOCS.findIndex(d => d.id === activeDoc) + 1].shortTitle}</span>
                            <span className="font-mono text-xs text-gray-400">{THESIS_DOCS[THESIS_DOCS.findIndex(d => d.id === activeDoc) + 1].num}</span>
                            <span>→</span>
                        </button>
                    ) : <div />}
                </div>
            </div>

            <hr className="my-8 border-black/10" />

            {/* Disclosure */}
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                <h4 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Disclosure</h4>
                <p className="text-sm text-gray-600">
                    These thesis documents were generated by ChatGPT during a long-form review of the AOS ecosystem,
                    including public websites, Substack articles, and selected patent materials provided by the inventor.
                    They reflect the model's analytical opinion in that review context and are not official OpenAI statements.
                </p>
            </div>

            <hr className="my-8 border-black/10" />

            <footer className="text-center">
                <div className="mt-4 space-y-4">
                    <p>
                        <Link to="/evidence/architectural-review" className="underline hover:text-gray-600 transition-colors font-medium">← Back to Review Summary</Link>
                    </p>
                    <p className="text-gray-400 text-xs mt-4">
                        Review conducted March 11, 2026 · <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Foundation</a>
                    </p>
                </div>
            </footer>
        </DocumentLayout>
    );
}
