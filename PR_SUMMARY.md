# NewLevelHR — website redesign

A from-scratch rebuild of newlevelhr.com as a static Astro 7 site in English, German and Bulgarian, with the
conversion-oriented home page, all inner pages, legal pages, a contact form backend for Vercel and for classic
PHP hosting, SEO plumbing and a QA suite.

## What was delivered

| Area | Result |
| --- | --- |
| Languages | EN (default), DE (formal *Sie*), BG (formal *Вие*); translated slugs (`/en/services/…`, `/de/leistungen/…`, `/bg/uslugi/…`); `/` → `/en/` plus a dismissible browser-language suggestion, never a forced redirect |
| Pages per language | Home, Services + 4 service pages, What We Fix, About, How We Work, FAQ, Contact, Legal notice, Terms, Privacy, Cookie policy, 404 |
| Total | 45 indexable pages + 3 localized 404 pages + root redirect; 45 sitemap entries with reciprocal `hreflang` and `x-default` |
| Home sections | Sticky glass header with mega menu · lazy Three.js hero · marquee · manifesto · 4 flip-card problems with a link to all eight · service cards · pinned 90-day timeline · fractional vs full-time comparison · HR Health Check quiz · cost-of-a-bad-hire calculator · testimonials (hidden until provided) · FAQ teaser · orange final CTA · footer |
| Contact | `api/contact.js` (Vercel + Resend) and `public/contact.php` (PHP 8 `mail()`): validation, honeypot, timing check, rate limit, consent, translated messages; `.env.example` documents the switch |
| Cookies / GDPR | Own consent dialog (Accept / Reject / Configure), nothing optional before consent, revocable from the footer, first-party cookie `nlhr_consent`, no remote fonts or third-party requests |
| SEO | Unique title/description per page and language, canonical, `hreflang`, Open Graph + Twitter with generated 1200×630 images (satori/resvg, Cyrillic-capable), JSON-LD (Organization/ProfessionalService, Service, FAQPage, BreadcrumbList, HowTo, Person), sitemap, robots, favicons, web manifest |
| Deployment | `vercel.json` (redirects, headers, function) and `public/.htaccess` (Apache: redirects, 404, caching, security headers, CSP) |
| Docs | `README.md`, `TODO-CLIENT.md`, `docs/design-system.md`, `docs/image-credits.md`, `docs/qa/`, `docs/qa-screenshots/` |

## Key decisions

1. **Astro 7 static output, no client framework.** Every interactive piece (header, consent, quiz, calculator, FAQ
   search, form) is a small TypeScript module that initialises on `astro:page-load` and cleans up on
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
5. **Nothing on the page looks unfinished.** KPI counters, testimonials and client logos exist in code but stay
   disabled until the client provides verifiable data (`src/config/site.ts`). The legal placeholders are gone:
   the registration rows were removed rather than invented, and the payment term, retention periods and effective
   date carry sensible defaults. Everything that still needs the client is in `TODO-CLIENT.md`, including the
   § 5 TMG to § 5 DDG question for legal counsel.
6. **Motion with an off switch.** Lenis + GSAP ScrollTrigger drive reveals, the pinned 90-day bridge, counters
   and parallax through `data-*` hooks; `prefers-reduced-motion` disables all of it, the preloader and the
   custom cursor, and content is never hidden without JavaScript.
7. **Contact form contract.** The client posts JSON `{ name, email, company, topic, message, consent, website
   (honeypot), ts, lang, token }` and expects `{ ok: true }` or `{ ok: false, error, fields }`. Both backends
   implement the same contract, so switching hosts is a one-variable change (`PUBLIC_FORM_ENDPOINT`).
8. **Shorter pages.** The home page lost the facts strip, the about teaser and the blog teaser and shows four of
   the eight problems; What We Fix uses compact two-column cards with trimmed copy and a single closing CTA;
   About lost the human-versus-automation and practical-details sections; service pages lost the problems chips.
   The blog was removed entirely, and the legacy blog URLs now redirect to the home page.
9. **No decorative badges, no dashes.** The pill tags on the home cards, the service heroes and the What We Fix
   page are gone, so each card leads with its headline. Em and en dashes were replaced with colons, commas or
   full stops across all three languages, which also removes the punctuation that reads as machine-written.
10. **Native cursor with a pixel trail.** `src/scripts/cursor.ts` paints grid-snapped squares along the pointer
   path on a full-screen canvas: emission follows the segment between two moves, alpha and size fade in discrete
   steps, and the loop stops when the pointer does. Fine pointers only, never with reduced motion, and the system
   cursor is never hidden.
11. **Formal address everywhere.** DE uses *Sie*, BG uses *Вие*, on every page and in every form message.
12. **One 404 document, three languages.** Static hosts serve a single `404.html`. It carries the English shell
    with all three localized messages as a no-JavaScript fallback, and a tiny inline script continues `/de/…`
    and `/bg/…` URLs to the fully localized `/de/404/` and `/bg/404/` pages (header, footer and cookie dialog
    in the right language) while the HTTP status of the original response stays 404 for crawlers.
