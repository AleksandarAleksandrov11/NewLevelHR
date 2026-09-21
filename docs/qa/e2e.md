# End-to-end checks

Generated 2026-09-21 19:29 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 27/27 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 314 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3145 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1669 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1838 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1633 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 4636 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2883 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3592 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 398 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3510 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2634 ms |
| header stays visible while scrolling down | ✅ pass | 3648 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 3024 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7631 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5845 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 4005 ms |
| contact: the topic dropdown opens fully on screen on a phone | ✅ pass | 4345 ms |
| primary calls to action land on the right page | ✅ pass | 6822 ms |
| skip link and landmarks exist | ✅ pass | 418 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 8371 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 8533 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 10472 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3451 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2162 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1393 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 337 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3122 ms |
