# Lighthouse (mobile)

Generated 2026-09-22 13:53 UTC with `npm run qa:lighthouse` against `http://127.0.0.1:4183` (Lighthouse mobile preset, simulated throttling).
Target: every category ≥ 90 on every page. Result: **met**.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/en/` | 98 | 100 | 100 | 100 | 1.5 s | 2.2 s | 10 ms | 0 |
| `/en/services/` | 99 | 100 | 100 | 100 | 1.1 s | 2.0 s | 0 ms | 0 |
| `/en/services/fractional-hr-partnership/` | 99 | 100 | 100 | 100 | 1.3 s | 2.0 s | 20 ms | 0 |
| `/en/what-we-fix/` | 99 | 100 | 100 | 100 | 1.3 s | 2.0 s | 30 ms | 0 |
| `/en/about/` | 99 | 100 | 100 | 100 | 1.1 s | 2.0 s | 0 ms | 0 |
| `/en/faq/` | 97 | 100 | 100 | 100 | 1.2 s | 2.5 s | 30 ms | 0 |
| `/en/contact/` | 98 | 100 | 100 | 100 | 1.2 s | 2.4 s | 20 ms | 0 |
| `/de/` | 98 | 100 | 100 | 100 | 1.5 s | 2.2 s | 30 ms | 0 |
| `/de/leistungen/` | 99 | 100 | 100 | 100 | 1.1 s | 2.0 s | 20 ms | 0 |
| `/de/leistungen/fraktionale-hr-partnerschaft/` | 99 | 100 | 100 | 100 | 1.3 s | 2.0 s | 0 ms | 0 |
| `/de/was-wir-loesen/` | 99 | 100 | 100 | 100 | 1.3 s | 2.0 s | 10 ms | 0 |
| `/de/ueber-uns/` | 98 | 100 | 100 | 100 | 1.2 s | 2.3 s | 0 ms | 0 |
| `/de/faq/` | 97 | 100 | 100 | 100 | 1.3 s | 2.5 s | 10 ms | 0 |
| `/de/kontakt/` | 99 | 100 | 100 | 100 | 1.2 s | 2.0 s | 30 ms | 0 |
| `/bg/` | 98 | 100 | 100 | 100 | 1.3 s | 2.3 s | 10 ms | 0 |
| `/bg/uslugi/` | 98 | 100 | 100 | 100 | 1.3 s | 2.3 s | 0 ms | 0 |
| `/bg/uslugi/fraktsionno-hr-partniorstvo/` | 98 | 100 | 100 | 100 | 1.3 s | 2.3 s | 0 ms | 0 |
| `/bg/kakvo-reshavame/` | 98 | 100 | 100 | 100 | 1.3 s | 2.3 s | 10 ms | 0 |
| `/bg/za-nas/` | 97 | 100 | 100 | 100 | 1.1 s | 2.6 s | 0 ms | 0 |
| `/bg/faq/` | 96 | 100 | 100 | 100 | 1.3 s | 2.8 s | 20 ms | 0 |
| `/bg/kontakti/` | 99 | 100 | 100 | 100 | 1.2 s | 2.1 s | 20 ms | 0 |

## Audits scoring below 0.9

* `/en/`
  * performance: Reduce unused CSS (Est savings of 11 KiB)
* `/en/about/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/en/faq/`
  * performance: Largest Contentful Paint (2.5 s)
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/en/contact/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/de/`
  * performance: Reduce unused CSS (Est savings of 11 KiB)
* `/de/leistungen/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/de/ueber-uns/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/de/faq/`
  * performance: Reduce unused CSS (Est savings of 14 KiB)
* `/de/kontakt/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/bg/`
  * performance: Reduce unused CSS (Est savings of 11 KiB)
* `/bg/kakvo-reshavame/`
  * performance: Reduce unused CSS (Est savings of 13 KiB)
* `/bg/za-nas/`
  * performance: Largest Contentful Paint (2.6 s)
* `/bg/faq/`
  * performance: Largest Contentful Paint (2.8 s)

Scores are from a local static server with compression; production hosting (Vercel or Apache with the provided .htaccess) uses the same caching rules. Numbers vary a few points between runs.
