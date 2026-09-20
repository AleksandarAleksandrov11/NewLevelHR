# NewLevelHR — website

Multilingual (EN · DE · BG) marketing website for [NewLevelHR](https://newlevelhr.com), a fractional HR
consultancy for startups and SMEs. Built with Astro 7 as a fully static site, with a small serverless or PHP
endpoint for the contact form.

## Stack

| Area | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build) (static output, content collections, View Transitions) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/styles/global.css` |
| Motion | GSAP + ScrollTrigger, Lenis smooth scroll, Three.js (hero, loaded lazily) |
| Fonts | Inter Variable + Manrope Variable, self-hosted (latin, latin-ext, cyrillic) |
| Images | `astro:assets` (AVIF/WebP, `srcset`, lazy loading) |
| Forms | Four-step contact form; `api/contact.js` (Vercel, Resend) or `public/contact.php` (classic PHP hosting) |
| QA | Playwright screenshots and end-to-end checks, Lighthouse, link/hreflang/i18n checks |

## Requirements

* Node.js 22.12 or newer
* npm 10

## Getting started

```bash
npm ci
cp .env.example .env      # fill in the values described below
npm run dev               # http://localhost:4321/en/
```

`npm run dev` starts the Astro dev server with hot reloading. The root `/` redirects to `/en/`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves `dist/` locally (http://127.0.0.1:4321) |
| `npm run check` | `astro check`: TypeScript and template diagnostics |
| `npm run check:i18n` | Fails if any dictionary key is missing or untranslated in DE/BG |
| `npm run check:lang` | Fails if Spanish text is found in the build or the sources |
| `npm run check:links` | Crawls `dist/`: internal links, anchors, canonicals, reciprocal hreflang, sitemap |
| `npm run qa:screenshots` | Screenshots every page at 390 px and 1440 px into `docs/qa-screenshots/` |
| `npm run qa:lighthouse` | Mobile Lighthouse for the key pages in the three languages → `docs/qa/lighthouse.md` |
| `npm run qa:e2e` | Playwright checks: cookie consent, language switcher, header, contact form, tools, 404 |
| `npm test` | `check` + `check:i18n` + `build` + `check:lang` + `check:links` |

The QA scripts serve `dist/` themselves (with compression and a real 404 status) after `npm run build`; pass
`--base=https://…` to run them against a deployed site instead.

## Environment variables

Copy `.env.example` to `.env`. Variables prefixed with `PUBLIC_` are inlined into the client bundle at build time.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical origin, used for canonicals, hreflang, sitemap, Open Graph |
| `PUBLIC_BOOKING_URL` | Calendly link for the free 30-minute call (**placeholder until the client provides it**) |
| `PUBLIC_FORM_ENDPOINT` | Where the contact form posts: `/api/contact` (Vercel), `/contact.php` (PHP hosting) or a hosted form service URL |
| `PUBLIC_FORM_TOKEN` / `CONTACT_TOKEN` | Optional shared secret between the form and the endpoint |
| `CONTACT_TO` | Recipient mailbox for contact messages |
| `CONTACT_FROM` | Sender address used by the endpoint |
| `RESEND_API_KEY` | Resend API key used by `api/contact.js` on Vercel |
| `PUBLIC_ANALYTICS`, `PUBLIC_ANALYTICS_DOMAIN`, `PUBLIC_ANALYTICS_SRC` | Optional privacy-friendly analytics, loaded only after consent |

## Project structure

```
api/contact.js               Vercel serverless function for the contact form
public/                      Static files copied as-is: fonts, icons, contact.php, .htaccess, manifest
src/
  assets/images/             Photography (see docs/image-credits.md)
  components/
    layout/                  PageShell, Header, Footer, LangSwitcher, LangBanner, CookieBanner, Preloader
    home/                    Home page sections
    ui/                      Button, SectionHeading, Accordion, Breadcrumbs, Photo, Wordmark
    sections/                Shared sections (FinalCta)
    seo/                     Seo (meta, canonical, hreflang, Open Graph) and JsonLd
  config/site.ts             Company data, feature flags (KPIs, testimonials), storage names
  i18n/
    config.ts, routes.ts     Locales and the translated slug registry
    en/ de/ bg/              Dictionaries, one file per namespace; English is the type reference
  layouts/Base.astro         Document shell
  lib/                       Helpers (seo, images, og, page-meta)
  pages/
    index.astro              Root redirect to /en/
    [lang]/[...path].astro   Localised router for every page
    404.astro                Root 404: English shell + localized fallback; DE/BG URLs continue to /de/404/, /bg/404/
    sitemap.xml.ts, robots.txt.ts, og/…  Generated SEO files and Open Graph images
  scripts/                   Client-side TypeScript (motion core, header, consent, cursor, tools)
  styles/global.css          Tailwind v4 theme tokens and base styles
  views/                     One component per page type, rendered by the router
scripts/                     Build-time and QA scripts
docs/                        Design system, image credits, QA reports and screenshots, references
```

