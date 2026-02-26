import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-16 px-6 border-t border-black/5 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="space-y-4">
                        <div className="font-bold tracking-tight">AOS GOVERNANCE</div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            The open standard for verifiable AI safety. Deterministic governance for probabilistic intelligence.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Standard</div>
                        <a href="/#manifesto" className="block text-sm text-gray-600 hover:text-black transition-colors">Manifesto</a>
                        <a href="/#standard" className="block text-sm text-gray-600 hover:text-black transition-colors">Constitution</a>
                        <a href="/#how-it-works" className="block text-sm text-gray-600 hover:text-black transition-colors">How It Works</a>
                        <Link to="/why" className="block text-sm text-gray-600 hover:text-black transition-colors">Why Governance</Link>
                    </div>
                    <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Resources</div>
                        <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">GitHub Repository</a>
                        <a href="https://github.com/genesalvatore/aos-governance.com/blob/main/aos-governance/SKILL.md" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">SKILL.md</a>
                        <a href="https://www.anthropic.com/features/claude-on-mars" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">Claude on Mars</a>
                    </div>
                    <div className="space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Ecosystem</div>
                        <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">AOS Constitution</a>
                        <a href="https://aos-evidence.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">AOS Evidence</a>
                        <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">AOS Foundation</a>
                        <a href="https://github.com/genesalvatore/aos-openclaw-constitutional" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">OpenClaw Integration</a>
                        <a href="https://salvatoresystems.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-black transition-colors">Salvatore Systems</a>
                    </div>
                </div>
                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">&copy; 2026 <a href="https://aos-foundation.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">AOS Foundation</a>. An Open Standard for Verifiable AI Safety.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://salvatoresystems.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
                        <a href="https://salvatoresystems.com/cookies" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Cookies</a>
                        <span className="text-xs text-gray-400 font-mono">AOS-GOV-STD-1.0 · <a href="mailto:contact@aos-governance.com" className="hover:text-gray-600 transition-colors">contact@aos-governance.com</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
