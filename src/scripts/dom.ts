/**
 * The small pieces every script needs, with no animation library behind them,
 * so the header, the consent banner and the reveals do not wait for GSAP.
 */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Set by the motion module once smooth scrolling is running. */
let locker: ((lock: boolean) => void) | null = null;
export function setScrollLocker(fn: ((lock: boolean) => void) | null) { locker = fn; }

/** Freezes the page behind an overlay (the mobile menu, the cookie dialog). */
export function lockScroll(lock: boolean) {
  locker?.(lock);
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}
