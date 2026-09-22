/**
 * Vercel Serverless Function — contact form endpoint (Node.js runtime).
 * Mirrors public/contact.php: same request/response contract, validation,
 * honeypot, timing check and best-effort rate limiting.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  — API key from https://resend.com (transactional email)
 *   CONTACT_TO      — recipient mailbox (default info@newlevelhr.com)
 *   CONTACT_FROM    — verified sender, e.g. "NewLevelHR <noreply@newlevelhr.com>"
 *   CONTACT_TOKEN   — optional shared secret; must match PUBLIC_FORM_TOKEN
 *
 * Request: POST application/json or multipart/x-www-form-urlencoded
 *   { name, email, company, topic, message, consent: "on"|"true", website: "" (honeypot), ts, lang, token? }
 * Response: { ok: true } | { ok: false, error: "validation"|"spam"|"rate_limit"|"config"|"send", fields?: {...} }
 */

const TOPICS = new Set(['fractional', 'hiring', 'coaching', 'compliance', 'general']);
const LANGS = new Set(['en', 'de', 'bg']);
const MAX = { name: 120, email: 200, company: 160, message: 5000 };
const MIN_MESSAGE = 10;
const MIN_FILL_MS = 3000;          // forms submitted faster than this are bots
const RATE = { windowMs: 60 * 60 * 1000, max: 5 }; // per IP, per warm instance (best effort)

const buckets = new Map();

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  return (Array.isArray(xf) ? xf[0] : (xf || '')).split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const b = buckets.get(ip) || [];
  const recent = b.filter((t) => now - t < RATE.windowMs);
  if (recent.length >= RATE.max) { buckets.set(ip, recent); return true; }
  recent.push(now);
  buckets.set(ip, recent);
  if (buckets.size > 5000) buckets.clear();
  return false;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const raw = await new Promise((resolve) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => resolve(d)); });
  const ct = String(req.headers['content-type'] || '');
  if (ct.includes('application/json')) { try { return JSON.parse(raw || '{}'); } catch { return {}; } }
  return Object.fromEntries(new URLSearchParams(raw));
}

const clean = (v, max) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function validate(b) {
  const fields = {};
  const name = clean(b.name, MAX.name);
  const email = clean(b.email, MAX.email);
  const company = clean(b.company, MAX.company);
  const topic = clean(b.topic, 40);
  const message = String(b.message ?? '').trim().slice(0, MAX.message);
  const consent = ['on', 'true', '1', 'yes'].includes(String(b.consent ?? '').toLowerCase());
  if (!name) fields.name = 'required';
  if (!company) fields.company = 'required';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.email = 'email';
  if (!TOPICS.has(topic)) fields.topic = 'required';
  if (message.length < MIN_MESSAGE) fields.message = 'minLength';
  if (!consent) fields.consent = 'consent';
  return { ok: Object.keys(fields).length === 0, fields, data: { name, email, company, topic, message, consent } };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }

  const body = await readBody(req);
  const lang = LANGS.has(body.lang) ? body.lang : 'en';

  // Shared secret (optional)
  if (process.env.CONTACT_TOKEN && body.token !== process.env.CONTACT_TOKEN) return res.status(403).json({ ok: false, error: 'spam' });
  // Honeypot: real users never fill the hidden "website" field
  if (String(body.website ?? '').trim() !== '') return res.status(200).json({ ok: true }); // silently accept
  // Timing: form rendered at ts (ms); bots submit instantly
  const ts = Number(body.ts || 0);
  if (!ts || Date.now() - ts < MIN_FILL_MS) return res.status(400).json({ ok: false, error: 'spam' });

  const ip = clientIp(req);
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'rate_limit' });

  const v = validate(body);
  if (!v.ok) return res.status(422).json({ ok: false, error: 'validation', fields: v.fields });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'info@newlevelhr.com';
  const from = process.env.CONTACT_FROM || 'NewLevelHR <noreply@newlevelhr.com>';
  if (!apiKey) { console.error('contact: RESEND_API_KEY is not configured'); return res.status(503).json({ ok: false, error: 'config' }); }

  const { name, email, company, topic, message } = v.data;
  const subject = `[NewLevelHR] ${topic} — ${name} (${company})`;
  const text = [`Name: ${name}`, `Email: ${email}`, `Company: ${company}`, `Topic: ${topic}`, `Language: ${lang}`, `IP: ${ip}`, '', message].join('\n');
  const html = `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Company:</strong> ${escapeHtml(company)}<br><strong>Topic:</strong> ${escapeHtml(topic)}<br><strong>Language:</strong> ${lang}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
    });
    if (!r.ok) { console.error('contact: resend error', r.status, await r.text()); return res.status(502).json({ ok: false, error: 'send' }); }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: send failed', err);
    return res.status(502).json({ ok: false, error: 'send' });
  }
}
