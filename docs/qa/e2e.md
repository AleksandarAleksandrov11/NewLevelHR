# End-to-end checks

Generated 2026-09-21 22:00 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 28/28 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 244 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3100 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 2083 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 2230 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1578 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 4443 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2784 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3519 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 359 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3410 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2560 ms |
| header stays visible while scrolling down | ✅ pass | 3735 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2923 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7560 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5850 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3942 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 7889 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4378 ms |
| primary calls to action land on the right page | ✅ pass | 5560 ms |
| skip link and landmarks exist | ✅ pass | 410 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 8242 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7755 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10698 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3332 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2120 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1367 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 287 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3051 ms |
