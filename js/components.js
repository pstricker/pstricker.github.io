const NAV_LINKS = [
  { href: '/', label: 'home', match: p => p === '/' || p === '/index.html' },
  { href: '/blog.html', label: 'blog', match: p => p === '/blog.html' || p === '/post.html' },
];

export function renderHeader() {
  const path = window.location.pathname;
  const header = document.getElementById('site-header');
  if (!header) return;

  const navHTML = NAV_LINKS.map(link => {
    const active = link.match(path) ? ' class="active"' : '';
    return `<a href="${link.href}"${active}>${link.label}</a>`;
  }).join('\n        ');

  header.className = 'site-header';
  header.innerHTML = `
    <div class="container">
      <a href="/" class="site-logo">Phil Stricker</a>
      <nav class="site-nav">
        ${navHTML}
      </nav>
    </div>`;
}

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const year = new Date().getFullYear();
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <span>&copy; ${year} Phil Stricker</span>
      <span>Built with plain HTML, CSS &amp; JS</span>
    </div>`;
}

export function initComponents() {
  renderHeader();
  renderFooter();
}
