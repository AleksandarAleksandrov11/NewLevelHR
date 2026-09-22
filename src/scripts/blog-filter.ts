/** Blog index: filter the cards by topic, entirely client side. */
let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const root = document.querySelector<HTMLElement>('[data-blog]');
  if (!root) return;
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-blog-tag]'));
  const posts = Array.from(root.querySelectorAll<HTMLElement>('[data-blog-post]'));
  const empty = root.querySelector<HTMLElement>('[data-blog-empty]');
  const count = root.querySelector<HTMLElement>('[data-blog-count]');
  if (!chips.length || !posts.length) return;

  const apply = (tag: string) => {
    let shown = 0;
    posts.forEach((post) => {
      const tags = (post.dataset.tags || '').split('|').filter(Boolean);
      const match = !tag || tags.includes(tag);
      post.hidden = !match;
      if (match) shown += 1;
    });
    chips.forEach((chip) => {
      const active = (chip.dataset.blogTag || '') === tag;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
    if (empty) empty.hidden = shown > 0;
    if (count) {
      count.textContent = (count.dataset.template || '{count}/{total}')
        .replace('{count}', String(shown))
        .replace('{total}', String(posts.length));
    }
  };

  const onClick = (e: Event) => {
    const chip = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-blog-tag]');
    if (chip) apply(chip.dataset.blogTag || '');
  };
  root.addEventListener('click', onClick);
  cleanup.push(() => root.removeEventListener('click', onClick));
}

function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
