# End-to-end checks

Generated 2026-09-21 17:06 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 24/24 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 282 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 6816 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1711 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 8018 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1991 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 9863 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 4693 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3172 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 366 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 7744 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 5063 ms |
| header stays visible while scrolling down | ✅ pass | 8399 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 6404 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 8160 ms |
| anchors in the URL land under the sticky header | ✅ pass | 6699 ms |
| skip link and landmarks exist | ✅ pass | 462 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 7888 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7219 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 14267 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 6985 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2605 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1317 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 366 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 6530 ms |
