/**
 * Motion core: Lenis smooth scroll + GSAP ScrollTrigger, reveal-on-scroll,
 * counters, parallax, split text, word illumination and marquee speed.
 * Everything registers cleanups so View Transitions can tear it down.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type Cleanup = () => void;
let cleanups: Cleanup[] = [];
let lenis: Lenis | null = null;
let rafId = 0;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const getLenis = () => lenis;
export { gsap, ScrollTrigger };

function onCleanup(fn: Cleanup) { cleanups.push(fn); }

function initLenis() {
  if (prefersReducedMotion() || lenis) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, anchors: { offset: -80 } });
  const raf = (time: number) => { lenis?.raf(time); rafId = requestAnimationFrame(raf); };
  rafId = requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  onCleanup(() => { cancelAnimationFrame(rafId); lenis?.destroy(); lenis = null; });
}

/** Reveal elements when they enter the viewport. */
function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!els.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-revealed')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).classList.add('is-revealed'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
  onCleanup(() => io.disconnect());
}

/** Animated counters: <span data-counter="90" data-decimals="0" data-suffix="%"> */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!els.length) return;
  const lang = document.documentElement.lang || 'en';
  els.forEach((el) => {
    const target = parseFloat(el.dataset.counter || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const format = (v: number) => prefix + new Intl.NumberFormat(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v) + suffix;
    if (prefersReducedMotion()) { el.textContent = format(target); return; }
    el.textContent = format(0);
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: target, duration: 1.8, ease: 'power3.out', paused: true,
      onUpdate: () => { el.textContent = format(obj.v); },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    onCleanup(() => tw.kill());
  });
}

/** Parallax: <div data-parallax="0.25"> moves at a fraction of scroll. */
function initParallax() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.2');
    const tw = gsap.fromTo(el, { yPercent: -amount * 40 }, {
      yPercent: amount * 40, ease: 'none',
      scrollTrigger: { trigger: el.closest('[data-parallax-scope]') || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    onCleanup(() => tw.kill());
  });
}

/** Split text: wraps words and reveals them with a stagger when in view. */
function initSplit() {
  const els = document.querySelectorAll<HTMLElement>('[data-split]:not([data-split-done])');
  els.forEach((el) => {
    el.setAttribute('data-split-done', '');
    if (prefersReducedMotion()) return;
    const original = el.innerHTML;
    // Only split plain text nodes and simple inline markup (<br>, <span class="...">).
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
    textNodes.forEach((node) => {
      const words = (node.textContent || '').split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
        const outer = document.createElement('span'); outer.className = 'split-w';
        const inner = document.createElement('span'); inner.className = 'split-i'; inner.textContent = w;
        outer.appendChild(inner); frag.appendChild(outer);
      });
      node.parentNode?.replaceChild(frag, node);
    });
    const inners = el.querySelectorAll('.split-i');
    const mode = el.dataset.split || 'view';
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(inners, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.045 });
    if (mode === 'immediate') tl.play(0.0);
    else { const st = ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => tl.play() }); onCleanup(() => st.kill()); }
    onCleanup(() => { tl.kill(); el.innerHTML = original; el.removeAttribute('data-split-done'); });
  });
}

/** Word-by-word illumination on scroll: <p data-illuminate>…</p> */
function initIlluminate() {
  document.querySelectorAll<HTMLElement>('[data-illuminate]:not([data-illuminate-done])').forEach((el) => {
    el.setAttribute('data-illuminate-done', '');
    const original = el.innerHTML;
    const words = (el.textContent || '').trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="ill-w">${w}</span>`).join(' ');
    const spans = el.querySelectorAll<HTMLElement>('.ill-w');
    if (prefersReducedMotion()) { spans.forEach((s) => s.classList.add('is-lit')); return; }
    const tw = gsap.to(spans, {
      '--lit': 1, ease: 'none', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 },
    });
    onCleanup(() => { tw.kill(); el.innerHTML = original; el.removeAttribute('data-illuminate-done'); });
  });
}

/** Marquee speed and direction follow the scroll velocity. */
function initMarquee() {
  const tracks = document.querySelectorAll<HTMLElement>('[data-marquee]');
  if (!tracks.length || prefersReducedMotion()) return;
  let velocity = 0;
  let current = 1;
  const onScroll = (e: { velocity: number }) => { velocity = e.velocity; };
  lenis?.on('scroll', onScroll);
  let lastY = window.scrollY;
  const nativeScroll = () => { const y = window.scrollY; velocity = (y - lastY) * 0.5; lastY = y; };
  if (!lenis) window.addEventListener('scroll', nativeScroll, { passive: true });
  const tick = () => {
    const target = gsap.utils.clamp(-3, 3, 1 + velocity * 0.08);
    current += (target - current) * 0.08;
    velocity *= 0.9;
    tracks.forEach((t) => { t.style.setProperty('--marquee-factor', current.toFixed(3)); });
  };
  gsap.ticker.add(tick);
  onCleanup(() => { gsap.ticker.remove(tick); lenis?.off('scroll', onScroll); window.removeEventListener('scroll', nativeScroll); });
}

/** Sticky/pinned scenes registered by pages: [data-scene="bridge"] etc. are handled by page scripts. */

export function initMotion() {
  destroyMotion();
  initLenis();
  initReveal();
  initSplit();
  initIlluminate();
  initCounters();
  initParallax();
  initMarquee();
  // Refresh triggers after fonts/images settle.
  const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
  onCleanup(() => window.clearTimeout(t));
}

export function destroyMotion() {
  cleanups.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanups = [];
  ScrollTrigger.getAll().forEach((st) => st.kill());
}

export function scrollTo(target: string | HTMLElement, offset = -80) {
  if (lenis) lenis.scrollTo(target, { offset });
  else {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}

export function lockScroll(lock: boolean) {
  if (lock) { lenis?.stop(); document.documentElement.style.overflow = 'hidden'; }
  else { lenis?.start(); document.documentElement.style.overflow = ''; }
}
