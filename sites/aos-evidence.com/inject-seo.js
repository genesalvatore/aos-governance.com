import fs from 'fs';
import path from 'path';

function buildSEO() {
    const srcDirs = ['src/pages', 'src/components', 'src'];
    let aggregateText = '';

    function processDir(dir) {
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                processDir(fullPath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.md')) {
                // Ignore node_modules, dist, etc. if we scan broad, but here we just pass src/
                const content = fs.readFileSync(fullPath, 'utf-8');

                let text = content;
                if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                    text = text.replace(/import.*?['"];?/g, '')
                        .replace(/export /g, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/[{}[\]()=>]/g, ' ');
                }

                text = text.replace(/\s+/g, ' ').trim();
                aggregateText += text + ' ';
            }
        }
    }

    // Only run processDir once on 'src' rather than multiple overlapping dirs
    processDir(path.join(process.cwd(), 'src'));

    // IMPORTANT: Do NOT use display:none — crawlers like Perplexity skip it
    const payload = `
    <div id="seo-fallback-content" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <h2>AOS Public Record &amp; Verifiable Evidence</h2>
      <article>
        ${aggregateText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </article>
    </div>
  `;

    const indexPath = path.join(process.cwd(), 'dist/index.html');
    if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        if (!html.includes('id="seo-fallback-content"')) {
            html = html.replace('</body>', `${payload}\n</body>`);
            fs.writeFileSync(indexPath, html);
            console.log("Successfully injected SEO payload into index.html.");
        } else {
            console.log("SEO payload already exists.");
        }
    } else {
        console.log("dist/index.html not found. Proceeding without SEO injection.");
    }
}

buildSEO();