### Internationalisation

* Every visible string lives in `src/i18n/<lang>/<namespace>.ts`. English files export the object and its
  type; German and Bulgarian files are typed against it, so a missing key is a TypeScript error.
  `npm run check:i18n` performs the same check at runtime and also flags untranslated values.
* `src/i18n/routes.ts` maps every page to its slug per language. Use `localizePath(key, lang)` for links.
  The language switcher always links to the same page in the other language.
* `hreflang` and `x-default` alternates, canonical URLs and the multilingual sitemap are generated automatically.

### Enabling KPIs, testimonials and client logos

`src/config/site.ts` contains `kpis`, `testimonials` and `clientLogos`. They are disabled until the client
provides verifiable data; set `enabled: true` and fill in the items.

## Deployment

### Vercel (recommended)

The repository contains a `vercel.json` with the framework preset, root redirect, trailing-slash handling,
legacy URL redirects, cache and security headers, and the serverless function `api/contact.js`.

1. Import the repository in Vercel (framework: Astro, build command `npm run build`, output `dist`).
2. Add the environment variables from `.env.example` in *Project → Settings → Environment Variables*
   (at least `SITE_URL`, `PUBLIC_BOOKING_URL`, `PUBLIC_FORM_ENDPOINT=/api/contact`, `CONTACT_TO`,
   `CONTACT_FROM`, `RESEND_API_KEY`).
3. Verify the sending domain in Resend so that `CONTACT_FROM` is accepted.
4. Deploy. The 404 page, redirects and headers are handled by Vercel from `vercel.json` and `dist/404.html`.

The `functions` block in `vercel.json` only sets `memory` and `maxDuration`. The runtime itself is inferred
from the file extension, and its `runtime` key would have to be an npm package with a version
(`@vercel/node@5.x`), never an AWS-style identifier such as `nodejs22.x` — that value fails the build with
*"Function Runtimes must have a valid version"*. The Node.js major version comes from `engines.node` in
`package.json` (`22.x`) or from *Project → Settings → Node.js Version*.

### Classic PHP hosting (current host)

1. Build locally: `PUBLIC_FORM_ENDPOINT=/contact.php npm run build`.
2. Upload the contents of `dist/` to the web root. `public/.htaccess` and `public/contact.php` are included
   in the build output and provide the root redirect, the 404 page, caching headers and the form endpoint.
3. Configure the form recipient either through environment variables (`CONTACT_TO`, `CONTACT_FROM`,
   `CONTACT_TOKEN`) or by copying `contact.config.example.php` to `contact.config.php` next to
   `contact.php` and editing it.
4. Make sure PHP 8 and the `mail()` function are available on the host.

### Any other static host

Upload `dist/`. Configure a redirect from `/` to `/en/`, serve `404.html` for unknown URLs and point
`PUBLIC_FORM_ENDPOINT` at a hosted form service (for example Formspree) at build time.

## Quality gates

Before deploying run `npm test` (`astro check`, dictionary parity, build, language guard, link/hreflang/sitemap
check). For the full visual and functional QA run, after `npm run build`:

| Command | Output |
| --- | --- |
| `npm run qa:e2e` | `docs/qa/e2e.md`: cookie consent, language banner and switcher, sticky header, contact form (mocked endpoint), quiz, calculator, FAQ, 404, reduced motion, view transitions |
| `npm run qa:screenshots` | `docs/qa-screenshots/`: every page in EN/DE/BG at 390 px and 1440 px, UI states, and a horizontal-overflow check at 360/390/768/1024/1280/1440/1920 px |
| `npm run qa:lighthouse` | `docs/qa/lighthouse.md`: mobile Lighthouse for home, services, a service page, What We Fix, about, FAQ and contact in the three languages (target ≥ 90 everywhere) |

Each script exits with a non-zero code when a check fails, so they can run in CI. The Chromium bundled with
Playwright is used; set `CHROMIUM_PATH` to use another binary.

## Documentation

* `docs/design-system.md` — tokens, typography, section backgrounds, motion hooks, components
* `docs/image-credits.md` — photographer, source and license of every image
* `docs/qa/` and `docs/qa-screenshots/` — QA reports and screenshots
* `docs/reference/` — reference screenshots and extracted content of the previous site (not deployed)
* `TODO-CLIENT.md` — everything the client still has to provide or confirm
* `PR_SUMMARY.md` — summary of decisions and results
