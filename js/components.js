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

function initAnalytics() {
  const GA_ID = 'G-RKZ07SY7D5';
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_ID);
}

export function initComponents() {
  renderHeader();
  renderFooter();
  initAnalytics();
}
