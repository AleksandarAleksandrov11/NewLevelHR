# Lighthouse (mobile)

Generated 2026-09-19 19:01 UTC with `npm run qa:lighthouse` against `http://127.0.0.1:4175` (Lighthouse mobile preset, simulated throttling).
Target: every category ≥ 90 on every page. Result: **met**.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/` | 97 | 100 | 100 | 100 | 1.7 s | 2.3 s | 50 ms | 0 |
| `/en/services/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 10 ms | 0 |
| `/en/services/fractional-hr-partnership/` | 97 | 100 | 100 | 100 | 1.8 s | 2.3 s | 10 ms | 0 |
| `/en/about/` | 98 | 100 | 100 | 100 | 1.7 s | 2.1 s | 20 ms | 0 |
| `/en/blog/` | 98 | 100 | 100 | 100 | 1.5 s | 2.3 s | 0 ms | 0 |
| `/en/blog/onboarding-bingo-buzzwords/` | 99 | 100 | 100 | 100 | 1.5 s | 2.1 s | 10 ms | 0 |
| `/en/contact/` | 99 | 100 | 100 | 100 | 1.6 s | 2.0 s | 20 ms | 0 |
| `/de/` | 97 | 100 | 100 | 100 | 1.7 s | 2.4 s | 40 ms | 0 |
| `/de/leistungen/` | 98 | 100 | 100 | 100 | 1.6 s | 2.3 s | 20 ms | 0 |
| `/de/leistungen/fraktionale-hr-partnerschaft/` | 98 | 100 | 100 | 100 | 1.6 s | 2.3 s | 10 ms | 0 |
| `/de/ueber-uns/` | 99 | 100 | 100 | 100 | 1.5 s | 2.0 s | 20 ms | 0 |
| `/de/blog/` | 98 | 100 | 100 | 100 | 1.5 s | 2.3 s | 0 ms | 0 |
| `/de/blog/onboarding-bingo-buzzwords/` | 97 | 100 | 100 | 100 | 1.7 s | 2.4 s | 20 ms | 0 |
| `/de/kontakt/` | 99 | 100 | 100 | 100 | 1.6 s | 2.0 s | 10 ms | 0 |
| `/bg/` | 96 | 100 | 100 | 100 | 1.6 s | 2.6 s | 30 ms | 0 |
| `/bg/uslugi/` | 97 | 100 | 100 | 100 | 1.4 s | 2.5 s | 10 ms | 0 |
| `/bg/uslugi/fraktsionno-hr-partniorstvo/` | 97 | 100 | 100 | 100 | 1.4 s | 2.4 s | 10 ms | 0 |
| `/bg/za-nas/` | 98 | 100 | 100 | 100 | 1.2 s | 2.3 s | 10 ms | 0 |
| `/bg/blog/` | 97 | 100 | 100 | 100 | 1.4 s | 2.6 s | 0 ms | 0 |
| `/bg/blog/onboarding-bingo-buzzwords/` | 97 | 100 | 100 | 100 | 1.4 s | 2.4 s | 10 ms | 0 |
| `/bg/kontakti/` | 98 | 100 | 100 | 100 | 1.4 s | 2.3 s | 10 ms | 0 |

## Audits scoring below 0.9

* `/en/`
  * performance: Reduce unused CSS (Est savings of 10 KiB)
* `/en/services/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/en/services/fractional-hr-partnership/`
  * performance: First Contentful Paint (1.8 s)
* `/en/about/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/en/blog/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/en/contact/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/`
  * performance: Reduce unused CSS (Est savings of 10 KiB)
* `/de/leistungen/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/leistungen/fraktionale-hr-partnerschaft/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/ueber-uns/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/blog/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/blog/onboarding-bingo-buzzwords/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/kontakt/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/bg/`
  * performance: Largest Contentful Paint (2.6 s)
  * performance: Reduce unused CSS (Est savings of 10 KiB)
* `/bg/za-nas/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/bg/blog/`
  * performance: Largest Contentful Paint (2.6 s)
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/bg/kontakti/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)

Scores are from a local static server with compression; production hosting (Vercel or Apache with the provided .htaccess) uses the same caching rules. Numbers vary a few points between runs.
