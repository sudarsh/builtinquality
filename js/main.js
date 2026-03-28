// ── RENDER ARTICLES ──
function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;

  grid.innerHTML = articles.map(a => `
    <a class="article-card" href="articles/${a.file}" style="text-decoration:none;color:inherit;display:block;">
      <div class="card-meta">
        <span class="card-tag tag-${a.tag}">${a.tagLabel}</span>
        <span class="card-date">${a.date}</span>
      </div>
      <div class="card-num">${a.num}</div>
      <div class="card-title">${a.title}</div>
      <p class="card-excerpt">${a.excerpt}</p>
      <div class="card-footer">
        <span class="card-read">${a.read}</span>
        <span class="card-arrow">→</span>
      </div>
    </a>
  `).join('');
}

// ── RENDER STACK ──
function renderStack() {
  const grid = document.getElementById('stack-grid');
  if (!grid) return;

  grid.innerHTML = stack.map(s => `
    <div class="stack-item">
      <div class="stack-icon">${s.icon}</div>
      <div class="stack-name">${s.name}</div>
      <div class="stack-role">${s.role}</div>
    </div>
  `).join('');
}

// ── NAV ACTIVE STATE ON SCROLL ──
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderArticles();
  renderStack();
  initScrollSpy();
});
