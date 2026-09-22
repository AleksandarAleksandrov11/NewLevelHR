/**
 * Reveal-on-scroll. Deliberately free of any animation library: it runs in the
 * first bundle so content appears as early as possible, while the rest of the
 * motion work loads behind it. Whatever was already on screen has been revealed
 * by the inline script in the document head's page, so this only picks up the
 * elements further down.
 */
import { prefersReducedMotion } from './dom';

let io: IntersectionObserver | null = null;

export function initReveal() {
  destroyReveal();
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'));
  if (!els.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-revealed'));
    return;
  }
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      (e.target as HTMLElement).classList.add('is-revealed');
      io?.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io!.observe(el));
}

export function destroyReveal() {
  io?.disconnect();
  io = null;
}
