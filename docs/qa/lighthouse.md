# Lighthouse (mobile)

Generated 2026-09-20 11:02 UTC with `npm run qa:lighthouse` against `http://127.0.0.1:4175` (Lighthouse mobile preset, simulated throttling).
Target: every category ≥ 90 on every page. Result: **met**.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/` | 97 | 100 | 100 | 100 | 1.7 s | 2.4 s | 30 ms | 0 |
| `/en/services/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 10 ms | 0 |
| `/en/services/fractional-hr-partnership/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 20 ms | 0 |
| `/en/what-we-fix/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 20 ms | 0 |
| `/en/about/` | 98 | 100 | 100 | 100 | 1.5 s | 2.2 s | 10 ms | 0 |
| `/en/faq/` | 97 | 100 | 100 | 100 | 1.7 s | 2.3 s | 10 ms | 0 |
| `/en/contact/` | 98 | 100 | 100 | 100 | 1.7 s | 2.1 s | 10 ms | 0 |
| `/de/` | 97 | 100 | 100 | 100 | 1.8 s | 2.4 s | 20 ms | 0 |
| `/de/leistungen/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 0 ms | 0 |
| `/de/leistungen/fraktionale-hr-partnerschaft/` | 97 | 100 | 100 | 100 | 1.7 s | 2.3 s | 10 ms | 0 |
| `/de/was-wir-loesen/` | 97 | 100 | 100 | 100 | 1.8 s | 2.3 s | 10 ms | 0 |
| `/de/ueber-uns/` | 98 | 100 | 100 | 100 | 1.7 s | 2.3 s | 10 ms | 0 |
| `/de/faq/` | 97 | 100 | 100 | 100 | 1.8 s | 2.3 s | 10 ms | 0 |
| `/de/kontakt/` | 98 | 100 | 100 | 100 | 1.5 s | 2.1 s | 10 ms | 0 |
| `/bg/` | 96 | 100 | 100 | 100 | 1.6 s | 2.6 s | 20 ms | 0 |
| `/bg/uslugi/` | 98 | 100 | 100 | 100 | 1.4 s | 2.4 s | 10 ms | 0 |
| `/bg/uslugi/fraktsionno-hr-partniorstvo/` | 97 | 100 | 100 | 100 | 1.5 s | 2.4 s | 20 ms | 0 |
| `/bg/kakvo-reshavame/` | 97 | 100 | 100 | 100 | 1.4 s | 2.4 s | 20 ms | 0 |
| `/bg/za-nas/` | 97 | 100 | 100 | 100 | 1.3 s | 2.6 s | 10 ms | 0 |
| `/bg/faq/` | 97 | 100 | 100 | 100 | 1.4 s | 2.4 s | 20 ms | 0 |
| `/bg/kontakti/` | 98 | 100 | 100 | 100 | 1.4 s | 2.3 s | 20 ms | 0 |

## Audits scoring below 0.9

* `/en/services/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/en/services/fractional-hr-partnership/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/en/about/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/en/faq/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/de/leistungen/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/de/leistungen/fraktionale-hr-partnerschaft/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/de/was-wir-loesen/`
  * performance: First Contentful Paint (1.8 s)
* `/de/ueber-uns/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/de/faq/`
  * performance: First Contentful Paint (1.8 s)
* `/de/kontakt/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/bg/`
  * performance: Largest Contentful Paint (2.6 s)
* `/bg/uslugi/`
  * performance: Reduce unused CSS (Est savings of 12 KiB)
* `/bg/za-nas/`
  * performance: Largest Contentful Paint (2.6 s)
  * performance: Reduce unused CSS (Est savings of 13 KiB)

Scores are from a local static server with compression; production hosting (Vercel or Apache with the provided .htaccess) uses the same caching rules. Numbers vary a few points between runs.
