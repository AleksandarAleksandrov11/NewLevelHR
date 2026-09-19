/** FAQ page: live search across questions with an aria-live result count. */
let cleanup: Array<() => void> = [];

function normalise(s: string) { return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, ''); }

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-faq]');
  if (!root) return;
  const input = root.querySelector<HTMLInputElement>('[data-faq-search]');
  const clear = root.querySelector<HTMLButtonElement>('[data-faq-clear]');
  const status = root.querySelector<HTMLElement>('[data-faq-status]');
  const empty = root.querySelector<HTMLElement>('[data-faq-empty]');
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-faq-item]'));
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-faq-group]'));
  if (!input || !items.length) return;
  const total = items.length;
  const tpl = status?.dataset.template || '{count} of {total}';
  const emptyTpl = empty?.dataset.template || '';
  const index = items.map((el) => normalise(el.textContent || ''));

  const apply = () => {
    const q = normalise(input.value.trim());
    let count = 0;
    items.forEach((el, i) => { const show = !q || index[i].includes(q); el.hidden = !show; if (show) count++; if (q && show) (el as HTMLDetailsElement).open = true; });
    groups.forEach((g) => { g.hidden = !Array.from(g.querySelectorAll<HTMLElement>('[data-faq-item]')).some((el) => !el.hidden); });
    if (status) status.textContent = tpl.replace('{count}', String(count)).replace('{total}', String(total));
    if (empty) { empty.hidden = count > 0; empty.textContent = emptyTpl.replace('{query}', input.value.trim()); }
    if (clear) clear.hidden = !q;
    root.dataset.filtering = q ? 'true' : 'false';
  };
  const onInput = () => apply();
  const onClear = () => { input.value = ''; apply(); input.focus(); };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && input.value) onClear(); };
  input.addEventListener('input', onInput);
  input.addEventListener('keydown', onKey);
  clear?.addEventListener('click', onClear);
  apply();
  cleanup.push(() => { input.removeEventListener('input', onInput); input.removeEventListener('keydown', onKey); clear?.removeEventListener('click', onClear); });
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
