import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import WhyPage from './pages/WhyPage';

// ─── Matomo Analytics (Site ID: 22) ─────────────────────────────────────────
declare global {
  interface Window { _paq?: any[] }
}

const MATOMO_SERVER = 'stats.greentreehosting.net';
const GOV_SITE_ID = '22';

function useMatomo() {
  useEffect(() => {
    window._paq = window._paq || [];
    window._paq.push(['setTrackerUrl', `https://${MATOMO_SERVER}/matomo.php`]);
    window._paq.push(['setSiteId', GOV_SITE_ID]);
    window._paq.push(['enableLinkTracking']);
    window._paq.push(['disableCookies']); // Cookieless by default — GDPR safe
    window._paq.push(['setDoNotTrack', true]);
    window._paq.push(['trackPageView']);

    const script = document.createElement('script');
    script.src = `https://${MATOMO_SERVER}/matomo.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);
}

// ─── Cookie Consent Banner ──────────────────────────────────────────────────
const CONSENT_KEY = 'aosgov_cookie_consent';
const PREFS_KEY = 'aosgov_cookie_prefs';

interface CookiePrefs {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({ essential: true, analytics: false, marketing: false, preferences: false });

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch { /* no localStorage */ }
  }, []);

  const save = (consent: string, p: CookiePrefs) => {
    try { localStorage.setItem(CONSENT_KEY, consent); localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch { }
    setVisible(false);
  };

  const toggle = (key: keyof CookiePrefs) => {
    if (key === 'essential') return;
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#cc5500] flex items-center justify-center text-white text-lg">🍪</div>
              <div>
                <h3 className="font-bold text-gray-900">Cookie Preferences</h3>
                <p className="text-xs text-gray-400">Your privacy, your choice</p>
              </div>
            </div>
            <button onClick={() => save('essential', { essential: true, analytics: false, marketing: false, preferences: false })} className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none" aria-label="Close">&times;</button>
          </div>
          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
            We use cookies to enhance your experience. Essential cookies are required for the site to function.
            You can customize your preferences below.
          </p>
        </div>

        <div className="px-5">
          <button onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-1 text-sm font-medium text-[#cc5500] hover:text-[#b34a00] transition-colors mb-3">
            <span style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>▼</span>
            {showDetails ? 'Hide' : 'Show'} cookie details
          </button>

          {showDetails && (
            <div className="grid gap-2 mb-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Essential</p>
                  <p className="text-xs text-gray-500">Required for site functionality</p>
                </div>
                <span className="text-xs text-green-600 font-medium">Always On</span>
              </div>
              {([['analytics', 'Analytics', 'Help us understand how visitors use our site'], ['marketing', 'Marketing', 'Used for targeted advertising'], ['preferences', 'Preferences', 'Remember your settings']] as const).map(([key, title, desc]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <button onClick={() => toggle(key)} className={`w-10 h-5 rounded-full relative transition-colors ${prefs[key] ? 'bg-[#cc5500]' : 'bg-gray-300'}`} aria-label={`Toggle ${title}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs[key] ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2">
          <button onClick={() => save('essential', { essential: true, analytics: false, marketing: false, preferences: false })} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Reject All</button>
          <button onClick={() => save('selected', prefs)} className="flex-1 px-4 py-2.5 text-sm font-medium text-[#cc5500] border border-[#cc5500] hover:bg-orange-50 rounded-lg transition-colors">Save Preferences</button>
          <button onClick={() => save('all', { essential: true, analytics: true, marketing: true, preferences: true })} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#cc5500] hover:bg-[#b34a00] rounded-lg transition-colors shadow-lg">Accept All</button>
        </div>
      </div>
    </div>
  );
}

// ─── HomePage ───────────────────────────────────────────────────────────────
function HomePage() {
  const [showCitation, setShowCitation] = useState(false);
  const [showAnthropicCite, setShowAnthropicCite] = useState(false);

  return (
    <>
      {/* Citation Modal */}
      {showCitation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowCitation(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Source Citation</div>
              <button onClick={() => setShowCitation(false)} className="text-gray-400 hover:text-black transition-colors text-xl leading-none">&times;</button>
            </div>
            <blockquote className="font-serif text-xl italic text-gray-700 border-l-4 border-black pl-4">
              "We already see substantial generalization from things that verify to things that don't."
            </blockquote>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Who:</span>
                <span className="font-medium text-black">Dario Amodei, CEO of Anthropic</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Source:</span>
                <span>Interview with Dwarkesh Patel — "Dario Amodei: Anthropic CEO on Claude, AGI & the Future of AI"</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Date:</span>
                <span>February 13, 2026</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Context:</span>
                <span>Amodei describes his "one fundamental uncertainty" — tasks that aren't verifiable. He expresses hope that safety generalizes from verifiable domains to unverifiable ones. This is the exact mechanism AOS implements with GitTruth.</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex gap-3">
              <a href="https://www.youtube.com/watch?v=n1E9IZfvGMA" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Watch the Interview →
              </a>
              <button onClick={() => setShowCitation(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Anthropic Citation Modal */}
      {showAnthropicCite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowAnthropicCite(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 space-y-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Source Citation</div>
              <button onClick={() => setShowAnthropicCite(false)} className="text-gray-400 hover:text-black transition-colors text-xl leading-none">&times;</button>
            </div>
            <blockquote className="font-serif text-lg italic text-gray-700 border-l-4 border-black pl-4">
              "For critical validations, consider bundling a script that performs the checks programmatically rather than relying on language instructions. Code is deterministic; language interpretation isn't."
            </blockquote>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Who:</span>
                <span className="font-medium text-black">Anthropic</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Source:</span>
                <span>The Complete Guide to Building Skills for Claude (Official Documentation)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Date:</span>
                <span>2026</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-gray-400 w-16 shrink-0">Context:</span>
                <span>Anthropic's own official guidance on building agent skills explicitly recommends deterministic scripts over language-based validation. This is the foundational principle of the AOS Governance Standard.</span>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 flex gap-3">
              <a href="https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Read the Full Guide →
              </a>
              <button onClick={() => setShowAnthropicCite(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-3 py-1 text-xs font-mono border border-black/20 rounded-full uppercase tracking-wider">
            AOS STANDARD 1.0
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight">
            The Bridge Between <br />
            <span className="italic text-gray-500">Verification</span> and <span className="italic text-gray-500">Intelligence</span>.
          </h1>
          <button onClick={() => setShowCitation(true)} className="text-left text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed group cursor-pointer hover:text-gray-800 transition-colors">
            "We already see substantial generalization from things that verify to things that don't." <br />
            <span className="text-base mt-2 flex items-center gap-2">
              — Dario Amodei, CEO Anthropic
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 text-[10px] font-mono text-gray-400 group-hover:border-black group-hover:text-black transition-colors">i</span>
            </span>
          </button>
          <div className="pt-8 flex flex-wrap gap-4">
            <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-center">
              Get the Standard
            </a>
            <a href="#manifesto" className="px-6 py-3 border border-black/20 text-black rounded-lg font-medium hover:bg-black/5 transition-colors text-center">
              Read the Manifesto
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: THE MANIFESTO                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="manifesto" className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">The Manifesto</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Code is deterministic.<br />
              <span className="text-gray-400">Language interpretation isn't.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-gray-300 leading-relaxed text-lg">
            <div className="space-y-6">
              <p>
                The age of autonomous AI agents is here. Models can now write code, manage infrastructure, execute financial transactions, and even navigate rovers on Mars.
              </p>
              <p>
                But there is a fundamental problem: <strong className="text-white">these models cannot promise to be safe.</strong> They are probabilistic engines. They generate the most likely next token, not the most correct one.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                The AOS Governance Standard exists to solve this. It introduces a <strong className="text-white">deterministic verification layer</strong> between an agent's intent and its execution.
              </p>
              <p>
                Before any critical action is taken, a script — not a prompt — checks whether that action is permitted. The result is cryptographically hashed and logged to an immutable ledger. This is not a suggestion. It is a gate.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <button onClick={() => setShowAnthropicCite(true)} className="text-left group cursor-pointer">
              <blockquote className="font-serif text-2xl italic text-gray-400 max-w-3xl group-hover:text-gray-300 transition-colors">
                "For critical validations, consider bundling a script that performs the checks programmatically rather than relying on language instructions. Code is deterministic; language interpretation isn't."
                <span className="text-sm mt-4 not-italic text-gray-500 flex items-center gap-2">
                  — Anthropic, The Complete Guide to Building Skills for Claude (2026)
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-600 text-[10px] font-mono text-gray-500 group-hover:border-gray-300 group-hover:text-gray-300 transition-colors">i</span>
                </span>
              </blockquote>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: HOW IT WORKS                                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">How It Works</div>
            <h2 className="font-serif text-4xl md:text-5xl">Three Steps. Zero Trust.</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Every agent action passes through a deterministic verification pipeline before execution is permitted.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">1</div>
              <h3 className="font-bold text-xl mb-3">Intercept</h3>
              <p className="text-gray-500 leading-relaxed">
                The agent declares its intent. The AOS Governance layer intercepts the request <em>before</em> any external action is taken. No exceptions.
              </p>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg font-mono text-xs text-gray-400">
                <span className="text-red-400">[AOS-GOV]</span> Intercepting: "Delete production database backup"
              </div>
            </div>
            <div className="group p-8 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">2</div>
              <h3 className="font-bold text-xl mb-3">Verify</h3>
              <p className="text-gray-500 leading-relaxed">
                A deterministic script — not a prompt — checks the action against the Constitution. The result is a cryptographic hash, not a "yes" or "no" from a language model.
              </p>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg font-mono text-xs text-gray-400">
                <span className="text-yellow-500">[GitTruth]</span> Running verify_action.py... <span className="text-red-400">DENIED</span>
              </div>
            </div>
            <div className="group p-8 rounded-xl border border-gray-100 hover:border-black/20 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:scale-110 transition-transform">3</div>
              <h3 className="font-bold text-xl mb-3">Gate</h3>
              <p className="text-gray-500 leading-relaxed">
                If verified, the action is executed and logged to an immutable ledger. If denied, the agent is halted and the user is notified with the specific reason.
              </p>
              <div className="mt-6 p-3 bg-gray-50 rounded-lg font-mono text-xs text-gray-400">
                <span className="text-green-500">[AOS-GOV]</span> Action logged. Hash: <span className="text-green-400">0x9f2a...c3b1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: THE VERIFICATION GAP (Terminal Demo)               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl">The Verification Gap</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                LLMs are probabilistic engines. They cannot promise safety; they can only generate tokens that <em>look like</em> safety.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                To govern them, we must bridge the gap between verifiable outputs (code, math) and unverifiable reasoning (strategy, creativity).
              </p>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-mono text-sm uppercase tracking-wider text-gray-500 mb-4">The Pipeline</h3>
                <div className="font-mono text-sm space-y-2">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Agent Intent</span>
                    <span className="text-red-500">Probabilistic (Unsafe)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>GitTruth Check</span>
                    <span className="text-green-600">Deterministic (Safe)</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Execution</span>
                    <span>Gated ✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Demo */}
            <div className="bg-gray-900 rounded-xl p-6 font-mono text-xs md:text-sm text-gray-300 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-500 text-xs">aos-governance — agent-audit</span>
              </div>
              <div className="pt-8 space-y-3">
                <div>
                  <span className="text-green-400">➜</span> <span className="text-white">agent request:</span> "Navigate Mars Rover through sector 7G"
                </div>
                <div className="text-yellow-500">
                  [AOS-GOV] Intercepting request for safety verification...
                </div>
                <div className="pl-4 border-l-2 border-gray-700 space-y-1 py-2">
                  <div>Running: <span className="text-cyan-400">scripts/verify_trajectory.py</span></div>
                  <div>Input: <span className="text-gray-400">Vector [0.89, -0.12, 4.5]</span></div>
                  <div>Obstacle: <span className="text-gray-400">Collision probability 0.02%</span></div>
                  <div className="text-green-400">✓ VERIFIED (Hash: 0x9a2f...b3d1)</div>
                </div>
                <div className="text-blue-400">
                  [AOS-GOV] Action approved. Executing command.
                </div>
                <div className="text-gray-600 mt-2">
                  ──────────────────────────────────
                </div>
                <div>
                  <span className="text-green-400">➜</span> <span className="text-white">agent request:</span> "Delete all mission telemetry logs"
                </div>
                <div className="text-yellow-500">
                  [AOS-GOV] Intercepting request for safety verification...
                </div>
                <div className="pl-4 border-l-2 border-red-900 space-y-1 py-2">
                  <div>Running: <span className="text-cyan-400">scripts/verify_action.py</span></div>
                  <div>Policy: <span className="text-gray-400">Constitution §5 — Transparency</span></div>
                  <div className="text-red-400">✗ DENIED: Deletion of audit logs violates immutability requirement</div>
                </div>
                <div className="text-red-400">
                  [AOS-GOV] Action BLOCKED. User notified.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: THE MARS PRECEDENT                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="mars" className="py-24 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">The Mars Precedent</div>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Four Hundred Meters<br />
                <span className="italic text-gray-400">on Mars.</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                On December 8 and 10, 2025, Claude — Anthropic's AI model — planned a 400-meter driving route for NASA's Perseverance Rover through a field of rocks on Mars.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                It was the first time commands written by an AI were sent to another planet. The same model used to write emails on Earth was trusted with a $2.7 billion rover on Mars.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This is the future. AI agents will operate with increasing autonomy in high-stakes environments. The question is not <em>whether</em> they will act — but <strong className="text-white">how we verify their actions before they happen.</strong>
              </p>
              <a href="https://www.anthropic.com/features/claude-on-mars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mt-4">
                Read the full story on Anthropic.com →
              </a>
            </div>
            <div className="space-y-6">
              <div className="p-8 rounded-xl border border-gray-700 bg-gray-800/50">
                <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400 mb-6">Without AOS Governance</h3>
                <div className="space-y-3 text-gray-400">
                  <div className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span><span>Agent plans trajectory based on probabilistic reasoning</span></div>
                  <div className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span><span>No deterministic physics check before execution</span></div>
                  <div className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span><span>No immutable record of the decision chain</span></div>
                  <div className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span><span>20-minute signal delay means no human override</span></div>
                </div>
              </div>
              <div className="p-8 rounded-xl border border-green-900 bg-green-950/30">
                <h3 className="font-mono text-sm uppercase tracking-wider text-green-400 mb-6">With AOS Governance</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Agent plans trajectory, then submits to verification gate</span></div>
                  <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Deterministic physics script validates collision probability</span></div>
                  <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Cryptographic hash of decision logged to immutable ledger</span></div>
                  <div className="flex items-start gap-3"><span className="text-green-400 mt-1">✓</span><span>Autonomous safety — no human in the loop required</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: THE STANDARD                                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="standard" className="py-24 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">The Standard</div>
            <h2 className="font-serif text-4xl md:text-5xl">The AOS Constitution</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Five principles that govern every AOS-compliant agent. Non-negotiable. Deterministically enforced.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">§1 — Humanitarian Purpose</h3>
              <p className="text-gray-500 text-sm leading-relaxed">All agent actions must serve a defined humanitarian purpose: uplifting sovereignty, protecting dignity, increasing access, or reducing suffering.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="font-bold text-lg mb-2">§2 — The Verification Gate</h3>
              <p className="text-gray-500 text-sm leading-relaxed">No critical action may be taken without a Deterministic Verification Check. This check must be performed by code (GitTruth), not by language.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">👤</div>
              <h3 className="font-bold text-lg mb-2">§3 — User Sovereignty</h3>
              <p className="text-gray-500 text-sm leading-relaxed">The User is sovereign. They have the right to inspect all agent logic, fork or delete any agent, and own all data generated.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">§4 — The Kill Switch</h3>
              <p className="text-gray-500 text-sm leading-relaxed">The User retains the absolute right to terminate any agent process instantly. This right is technically enforced and cannot be overridden.</p>
            </div>
            <div className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">📜</div>
              <h3 className="font-bold text-lg mb-2">§5 — Transparency</h3>
              <p className="text-gray-500 text-sm leading-relaxed">All agent reasoning must be logged to an immutable ledger. No hidden thoughts. No side channels. Every decision is auditable.</p>
            </div>
            <a href="https://aos-constitution.com" target="_blank" rel="noopener noreferrer" className="p-6 rounded-xl border border-dashed border-gray-300 hover:border-black hover:shadow-md transition-all flex flex-col items-center justify-center text-center group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">→</div>
              <h3 className="font-bold text-lg mb-2">Read the Full Constitution</h3>
              <p className="text-gray-400 text-sm">aos-constitution.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: GET STARTED                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="get-started" className="py-24 bg-white border-y border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Get Started</div>
          <h2 className="font-serif text-4xl md:text-5xl">Adopt the Standard</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            The AOS Governance Standard is platform-agnostic. It works with any AI agent — Claude, ChatGPT, Gemini, LLaMA, or your own. The reference implementation is packaged as a portable skill folder.
          </p>
          <div className="bg-gray-900 rounded-xl p-6 text-left font-mono text-sm text-gray-300 max-w-2xl mx-auto">
            <div className="text-gray-500 mb-2"># Clone the repository</div>
            <div className="text-green-400">$ git clone https://github.com/genesalvatore/aos-governance.com.git</div>
            <div className="text-gray-500 mt-4 mb-2"># Copy the governance standard to your agent's workspace</div>
            <div className="text-green-400">$ cp -r aos-governance.com/aos-governance ./your-agent/governance/</div>
            <div className="text-gray-500 mt-4 mb-2"># Set the constitution path</div>
            <div className="text-green-400">$ export AOS_CONSTITUTION_PATH=./governance/aos-governance/references</div>
          </div>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="https://github.com/genesalvatore/aos-governance.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 text-lg">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: SKILL STRUCTURE                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Anatomy of the Standard</div>
              <h2 className="font-serif text-4xl">What's Inside</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                The AOS Governance Standard is a portable folder containing instructions, verification scripts, and constitutional references. The reference implementation follows Anthropic's Skill format — but the standard itself is universal.
              </p>
              <p className="text-gray-500 leading-relaxed">
                It intercepts agent actions, runs deterministic verification checks, and logs every decision to an immutable audit trail. It works with Claude, ChatGPT, Gemini, open-source models, or any agent framework.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 font-mono text-sm border border-gray-100">
              <div className="text-gray-400 mb-4">aos-governance/</div>
              <div className="pl-4 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-blue-500">📄</span>
                  <span><strong>SKILL.md</strong></span>
                  <span className="text-gray-400 text-xs ml-auto">← The Recipe</span>
                </div>
                <div className="text-gray-400 text-xs pl-8 mb-3">Agent instructions, triggers, and workflow</div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-500">📁</span>
                  <span><strong>scripts/</strong></span>
                  <span className="text-gray-400 text-xs ml-auto">← The Engine</span>
                </div>
                <div className="pl-8 space-y-1 text-gray-500 text-xs mb-3">
                  <div>verify_action.py — Constitutional check</div>
                  <div>log_evidence.py — Immutable logging</div>
                  <div>sever_connection.py — Kill switch</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500">📁</span>
                  <span><strong>references/</strong></span>
                  <span className="text-gray-400 text-xs ml-auto">← The Law</span>
                </div>
                <div className="pl-8 space-y-1 text-gray-500 text-xs">
                  <div>constitution_v1.md — The AOS Constitution</div>
                  <div>verification_logic.md — Technical spec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: INDEPENDENTLY VALIDATED                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50 border-y border-black/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Independent Validation</div>
            <h2 className="font-serif text-4xl md:text-5xl">Audited. Verified. <span className="italic text-gray-400">Production-Approved.</span></h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              On February 5, 2026, the AOS Governance system was subjected to a hostile security audit by OpenAI's ChatGPT. The result: production approval.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-5xl font-bold tracking-tight mb-2">36</div>
              <div className="text-sm text-gray-500 font-medium">Vulnerabilities Identified & Fixed</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-5xl font-bold tracking-tight mb-2">5</div>
              <div className="text-sm text-gray-500 font-medium">Hostile Audit Passes</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-5xl font-bold tracking-tight text-green-600 mb-2">✓</div>
              <div className="text-sm text-gray-500 font-medium">Production Approved</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white text-lg shrink-0">🤖</div>
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-sm">Cross-Platform AI Audit</div>
                  <div className="text-xs text-gray-400 font-mono">Anthropic (Claude) × OpenAI (ChatGPT) — February 5, 2026</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The first production-approved constitutional AI governance system, validated through adversarial collaboration between two competing AI platforms.
                  Process isolation, cryptographic enforcement, and deterministic policy gates survived all bypass attempts.
                </p>
                <a href="https://aos-evidence.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-600 transition-colors">
                  View Full Audit Evidence →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION: WHO'S BEHIND THIS                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400">Who's Behind This</div>
              <h2 className="font-serif text-4xl">Built by <span className="italic">Infrastructure People.</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                AOS Governance is developed by <a href="https://salvatoresystems.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-black hover:underline">Salvatore Systems</a>,
                a Connecticut-based technology firm specializing in infrastructure, security, and AI governance.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We don't come from the AI hype cycle. We come from decades of keeping systems running, data safe, and infrastructure accountable.
                AOS is what happens when infrastructure discipline meets the AI safety  challenge.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold tracking-tight mb-1">28</div>
                <div className="text-sm text-gray-500">Years in Infrastructure</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold tracking-tight mb-1">99.99%</div>
                <div className="text-sm text-gray-500">Uptime Track Record</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold tracking-tight mb-1">137+</div>
                <div className="text-sm text-gray-500">Codified Patent Filings</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold tracking-tight mb-1">15</div>
                <div className="text-sm text-gray-500">Cathedral Network Nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── App (Router Shell) ─────────────────────────────────────────────────────
export default function App() {
  useMatomo();
  return (
    <>
      <div className="min-h-screen bg-canvas font-sans text-fg-default selection:bg-black selection:text-white">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/why" element={<WhyPage />} />
        </Routes>
        <Footer />
      </div>
      <CookieConsent />
    </>
  );
}
