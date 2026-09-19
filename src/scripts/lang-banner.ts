/** Suggests the visitor's browser language without forcing it. */
let cleanup: Array<() => void> = [];

export function initLangBanner() {
  cleanup.forEach((f) => f());
  cleanup = [];
  const el = document.querySelector<HTMLElement>('[data-lang-banner]');
  if (!el) return;
  const current = el.dataset.current || 'en';
  const key = el.dataset.storageKey || 'nlhr_lang_banner';
  let stored: string | null = null;
  try { stored = localStorage.getItem(key); } catch { /* storage blocked */ }
  if (stored) return; // dismissed or a language was chosen explicitly

  const texts = JSON.parse(el.dataset.texts || '{}') as Record<string, { text: string; switch: string; dismiss: string; close: string }>;
  const alternates = JSON.parse(el.dataset.alternates || '{}') as Record<string, string>;
  const supported = Object.keys(alternates);
  const preferred = (navigator.languages || [navigator.language]).map((l) => l.toLowerCase().split('-')[0]).find((l) => supported.includes(l));
  if (!preferred || preferred === current || !alternates[preferred]) return;

  const t = texts[preferred];
  const textEl = el.querySelector<HTMLElement>('[data-lb-text]')!;
  const sw = el.querySelector<HTMLAnchorElement>('[data-lb-switch]')!;
  const dismiss = el.querySelector<HTMLButtonElement>('[data-lb-dismiss]')!;
  const close = el.querySelector<HTMLButtonElement>('[data-lb-close]')!;
  textEl.textContent = t.text;
  sw.textContent = t.switch;
  sw.href = alternates[preferred];
  sw.setAttribute('hreflang', preferred);
  sw.setAttribute('lang', preferred);
  dismiss.textContent = texts[current]?.dismiss || t.dismiss;
  close.setAttribute('aria-label', t.close);
  el.hidden = false;

  const remember = (value: string) => { try { localStorage.setItem(key, value); } catch { /* ignore */ } };
  const onDismiss = () => { remember('dismissed'); el.hidden = true; };
  const onSwitch = () => remember(preferred);
  dismiss.addEventListener('click', onDismiss);
  close.addEventListener('click', onDismiss);
  sw.addEventListener('click', onSwitch);
  cleanup.push(() => { dismiss.removeEventListener('click', onDismiss); close.removeEventListener('click', onDismiss); sw.removeEventListener('click', onSwitch); });
}

/** Any explicit language choice silences the banner. */
export function watchLanguageLinks() {
  const handler = (e: Event) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-lang-link]');
    if (!a) return;
    const el = document.querySelector<HTMLElement>('[data-lang-banner]');
    const key = el?.dataset.storageKey || 'nlhr_lang_banner';
    try { localStorage.setItem(key, a.dataset.langLink || 'chosen'); } catch { /* ignore */ }
  };
  document.addEventListener('click', handler);
}
