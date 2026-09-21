/**
 * Contact form.
 *
 * The markup ships as one plain form that works without JavaScript. This module
 * turns it into a four-step flow (one question at a time), replaces the topic
 * select with a listbox that can be styled, validates each step before moving on
 * and posts JSON to the configured endpoint (api/contact.js or public/contact.php).
 */
let cleanup: Array<() => void> = [];

interface Messages { required: string; email: string; minLength: string; consent: string; rateLimit: string; spam: string; errorText: string }
type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/* ------------------------------------------------------------------ select */

/**
 * Wires the listbox that the page renders next to the native select. The select
 * stays the single source of truth, so form data and validation are unchanged;
 * without this script the native select is what the visitor uses.
 */
function enhanceSelect(wrap: HTMLElement, ac: AbortController) {
  const select = wrap.querySelector<HTMLSelectElement>('select');
  const button = wrap.querySelector<HTMLButtonElement>('[data-select-button]');
  const list = wrap.querySelector<HTMLElement>('[data-select-list]');
  const value = wrap.querySelector<HTMLElement>('[data-select-value]');
  if (!select || !button || !list || !value) return;
  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-select-option]'));
  const placeholder = value.dataset.placeholder || '';

  button.hidden = false;
  wrap.classList.add('is-enhanced');
  select.setAttribute('tabindex', '-1');
  select.setAttribute('aria-hidden', 'true');

  let active = -1;
  const setActive = (i: number) => {
    active = Math.max(0, Math.min(items.length - 1, i));
    items.forEach((li, n) => li.classList.toggle('is-active', n === active));
    const current = items[active];
    if (current) {
      button.setAttribute('aria-activedescendant', current.id);
      current.scrollIntoView({ block: 'nearest' });
    }
  };
  /** Opens downwards when there is room, upwards when there is not, and never taller
      than the space it has, so the whole list stays on screen wherever the field sits. */
  const place = () => {
    const r = button.getBoundingClientRect();
    const margin = 12;
    const below = window.innerHeight - r.bottom - margin;
    const above = r.top - margin;
    const up = below < 180 && above > below;
    wrap.classList.toggle('is-up', up);
    list.style.setProperty('--select-max', `${Math.max(120, Math.round(up ? above : below))}px`);
  };
  const open = () => {
    if (!list.hidden) return;
    list.hidden = false;
    wrap.classList.add('is-open');
    place();
    button.setAttribute('aria-expanded', 'true');
    setActive(Math.max(0, items.findIndex((li) => li.getAttribute('aria-selected') === 'true')));
  };
  const close = (focusButton = true) => {
    if (list.hidden) return;
    list.hidden = true;
    wrap.classList.remove('is-open', 'is-up');
    button.setAttribute('aria-expanded', 'false');
    button.removeAttribute('aria-activedescendant');
    if (focusButton) button.focus();
  };
  const choose = (i: number) => {
    const li = items[i];
    if (!li) return;
    select.value = li.dataset.value || '';
    items.forEach((el) => el.setAttribute('aria-selected', String(el === li)));
    value.textContent = li.textContent?.trim() || placeholder;
    value.classList.remove('is-placeholder');
    select.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  };

  button.addEventListener('click', () => (list.hidden ? open() : close(false)), { signal: ac.signal });
  button.addEventListener('keydown', (e) => {
    if (list.hidden) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') close(false);
  }, { signal: ac.signal });
  list.addEventListener('click', (e) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('[data-select-option]');
    if (li) choose(items.indexOf(li));
  }, { signal: ac.signal });
  list.addEventListener('mousemove', (e) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('[data-select-option]');
    if (li) setActive(items.indexOf(li));
  }, { signal: ac.signal });
  document.addEventListener('pointerdown', (e) => {
    if (!wrap.contains(e.target as Node)) close(false);
  }, { signal: ac.signal });
  window.addEventListener('scroll', () => { if (!list.hidden) place(); }, { passive: true, signal: ac.signal });
  window.addEventListener('resize', () => { if (!list.hidden) place(); }, { signal: ac.signal });

  cleanup.push(() => {
    button.hidden = true;
    list.hidden = true;
    wrap.classList.remove('is-enhanced', 'is-open', 'is-up');
    select.removeAttribute('tabindex');
    select.removeAttribute('aria-hidden');
  });
}

