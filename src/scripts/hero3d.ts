/**
 * Hero scene: four rounded bars rising step by step, floating slowly and tilting
 * a little towards the pointer. Deliberately simple, so it costs almost nothing
 * on a phone: standard materials, two lights, no environment map.
 * Loaded lazily; the inline SVG stays visible until the first frame.
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, MeshStandardMaterial,
  AmbientLight, DirectionalLight, Color, Clock, ACESFilmicToneMapping, SRGBColorSpace,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export interface HeroScene { destroy: () => void }

/** x position, height and colour of each bar, left to right. */
const BARS = [
  { x: -2.7, h: 1.4, color: '#ffffff' },
  { x: -0.9, h: 2.2, color: '#fdf3e9' },
  { x: 0.9, h: 3.2, color: '#ffc9a3' },
  { x: 2.7, h: 4.4, color: '#ff6b35' },
];
const BASE_Y = -2.2;
const WIDTH = 1.5;

export function createHeroScene(container: HTMLElement): HeroScene | null {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = SRGBColorSpace;
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 0.6, 10.5);
  camera.lookAt(0, 0, 0);

  const group = new Group();
  group.rotation.x = -0.06;
  scene.add(group);

  const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.14);
  const materials: MeshStandardMaterial[] = [];
  const bars = BARS.map((b, i) => {
    const material = new MeshStandardMaterial({
      color: new Color(b.color), roughness: i === BARS.length - 1 ? 0.32 : 0.45, metalness: 0.02,
      emissive: new Color(i === BARS.length - 1 ? '#ff6b35' : '#000000'), emissiveIntensity: i === BARS.length - 1 ? 0.22 : 0,
    });
    materials.push(material);
    const mesh = new Mesh(geometry, material);
    // The geometry is a unit cube, so the scale is the size and the bars share a base line.
    mesh.scale.set(WIDTH, b.h, WIDTH);
    mesh.position.set(b.x, BASE_Y + b.h / 2, 0);
    mesh.userData = { baseY: BASE_Y + b.h / 2, phase: i * 0.8 };
    group.add(mesh);
    return mesh;
  });

  scene.add(new AmbientLight('#fff1e2', 1.15));
  const key = new DirectionalLight('#ffffff', 2.1); key.position.set(3.5, 7, 6); scene.add(key);
  const fill = new DirectionalLight('#ffb347', 0.75); fill.position.set(-5, 2, -3); scene.add(fill);

  const clock = new Clock();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0;
  let visible = true;
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // The staircase is wider than it is tall, so narrow boxes zoom out instead of cropping.
    const fit = Math.min(1, (w / h) / 1.25);
    group.scale.setScalar(0.72 + fit * 0.28);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    if (!r.width || !r.height) return;
    targetY = (((e.clientX - r.left) / r.width) * 2 - 1) * 0.26;
    targetX = (((e.clientY - r.top) / r.height) * 2 - 1) * 0.1;
  };
  const io = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; }, { threshold: 0 });
  io.observe(container);
  window.addEventListener('pointermove', onPointer, { passive: true });

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    group.rotation.x = -0.06 + curX;
    group.rotation.y = curY + (reduced ? 0 : Math.sin(t * 0.22) * 0.18);
    if (!reduced) {
      bars.forEach((bar) => { bar.position.y = bar.userData.baseY + Math.sin(t * 0.85 + bar.userData.phase) * 0.07; });
    }
    renderer.render(scene, camera);
  };
  tick();
  requestAnimationFrame(() => container.classList.add('is-3d-ready'));

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      canvas.remove();
      container.classList.remove('is-3d-ready');
    },
  };
}
