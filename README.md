# Qualiteye — by Sudarsh

> I see quality everywhere — in a vague requirement, a rushed design, an untested edge case, a silent production failure. After 13 years, quality isn't a checklist I follow. It's the lens through which I see software.

Personal blog on quality engineering. Live at **[qualiteye.com](https://qualiteye.com)**.

---

## Adding a New Article

1. Create `articles/13-your-slug.html` — copy any existing article as a template
2. Add a new entry in `js/data.js` with `file: '13-your-slug.html'`
3. Add a `<url>` entry to `sitemap.xml`

---

## Project Structure

```
├── index.html          # Homepage
├── articles/           # Individual article pages
├── css/                # Styles (article.css is self-contained for article pages)
├── js/
│   ├── data.js         # Article metadata — edit this to add/update articles
│   └── main.js         # Render logic
├── robots.txt
└── sitemap.xml
```
