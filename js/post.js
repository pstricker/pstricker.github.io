import { formatDate, getQueryParam } from './utils.js';

const slug = getQueryParam('slug');
const container = document.getElementById('post-content');

async function loadPost() {
  if (!slug) {
    showError('No post specified.');
    return;
  }

  try {
    const res = await fetch(`/posts/${slug}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const post = await res.json();

    document.title = `${post.title} - Phil Stricker`;

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