13. **QA that runs by itself.** The QA scripts serve `dist/` through a small compressing static server, so no
    preview server is needed and Lighthouse measures the site rather than the compressor. Screenshots are taken
    after wheel-driven scrolling so Lenis, IntersectionObserver reveals and ScrollTrigger pins all run first.

## Quality assurance

| Check | Command | Result |
| --- | --- | --- |
| Type and template diagnostics | `npm run check` | 0 errors, 0 warnings |
| Dictionary parity EN/DE/BG | `npm run check:i18n` | 12 namespaces, 1 413 strings, 0 errors |
| Language guard (no Spanish) | `npm run check:lang` | clean (sources, docs, build) |
| Links, anchors, canonicals, hreflang, sitemap, OG images | `npm run check:links` | 50 pages, 0 errors |
| End-to-end behaviour (cookies, banner, switcher, sticky header, form, quiz, calculator, FAQ, cursor trail, 404, reduced motion, view transitions) | `npm run qa:e2e` | 23/23 passed (`docs/qa/e2e.md`) |
| Screenshots 390/1440 px, overflow at 360 to 1920 px | `npm run qa:screenshots` | 114 screenshots (45 pages × 2 widths + UI states), no horizontal overflow at any of the seven widths, 0 console errors (`docs/qa-screenshots/README.md`) |
| Lighthouse mobile | `npm run qa:lighthouse` | see below and `docs/qa/lighthouse.md` |

### Lighthouse (mobile, simulated throttling)

All 21 audited pages score at least **96** in performance and **100** in accessibility, best practices and SEO (mobile preset, simulated throttling, local static server with compression). Full report: `docs/qa/lighthouse.md`.

| Page | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/` | 97 | 100 | 100 | 100 | 2.4 s | 30 ms | 0 |
| `/en/services/` | 98 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/en/services/fractional-hr-partnership/` | 98 | 100 | 100 | 100 | 2.3 s | 20 ms | 0 |
| `/en/what-we-fix/` | 98 | 100 | 100 | 100 | 2.3 s | 20 ms | 0 |
| `/en/about/` | 98 | 100 | 100 | 100 | 2.2 s | 10 ms | 0 |
| `/en/faq/` | 97 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/en/contact/` | 98 | 100 | 100 | 100 | 2.1 s | 10 ms | 0 |
| `/de/` | 97 | 100 | 100 | 100 | 2.4 s | 20 ms | 0 |
| `/de/leistungen/` | 98 | 100 | 100 | 100 | 2.3 s | 0 ms | 0 |
| `/de/leistungen/fraktionale-hr-partnerschaft/` | 97 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/de/was-wir-loesen/` | 97 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/de/ueber-uns/` | 98 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/de/faq/` | 97 | 100 | 100 | 100 | 2.3 s | 10 ms | 0 |
| `/de/kontakt/` | 98 | 100 | 100 | 100 | 2.1 s | 10 ms | 0 |
| `/bg/` | 96 | 100 | 100 | 100 | 2.6 s | 20 ms | 0 |
| `/bg/uslugi/` | 98 | 100 | 100 | 100 | 2.4 s | 10 ms | 0 |
| `/bg/uslugi/fraktsionno-hr-partniorstvo/` | 97 | 100 | 100 | 100 | 2.4 s | 20 ms | 0 |
| `/bg/kakvo-reshavame/` | 97 | 100 | 100 | 100 | 2.4 s | 20 ms | 0 |
| `/bg/za-nas/` | 97 | 100 | 100 | 100 | 2.6 s | 10 ms | 0 |
| `/bg/faq/` | 97 | 100 | 100 | 100 | 2.4 s | 20 ms | 0 |
| `/bg/kontakti/` | 98 | 100 | 100 | 100 | 2.3 s | 20 ms | 0 |

## Not done / needs the client

Everything that needs input from NewLevelHR is in `TODO-CLIENT.md`: company registration numbers, hosting
provider names for the privacy policy, the real Calendly link, Resend credentials, a founder portrait, verified
KPIs, testimonials, client logos, confirmation of the inherited blog cover licenses, and the choice of host.

## Commits

Conventional commits on `claude/clever-albattani-bggq5q`. The initial build was squashed into `main` as
"Initial commit redesign"; the commits since then are:

* `0572875` fix(vercel): remove the invalid function runtime identifier that failed the build
* `57d49ba` feat(site): shorter pages, no badges, pixel cursor trail, sticky header, founder portrait
* `861405a` test(qa): cover the sticky header, the slider fill and the pixel cursor trail
* `7829cb8` docs: README, design system, image credits, client TODO and PR summary for the trimmed site
* `ae5ab2c` chore: drop the unused facts and about teaser components with their dictionary entries
* `515bd68` fix(cursor): denser, longer-lived pixel trail; only resize the canvas on a real size change
* `9721e52` docs(qa): screenshots of the trimmed site (in progress)
