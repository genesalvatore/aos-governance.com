import fs from 'fs';
import path from 'path';

function buildSEO() {
    const srcPagesDir = path.join(process.cwd(), 'src/pages');
    let aggregateText = '';

    // Extract text from all TSX/TS files in src/pages
    const files = fs.readdirSync(srcPagesDir);
    for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(path.join(srcPagesDir, file), 'utf-8');

            // Basic stripping of TSX boilerplate to expose the rich text
            // Removing import statements
            let text = content.replace(/import.*?['"];?/g, '');
            // Removing HTML/Component tags
            text = text.replace(/<[^>]+>/g, ' ');
            // Removing brackets and generic code syntax
            text = text.replace(/[{}[\]()=>]/g, ' ');

            // Collapse multiple spaces/newlines
            text = text.replace(/\s+/g, ' ').trim();

            aggregateText += text + ' ';
        }
    }

    // Create semantic payload — visually hidden but crawler-readable
    // IMPORTANT: Do NOT use display:none — crawlers like Perplexity skip it
    const payload = `
    <div id="seo-fallback-content" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <h2>AOS Governance Evidence &amp; Data</h2>
      <article>
        ${aggregateText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </article>
    </div>
  `;

    // Inject into index.html
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
        console.log("dist/index.html not found. Make sure to run the build first.");
    }
}

buildSEO();
