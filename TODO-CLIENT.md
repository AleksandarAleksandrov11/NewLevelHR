# Open items for the client

Everything on this list is either a placeholder in the site or a decision that only NewLevelHR can make.
Items marked **visible** are rendered on the live site until replaced.

## 1. Company and legal data

| Item | Where it appears | Status |
| --- | --- | --- |
| Unified Identification Code (UIC / EIK, the "BULSTAT" number) and the full registered name with its legal form (e.g. "NewLevelHR EOOD") | Legal notice (all languages), "Company Registration"; organization JSON-LD | not shown yet: the section names the register but no number. The client now has the number; send it to add it |
| Registered (seat and management) address | Legal notice and privacy policy only | the street was removed from the footer, the contact page and the structured data (now "Remote · Blagoevgrad"), but kept on these two pages: the Bulgarian Commerce Act and § 5 DDG both expect a serviceable address there. Replace it with the registered address if it differs, or confirm it may go |
| VAT identification number (if applicable) | Legal notice | **visible** "TO BE ADDED" |
| Payment term in § 4 of the Terms (e.g. 14 days) | Terms & Conditions | **visible** "TO BE ADDED — e.g. 14 days" |
| Name of the hosting provider and its log retention | Privacy policy, "Hosting and server logs" | **visible** placeholder |
| Email/transactional provider used for the contact form (Resend or the host's mail server) | Privacy policy, "Contact form" | **visible** placeholder |
| Retention period for inquiries | Privacy policy | **visible** placeholder (suggested: 12 months) |
| Effective date of the privacy policy and cookie policy | Legal pages | **visible** placeholder |
| Legal review of the German legal notice reference: § 5 TMG was replaced by § 5 DDG (Digitale-Dienste-Gesetz) in May 2024. The text still says "§ 5 TMG / Bulgarian Commerce Act" as on the previous site. | Legal notice | to review with legal counsel |
| Legal review of the DE and BG translations of Terms, Privacy and Cookie Policy | Legal pages | to review with legal counsel |
| Calendly data transfer mechanism (EU–US Data Privacy Framework / standard contractual clauses) | Privacy policy | to confirm |

## 2. Booking and contact

| Item | Where | Status |
| --- | --- | --- |
| Real Calendly event link | `PUBLIC_BOOKING_URL` in `.env` / Vercel settings; every "Book a free call" button, and the inline calendar on the contact page | **placeholder** (generic calendly.com) |
| Calendly in the CSP: add `https://assets.calendly.com` to `script-src` and `https://calendly.com` to `frame-src` once the inline calendar goes live | `public/.htaccess` | needed with the real link |
| Resend API key and verified sending domain (Vercel deployment) | `RESEND_API_KEY`, `CONTACT_FROM` | needed before the form works on Vercel |
| Confirm recipient mailbox for the form | `CONTACT_TO` (default info@newlevelhr.com) | to confirm |

## 3. People and proof

| Item | Where | Status |
| --- | --- | --- |
| Higher-resolution portrait of Mariyana Velkova (at least 1600 px, ideally 4:5) | About page hero | the supplied phone photo is in use, cropped to 896 × 1120 px |
| Real, verifiable KPI figures (hiring success rate, average time-to-hire, client retention) | `src/config/site.ts` → `kpis` | hidden until provided; the previous site showed unverified counters |
| Client testimonials (quote, name, role, company, written permission) | `src/config/site.ts` → `testimonials` | hidden until provided |
| Client logos (SVG, permission to use) | `src/config/site.ts` → `clientLogos` | hidden until provided |
| Social profiles (LinkedIn etc.) | `src/config/site.ts` → `social`, footer, JSON-LD `sameAs` | none configured |

## 4. Content

| Item | Where | Status |
| --- | --- | --- |
| Optional privacy-friendly analytics (e.g. Plausible) | `.env` `PUBLIC_ANALYTICS*` | decision; off by default, loads only after consent |

## 5. Hosting decisions

| Item | Where | Status |
| --- | --- | --- |
| Hosting target: Vercel (recommended, `vercel.json` + `api/contact.js`) or the current PHP host (`public/.htaccess` + `public/contact.php`) | README "Deployment" | decision |
| Domain and DNS: point `newlevelhr.com` at the chosen host; `SITE_URL` must match the final origin so canonicals, hreflang and the sitemap are correct | `.env` / Vercel settings | after the decision |
| Content Security Policy: `public/.htaccess` ships a strict CSP; extend `script-src`, `connect-src` and `frame-src` when adding third parties (booking widget, analytics). Vercel deployments set no CSP by default. | `public/.htaccess`, `vercel.json` | when adding third parties |
| Rate limiting of the Vercel contact function is per instance (in memory). For a stricter limit use a shared store (Vercel KV, Upstash) or a form service. | `api/contact.js` | optional |
| Submit the sitemap in Google Search Console after launch (`https://newlevelhr.com/sitemap.xml`) and set up redirects for any old URL not listed in `vercel.json` / `.htaccess`. | Search Console | after launch |

## 6. Nice to have

* Additional photography of the real team and office to replace the licensed stock photos over time.
* A short video or audio greeting from the founder for the About page.
