import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/why'],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 2000,
        headless: true,
      }),
      rendererOptions: {
        maxConcurrentRoutes: 1,
      },
      postProcess(renderedRoute: any) {
        // Fix title for /why page
        if (renderedRoute.route === '/why') {
          renderedRoute.html = renderedRoute.html.replace(
            '<title>AOS Governance — The Open Standard for Verifiable AI Safety</title>',
            '<title>Why AI Governance | AOS Governance</title>'
          );
        }
        return renderedRoute;
      }
    }),
  ],
})
