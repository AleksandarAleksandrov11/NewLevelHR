/**
 * HR Health Check (src/components/home/HealthCheck.astro).
 * All texts live in the DOM; this module only switches steps, handles the
 * keyboard radio groups, scores the answers and animates the result.
 * Nothing is stored or sent anywhere.
 */
import { gsap, prefersReducedMotion, scrollTo } from './motion';

interface QuizConfig {
  total: number;
  maxScore: number;
  /** "Question {current} of {total}" */
  progress: string;
  questions: Array<{ id: string; services: string[] }>;
  /** Upper score bound per level, ascending */
  levels: number[];
}
type View = 'intro' | 'questions' | 'result';

let cleanup: Array<() => void> = [];
const HEADER_OFFSET = 96;

function initQuiz(root: HTMLElement) {
  let config: QuizConfig;
  try { config = JSON.parse(root.dataset.quiz || '') as QuizConfig; } catch { return; }

  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
  const panels: Record<View, HTMLElement | null> = { intro: $('[data-quiz-panel="intro"]'), questions: $('[data-quiz-panel="questions"]'), result: $('[data-quiz-panel="result"]') };
  const stage = $('[data-quiz-stage]');
  const steps = $$('[data-quiz-step]');
  const progressText = $('[data-quiz-progress]');
  const progressBar = $('[data-quiz-progressbar]');
  const barFill = $('[data-quiz-bar]');
  const nextBtn = $<HTMLButtonElement>('[data-quiz-next]');
  const nextLabel = $('[data-quiz-next-label]');
  const backBtn = $<HTMLButtonElement>('[data-quiz-back]');
  if (!panels.intro || !panels.questions || !panels.result || !stage || !steps.length || !nextBtn || !backBtn) return;

  const reduced = prefersReducedMotion();
  const ac = new AbortController();
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) =>
    el.addEventListener(type, fn, { signal: ac.signal });

  const total = steps.length;
  const answers: Array<number | null> = steps.map(() => null);
  let view: View = 'intro';
  let step = 0;
  let busy = false;

  /* ---------- helpers ---------- */
  const optionsOf = (i: number) => Array.from(steps[i].querySelectorAll<HTMLButtonElement>('[data-quiz-option]'));

  /** Crossfade between two blocks; instant with reduced motion. */
  function swap(from: HTMLElement | null, to: HTMLElement, dir: 1 | -1, after?: () => void) {
    const show = () => { if (from) from.hidden = true; to.hidden = false; };
    if (reduced || !from) { show(); after?.(); return; }
    busy = true;
    gsap.to(from, {
      opacity: 0, x: -18 * dir, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        gsap.set(from, { clearProps: 'opacity,transform' });
        show();
        after?.();
        gsap.fromTo(to, { opacity: 0, x: 18 * dir }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', clearProps: 'opacity,transform', onComplete: () => { busy = false; } });
      },
    });
  }

  function focusHeading(el: HTMLElement | null) {
    if (!el) return;
    el.focus({ preventScroll: true });
    const top = el.getBoundingClientRect().top;
    if (top < HEADER_OFFSET || top > window.innerHeight * 0.8) scrollTo($('[data-quiz-card]') ?? root, -HEADER_OFFSET);
  }

  /** The stage keeps the height of the tallest step so that steps never shift the layout. */
  function sizeStage() {
    if (view !== 'questions') return;
    let max = 0;
    steps.forEach((s) => {
      const wasHidden = s.hidden;
      if (wasHidden) { s.hidden = false; s.style.cssText = 'position:absolute;left:0;top:0;width:100%;visibility:hidden'; }
      max = Math.max(max, s.offsetHeight);
      if (wasHidden) { s.hidden = true; s.style.cssText = ''; }
    });
    stage!.style.minHeight = `${max}px`;
  }

  function setView(next: View, dir: 1 | -1, after?: () => void) {
    const from = panels[view]!;
    const to = panels[next]!;
    view = next;
    if (next === 'questions') { to.hidden = false; sizeStage(); to.hidden = true; }
    swap(from, to, dir, after);
  }

  /* ---------- questions ---------- */
  function updateProgress() {
    const current = step + 1;
    const text = config.progress.replace('{current}', String(current)).replace('{total}', String(total));
    if (progressText) progressText.textContent = text;
    progressBar?.setAttribute('aria-valuenow', String(current));
    barFill?.style.setProperty('--p', String(current / total));
  }

  function updateNav() {
    nextBtn!.disabled = answers[step] === null;
    const last = step === total - 1;
    if (nextLabel) nextLabel.textContent = (last ? nextBtn!.dataset.labelFinish : nextBtn!.dataset.labelNext) || '';
  }

  function select(i: number, choice: number) {
    answers[i] = choice;
    optionsOf(i).forEach((btn, j) => {
      const checked = j === choice;
      btn.setAttribute('aria-checked', String(checked));
      btn.tabIndex = checked ? 0 : -1;
    });
    if (i === step) updateNav();
  }

  function clearStep(i: number) {
    answers[i] = null;
    optionsOf(i).forEach((btn, j) => { btn.setAttribute('aria-checked', 'false'); btn.tabIndex = j === 0 ? 0 : -1; });
  }

  function goToStep(i: number, dir: 1 | -1) {
    if (busy || i < 0 || i >= total) return;
    const from = steps[step];
    step = i;
    updateProgress();
    updateNav();
    swap(from === steps[i] ? null : from, steps[i], dir, () => focusHeading(steps[i].querySelector<HTMLElement>('[data-quiz-heading]')));
  }

  function start() {
    if (busy) return;
    step = 0;
    updateProgress();
    updateNav();
    steps.forEach((s, i) => { s.hidden = i !== 0; });
    setView('questions', 1, () => focusHeading(steps[0].querySelector<HTMLElement>('[data-quiz-heading]')));
  }

  function restart() {
    if (busy) return;
    steps.forEach((_, i) => clearStep(i));
    step = 0;
    setView('intro', -1, () => focusHeading($('[data-quiz-start]')));
  }

  /* ---------- result ---------- */
  function finish() {
    if (busy || answers.some((a) => a === null)) return;
    const score = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
    const levelIndex = Math.max(0, config.levels.findIndex((max) => score <= max));
    const result = panels.result!;
    result.dataset.level = String(levelIndex);
    $$('[data-quiz-level]').forEach((el) => { el.hidden = el.dataset.quizLevel !== String(levelIndex); });

    // Service weights: option index (0/1/2) per question, summed per service.
    const weights = new Map<string, number>();
    config.questions.forEach((qn, i) => qn.services.forEach((s) => weights.set(s, (weights.get(s) ?? 0) + (answers[i] ?? 0))));
    const ranked = Array.from(weights.entries()).filter(([, w]) => w > 0).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);
    const list = $('[data-quiz-services]');
    const items = $$('[data-quiz-service]');
    items.forEach((li) => { li.hidden = true; });
    ranked.forEach((key) => { const li = items.find((el) => el.dataset.quizService === key); if (li && list) { li.hidden = false; list.appendChild(li); } });
    const intro = $('[data-quiz-reco-intro]');
    const none = $('[data-quiz-noissues]');
    if (intro) intro.hidden = ranked.length === 0;
    if (none) none.hidden = ranked.length > 0;

    // Areas to watch: questions answered with the highest-risk option.
    const flagged = config.questions.filter((_, i) => answers[i] === 2).map((qn) => qn.id);
    $$('[data-quiz-area]').forEach((li) => { li.hidden = !flagged.includes(li.dataset.quizArea || ''); });
    const areas = $('[data-quiz-areas]');
    if (areas) areas.hidden = flagged.length === 0;

    // Score ring and counter.
    const ring = root.querySelector<SVGCircleElement>('[data-quiz-ring-fill]');
    const scoreEl = $('[data-quiz-score]');
    const max = config.maxScore || total * 2;
    const r = ring ? parseFloat(ring.getAttribute('r') || '52') : 52;
    const circumference = 2 * Math.PI * r;
    const target = circumference * (1 - score / max);
    if (ring) { ring.style.strokeDasharray = String(circumference); ring.style.strokeDashoffset = String(circumference); }

    setView('result', 1, () => {
      focusHeading($('[data-quiz-result-title]'));
      if (reduced || !ring || !scoreEl) {
        if (ring) ring.style.strokeDashoffset = String(target);
        if (scoreEl) scoreEl.textContent = String(score);
        return;
      }
      const counter = { v: 0 };
      scoreEl.textContent = '0';
      gsap.to(ring, { strokeDashoffset: target, duration: 1.4, ease: 'power3.out', delay: 0.15 });
      gsap.to(counter, { v: score, duration: 1.4, ease: 'power3.out', delay: 0.15, onUpdate: () => { scoreEl.textContent = String(Math.round(counter.v)); } });
    });
  }

  /* ---------- events ---------- */
  steps.forEach((s, i) => {
    const group = s.querySelector<HTMLElement>('[data-quiz-options]');
    if (!group) return;
    on(group, 'click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-quiz-option]');
      if (btn) select(i, Number(btn.dataset.quizOption));
    });
    on(group, 'keydown', (e) => {
      const opts = optionsOf(i);
      const current = opts.indexOf(document.activeElement as HTMLButtonElement);
      if (current < 0) return;
      let next = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (current + 1) % opts.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (current - 1 + opts.length) % opts.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = opts.length - 1;
      if (next < 0) return;
      e.preventDefault();
      select(i, next);
      opts[next].focus();
    });
  });
  const startBtn = $('[data-quiz-start]');
  if (startBtn) on(startBtn, 'click', start);
  on(nextBtn, 'click', () => { if (answers[step] === null) return; if (step === total - 1) finish(); else goToStep(step + 1, 1); });
  on(backBtn, 'click', () => { if (step === 0) { if (!busy) setView('intro', -1, () => focusHeading($('[data-quiz-start]'))); } else goToStep(step - 1, -1); });
  const restartBtn = $('[data-quiz-restart]');
  if (restartBtn) on(restartBtn, 'click', restart);

  let raf = 0;
  const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sizeStage); };
  window.addEventListener('resize', onResize, { signal: ac.signal });

  updateNav();
  cleanup.push(() => { ac.abort(); cancelAnimationFrame(raf); gsap.killTweensOf([panels.intro, panels.questions, panels.result, ...steps]); });
}

function init() {
  destroy();
  document.querySelectorAll<HTMLElement>('[data-quiz]').forEach(initQuiz);
}
function destroy() {
  cleanup.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanup = [];
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
