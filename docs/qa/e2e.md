# End-to-end checks

Generated 2026-09-22 08:02 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 30/30 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 253 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3055 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1347 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1464 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1524 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3719 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2054 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3618 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 401 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3368 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2589 ms |
| header stays visible while scrolling down | ✅ pass | 3602 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2740 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7499 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5754 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3807 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 8332 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4372 ms |
| primary calls to action land on the right page | ✅ pass | 3760 ms |
| blog: the index filters by topic and a post opens with its own canonical | ✅ pass | 2490 ms |
| tools: the health check and the calculator live on their own page, not on the home page | ✅ pass | 2128 ms |
| skip link and landmarks exist | ✅ pass | 289 ms |
| contact form: one page, custom topic dropdown, validation and a mocked send | ✅ pass | 6976 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7032 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10560 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3165 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2131 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1398 ms |
| reduced motion: no smooth-scroll class, content visible immediately | ✅ pass | 264 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3056 ms |
