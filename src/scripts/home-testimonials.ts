/** Testimonial carousel: prev/next buttons scroll the snap track by one card. */
import { prefersReducedMotion } from './dom';

let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-testimonials]');
  if (!root) return;
  const track = root.querySelector<HTMLElement>('[data-testi-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-testi-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-testi-next]');
  if (!track || !prev || !next) return;

  const step = () => {
    const first = track.querySelector<HTMLElement>('li');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first ? first.offsetWidth + gap : track.clientWidth * 0.8;
  };
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max;
  };
  const go = (dir: 1 | -1) => track.scrollBy({ left: dir * step(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  const onPrev = () => go(-1);
  const onNext = () => go(1);

  prev.addEventListener('click', onPrev);
  next.addEventListener('click', onNext);
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
  cleanup.push(() => {
    prev.removeEventListener('click', onPrev);
    next.removeEventListener('click', onNext);
    track.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  });
}

function destroy() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
