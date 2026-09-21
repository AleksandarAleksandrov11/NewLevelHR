# End-to-end checks

Generated 2026-09-21 22:16 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 28/28 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 245 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3125 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1799 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 2083 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1659 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3465 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2445 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3476 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 364 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3609 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2637 ms |
| header stays visible while scrolling down | ✅ pass | 4047 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2936 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7788 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5818 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3992 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 7867 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4496 ms |
| primary calls to action land on the right page | ✅ pass | 6439 ms |
| skip link and landmarks exist | ✅ pass | 336 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 8215 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 6892 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10770 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3448 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2108 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1318 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 287 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3344 ms |
