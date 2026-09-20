import { lockScroll } from './motion';

let cleanup: Array<() => void> = [];

export function initHeader() {
  cleanup.forEach((f) => f());
  cleanup = [];
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const progress = header.querySelector<HTMLElement>('[data-progress]');
  const burger = header.querySelector<HTMLButtonElement>('[data-burger]');
  const mobile = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const megas = Array.from(header.querySelectorAll<HTMLElement>('[data-mega]'));

  /* Scroll behaviour --------------------------------------------------- */
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    header.classList.toggle('is-scrolled', y > 8);
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  cleanup.push(() => window.removeEventListener('scroll', onScroll));

  /* Mega menu ------------------------------------------------------------ */
  megas.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-mega-trigger]');
    const panel = item.querySelector<HTMLElement>('[data-mega-panel]');
    if (!trigger || !panel) return;
    let closeTimer = 0;
    const open = () => { window.clearTimeout(closeTimer); item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { item.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    const scheduleClose = () => { closeTimer = window.setTimeout(close, 140); };
    const onClick = () => (item.classList.contains('is-open') ? close() : open());
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); trigger.focus(); } };
    const onFocusOut = (e: FocusEvent) => { if (!item.contains(e.relatedTarget as Node)) close(); };
    const onDocClick = (e: MouseEvent) => { if (!item.contains(e.target as Node)) close(); };
    trigger.addEventListener('click', onClick);
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', scheduleClose);
    item.addEventListener('keydown', onKey);
    item.addEventListener('focusout', onFocusOut);
    document.addEventListener('click', onDocClick);
    cleanup.push(() => { trigger.removeEventListener('click', onClick); item.removeEventListener('mouseenter', open); item.removeEventListener('mouseleave', scheduleClose); item.removeEventListener('keydown', onKey); item.removeEventListener('focusout', onFocusOut); document.removeEventListener('click', onDocClick); });
  });

  /* Language dropdowns --------------------------------------------------- */
  document.querySelectorAll<HTMLElement>('[data-lang-switcher]').forEach((dd) => {
    const btn = dd.querySelector<HTMLButtonElement>('button');
    const menu = dd.querySelector<HTMLElement>('.lang-dd-menu');
    if (!btn || !menu) return;
    const setOpen = (v: boolean) => { menu.hidden = !v; btn.setAttribute('aria-expanded', String(v)); };
    const onClick = (e: MouseEvent) => { e.stopPropagation(); setOpen(menu.hidden); if (!menu.hidden) menu.querySelector<HTMLElement>('a')?.focus(); };
    const onDoc = (e: MouseEvent) => { if (!dd.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.focus(); }
      const links = Array.from(menu.querySelectorAll<HTMLElement>('a'));
      const i = links.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length]?.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); links[(i - 1 + links.length) % links.length]?.focus(); }
    };
    const onFocusOut = (e: FocusEvent) => { if (!dd.contains(e.relatedTarget as Node)) setOpen(false); };
    btn.addEventListener('click', onClick);
    document.addEventListener('click', onDoc);
    dd.addEventListener('keydown', onKey);
    dd.addEventListener('focusout', onFocusOut);
    cleanup.push(() => { btn.removeEventListener('click', onClick); document.removeEventListener('click', onDoc); dd.removeEventListener('keydown', onKey); dd.removeEventListener('focusout', onFocusOut); });
  });

  /* Mobile menu ---------------------------------------------------------- */
  if (burger && mobile) {
    const focusables = () => Array.from(mobile.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const setOpen = (v: boolean) => {
      burger.setAttribute('aria-expanded', String(v));
      burger.setAttribute('aria-label', v ? (burger.dataset.labelClose || 'Close menu') : (burger.dataset.labelOpen || burger.getAttribute('aria-label') || 'Menu'));
      mobile.classList.toggle('is-open', v);
      mobile.setAttribute('aria-hidden', String(!v));
      header.classList.toggle('is-menu-open', v);
      document.documentElement.classList.toggle('menu-open', v);
      lockScroll(v);
      if (v) window.setTimeout(() => focusables()[0]?.focus(), 250);
    };
    burger.dataset.labelOpen = burger.getAttribute('aria-label') || 'Open menu';
    const onBurger = () => setOpen(burger.getAttribute('aria-expanded') !== 'true');
    const onKey = (e: KeyboardEvent) => {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); burger.focus(); }
      if (e.key === 'Tab') {
        const f = [burger, ...focusables()];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onLink = (e: Event) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); };
    const mq = window.matchMedia('(min-width: 64rem)');
    const onMq = () => { if (mq.matches) setOpen(false); };
    burger.addEventListener('click', onBurger);
    document.addEventListener('keydown', onKey);
    mobile.addEventListener('click', onLink);
    mq.addEventListener('change', onMq);
    cleanup.push(() => { burger.removeEventListener('click', onBurger); document.removeEventListener('keydown', onKey); mobile.removeEventListener('click', onLink); mq.removeEventListener('change', onMq); document.documentElement.classList.remove('menu-open'); lockScroll(false); });
  }

  /* Back to top ---------------------------------------------------------- */
  document.querySelectorAll<HTMLAnchorElement>('[data-back-to-top]').forEach((a) => {
    const onClick = (e: MouseEvent) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
    a.addEventListener('click', onClick);
    cleanup.push(() => a.removeEventListener('click', onClick));
  });

  /* Footer wordmark reveal ------------------------------------------------ */
  const fw = document.querySelector<HTMLElement>('[data-footer-wordmark]');
  if (fw && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => { entries.forEach((en) => { if (en.isIntersecting) { fw.classList.add('is-revealed'); io.disconnect(); } }); }, { threshold: 0.2 });
    io.observe(fw);
    cleanup.push(() => io.disconnect());
  }
}
