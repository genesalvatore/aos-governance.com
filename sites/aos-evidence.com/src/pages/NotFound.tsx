import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--canvas)] flex flex-col items-center justify-center px-6">
            <SEO title="Page Not Found" description="This page does not exist in the AOS Evidence Repository." />
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Error 404</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Page Not Found</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
                The evidence you're looking for doesn't exist at this address.
                All legitimate documents are anchored and accessible from the main repository.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                    to="/"
                    className="px-6 py-3 bg-black text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
                >
                    Return to Evidence
                </Link>
                <a
                    href="https://github.com/genesalvatore/aos-evidence.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-black/10 rounded-xl font-semibold text-sm hover:bg-black/5 transition-colors"
                >
                    View on GitHub
                </a>
            </div>
            <div className="mt-16 pt-8 border-t border-black/5">
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">AOS Evidence Repository</p>
                <p className="text-xs text-gray-300 mt-1">© 2026 AOS Foundation</p>
            </div>
        </div>
    );
}
