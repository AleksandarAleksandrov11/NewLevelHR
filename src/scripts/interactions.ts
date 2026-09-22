/** Flip cards: button[data-flip-toggle] inside [data-flip]. Keyboard and touch. */
let cleanup: Array<() => void> = [];

export function initInteractions() {
  cleanup.forEach((f) => { try { f(); } catch { /* ignore */ } });
  cleanup = [];
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
