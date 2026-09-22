# Blog content

One folder per language, one Markdown file per post:

```
src/content/blog/en/my-post.md      ->  /en/blog/my-post/
src/content/blog/de/mein-beitrag.md ->  /de/blog/mein-beitrag/
src/content/blog/bg/moya-statia.md  ->  /bg/blog/moya-statia/
```

The file name is the URL slug, so keep it lowercase, with hyphens, and do not
rename it once the post is live.

## Frontmatter

```yaml
---
title: Up to 120 characters
description: Up to 260 characters. Shown on the card and used as the meta description.
date: 2026-09-15          # publication date
updated: 2026-09-20       # optional
tags: ['Hiring', 'Onboarding']   # optional, drive the filter on the blog index
translationKey: first-90-days    # optional, links the same article across languages
draft: false              # true keeps it out of the build (visible in `npm run dev`)
---
```

`title`, `description` and `date` are required; the build fails on a missing or
malformed field, which is deliberate: a broken post never reaches the site.

## Writing

The body is plain Markdown: `##` and `###` headings, lists, links, `>` quotes,
tables and `---` rules are all styled. Keep a post to one idea and finish with
what the reader should do next.

## Publishing

Add the file, commit, push. The site rebuilds and the post appears on the blog
index of its language, newest first.
