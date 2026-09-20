/** Magnetic buttons, 3D tilt cards, cursor spotlight, flip cards. */
import { gsap } from 'gsap';

let cleanup: Array<() => void> = [];
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function magnetic() {
  if (!fine() || reduced()) return;
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
  if (!fine() || reduced()) return;
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
  if (!fine()) return;
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

/** Flip cards: button[data-flip-toggle] inside [data-flip]. Works with keyboard and touch. */
function flip() {
  document.querySelectorAll<HTMLElement>('[data-flip]').forEach((card) => {
    const toggles = card.querySelectorAll<HTMLElement>('[data-flip-toggle]');
    const set = (v: boolean) => { card.classList.toggle('is-flipped', v); toggles.forEach((t) => t.setAttribute('aria-expanded', String(v))); };
    const onToggle = (e: Event) => { e.preventDefault(); set(!card.classList.contains('is-flipped')); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false); };
    toggles.forEach((t) => t.addEventListener('click', onToggle));
    card.addEventListener('keydown', onKey);
    cleanup.push(() => { toggles.forEach((t) => t.removeEventListener('click', onToggle)); card.removeEventListener('keydown', onKey); });
  });
}

export function initInteractions() {
  cleanup.forEach((f) => f());
  cleanup = [];
  magnetic();
  tilt();
  spotlight();
  flip();
}
