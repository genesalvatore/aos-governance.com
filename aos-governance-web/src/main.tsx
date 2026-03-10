import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// If react-snap has pre-rendered content, hydrate instead of full render.
// This prevents FOUC: the pre-rendered HTML is already styled via the
// CSS <link> in <head>, so the page is visible and styled immediately.
// Hydration attaches event listeners without re-rendering the DOM.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
