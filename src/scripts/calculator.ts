/**
 * Cost of a bad hire (src/components/home/BadHireCalculator.astro).
 * Reads the seven assumptions, recomputes every line with the same formula as
 * the server render, animates the total and keeps slider and number in sync.
 * Nothing is stored or sent anywhere.
 */
import { gsap, prefersReducedMotion } from './motion';

type Key = 'salary' | 'monthsEmployed' | 'recruitingPct' | 'managerHours' | 'hourlyRate' | 'severanceMonths' | 'vacancyMonths';
const KEYS: Key[] = ['salary', 'monthsEmployed', 'recruitingPct', 'managerHours', 'hourlyRate', 'severanceMonths', 'vacancyMonths'];
const WEEKS_PER_MONTH = 4.33;

let cleanup: Array<() => void> = [];

function compute(v: Record<Key, number>) {
  const recruiting = (v.salary * v.recruitingPct) / 100;
  const lines = {
    salary: (v.salary * v.monthsEmployed) / 12,
    recruiting,
    manager: v.managerHours * (v.monthsEmployed * WEEKS_PER_MONTH) * v.hourlyRate,
    severance: (v.salary * v.severanceMonths) / 12,
    rehire: recruiting,
    vacancy: (v.salary * v.vacancyMonths) / 12,
  };
  const total = Object.values(lines).reduce((s, n) => s + n, 0);
  return { lines, total };
}

function initCalculator(root: HTMLElement) {
  const lang = document.documentElement.lang || 'en';
  const money = new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const oneDecimal = new Intl.NumberFormat(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const reduced = prefersReducedMotion();
  const ac = new AbortController();

  const numbers = new Map<Key, HTMLInputElement>();
  const ranges = new Map<Key, HTMLInputElement>();
  KEYS.forEach((k) => {
    const n = root.querySelector<HTMLInputElement>(`[data-calc-input="${k}"]`);
    const r = root.querySelector<HTMLInputElement>(`[data-calc-range="${k}"]`);
    if (n) numbers.set(k, n);
    if (r) ranges.set(k, r);
  });
  const totalEl = root.querySelector<HTMLElement>('[data-calc-total]');
  /** Decorative copy of the total that stays pinned while the sliders scroll past. */
  const miniEl = root.querySelector<HTMLElement>('[data-calc-mini]');
  const multipleEl = root.querySelector<HTMLElement>('[data-calc-multiple]');
  const announce = root.querySelector<HTMLElement>('[data-calc-announce]');
  const resetBtn = root.querySelector<HTMLButtonElement>('[data-calc-reset]');
  if (!totalEl || numbers.size !== KEYS.length) return;

  const clamp = (input: HTMLInputElement, value: number) => {
    const min = parseFloat(input.min), max = parseFloat(input.max);
    if (Number.isNaN(value)) return parseFloat(input.dataset.default || input.min) || 0;
    return Math.min(max, Math.max(min, value));
  };
  const values = (): Record<Key, number> => {
    const out = {} as Record<Key, number>;
    KEYS.forEach((k) => { out[k] = clamp(numbers.get(k)!, parseFloat(numbers.get(k)!.value)); });
    return out;
  };
  const paintRange = (r: HTMLInputElement) => {
    const min = parseFloat(r.min), max = parseFloat(r.max), v = parseFloat(r.value);
    r.style.setProperty('--p', `${((v - min) / (max - min)) * 100}%`);
  };

  let shown = parseFloat(totalEl.dataset.value || '0') || 0;
  let tween: gsap.core.Tween | null = null;
  let announceTimer = 0;

  const render = (animate = true) => {
    const v = values();
    const { lines, total } = compute(v);
    (Object.keys(lines) as Array<keyof typeof lines>).forEach((k) => {
      const el = root.querySelector<HTMLElement>(`[data-calc-line="${k}"]`);
      if (el) el.textContent = money.format(lines[k]);
    });
    if (multipleEl) {
      const template = multipleEl.dataset.template || '{multiple}';
      multipleEl.textContent = template.replace('{multiple}', oneDecimal.format(v.salary > 0 ? total / v.salary : 0));
    }
    totalEl.dataset.value = String(total);
    tween?.kill();
    const paintTotal = (n: number) => {
      const text = money.format(n);
      totalEl.textContent = text;
      if (miniEl) miniEl.textContent = text;
    };
    if (reduced || !animate) { shown = total; paintTotal(total); }
    else {
      const obj = { v: shown };
      tween = gsap.to(obj, { v: total, duration: 0.6, ease: 'power3.out', onUpdate: () => { shown = obj.v; paintTotal(obj.v); } });
    }
    if (announce) {
      window.clearTimeout(announceTimer);
      announceTimer = window.setTimeout(() => { announce.textContent = `${totalEl.previousElementSibling?.textContent ?? ''} ${money.format(total)}`; }, 600);
    }
  };

  KEYS.forEach((k) => {
    const n = numbers.get(k)!;
    const r = ranges.get(k);
    if (r) {
      paintRange(r);
      r.addEventListener('input', () => { n.value = r.value; paintRange(r); render(); }, { signal: ac.signal });
    }
    n.addEventListener('input', () => { if (r && n.value !== '') { r.value = String(clamp(r, parseFloat(n.value))); paintRange(r); } render(); }, { signal: ac.signal });
    n.addEventListener('change', () => { const c = clamp(n, parseFloat(n.value)); n.value = String(c); if (r) { r.value = String(c); paintRange(r); } render(); }, { signal: ac.signal });
  });

  resetBtn?.addEventListener('click', () => {
    KEYS.forEach((k) => {
      const n = numbers.get(k)!;
      const def = n.dataset.default || n.value;
      n.value = def;
      const r = ranges.get(k);
      if (r) { r.value = def; paintRange(r); }
    });
    render();
    numbers.get('salary')?.focus({ preventScroll: true });
  }, { signal: ac.signal });

  render(false);
  cleanup.push(() => { ac.abort(); tween?.kill(); window.clearTimeout(announceTimer); });
}

function init() {
  destroy();
  document.querySelectorAll<HTMLElement>('[data-calculator]').forEach(initCalculator);
}
function destroy() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
