// Clean up any accidental Object.prototype pollution and install non-enumerable setter
try {
  if (typeof Object !== 'undefined' && Object.prototype) {
    delete (Object.prototype as unknown as Record<string, unknown>).fetch;
  }
  if (typeof EventTarget !== 'undefined' && EventTarget.prototype) {
    delete (EventTarget.prototype as unknown as Record<string, unknown>).fetch;
  }

  const _origFetch = typeof window !== 'undefined' ? window.fetch : null;
  let _curFetch = _origFetch;

  const fetchDescriptor = {
    configurable: true,
    enumerable: false, // strictly non-enumerable like native browser APIs
    get: () => _curFetch,
    set: (fn: typeof fetch) => {
      _curFetch = fn;
    },
  };

  if (typeof window !== 'undefined') {
    try {
      Object.defineProperty(window, 'fetch', fetchDescriptor);
    } catch {}
  }

  if (typeof Window !== 'undefined' && Window.prototype) {
    try {
      Object.defineProperty(Window.prototype, 'fetch', fetchDescriptor);
    } catch {}
  }
} catch {
  // Silent fallback
}

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CmsProvider } from './context/CmsContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <CmsProvider>
    <App />
  </CmsProvider>
);
