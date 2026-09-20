/** Blog index: category filter chips, URL state and an aria-live count. */
import { gsap, prefersReducedMotion } from './motion';

let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-blog]');
  if (!root) return;
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-post]'));
  const status = root.querySelector<HTMLElement>('[data-blog-status]');
  const empty = root.querySelector<HTMLElement>('[data-blog-empty]');
  if (!buttons.length || !cards.length) return;
  const tpl = status?.dataset.template || '{count} / {total}';
  const total = cards.length;
  const reduced = prefersReducedMotion();

  const apply = (cat: string, push: boolean) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    let count = 0;
    cards.forEach((card) => {
      const show = cat === 'all' || card.dataset.category === cat;
      if (show) count++;
      if (reduced) { card.hidden = !show; return; }
      if (show && card.hidden) { card.hidden = false; gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' }); }
      else if (!show) card.hidden = true;
    });
    if (status) status.textContent = tpl.replace('{count}', String(count)).replace('{total}', String(total));
    if (empty) empty.hidden = count > 0;
    if (push) {
      const url = new URL(location.href);
      if (cat === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', cat);
      history.replaceState(null, '', url);
    }
  };
  const onClick = (e: Event) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (b?.dataset.filter) apply(b.dataset.filter, true);
  };
  root.addEventListener('click', onClick);
  const initial = new URL(location.href).searchParams.get('category');
  apply(initial && buttons.some((b) => b.dataset.filter === initial) ? initial : 'all', false);
  cleanup.push(() => root.removeEventListener('click', onClick));
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
