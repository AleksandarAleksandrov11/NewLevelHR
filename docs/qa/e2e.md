# End-to-end checks

Generated 2026-10-15 19:11 UTC with `npm run qa:e2e` against `http://127.0.0.1:4181`. 40/40 passed.

| Check | Result | Time |
| --- | --- | --- |
| root / redirects to /en/ | ✅ pass | 313 ms |
| cookie dialog: no optional storage before consent, Accept stores analytics=true | ✅ pass | 3114 ms |
| cookie dialog: Reject stores analytics=false and marketing=false | ✅ pass | 1345 ms |
| cookie dialog: Configure -> save keeps the chosen categories | ✅ pass | 1464 ms |
| footer "Cookie settings" reopens the dialog after consent | ✅ pass | 1553 ms |
| language banner suggests German to a German browser on the English page and never redirects | ✅ pass | 3699 ms |
| language banner stays hidden for an English browser on the English page | ✅ pass | 2065 ms |
| language switcher sits in the header on a phone, before anything is opened | ✅ pass | 2622 ms |
| language switcher opens the same page in DE and BG (translated slugs) | ✅ pass | 3538 ms |
| hreflang: EN page lists en/de/bg + x-default and the DE page links back | ✅ pass | 442 ms |
| header: mega menu opens on hover and on keyboard, closes with Escape | ✅ pass | 3417 ms |
| header: mobile menu opens, links are focusable, closes with Escape | ✅ pass | 2604 ms |
| header stays visible while scrolling down | ✅ pass | 3544 ms |
| cost calculator: the track fill follows the slider | ✅ pass | 1914 ms |
| what we fix: the problem bar is full width on phones, centres the active chip and jumps correctly | ✅ pass | 7742 ms |
| anchors in the URL land under the sticky header | ✅ pass | 5733 ms |
| mobile menu: the whole panel is reachable on a short phone | ✅ pass | 3795 ms |
| contact: the topic dropdown hangs off the button and closes on an outside click | ✅ pass | 4701 ms |
| mobile menu: services opens its sub-list first and follows the link on the second tap | ✅ pass | 4485 ms |
| primary calls to action land on the right page | ✅ pass | 3771 ms |
| blog: the index filters by topic and a post opens with its own canonical | ✅ pass | 2547 ms |
| tools: each one has its own page and neither runs on the home page | ✅ pass | 2770 ms |
| every inner page opens with the same hero: crumbs, title, CTAs, media | ✅ pass | 8225 ms |
| cost calculator: the total stays on screen while the sliders scroll past | ✅ pass | 1642 ms |
| first paint does not wait for the scripts: visible content is already revealed | ✅ pass | 174 ms |
| home: the pinned 90-day bridge advances with the scroll | ✅ pass | 4363 ms |
| language switcher: a phone tap on a language is not swallowed | ✅ pass | 1913 ms |
| language switcher works with every script blocked | ✅ pass | 919 ms |
| cards stay aligned when hovered while they are still sliding in | ✅ pass | 8628 ms |
| card buttons line up whatever the length of the text above them | ✅ pass | 3548 ms |
| booking calendar fills its frame and follows the height Calendly reports | ✅ pass | 2346 ms |
| skip link and landmarks exist | ✅ pass | 304 ms |
| contact form: one page, custom topic dropdown, validation and a mocked send | ✅ pass | 5920 ms |
| contact form: server error and rate limit are shown in the page language | ✅ pass | 6045 ms |
| HR health check: answer every question and reach a result with a score | ✅ pass | 12598 ms |
| bad-hire calculator: total updates when inputs change and reset restores defaults | ✅ pass | 3126 ms |
| FAQ search filters questions and shows an empty state | ✅ pass | 2189 ms |
| 404: unknown URL returns status 404 and continues to the localized 404 page | ✅ pass | 1324 ms |
| reduced motion: no smooth-scroll class, content visible immediately | ✅ pass | 232 ms |
| view transitions keep the header working after client-side navigation | ✅ pass | 3035 ms |