/* -------------------------------------------------------------------- form */

function initForm(form: HTMLFormElement) {
  const msgs = JSON.parse(form.dataset.messages || '{}') as Messages;
  const endpoint = form.dataset.endpoint || form.action;
  const ts = form.querySelector<HTMLInputElement>('input[name="ts"]');
  if (ts) ts.value = String(Date.now());
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const success = document.querySelector<HTMLElement>('[data-form-success]');
  const failure = document.querySelector<HTMLElement>('[data-form-error]');
  const failureText = failure?.querySelector<HTMLElement>('[data-form-error-text]');
  const ac = new AbortController();
  const fields = Array.from(form.querySelectorAll<Field>('[data-field]'));

  form.querySelectorAll<HTMLElement>('[data-select]').forEach((wrap) => enhanceSelect(wrap, ac));

  const errorEl = (f: Field) => form.querySelector<HTMLElement>(`[data-error-for="${f.name}"]`);
  const setError = (f: Field, msg: string) => {
    const el = errorEl(f);
    if (el) el.textContent = msg;
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    f.closest('.field')?.classList.toggle('has-error', Boolean(msg));
  };
  /** Focus goes to the listbox button when the native select is the hidden source of truth. */
  const focusField = (f: Field) => {
    const custom = f.closest('.field-select.is-enhanced')?.querySelector<HTMLElement>('.select-btn');
    (custom ?? f).focus();
  };
  const validate = (f: Field): boolean => {
    const v = f.value.trim();
    let msg = '';
    if (f.type === 'checkbox') { if (!(f as HTMLInputElement).checked) msg = msgs.consent; }
    else if (f.required && !v) msg = msgs.required;
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = msgs.email;
    else {
      const min = 'minLength' in f ? f.minLength : 0;
      if (min > 0 && v.length < min) msg = msgs.minLength.replace('{min}', String(min));
    }
    setError(f, msg);
    return !msg;
  };
  fields.forEach((f) => {
    f.addEventListener('blur', () => { if (f.value || f.type === 'checkbox') validate(f); }, { signal: ac.signal });
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') validate(f); }, { signal: ac.signal });
    f.addEventListener('change', () => { if (f.type === 'checkbox' || f.tagName === 'SELECT') validate(f); }, { signal: ac.signal });
  });

  /* ---------------------------------------------------------------- steps */

  const steps = Array.from(form.querySelectorAll<HTMLElement>('[data-form-step]'));
  const progress = form.querySelector<HTMLElement>('[data-step-progress]');
  const count = form.querySelector<HTMLElement>('[data-step-count]');
  const bar = form.querySelector<HTMLElement>('[data-step-bar]');
  const backBtn = form.querySelector<HTMLButtonElement>('[data-step-back]');
  const nextBtn = form.querySelector<HTMLButtonElement>('[data-step-next]');
  let current = 0;

  const fieldsOf = (i: number) => fields.filter((f) => steps[i]?.contains(f));
  const firstFocusable = (i: number) => {
    const f = fieldsOf(i)[0];
    return f ? (f.closest('.field-select.is-enhanced')?.querySelector<HTMLElement>('.select-btn') ?? f) : null;
  };

  const render = (focus: 'heading' | 'field' | 'none' = 'none') => {
    steps.forEach((step, i) => {
      step.hidden = i !== current;
      step.classList.toggle('is-entering', i === current && focus !== 'none');
    });
    if (count) count.textContent = (count.dataset.template || '{current}/{total}')
      .replace('{current}', String(current + 1))
      .replace('{total}', String(steps.length));
    if (bar) bar.style.transform = `scaleX(${(current + 1) / steps.length})`;
    if (backBtn) backBtn.hidden = current === 0;
    const last = current === steps.length - 1;
    if (nextBtn) nextBtn.hidden = last;
    if (submit) submit.hidden = !last;
    if (focus === 'heading') steps[current]?.querySelector<HTMLElement>('.ct-step-title')?.focus();
    if (focus === 'field') firstFocusable(current)?.focus();
  };

  const goTo = (i: number, focus: 'heading' | 'field' = 'heading') => {
    current = Math.max(0, Math.min(steps.length - 1, i));
    render(focus);
  };
  const stepValid = (i: number) => fieldsOf(i).map((f) => validate(f)).every(Boolean);
  const goNext = () => {
    if (!stepValid(current)) { const bad = fieldsOf(current).find((f) => f.getAttribute('aria-invalid') === 'true'); if (bad) focusField(bad); return; }
    goTo(current + 1);
  };

  if (steps.length > 1) {
    if (progress) progress.hidden = false;
    render();
    nextBtn?.addEventListener('click', goNext, { signal: ac.signal });
    backBtn?.addEventListener('click', () => goTo(current - 1), { signal: ac.signal });
    // Enter moves on instead of submitting from the middle of the flow.
    form.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || current === steps.length - 1) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.closest('[data-select]')) return;
      e.preventDefault();
      goNext();
    }, { signal: ac.signal });
  }

  /* --------------------------------------------------------------- submit */

  const setBusy = (busy: boolean) => {
    if (submit) submit.disabled = busy;
    form.setAttribute('aria-busy', String(busy));
    if (submitLabel) submitLabel.textContent = busy ? (submit?.dataset.labelSending || '') : (submit?.dataset.labelIdle || '');
  };
  const showFailure = (text: string) => {
    if (failure) { failure.hidden = false; if (failureText) failureText.textContent = text; failure.focus?.(); }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (failure) failure.hidden = true;
    const results = fields.map((f) => validate(f));
    if (results.includes(false)) {
      const bad = fields[results.indexOf(false)];
      const step = steps.findIndex((s) => s.contains(bad));
      if (step >= 0 && step !== current) goTo(step, 'field');
      if (bad) focusField(bad);
      return;
    }
    setBusy(true);
    const data: Record<string, string | number | boolean> = {};
    new FormData(form).forEach((v, k) => { data[k] = String(v); });
    const consent = form.querySelector<HTMLInputElement>('input[name="consent"]');
    data.consent = Boolean(consent?.checked);
    data.ts = Number(data.ts) || 0;
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      let body: { ok?: boolean; error?: string; fields?: Record<string, string> } = {};
      try { body = await res.clone().json(); } catch { body = {}; }
      const ok = body.ok === true || (res.ok && body.ok === undefined);
      if (ok) {
        form.hidden = true;
        if (success) { success.hidden = false; success.focus?.(); }
        return;
      }
      if (body.error === 'validation' && body.fields) {
        let firstBad: Field | undefined;
        Object.entries(body.fields).forEach(([name, code]) => {
          const f = fields.find((x) => x.name === name);
          if (!f) return;
          setError(f, code === 'email' ? msgs.email : code === 'consent' ? msgs.consent : code === 'minLength' ? msgs.minLength.replace('{min}', '10') : msgs.required);
          firstBad = firstBad ?? f;
        });
        if (firstBad) {
          const step = steps.findIndex((s) => s.contains(firstBad!));
          if (step >= 0) goTo(step, 'field');
        }
        return;
      }
      showFailure(body.error === 'rate_limit' || res.status === 429 ? msgs.rateLimit : body.error === 'spam' ? msgs.spam : msgs.errorText);
    } catch {
      showFailure(msgs.errorText);
    } finally {
      setBusy(false);
    }
  }, { signal: ac.signal });

  cleanup.push(() => ac.abort());
}

function init() {
  destroy();
  document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach(initForm);
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
