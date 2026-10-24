import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/',
        '/audit/what-we-built',
        '/audit/report',
        '/audit/threat-model',
        '/verification',
        '/about',
        '/license',
        '/learn/constitutional-ai',
        '/evidence/openclaw-governance',
        '/evidence/architectural-review',
        '/evidence/thesis-documents',
      ],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 5000,
        headless: true,
      }),
      rendererOptions: {
        maxConcurrentRoutes: 1,
      },
    }),
  ],
})

