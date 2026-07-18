# promptpot-site

Project site for [PromptPot](https://github.com/ta-061/promptpot), served at
**https://promptpot.tatu-sec.dev/** (Astro + Cloudflare Workers).

## Adding a field report

Articles live in `src/content/posts/`. Add a Markdown file and push — Cloudflare
rebuilds and deploys automatically. No HTML to touch.

### English article (rendered on this site)

Create `src/content/posts/en/<slug>.md`:

```markdown
---
title: "Your title"
date: 2026-08-01
lang: en
summary: "One or two sentences shown in the list and as the page description."
---

Body in Markdown. Headings (##), **bold**, `code`, lists, > quotes all work.
```

It appears at `/posts/<slug>/`, in the `/posts/` list, and in "Latest field
reports" on the home page.

### Japanese article (links out to Qiita)

Create `src/content/posts/ja/<slug>.md` with an `externalUrl` and no real body:

```markdown
---
title: "日本語のタイトル"
date: 2026-08-01
lang: ja
summary: "一覧に出る要約。"
externalUrl: "https://qiita.com/ta-061/items/xxxxxxxx"
---

（本文は Qiita に掲載しています。）
```

It appears in `/ja/posts/` and links straight to Qiita — no on-site page.

### Options

- `draft: true` in the frontmatter hides a post from the site (still committed).
- Posts sort newest-first by `date`.

## Develop locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```
