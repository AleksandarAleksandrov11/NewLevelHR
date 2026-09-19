/** Article table of contents: scroll-spy plus "copy link" button. */
let cleanup: Array<() => void> = [];

function init() {
  destroy();
  const toc = document.querySelector<HTMLElement>('[data-toc]');
  if (toc && 'IntersectionObserver' in window) {
    const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const headings = links.map((a) => document.getElementById(decodeURIComponent(a.getAttribute('href')!.slice(1)))).filter((h): h is HTMLElement => Boolean(h));
    if (headings.length) {
      const set = (id: string) => links.forEach((a) => { const on = a.getAttribute('href') === `#${id}`; a.classList.toggle('is-active', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      const io = new IntersectionObserver((entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) set((visible[0].target as HTMLElement).id);
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
      headings.forEach((h) => io.observe(h));
      set(headings[0].id);
      cleanup.push(() => io.disconnect());
    }
  }
  document.querySelectorAll<HTMLButtonElement>('[data-copy-link]').forEach((btn) => {
    const label = btn.querySelector<HTMLElement>('[data-copy-label]');
    const idle = btn.dataset.labelIdle || label?.textContent || '';
    const done = btn.dataset.labelDone || idle;
    let timer = 0;
    const onClick = async () => {
      try { await navigator.clipboard.writeText(location.href); } catch { return; }
      if (label) label.textContent = done;
      btn.classList.add('is-done');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { if (label) label.textContent = idle; btn.classList.remove('is-done'); }, 2000);
    };
    btn.addEventListener('click', onClick);
    cleanup.push(() => { btn.removeEventListener('click', onClick); window.clearTimeout(timer); });
  });
}
function destroy() { cleanup.forEach((f) => f()); cleanup = []; }

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
export {};
