# End-to-end checks

Generated 2026-10-15 17:24 UTC with `npm run qa:e2e` against `http://127.0.0.1:4181`. 39/39 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 287 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3168 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1347 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1423 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1556 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3676 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2045 ms |
| language switcher sits in the header on a phone, before anything is opened | ✅ pass | 2651 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 4199 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 366 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3444 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2510 ms |
| header stays visible while scrolling down | ✅ pass | 3480 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 1881 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7701 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5711 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3832 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 4909 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4393 ms |
| primary calls to action land on the right page | ✅ pass | 3851 ms |
| blog: the index filters by topic and a post opens with its own canonical | ✅ pass | 2554 ms |
| tools: each one has its own page and neither runs on the home page | ✅ pass | 2796 ms |
| every inner page opens with the same hero: crumbs, title, CTAs, media | ✅ pass | 8527 ms |
| cost calculator: the total stays on screen while the sliders scroll past | ✅ pass | 1586 ms |
| first paint does not wait for the scripts: visible content is already revealed | ✅ pass | 143 ms |
| home: the pinned 90-day bridge advances with the scroll | ✅ pass | 4620 ms |
| language switcher: a phone tap on a language is not swallowed | ✅ pass | 1790 ms |
| language switcher works with every script blocked | ✅ pass | 849 ms |
| cards stay aligned when hovered while they are still sliding in | ✅ pass | 9358 ms |
| card buttons line up whatever the length of the text above them | ✅ pass | 3809 ms |
| skip link and landmarks exist | ✅ pass | 358 ms |
| contact form: one page, custom topic dropdown, validation and a mocked send | ✅ pass | 6180 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 6004 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 12411 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3191 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2175 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1333 ms |
| reduced motion: no smooth-scroll class, content visible immediately | ✅ pass | 256 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3043 ms |
