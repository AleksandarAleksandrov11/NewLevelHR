# NewLevelHR design system

The whole visual language lives in `src/styles/global.css` as Tailwind v4 `@theme` tokens and a handful of
recurring patterns. Components consume tokens either as Tailwind utilities (`bg-ivory`, `text-accent-ink`,
`font-display`, `rounded-lg`, `ease-out-expo`) or as CSS custom properties (`var(--color-ink)`).

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `white` | `#FFFFFF` | Cards, clean sections |
| `ivory` | `#FBF8F4` | Page background, default section surface |
| `sand` / `sand-2` / `sand-3` | `#F4EEE6` / `#EBE2D6` / `#E0D5C6` | Alternate light sections, pills, dividers |
| `ink` | `#14141C` | Primary text, dark contrast sections (inherited from the previous site) |
| `ink-2` … `ink-4` | `#1F1F2A` … `#3D3D4C` | Dark surface steps, secondary text on light |
| `slate` | `#5B5B6C` | Muted body text on light (AA on ivory: 6.5:1) |
| `mist` | `#8B8B99` | Captions, large decorative labels only |
| `accent` | `#FF6B35` | Brand orange: large surfaces, icons, buttons with ink text |
| `accent-2` / `accent-3` | `#F7931E` / `#FFB347` | Gradient stops, glows, highlights on dark |
| `accent-ink` | `#C2410C` | Orange for text and links on light backgrounds (AA: 5.3:1 on ivory) |
| `accent-deep` | `#9A3412` | Hover state of accent-ink |
| `accent-soft` / `accent-soft-2` | `#FFF1EA` / `#FFE3D5` | Tints for icon chips and highlights |
| `teal` / `teal-ink` | `#1F6F78` / `#17565D` | Secondary cool tone, used sparingly (bridge timeline, comparison) |
| `teal-soft` / `teal-soft-2` | `#E2F0F1` / `#C9E3E5` | Teal tints |
| `success` / `error` | `#1F7A4D` / `#B42318` | Form feedback |

Gradients: `--grad-accent` (120°, accent → accent-2 → accent-3) is the only brand gradient. It is used for
the final CTA, the wordmark "HR", primary buttons and glows.

### Contrast rules

* Pure `#FF6B35` never carries body text on light backgrounds. Use `accent-ink` for text and links.
* Primary buttons are orange gradient with **ink** text (6.5:1). Secondary buttons are ink with white text.
* On dark (ink) sections use white text at 75–92 % opacity and `accent-3` for orange highlights.

## Typography

* **Display:** Manrope Variable (200–800), geometric, full Cyrillic. Headings use 700–800 with negative tracking.
* **Text:** Inter Variable (100–900). Body 400, UI 500–650.
* Both are self-hosted from `/public/fonts` (latin, latin-ext, cyrillic, cyrillic-ext subsets, `font-display: swap`).
  No Google Fonts requests at runtime.

Fluid sizes (`clamp`): `text-display-xl` (44–96px), `text-display-lg` (36–68px), `text-display-md` (28–48px),
`text-display-sm` (22–32px), `text-lead` (17–21px). `hyphens: auto` is enabled for German and Bulgarian.

## Spacing and layout

* Containers: `.container-site` (1312px), `.container-wide` (1536px), `.container-prose` (704px).
* Gutter: 16px (mobile) → 24px → 40px (≥1024px) via `--gutter`.
* Section rhythm: `.section` uses `--section-y` = clamp(72px, 6vw + 32px, 144px).
* Radii: `sm` 8px, `md` 14px, `lg` 22px, `xl` 32px, `2xl` 44px, pills 999px.

## Section backgrounds

Sections alternate deliberately so that each one reads as a new "level":

1. Clean white (`bg-white`)
2. Ivory with paper grain (`bg-ivory bg-grain`)
3. Slow warm mesh gradient (`bg-mesh`)
4. Photography with light overlay (`<Picture>` + gradient overlay)
5. Line grid (`bg-grid`)
6. Ink contrast section (`bg-ink text-white`)
7. Orange gradient final CTA (`FinalCta.astro`)

## Motion

* Easing tokens: `ease-out-expo` (0.16, 1, 0.3, 1) for reveals and hovers, `ease-spring` for playful elements.
* Reveal on scroll: add `data-reveal` (+ `data-reveal-delay="1…8"`) to any element.
* Word reveal: `data-split` (on scroll) or `data-split="immediate"` (hero).
* Word illumination: `data-illuminate` on a paragraph.
* Counters: `data-counter="90" data-suffix="%"`.
* Parallax: `data-parallax="0.3"` inside a `data-parallax-scope`.
* Interactions: `data-magnetic`, `data-tilt`, `data-spotlight`, `data-flip` / `data-flip-toggle`, `data-cursor="view|read|book|open"`.
* Everything respects `prefers-reduced-motion`; the `.js-motion` class on `<html>` gates initial hidden states so
  content is never invisible without JavaScript.

## Components

* `ui/Button.astro` — variants `primary`, `secondary`, `ghost`, `light`, `light-ghost`, `link`; sizes `sm|md|lg`; icons `arrow|external|calendar|send|none`.
* `ui/SectionHeading.astro` — eyebrow + heading + lead text, `align`, `dark`.
* `ui/Accordion.astro` — `<details>`-based, animated, exclusive with `name`.
* `ui/Breadcrumbs.astro` — with BreadcrumbList JSON-LD.
* `ui/Wordmark.astro` — the typographic logo with step glyph.
* `ui/Photo.astro` — `<Picture>` (AVIF/WebP) by image name with a graceful gradient fallback when a file is missing.
* `ui/FounderPortrait.astro` — monogram placeholder until the client provides a portrait (`site.founder.portrait`).
* `layout/PageShell.astro` — wraps every page: SEO, hreflang, header, footer, cookie banner, language banner, cursor, preloader.
* `layout/LangSwitcher.astro` — dropdown (header) or inline pills (footer, 404); every link targets the same page in the other language.
* `layout/CookieBanner.astro` — consent dialog with Accept / Reject / Configure, category switches, revocable from the footer.
* `pages/PageHero.astro` — inner-page hero with eyebrow, title, lead, breadcrumbs, optional photo and `ivory|mesh|dark|white` variants.
* `pages/LegalLayout.astro` — renders the legal block model (paragraphs, lists, definition lists, tables, consent button) with a sticky table of contents.
* `services/ProcessSteps.astro`, `services/CheckList.astro` — numbered process and yes/no/neutral check lists for the service pages.
* `blog/PostCard.astro` — article card with category, cover, reading time and localized date.
* `sections/FinalCta.astro` — orange full-bleed CTA.

## Open Graph images

`src/lib/og.ts` renders a 1200×630 card per page and per post at build time (satori + resvg) with the wordmark,
the language badge, the title in Manrope 800 and the tagline or the author and date. Pages use the light ivory
card, articles the dark ink card. Fonts come from `@fontsource/manrope` (Latin, Latin Extended and Cyrillic).

## Iconography

Lucide icons via `@lucide/astro`. Custom SVG details: step glyph (logo, favicon, CTA backdrop), hand-drawn underline
(`.underline-hand`), grain and grid textures (pure CSS, no image requests).

## Tailwind and scoped styles

Tailwind v4 emits utilities inside `@layer utilities`. Astro `<style>` blocks are unlayered, so a scoped rule always
wins over a utility on the same element. When a utility must override a scoped rule, use the `!` important
modifier or wrap the element. Responsive visibility of scoped-styled elements is written in the scoped CSS.
