/**
 * Inline Calendly embed on the contact page. Calendly is a third-party service,
 * so the widget only loads once the visitor has accepted marketing cookies; until
 * then the block shows the same notice and the plain link that always works.
 */
import { hasConsent, onConsent } from './consent';

const SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
let cleanup: Array<() => void> = [];
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    if (existing) { resolve(); return; }
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('calendly'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

interface CalendlyApi { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void }

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-calendly]');
  const url = root?.dataset.url;
  if (!root || !url) return;
  const frame = root.querySelector<HTMLElement>('[data-calendly-frame]');
  const gate = root.querySelector<HTMLElement>('[data-calendly-gate]');
  if (!frame) return;

  let mounted = false;
  const mount = async () => {
    if (mounted || !hasConsent('marketing')) return;
    mounted = true;
    try {
      await loadScript();
      const api = (window as unknown as { Calendly?: CalendlyApi }).Calendly;
      if (!api || !document.body.contains(frame)) return;
      frame.innerHTML = '';
      api.initInlineWidget({ url, parentElement: frame });
      root.classList.add('is-embedded');
      if (gate) gate.hidden = true;
    } catch {
      // The plain link below stays, so the visitor can still book.
      mounted = false;
    }
  };

  mount();
  const off = onConsent(() => { mount(); });
  cleanup.push(() => { if (typeof off === 'function') off(); root.classList.remove('is-embedded'); });
}

function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
