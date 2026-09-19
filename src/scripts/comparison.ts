/** Fractional vs. full-time comparison: segmented control for narrow screens. */
let cleanup: Array<() => void> = [];

function init() {
  destroy();
  document.querySelectorAll<HTMLElement>('[data-comparison]').forEach((root) => {
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-compare-view]'));
    if (!buttons.length) return;
    const set = (view: string) => {
      root.dataset.view = view;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.compareView === view)));
    };
    const onClick = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-compare-view]');
      if (b?.dataset.compareView) set(b.dataset.compareView);
    };
    const onKey = (e: KeyboardEvent) => {
      const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
      if (i < 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const next = buttons[(i + (e.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length];
        next.focus();
        set(next.dataset.compareView || 'fractional');
      }
    };
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);
    set(root.dataset.view || 'fractional');
    cleanup.push(() => { root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKey); });
  });
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);

export {};
