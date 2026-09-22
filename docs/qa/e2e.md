# End-to-end checks

Generated 2026-09-22 10:07 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 31/31 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 248 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3075 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1398 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1453 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1571 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3748 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2070 ms |
| language switcher sits in the header on a phone, before anything is opened | ✅ pass | 2593 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3751 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 379 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3381 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2577 ms |
| header stays visible while scrolling down | ✅ pass | 3721 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2872 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7595 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5756 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3790 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 7834 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4387 ms |
| primary calls to action land on the right page | ✅ pass | 4010 ms |
| blog: the index filters by topic and a post opens with its own canonical | ✅ pass | 2485 ms |
| tools: each one has its own page and neither runs on the home page | ✅ pass | 2831 ms |
| skip link and landmarks exist | ✅ pass | 345 ms |
| contact form: one page, custom topic dropdown, validation and a mocked send | ✅ pass | 6003 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 6603 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10119 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3245 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2206 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1389 ms |
| reduced motion: no smooth-scroll class, content visible immediately | ✅ pass | 286 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3186 ms |
