/** First-visit preloader: never longer than ~1 s, skipped with reduced motion. */
export function initPreloader() {
  const el = document.querySelector<HTMLElement>('[data-preloader]');
  const html = document.documentElement;
  if (!el || !html.classList.contains('is-preloading')) return;
  const key = el.dataset.storageKey || 'nlhr_seen';
  const finish = () => {
    el.classList.add('is-leaving');
    window.setTimeout(() => { html.classList.remove('is-preloading'); el.remove(); }, 520);
    try { localStorage.setItem(key, '1'); } catch { /* ignore */ }
  };
  const minDelay = new Promise((r) => window.setTimeout(r, 650));
  const fonts = 'fonts' in document ? (document as Document & { fonts: FontFaceSet }).fonts.ready : Promise.resolve();
  Promise.race([Promise.all([minDelay, fonts]), new Promise((r) => window.setTimeout(r, 1000))]).then(finish);
}
