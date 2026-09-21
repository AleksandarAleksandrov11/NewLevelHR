/** "What we fix": scroll-spy for the sticky side navigation. */
let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const nav = document.querySelector<HTMLElement>('[data-problems-nav]');
  if (!nav || !('IntersectionObserver' in window)) return;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const sections = links.map((a) => document.getElementById(a.getAttribute('href')!.slice(1))).filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;
  // On phones the list is the horizontal scroller, so the active chip is centred by
  // scrolling that element. scrollIntoView would move the page as well.
  const list = nav.querySelector<HTMLElement>('.pb-nav-list') ?? nav;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = '';
  const setCurrent = (id: string) => {
    if (id === current) return;
    current = id;
    let active: HTMLAnchorElement | null = null;
    links.forEach((a) => {
      const isActive = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('is-active', isActive);
      if (isActive) { a.setAttribute('aria-current', 'true'); active = a; } else a.removeAttribute('aria-current');
    });
    const chip = active as HTMLAnchorElement | null;
    if (!chip || list.scrollWidth <= list.clientWidth + 1) return;
    const item = (chip.parentElement ?? chip) as HTMLElement;
    const left = item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: reduced ? 'auto' : 'smooth' });
  };
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) setCurrent((visible[0].target as HTMLElement).id);
  }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] });
  sections.forEach((s) => io.observe(s));
  setCurrent(sections[0].id);
  cleanup.push(() => io.disconnect());
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
