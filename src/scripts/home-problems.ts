/**
 * Flip cards on the home page: keeps keyboard focus on the visible face.
 * The interactions core toggles `.is-flipped`; this module only reacts to it.
 */
let cleanup: Array<() => void> = [];

function focusable(scope: HTMLElement): HTMLElement | null {
  return scope.querySelector<HTMLElement>('a[href], button:not([disabled])');
}

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-problems]');
  if (!root) return;
  root.querySelectorAll<HTMLElement>('[data-flip]').forEach((card) => {
    const front = card.querySelector<HTMLElement>('[data-flip-front]');
    const back = card.querySelector<HTMLElement>('[data-flip-back]');
    if (!front || !back) return;
    let flipped = card.classList.contains('is-flipped');
    const observer = new MutationObserver(() => {
      const next = card.classList.contains('is-flipped');
      if (next === flipped) return;
      flipped = next;
      // Move focus only when the user is already inside the card (keyboard or click on a toggle).
      if (!card.contains(document.activeElement)) return;
      const target = flipped ? focusable(back) : front.querySelector<HTMLElement>('[data-flip-toggle]');
      target?.focus({ preventScroll: true });
    });
    observer.observe(card, { attributes: true, attributeFilter: ['class'] });
    cleanup.push(() => observer.disconnect());
  });
}

function destroy() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
