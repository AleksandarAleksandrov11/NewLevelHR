/**
 * Pixel-trail cursor.
 *
 * The native cursor is never hidden. A full-screen canvas draws a trail of
 * grid-snapped squares behind the pointer: pixels are emitted along the path
 * (so fast moves stay continuous), drift slightly with the movement and fade
 * out in discrete steps, which keeps the retro pixel look instead of a blur.
 *
 * Runs only on fine pointers without reduced motion, pauses when idle or when
 * the tab is hidden, and tears itself down on view transitions.
 */

/** Pixel grid in CSS pixels: positions and sizes snap to it. */
const GRID = 6;
const MAX_PIXELS = 260;
/** Lifetime in milliseconds; alpha is quantised into ALPHA_STEPS levels. */
const LIFE = 620;
const ALPHA_STEPS = 5;
/** A cell cannot be re-lit faster than this, which keeps slow moves from clumping. */
const CELL_COOLDOWN = 90;

const COLORS = ['255, 107, 53', '247, 147, 30', '255, 179, 71', '255, 214, 170'];

interface Pixel {
  x: number;
  y: number;
  size: number;
  born: number;
  life: number;
  color: string;
  vx: number;
  vy: number;
}

let cleanup: Array<() => void> = [];

export function initCursor() {
  cleanup.forEach((f) => f());
  cleanup = [];

  const canvas = document.querySelector<HTMLCanvasElement>('[data-cursor-canvas]');
  const html = document.documentElement;
  const enabled =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || !enabled) {
    html.classList.remove('has-cursor-trail');
    return;
  }
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  html.classList.add('has-cursor-trail');

  let dpr = Math.min(2, window.devicePixelRatio || 1);
  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
  };
  resize();

  const pixels: Pixel[] = [];
  const cells = new Map<string, number>();
  let lastX = -1;
  let lastY = -1;
  let hot = false; // pointer is over a link or button: brighter, denser trail
  let raf = 0;
  let running = false;

  const snap = (v: number) => Math.round(v / GRID) * GRID;

  const emit = (x: number, y: number, now: number) => {
    const cx = snap(x);
    const cy = snap(y);
    const key = `${cx},${cy}`;
    const last = cells.get(key);
    if (last !== undefined && now - last < CELL_COOLDOWN) return;
    cells.set(key, now);
    if (cells.size > 600) cells.clear();

    const count = hot ? 2 : 1;
    for (let i = 0; i < count; i++) {
      // A little scatter on the grid keeps the trail from looking like a ruler.
      const jitterX = (Math.round(Math.random() * 2) - 1) * GRID;
      const jitterY = (Math.round(Math.random() * 2) - 1) * GRID;
      pixels.push({
        x: cx + (i === 0 ? 0 : jitterX),
        y: cy + (i === 0 ? 0 : jitterY),
        size: i === 0 ? GRID : GRID - 2,
        born: now,
        life: LIFE * (0.65 + Math.random() * 0.5),
        color: COLORS[(Math.random() * (hot ? 3 : COLORS.length)) | 0],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.12,
      });
    }
    if (pixels.length > MAX_PIXELS) pixels.splice(0, pixels.length - MAX_PIXELS);
  };

  const trail = (x: number, y: number, now: number) => {
    if (lastX < 0) {
      emit(x, y, now);
    } else {
      // Walk the segment so a fast flick still leaves a continuous trail.
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(24, Math.max(1, Math.round(dist / GRID)));
      for (let i = 1; i <= steps; i++) emit(lastX + (dx * i) / steps, lastY + (dy * i) / steps, now);
    }
    lastX = x;
    lastY = y;
  };

  const draw = () => {
    const now = performance.now();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = pixels.length - 1; i >= 0; i--) {
      const p = pixels[i];
      const t = (now - p.born) / p.life;
      if (t >= 1) {
        pixels.splice(i, 1);
        continue;
      }
      p.x += p.vx;
      p.y += p.vy;
      // Quantised fade and one size step down at half life: the pixels stay crisp.
      const step = Math.ceil((1 - t) * ALPHA_STEPS) / ALPHA_STEPS;
      const size = t > 0.55 ? Math.max(2, p.size - 2) : p.size;
      ctx.fillStyle = `rgba(${p.color}, ${(step * 0.85).toFixed(3)})`;
      ctx.fillRect(snap(p.x) - size / 2, snap(p.y) - size / 2, size, size);
    }
    if (pixels.length) {
      raf = requestAnimationFrame(draw);
    } else {
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    trail(e.clientX, e.clientY, performance.now());
    start();
  };
  const onOver = (e: PointerEvent) => {
    const t = e.target;
    hot = t instanceof Element && Boolean(t.closest('a, button, [role="button"], summary, label, input, select, textarea'));
  };
  const onLeave = () => {
    lastX = -1;
    lastY = -1;
  };
  const onVisibility = () => {
    if (document.hidden) {
      pixels.length = 0;
      cells.clear();
      onLeave();
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerover', onOver, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('visibilitychange', onVisibility);

  cleanup.push(() => {
    cancelAnimationFrame(raf);
    running = false;
    pixels.length = 0;
    cells.clear();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerover', onOver);
    window.removeEventListener('resize', resize);
    document.removeEventListener('mouseleave', onLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    html.classList.remove('has-cursor-trail');
  });
}
