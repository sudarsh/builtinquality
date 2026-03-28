# Built In Quality — by Sudarsh

> Quality isn't a phase. It's engineered into everything.

A personal blog and thought leadership site for CTOs, Engineering Managers, and Product Leaders who believe quality should be embedded at every stage of the software lifecycle.

---

## 🗂 Project Structure

```
builtinquality/
├── index.html          # Main HTML (all sections)
├── css/
│   ├── base.css        # Variables, reset, shared styles
│   ├── nav.css         # Navigation bar
│   ├── hero.css        # Hero section
│   ├── articles.css    # Articles grid & cards
│   ├── philosophy.css  # Manifesto, pillars, terminal
│   ├── stack.css       # Tech stack + about + contact
│   ├── about.css       # (placeholder — styles in stack.css)
│   └── contact.css     # (placeholder — styles in stack.css)
├── js/
│   ├── data.js         # All articles & stack data
│   └── main.js         # Render logic & interactions
├── articles/           # (future) Individual article HTML pages
├── assets/             # (future) Images, favicon, og images
└── README.md
```

---

## 🚀 Running Locally

### Option 1 — VS Code Live Server (recommended)
1. Open the `builtinquality/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Opens at `http://127.0.0.1:5500`

### Option 2 — Python simple server
```bash
cd builtinquality
python3 -m http.server 3000
# Open http://localhost:3000
```

### Option 3 — Node http-server
```bash
npm install -g http-server
cd builtinquality
http-server -p 3000
# Open http://localhost:3000
```

### Option 4 — Claude Code
```bash
cd builtinquality
claude
# Then ask: "run this site locally"
```

---

## ✍️ Adding a New Article

1. Open `js/data.js`
2. Add a new object to the `articles` array:

```js
{
  num: '13',
  tag: 'playwright',        // cicd | playwright | ai | quality | testing
  tagLabel: 'Playwright',
  date: 'Apr 10, 2026',
  title: 'Your Article Title Here',
  excerpt: 'A short description of what the article covers.',
  read: '7 min read'
}
```

3. Save — the article card appears automatically on the homepage.

---

## 🎨 Customising Colors

All colors are CSS variables in `css/base.css`:

```css
--accent:  #00d4ff;   /* Cyan — primary highlight */
--accent2: #7c3aed;   /* Purple — secondary highlight */
--accent3: #10b981;   /* Green — success / badges */
--accent4: #f59e0b;   /* Amber — CI/CD tags */
```

---

## 🌐 Deploying

### Netlify Drop (fastest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `builtinquality/` folder
3. Live in 10 seconds

### GitHub Pages
1. Push to a GitHub repo
2. Settings → Pages → Deploy from `main` branch
3. Live at `yourusername.github.io/builtinquality`

### Vercel
1. `npm i -g vercel`
2. `cd builtinquality && vercel`

---

## 📬 Contact

Built by Sudarsh — QA Engineering Manager, Bengaluru, India.
