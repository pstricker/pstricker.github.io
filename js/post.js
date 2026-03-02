import { formatDate, getQueryParam } from './utils.js';

const slug = getQueryParam('slug');
const container = document.getElementById('post-content');

async function loadPost() {
  if (!slug) {
    showError('No post specified.');
    return;
  }

  try {
    const res = await fetch(`/posts/${slug}.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const post = await res.json();

    document.title = `${post.title} - Phil Stricker`;

    const postUrl = `https://philstricker.com/post.html?slug=${slug}`;
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('link#canonical', 'href', postUrl);
    setMeta('meta[property="og:title"]', 'content', post.title);
    setMeta('meta[property="og:description"]', 'content', post.excerpt);
    setMeta('meta[property="og:url"]', 'content', postUrl);
    setMeta('meta[name="twitter:title"]', 'content', post.title);
    setMeta('meta[name="twitter:description"]', 'content', post.excerpt);

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: postUrl,
      author: { '@type': 'Person', name: 'Phil Stricker', url: 'https://philstricker.com' },
      image: 'https://philstricker.com/assets/images/profile.jpg',
    });
    document.head.appendChild(schema);

    marked.setOptions({
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    });

    container.innerHTML = `
      <header class="post-header">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <h1>${post.title}</h1>
        <div class="tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </header>
      <div class="post-body prose">
        ${marked.parse(post.body)}
      </div>
      <footer class="post-footer">
        <a href="/blog.html">&larr; Back to all posts</a>
      </footer>
    `;
  } catch (err) {
    console.error('Failed to load post:', err);
    showError('Post not found.');
  }
}

function showError(message) {
  container.innerHTML = `
    <div class="error-state">
      <h1>${message}</h1>
      <a href="/blog.html">Browse all posts</a>
    </div>
  `;
}

loadPost();
