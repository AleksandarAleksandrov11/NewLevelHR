# End-to-end checks

Generated 2026-09-21 21:18 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 28/28 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 256 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3139 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 2044 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 2162 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1540 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 4422 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2778 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3184 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 435 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3432 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2617 ms |
| header stays visible while scrolling down | ✅ pass | 3587 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2931 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7595 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5814 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3984 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 7819 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4430 ms |
| primary calls to action land on the right page | ✅ pass | 5572 ms |
| skip link and landmarks exist | ✅ pass | 370 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 8028 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 6915 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10708 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3350 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2111 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1344 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 275 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3067 ms |
