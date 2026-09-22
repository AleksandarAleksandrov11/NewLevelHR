/**
 * Pointer effects for a mouse: magnetic buttons, tilt cards, cursor spotlight.
 * Loaded after the first paint — none of it is needed to read or use the page.
 */
import { gsap } from 'gsap';
import { isFinePointer, prefersReducedMotion } from './dom';

let cleanup: Array<() => void> = [];

function magnetic() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '') || 0.35;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanup.push(() => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); gsap.set(el, { clearProps: 'transform' }); });
  });
}

function tilt() {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '') || 8;
    el.style.transformStyle = 'preserve-3d';
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * max, rotateX: -py * max, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanup.push(() => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); gsap.set(el, { clearProps: 'transform' }); });
  });
}

function spotlight() {
  document.querySelectorAll<HTMLElement>('[data-spotlight]').forEach((el) => {
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener('pointermove', onMove);
    cleanup.push(() => el.removeEventListener('pointermove', onMove));
  });
}

export function initPointerFx() {
  destroyPointerFx();
  if (!isFinePointer()) return;
  spotlight();
  if (prefersReducedMotion()) return;
  magnetic();
  tilt();
}

export function destroyPointerFx() {
  cleanup.forEach((f) => { try { f(); } catch { /* ignore */ } });
  cleanup = [];
}
