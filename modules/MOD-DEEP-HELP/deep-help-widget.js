/**
 * MOD-DEEP-HELP — Embeddable Floating "?" Help Drawer & Full Godfather Documentation Modal
 * Drop into any Web App (e.g., oneem.sonitor.com, compliancepro-sonitor) or Commercial Spoke:
 *   <script src="https://command.greentreehosting.com/widget/deep-help.js"
 *           data-site-key="oneem-sonitor"
 *           data-user-role="user"
 *           data-pinboard-access="true"></script>
 */
(function () {
  if (typeof window === 'undefined' || window.__GT_DEEP_HELP_LOADED__) return;
  window.__GT_DEEP_HELP_LOADED__ = true;

  const scriptEl = document.currentScript;
  const siteKey = (scriptEl && scriptEl.getAttribute('data-site-key')) || window.GT_SITE_KEY || 'oneem-sonitor';
  const userRole = (scriptEl && scriptEl.getAttribute('data-user-role')) || window.GT_USER_ROLE || 'user';
  const pinboardAccess = ((scriptEl && scriptEl.getAttribute('data-pinboard-access')) || 'true') !== 'false';
  const commandHost = (scriptEl && scriptEl.getAttribute('data-command-host')) || 'https://command.greentreehosting.com';

  let catalogData = null;
  let activeTopicId = 'getting-started';
  let viewMode = 'summary'; // 'summary' | 'complete'
  let searchQuery = '';

  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const style = document.createElement('style');
  style.textContent = `
    .gt-dh-fab {
      position: fixed; bottom: 22px; left: 22px; z-index: 99998;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 16px; border-radius: 999px;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: #fff; font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px; font-weight: 700; border: 1px solid rgba(255,255,255,0.22);
      box-shadow: 0 10px 28px rgba(124, 58, 237, 0.42);
      cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .gt-dh-fab:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(124, 58, 237, 0.55); }
    .gt-dh-backdrop {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(9, 13, 24, 0.76); backdrop-filter: blur(6px);
      display: none; align-items: center; justify-content: center; padding: 24px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .gt-dh-backdrop.open { display: flex; }
    .gt-dh-modal {
      width: 100%; max-width: 1220px; height: 86vh;
      background: #ffffff; color: #1e293b; border-radius: 16px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.45);
      display: flex; flex-direction: column; overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.className = 'gt-dh-fab';
  fab.innerHTML = '<span>❓</span><span>Help & Documentation</span>';
  fab.title = 'Open Multi-Level Documentation (Summary & Complete Guide)';

  const backdrop = document.createElement('div');
  backdrop.className = 'gt-dh-backdrop';

  async function loadCatalog() {
    try {
      const res = await fetch(`${commandHost}/api/command/deep-help?siteKey=${encodeURIComponent(siteKey)}&role=${encodeURIComponent(userRole)}&pinboardAccess=${pinboardAccess}`);
      const data = await res.json();
      if (data && data.ok) {
        catalogData = data.catalog;
        if (catalogData.categories && catalogData.categories[0] && catalogData.categories[0].topics[0]) {
          activeTopicId = catalogData.categories[0].topics[0].id;
        }
      }
    } catch (err) {
      console.warn('[MOD-DEEP-HELP] Fallback offline mode:', err);
    }
  }

  function renderModal() {
    if (!catalogData) {
      backdrop.innerHTML = `<div class="gt-dh-modal" style="padding:32px;align-items:center;justify-content:center;">Loading Documentation...</div>`;
      return;
    }
    const allTopics = [];
    catalogData.categories.forEach(cat => cat.topics.forEach(t => allTopics.push(t)));
    const activeTopic = allTopics.find(t => t.id === activeTopicId) || allTopics[0];
    const isComplete = viewMode === 'complete';

    backdrop.innerHTML = `
      <div class="gt-dh-modal">
        <div style="padding:18px 26px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:#f8fafc;">
          <div>
            <div style="font-size:22px;font-weight:800;color:#0f172a;">${escHtml(catalogData.docTitle)}</div>
            <div style="font-size:13px;color:#64748b;margin-top:2px;">${escHtml(catalogData.docSubtitle)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;background:#ede9fe;color:#6d28d9;text-transform:uppercase;">Role: ${escHtml(userRole)}</span>
            <button id="gt-dh-close" style="padding:7px 14px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-weight:700;cursor:pointer;">✕ Close</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:280px 1fr;flex:1;overflow:hidden;">
          <div style="border-right:1px solid #e2e8f0;padding:16px;overflow-y:auto;background:#fcfcfd;">
            <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px;">Contents</div>
            <input id="gt-dh-search" type="text" placeholder="Search documentation..." value="${escHtml(searchQuery)}" style="width:100%;padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:12.5px;margin-bottom:14px;box-sizing:border-box;" />
            ${catalogData.categories.map(cat => {
              const filtered = cat.topics.filter(t => !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
              if (!filtered.length) return '';
              return `
                <div style="margin-bottom:14px;">
                  <div style="font-size:10.5px;font-weight:800;color:#64748b;letter-spacing:0.06em;padding:4px 8px;margin-bottom:4px;">${escHtml(cat.label)}</div>
                  ${filtered.map(t => {
                    const isActive = t.id === (activeTopic && activeTopic.id);
                    return `
                      <button data-topic-id="${escHtml(t.id)}" style="width:100%;text-align:left;padding:8px 10px;border-radius:8px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:13px;font-weight:${isActive ? '700' : '500'};background:${isActive ? 'linear-gradient(90deg,#9333ea,#7c3aed)' : 'transparent'};color:${isActive ? '#fff' : '#334155'};margin-bottom:2px;">
                        <span><span style="margin-right:7px;">${escHtml(t.icon || '📘')}</span>${escHtml(t.title)}</span>
                        ${t.badge ? `<span style="font-size:10px;padding:1px 6px;border-radius:99px;background:${isActive ? 'rgba(255,255,255,0.22)' : '#f3e8ff'};color:${isActive ? '#fff' : '#7c3aed'};">${escHtml(t.badge)}</span>` : ''}
                      </button>
                    `;
                  }).join('')}
                </div>
              `;
            }).join('')}
          </div>
          <div style="padding:26px 34px;overflow-y:auto;background:#ffffff;">
            ${activeTopic ? `
              <div style="padding:14px 18px;border-radius:12px;background:${isComplete ? 'linear-gradient(90deg,#f5f3ff,#eff6ff)' : 'linear-gradient(90deg,#faf5ff,#f5f3ff)'};border:1px solid ${isComplete ? '#c4b5fd' : '#e9d5ff'};display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;">
                <div>
                  <div style="font-size:14px;font-weight:800;color:#1e1b4b;">
                    ${isComplete ? '✨ 📚 Complete Guide' : '✨ 📖 Summary View'}
                  </div>
                  <div style="font-size:12.5px;color:#475569;margin-top:2px;">
                    ${isComplete ? 'In-depth documentation with detailed examples, callouts, and step-by-step instructions' : 'Quick overview with key points and essential information'}
                  </div>
                  ${!isComplete ? `<div style="font-size:11.5px;color:#6d28d9;margin-top:6px;">ⓘ 💡 <strong>Complete Guide available:</strong> Toggle on the right for detailed documentation with examples, troubleshooting, and best practices</div>` : ''}
                </div>
                <button id="gt-dh-toggle-mode" style="padding:8px 16px;border-radius:999px;border:1px solid #7c3aed;background:${isComplete ? '#7c3aed' : '#ffffff'};color:${isComplete ? '#ffffff' : '#6d28d9'};font-weight:700;font-size:12.5px;cursor:pointer;white-space:nowrap;">
                  ${isComplete ? '● Switch to Summary View' : '○ Toggle to view Full Guide →'}
                </button>
              </div>
              <div style="text-align:center;margin-bottom:28px;">
                <div style="width:56px;height:56px;border-radius:50%;background:#f3e8ff;color:#7c3aed;display:inline-flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:10px;">${escHtml(activeTopic.icon || '📘')}</div>
                <h2 style="margin:0;font-size:28px;font-weight:800;color:#0f172a;">${escHtml(activeTopic.title)}</h2>
                <p style="margin:6px auto 0;max-width:640px;font-size:14.5px;color:#64748b;">${escHtml(activeTopic.subtitle)}</p>
              </div>
              ${!isComplete ? `
                <div style="padding:20px;border-radius:12px;background:#faf5ff;border:1px solid #e9d5ff;margin-bottom:20px;">
                  <div style="font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:6px;">📖 ${escHtml(activeTopic.summary.leadTitle)}</div>
                  <p style="margin:0 0 14px;font-size:14px;color:#334155;line-height:1.6;">${escHtml(activeTopic.summary.leadText)}</p>
                  <div style="display:grid;gap:12px;">
                    ${(activeTopic.summary.highlights || []).map(h => `
                      <div style="padding:14px 16px;border-radius:10px;background:#ffffff;border:1px solid #ddd6fe;">
                        <div style="font-size:14px;font-weight:700;color:#5b21b6;margin-bottom:4px;">${escHtml(h.icon || '✨')} ${escHtml(h.title)}</div>
                        <div style="font-size:13.5px;color:#475569;line-height:1.55;">${escHtml(h.text)}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div style="padding:20px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;margin-bottom:20px;">
                  <div style="font-size:15px;font-weight:800;color:#0f172a;margin-bottom:8px;">📚 Complete Operational Guide</div>
                  <p style="margin:0 0 16px;font-size:14px;color:#334155;line-height:1.65;">${escHtml(activeTopic.complete.overview)}</p>
                  ${(activeTopic.complete.steps || []).map(s => `
                    <div style="padding:14px 16px;border-radius:10px;background:#ffffff;border:1px solid #e2e8f0;margin-bottom:10px;display:flex;gap:12px;">
                      <div style="width:28px;height:28px;border-radius:50%;background:#7c3aed;color:#fff;font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${escHtml(s.step)}</div>
                      <div>
                        <div style="font-size:14px;font-weight:700;color:#0f172a;">${escHtml(s.title)}</div>
                        <div style="font-size:13.5px;color:#475569;margin-top:3px;line-height:1.55;">${escHtml(s.detail)}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            ` : ''}
          </div>
        </div>
      </div>
    `;

    const closeBtn = backdrop.querySelector('#gt-dh-close');
    if (closeBtn) closeBtn.onclick = () => backdrop.classList.remove('open');

    const toggleBtn = backdrop.querySelector('#gt-dh-toggle-mode');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        viewMode = viewMode === 'summary' ? 'complete' : 'summary';
        renderModal();
      };
    }

    const searchInput = backdrop.querySelector('#gt-dh-search');
    if (searchInput) {
      searchInput.oninput = (e) => {
        searchQuery = e.target.value;
        renderModal();
      };
    }

    backdrop.querySelectorAll('[data-topic-id]').forEach(btn => {
      btn.onclick = () => {
        activeTopicId = btn.getAttribute('data-topic-id');
        renderModal();
      };
    });
  }

  fab.onclick = async () => {
    backdrop.classList.add('open');
    if (!catalogData) await loadCatalog();
    renderModal();
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(fab);
    document.body.appendChild(backdrop);
  });
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    document.body.appendChild(fab);
    document.body.appendChild(backdrop);
  }
})();
