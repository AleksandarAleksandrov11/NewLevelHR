# End-to-end checks

Generated 2026-09-19 18:43 UTC with `npm run qa:e2e` against `http://127.0.0.1:4173`. 21/21 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 1040 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 9426 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 3583 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 14125 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 4155 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 12917 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 7658 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 4434 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 1023 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 11493 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 7606 ms |
| skip link and landmarks exist | ✅ pass | 1359 ms |
| contact form: validation messages, honeypot blocks bots, success with a mocked endpoint | ✅ pass | 7122 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 8173 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 16930 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 5480 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2906 ms |
| blog: category filter narrows the list | ✅ pass | 3250 ms |
| 404: unknown URL returns status 404 and the page speaks the URL language | ✅ pass | 1360 ms |
| reduced motion: no preloader, no smooth-scroll class, content visible immediately | ✅ pass | 996 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 10050 ms |
