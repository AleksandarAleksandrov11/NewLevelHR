/** Home-page specific behaviour: lazy 3D hero and the pinned bridge timeline. */
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';
import type { HeroScene } from './hero3d';

let scene: HeroScene | null = null;
let cleanup: Array<() => void> = [];

function canRun3D(): boolean {
  if (prefersReducedMotion()) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean; effectiveType?: string } };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory && nav.deviceMemory < 2) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return false;
  } catch { return false; }
  return true;
}

function initHero() {
  const container = document.querySelector<HTMLElement>('[data-hero-3d]');
  if (!container || !canRun3D()) return;
  let started = false;
  const start = async () => {
    if (started) return; started = true;
    events.forEach(([ev, h]) => window.removeEventListener(ev, h));
    window.clearTimeout(timer);
    try {
      const mod = await import('./hero3d');
      if (!document.body.contains(container)) return;
      scene = mod.createHeroScene(container);
    } catch { /* keep the static fallback */ }
  };
  // Start on first interaction, or after the page has been idle for a while.
  const handler = () => { start(); };
  const events: Array<[string, () => void]> = [['pointermove', handler], ['touchstart', handler], ['scroll', handler], ['keydown', handler]];
  events.forEach(([ev, h]) => window.addEventListener(ev, h, { passive: true, once: true } as AddEventListenerOptions));
  const timer = window.setTimeout(start, 2500);
  cleanup.push(() => { events.forEach(([ev, h]) => window.removeEventListener(ev, h)); window.clearTimeout(timer); scene?.destroy(); scene = null; });
}

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
  initHero();
  initBridge();
  initServiceCards();
}
export function destroyHome() {
  cleanup.forEach((f) => { try { f(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', () => { if (document.querySelector('[data-page-home]')) initHome(); });
document.addEventListener('astro:before-swap', destroyHome);
