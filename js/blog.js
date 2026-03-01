import { formatDate } from './utils.js';

const container = document.getElementById('posts-container');

async function loadPosts() {
  try {
    const res = await fetch('/posts/posts.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    const published = posts.filter(p => !p.draft);

    if (published.length === 0) {
      container.innerHTML = '<p class="text-muted">No posts yet. Check back soon.</p>';
      return;
    }

    container.innerHTML = published.map(post => `
      <a href="/post.html?slug=${post.slug}" class="post-card">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <div class="tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </a>
    `).join('');
  } catch (err) {
    console.error('Failed to load posts:', err);
    container.innerHTML = '<p class="text-muted">Could not load posts.</p>';
  }
}

loadPosts();
