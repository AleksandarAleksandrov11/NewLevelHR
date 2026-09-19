import { gsap } from 'gsap';

let cleanup: Array<() => void> = [];

export function initCursor() {
  cleanup.forEach((f) => f());
  cleanup = [];
  const root = document.querySelector<HTMLElement>('[data-cursor-root]');
  const html = document.documentElement;
  const enabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!root || !enabled) { html.classList.remove('has-cursor'); return; }
  const dot = root.querySelector<HTMLElement>('[data-cursor-dot]')!;
  const ring = root.querySelector<HTMLElement>('[data-cursor-ring]')!;
  const label = root.querySelector<HTMLElement>('[data-cursor-label]')!;
  const labels: Record<string, string> = JSON.parse(html.dataset.cursorLabels || '{}');

  let x = window.innerWidth / 2, y = window.innerHeight / 2, rx = x, ry = y, active = false;
  const setDot = gsap.quickSetter(dot, 'x', 'px'), setDotY = gsap.quickSetter(dot, 'y', 'px');
  const setRing = gsap.quickSetter(ring, 'x', 'px'), setRingY = gsap.quickSetter(ring, 'y', 'px');

  const tick = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    setDot(x); setDotY(y); setRing(rx); setRingY(ry);
  };
  gsap.ticker.add(tick);

  const onMove = (e: PointerEvent) => {
    x = e.clientX; y = e.clientY;
    if (!active) { active = true; html.classList.add('has-cursor'); root.classList.remove('is-hidden'); }
  };
  const onLeave = () => { root.classList.add('is-hidden'); html.classList.remove('has-cursor'); active = false; };
  const onDown = () => root.classList.add('is-down');
  const onUp = () => root.classList.remove('is-down');
  const onOver = (e: PointerEvent) => {
    const t = e.target as HTMLElement;
    if (!t || !(t instanceof Element)) return;
    const labelled = t.closest<HTMLElement>('[data-cursor]');
    const textField = t.closest('input, textarea, select, [contenteditable="true"]');
    const link = t.closest('a, button, [role="button"], summary, label');
    root.classList.remove('is-link', 'is-label', 'is-text');
    if (textField) { root.classList.add('is-text'); return; }
    if (labelled && labelled.dataset.cursor && labels[labelled.dataset.cursor]) { label.textContent = labels[labelled.dataset.cursor]; root.classList.add('is-label'); return; }
    if (link) root.classList.add('is-link');
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerover', onOver, { passive: true });
  window.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);
  document.addEventListener('mouseleave', onLeave);
  cleanup.push(() => {
    gsap.ticker.remove(tick);
    window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerover', onOver);
    window.removeEventListener('pointerdown', onDown); window.removeEventListener('pointerup', onUp);
    document.removeEventListener('mouseleave', onLeave);
  });
}
