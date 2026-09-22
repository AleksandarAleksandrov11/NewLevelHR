/**
 * Client entry. Everything is (re)initialised on `astro:page-load` so it works
 * with View Transitions, and torn down on `astro:before-swap`.
 */
import { initMotion, destroyMotion } from './motion';
import { initHeader } from './header';
import { initInteractions } from './interactions';
import { initConsent } from './consent';
import { initLangBanner, watchLanguageLinks } from './lang-banner';

function boot() {
  initMotion();
  initHeader();
  initInteractions();
  initConsent();
  initLangBanner();
  document.dispatchEvent(new CustomEvent('nlhr:ready'));
}

document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => destroyMotion());
watchLanguageLinks();
