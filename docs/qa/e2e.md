# End-to-end checks

Generated 2026-09-20 11:35 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 23/23 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 281 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 7003 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1724 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 11733 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 2081 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 10926 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 5202 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3234 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 422 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 9408 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 5372 ms |
| header stays visible while scrolling down | ✅ pass | 8929 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 2684 ms |
| pixel cursor trail draws on mouse movement and leaves the native cursor alone | ✅ pass | 11736 ms |
| skip link and landmarks exist | ✅ pass | 426 ms |
| contact form: validation messages, honeypot blocks bots, success with a mocked endpoint | ✅ pass | 6498 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 7504 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 11284 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3569 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 3512 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1343 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 332 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 7402 ms |
