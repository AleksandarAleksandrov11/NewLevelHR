# NewLevelHR — website redesign

Branch `fable/newlevelhr-redesign`. A from-scratch rebuild of newlevelhr.com as a static Astro 7 site in
English, German and Bulgarian, with the conversion-oriented home page, all inner pages, the blog, legal pages,
a contact form backend for Vercel and for classic PHP hosting, SEO plumbing and a QA suite.

## What was delivered

| Area | Result |
| --- | --- |
| Languages | EN (default), DE (formal *Sie*), BG (formal *Вие*); translated slugs (`/en/services/…`, `/de/leistungen/…`, `/bg/uslugi/…`); `/` → `/en/` plus a dismissible browser-language suggestion, never a forced redirect |
| Pages per language | Home (17 sections), Services + 4 service pages, What We Fix, About, How We Work, Blog + 4 posts (+ 3 draft outlines), FAQ, Contact, Legal notice, Terms, Privacy, Cookie policy, 404 |
| Total | 60 indexable pages + 3 localized 404 pages + root redirect; 60 sitemap entries with reciprocal `hreflang` and `x-default` |
| Home sections | Sticky glass header with mega menu · lazy Three.js hero · marquee · manifesto · 8 flip-card problems · service cards · pinned 90-day timeline · fractional vs full-time comparison · HR Health Check quiz · cost-of-a-bad-hire calculator · facts strip (KPI counters disabled until verified) · about teaser · testimonials (hidden until provided) · blog teaser · FAQ teaser · orange final CTA · footer |
| Contact | `api/contact.js` (Vercel + Resend) and `public/contact.php` (PHP 8 `mail()`): validation, honeypot, timing check, rate limit, consent, translated messages; `.env.example` documents the switch |
| Cookies / GDPR | Own consent dialog (Accept / Reject / Configure), nothing optional before consent, revocable from the footer, first-party cookie `nlhr_consent`, no remote fonts or third-party requests |
| SEO | Unique title/description per page and language, canonical, `hreflang`, Open Graph + Twitter with generated 1200×630 images (satori/resvg, Cyrillic-capable), JSON-LD (Organization/ProfessionalService, Service, FAQPage, BlogPosting, BreadcrumbList, HowTo, Person), sitemap, robots, favicons, web manifest |
| Deployment | `vercel.json` (redirects, headers, function) and `public/.htaccess` (Apache: redirects, 404, caching, security headers, CSP) |
| Docs | `README.md`, `TODO-CLIENT.md`, `docs/design-system.md`, `docs/image-credits.md`, `docs/qa/`, `docs/qa-screenshots/` |

## Key decisions

1. **Astro 7 static output, no client framework.** Every interactive piece (header, consent, quiz, calculator, FAQ
   search, blog filters, form) is a small TypeScript module that initialises on `astro:page-load` and cleans up on
   `astro:before-swap`, so View Transitions work without leaks. Total JS on the home page stays well under the
   budget; Three.js is a separate chunk loaded on first interaction or after 6.5 s and skipped on weak devices,
   with reduced motion, or without WebGL.
2. **Dictionaries, not inline strings.** `src/i18n/<lang>/<namespace>.ts`; English exports the type, DE/BG are
   typed against it, and `scripts/check-i18n.mjs` fails on missing keys, array-length mismatches, placeholder
   differences or sentence-length strings identical to English. A deep-merge fallback prevents `undefined`
   from ever rendering.
3. **Slug registry.** `src/i18n/routes.ts` owns every page's slug per language; the catch-all route
   `src/pages/[lang]/[...path].astro` renders views. The language switcher, hreflang, breadcrumbs and the sitemap
   all derive from the same registry, so a page cannot fall out of sync.
4. **Light, warm, premium palette.** Ivory/sand surfaces, ink text, the brand orange kept for buttons, gradients
   and highlights, `#C2410C` for orange text on light backgrounds (AA), teal as a secondary tone. Manrope
   (display) + Inter (text), self-hosted with Latin/Latin-ext/Cyrillic subsets.
5. **Honest content.** KPI counters, testimonials and client logos exist in code but are disabled until the client
   provides verifiable data (`src/config/site.ts`). Legal placeholders remain visible as "TO BE ADDED". The
   § 5 TMG → § 5 DDG question is listed in `TODO-CLIENT.md` for legal counsel rather than silently changed.
6. **Motion with an off switch.** Lenis + GSAP ScrollTrigger drive reveals, the pinned 90-day bridge, counters
   and parallax through `data-*` hooks; `prefers-reduced-motion` disables all of it, the preloader and the
   custom cursor, and content is never hidden without JavaScript.
7. **Contact form contract.** The client posts JSON `{ name, email, company, topic, message, consent, website
   (honeypot), ts, lang, token }` and expects `{ ok: true }` or `{ ok: false, error, fields }`. Both backends
   implement the same contract, so switching hosts is a one-variable change (`PUBLIC_FORM_ENDPOINT`).
8. **Blog.** Markdown content collections per language with a shared slug; posts missing in a language link to
   that language's blog index. The four inherited posts were expanded into full articles; the three announced
   topics exist as `draft: true` outlines. The inherited cover images are flagged for license confirmation.
9. **Formal address everywhere.** DE uses *Sie*, BG uses *Вие*, including the translated blog posts (the
   originals were informal in places; see `TODO-CLIENT.md`).
10. **One 404 document, three languages.** Static hosts serve a single `404.html`. It carries the English shell
    with all three localized messages as a no-JavaScript fallback, and a tiny inline script continues `/de/…`
    and `/bg/…` URLs to the fully localized `/de/404/` and `/bg/404/` pages (header, footer and cookie dialog
    in the right language) while the HTTP status of the original response stays 404 for crawlers.
11. **QA that runs by itself.** The QA scripts serve `dist/` through a small compressing static server, so no
    preview server is needed and Lighthouse measures the site rather than the compressor. Screenshots are taken
    after wheel-driven scrolling so Lenis, IntersectionObserver reveals and ScrollTrigger pins all run first.

## Quality assurance

| Check | Command | Result |
| --- | --- | --- |
| Type and template diagnostics | `npm run check` | 0 errors, 0 warnings |
| Dictionary parity EN/DE/BG | `npm run check:i18n` | 13 namespaces, 1 592 strings, 0 errors |
| Language guard (no Spanish) | `npm run check:lang` | clean (sources, docs, build) |
| Links, anchors, canonicals, hreflang, sitemap, OG images | `npm run check:links` | 65 pages, 0 errors |
| End-to-end behaviour (cookies, banner, switcher, header, form, quiz, calculator, FAQ, blog, 404, reduced motion, view transitions) | `npm run qa:e2e` | 21/21 passed (`docs/qa/e2e.md`) |
| Screenshots 390/1440 px, overflow at 360–1920 px | `npm run qa:screenshots` | see `docs/qa-screenshots/README.md` |
| Lighthouse mobile | `npm run qa:lighthouse` | see below and `docs/qa/lighthouse.md` |

### Lighthouse (mobile, simulated throttling)

LIGHTHOUSE_TABLE

## Not done / needs the client

Everything that needs input from NewLevelHR is in `TODO-CLIENT.md`: company registration numbers, hosting
provider names for the privacy policy, the real Calendly link, Resend credentials, a founder portrait, verified
KPIs, testimonials, client logos, confirmation of the inherited blog cover licenses, and the choice of host.

## Commits

Conventional commits, one feature area each, on `fable/newlevelhr-redesign` (also pushed to
`claude/clever-albattani-bggq5q`):

COMMIT_LIST
