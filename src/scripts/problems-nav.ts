/** "What we fix": scroll-spy for the sticky side navigation. */
let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const nav = document.querySelector<HTMLElement>('[data-problems-nav]');
  if (!nav || !('IntersectionObserver' in window)) return;
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const sections = links.map((a) => document.getElementById(a.getAttribute('href')!.slice(1))).filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;
  let current = '';
  const setCurrent = (id: string) => {
    if (id === current) return;
    current = id;
    links.forEach((a) => {
      const active = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    const active = nav.querySelector<HTMLElement>('.is-active');
    if (active && nav.scrollWidth > nav.clientWidth) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
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
