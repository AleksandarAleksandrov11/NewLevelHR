/**
 * Contact form: floating labels, live validation, honeypot, timing token and a
 * JSON post to the configured endpoint (api/contact.js or public/contact.php).
 */
let cleanup: Array<() => void> = [];

interface Messages { required: string; email: string; minLength: string; consent: string; rateLimit: string; spam: string; errorText: string }

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
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[data-field]'));

  const errorEl = (f: Element) => form.querySelector<HTMLElement>(`[data-error-for="${(f as HTMLInputElement).name}"]`);
  const setError = (f: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, msg: string) => {
    const el = errorEl(f);
    if (el) el.textContent = msg;
    f.setAttribute('aria-invalid', msg ? 'true' : 'false');
    f.closest('.field')?.classList.toggle('has-error', Boolean(msg));
  };
  const validate = (f: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean => {
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
    if (results.includes(false)) { fields[results.indexOf(false)]?.focus(); return; }
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
        Object.entries(body.fields).forEach(([name, code]) => {
          const f = fields.find((x) => x.name === name);
          if (f) setError(f, code === 'email' ? msgs.email : code === 'consent' ? msgs.consent : code === 'minLength' ? msgs.minLength.replace('{min}', '10') : msgs.required);
        });
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
