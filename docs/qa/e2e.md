# End-to-end checks

Generated 2026-09-19 20:07 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 21/21 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 310 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 7567 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 6416 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 9187 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 2162 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 12298 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 5985 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3622 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 368 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 9713 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 6192 ms |
| skip link and landmarks exist | ✅ pass | 549 ms |
| contact form: validation messages, honeypot blocks bots, success with a mocked endpoint | ✅ pass | 6488 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 5922 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 16429 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 4057 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 3962 ms |
| blog: category filter narrows the list | ✅ pass | 2645 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1375 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 408 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 8143 ms |
