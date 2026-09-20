/**
 * Cookie consent. Stores {v, necessary, analytics, marketing, ts} in a
 * first-party cookie. Nothing optional loads before consent.
 */
export interface Consent { v: number; necessary: true; analytics: boolean; marketing: boolean; ts: number }
type Category = 'analytics' | 'marketing';

const EVENT = 'nlhr:consent';
let cookieName = 'nlhr_consent';
let maxAgeDays = 365;
let cleanup: Array<() => void> = [];

export function readConsent(): Consent | null {
  const m = document.cookie.match(new RegExp('(?:^|; )' + cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  if (!m) return null;
  try { const c = JSON.parse(decodeURIComponent(m[1])); return c && c.v === 1 ? (c as Consent) : null; } catch { return null; }
}

function writeConsent(c: Consent) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${maxAgeDays * 86400}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: c }));
}

export function hasConsent(cat: Category): boolean {
  const c = readConsent();
  return Boolean(c && c[cat]);
}

export function onConsent(cb: (c: Consent) => void) {
  const c = readConsent();
  if (c) cb(c);
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

let analyticsLoaded = false;
function loadAnalytics(root: HTMLElement) {
  if (analyticsLoaded) return;
  const provider = root.dataset.analyticsProvider;
  if (!provider) return;
  if (provider === 'plausible') {
    const s = document.createElement('script');
    s.defer = true;
    s.src = root.dataset.analyticsSrc || 'https://plausible.io/js/script.js';
    s.setAttribute('data-domain', root.dataset.analyticsDomain || location.hostname);
    document.head.appendChild(s);
    analyticsLoaded = true;
  } else if (root.dataset.analyticsSrc) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = root.dataset.analyticsSrc;
    document.head.appendChild(s);
    analyticsLoaded = true;
  }
}

export function initConsent() {
  cleanup.forEach((f) => f());
  cleanup = [];
  const root = document.querySelector<HTMLElement>('[data-consent]');
  if (!root) return;
  cookieName = root.dataset.cookieName || cookieName;
  maxAgeDays = parseInt(root.dataset.maxAgeDays || '365', 10);
  const views = { main: root.querySelector<HTMLElement>('[data-consent-view="main"]')!, settings: root.querySelector<HTMLElement>('[data-consent-view="settings"]')! };
  const toggles = Array.from(root.querySelectorAll<HTMLInputElement>('[data-consent-cat]'));

  const show = (view: 'main' | 'settings') => {
    root.hidden = false;
    views.main.hidden = view !== 'main';
    views.settings.hidden = view !== 'settings';
    if (view === 'settings') {
      const c = readConsent();
      toggles.forEach((t) => { t.checked = Boolean(c && c[t.dataset.consentCat as Category]); });
      window.setTimeout(() => toggles[0]?.focus(), 50);
    } else window.setTimeout(() => root.querySelector<HTMLElement>('[data-consent-action="accept"]')?.focus(), 50);
  };
  const hide = () => { root.hidden = true; };
  const apply = (c: Consent) => { writeConsent(c); if (c.analytics) loadAnalytics(root); hide(); };
  const base = (): Consent => ({ v: 1, necessary: true, analytics: false, marketing: false, ts: Date.now() });

  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-consent-action]');
    if (!btn) return;
    const action = btn.dataset.consentAction;
    if (action === 'accept') apply({ ...base(), analytics: true, marketing: true });
    else if (action === 'reject') apply(base());
    else if (action === 'settings') show('settings');
    else if (action === 'back') show('main');
    else if (action === 'save') {
      const c = base();
      toggles.forEach((t) => { c[t.dataset.consentCat as Category] = t.checked; });
      apply(c);
    }
  };
  root.addEventListener('click', onClick);
  cleanup.push(() => root.removeEventListener('click', onClick));

  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !root.hidden && readConsent()) hide(); };
  document.addEventListener('keydown', onKey);
  cleanup.push(() => document.removeEventListener('keydown', onKey));

  const openers = Array.from(document.querySelectorAll<HTMLElement>('[data-consent-open]'));
  openers.forEach((o) => { const h = (e: Event) => { e.preventDefault(); show('settings'); }; o.addEventListener('click', h); cleanup.push(() => o.removeEventListener('click', h)); });

  const existing = readConsent();
  if (!existing) show('main');
  else if (existing.analytics) loadAnalytics(root);

  (window as unknown as { nlhrConsent: unknown }).nlhrConsent = { read: readConsent, has: hasConsent, open: () => show('settings') };
}
