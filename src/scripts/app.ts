/**
 * Client entry. The first bundle carries only what the page needs to be read
 * and used — header, consent, reveals — and the animation layer (GSAP, Lenis,
 * pointer effects) is imported after it, so nothing above the fold waits for
 * it. Everything is (re)initialised on `astro:page-load` so it works with View
 * Transitions, and torn down on `astro:before-swap`.
 */
import { initReveal, destroyReveal } from './reveal';
import { initHeader } from './header';
import { initInteractions } from './interactions';
import { initConsent } from './consent';
import { initLangBanner, watchLanguageLinks } from './lang-banner';

type Motion = typeof import('./motion');
type PointerFx = typeof import('./pointer-fx');
let motion: Motion | null = null;
let pointerFx: PointerFx | null = null;

/** Loaded once, then re-initialised on every client-side navigation. */
async function startMotion() {
  const [m, fx] = await Promise.all([motion ?? import('./motion'), pointerFx ?? import('./pointer-fx')]);
  motion = m;
  pointerFx = fx;
  m.initMotion();
  fx.initPointerFx();
}

function boot() {
  initReveal();
  initHeader();
  initInteractions();
  initConsent();
  initLangBanner();
  document.dispatchEvent(new CustomEvent('nlhr:ready'));
  void startMotion();
}

document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => {
  destroyReveal();
  motion?.destroyMotion();
  pointerFx?.destroyPointerFx();
});
watchLanguageLinks();
