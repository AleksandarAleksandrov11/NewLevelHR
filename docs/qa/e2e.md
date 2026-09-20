# End-to-end checks

Generated 2026-09-20 13:27 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 22/22 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 381 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 8184 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 6909 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 8043 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1809 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 11594 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 6257 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3722 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 405 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 9547 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 6533 ms |
| header stays visible while scrolling down | ✅ pass | 10506 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2926 ms |
| skip link and landmarks exist | ✅ pass | 3492 ms |
| contact form: four steps, custom topic dropdown, validation and a mocked send | ✅ pass | 8159 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7350 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 11454 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 4687 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 3594 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1413 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 500 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 8912 ms |
