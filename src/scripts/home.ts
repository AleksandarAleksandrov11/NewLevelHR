/** Home-page specific behaviour: the pinned bridge timeline and the section scenes. */
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let cleanup: Array<() => void> = [];

/** Pinned 90-day timeline: the progress line and milestones advance with scroll. */
function initBridge() {
  const section = document.querySelector<HTMLElement>('[data-bridge]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('[data-bridge-track]');
  const items = Array.from(section.querySelectorAll<HTMLElement>('[data-bridge-item]'));
  const fill = section.querySelector<HTMLElement>('[data-bridge-fill]');
  const dayLabel = section.querySelector<HTMLElement>('[data-bridge-day]');
  if (!track || !items.length) return;
  if (prefersReducedMotion() || window.matchMedia('(max-width: 63.99rem)').matches) {
    items.forEach((i) => i.classList.add('is-active'));
    if (fill) fill.style.transform = 'scaleX(1)';
    return;
  }
  const days = items.map((i) => parseInt(i.dataset.bridgeItem || '0', 10));
  const st = ScrollTrigger.create({
    trigger: section, start: 'top top', end: () => `+=${items.length * 70}%`, pin: track, scrub: 0.6, anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress;
      if (fill) fill.style.transform = `scaleX(${p})`;
      // The rail runs from the first dot to the last, so progress maps straight onto the milestones.
      const seg = p * (items.length - 1);
      const idx = Math.min(items.length - 1, Math.floor(seg + 1e-4));
      items.forEach((it, i) => { it.classList.toggle('is-active', i <= idx); it.classList.toggle('is-current', i === idx); });
      if (dayLabel) {
        const from = days[idx], to = days[Math.min(days.length - 1, idx + 1)] ?? days[idx];
        dayLabel.textContent = String(Math.round(from + (to - from) * Math.min(1, Math.max(0, seg - idx))));
      }
    },
  });
  cleanup.push(() => st.kill());
}

/** Services cards: image follows the cursor slightly. */
function initServiceCards() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-service-card]').forEach((card) => {
    const img = card.querySelector<HTMLElement>('[data-service-img]');
    if (!img) return;
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      gsap.to(img, { x: ((e.clientX - r.left) / r.width - 0.5) * 18, y: ((e.clientY - r.top) / r.height - 0.5) * 18, duration: 0.8, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    card.addEventListener('pointermove', onMove); card.addEventListener('pointerleave', onLeave);
    cleanup.push(() => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave); });
  });
}

export function initHome() {
  destroyHome();
  initBridge();
  initServiceCards();
}
export function destroyHome() {
  cleanup.forEach((f) => { try { f(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', () => { if (document.querySelector('[data-page-home]')) initHome(); });
document.addEventListener('astro:before-swap', destroyHome);
