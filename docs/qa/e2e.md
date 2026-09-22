# End-to-end checks

Generated 2026-09-22 11:34 UTC with `npm run qa:e2e` against `http://127.0.0.1:4181`. 33/33 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 242 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3068 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1360 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1486 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1643 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3717 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2056 ms |
| language switcher sits in the header on a phone, before anything is opened | ✅ pass | 2638 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3883 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 448 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3364 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2567 ms |
| header stays visible while scrolling down | ✅ pass | 3680 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2871 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 8121 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5723 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3818 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 4517 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4397 ms |
| primary calls to action land on the right page | ✅ pass | 4068 ms |
| blog: the index filters by topic and a post opens with its own canonical | ✅ pass | 2710 ms |
| tools: each one has its own page and neither runs on the home page | ✅ pass | 2917 ms |
| every inner page opens with the same hero: crumbs, title, CTAs, media | ✅ pass | 8283 ms |
| cost calculator: the total stays on screen while the sliders scroll past | ✅ pass | 1478 ms |
| skip link and landmarks exist | ✅ pass | 314 ms |
| contact form: one page, custom topic dropdown, validation and a mocked send | ✅ pass | 7174 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7600 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 12526 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3234 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2182 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1478 ms |
| reduced motion: no smooth-scroll class, content visible immediately | ✅ pass | 257 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3087 ms |
