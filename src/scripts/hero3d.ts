/**
 * Hero scene: ascending glass-like steps rising towards the light, reacting to
 * the pointer (parallax + tilt + light that follows the cursor).
 * Loaded lazily; the static fallback stays visible until the first frame.
 */
import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial,
  AmbientLight, DirectionalLight, PointLight, Color, SphereGeometry, PMREMGenerator, MathUtils, ACESFilmicToneMapping, SRGBColorSpace, Clock, BoxGeometry,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface HeroScene { destroy: () => void }

export function createHeroScene(container: HTMLElement): HeroScene | null {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = SRGBColorSpace;
  container.appendChild(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 1.2, 11);

  const group = new Group();
  scene.add(group);

  const glass = new MeshPhysicalMaterial({
    color: new Color('#fffaf3'), roughness: 0.12, metalness: 0.02, transmission: 0.0, transparent: true, opacity: 0.94,
    clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.2, sheen: 0.4, sheenColor: new Color('#ffd7bd'),
  });
  const accent = new MeshStandardMaterial({ color: new Color('#ff6b35'), roughness: 0.28, metalness: 0.05, emissive: new Color('#ff6b35'), emissiveIntensity: 0.28, envMapIntensity: 1.1 });
  const accent2 = new MeshStandardMaterial({ color: new Color('#ffb347'), roughness: 0.35, metalness: 0.02, emissive: new Color('#f7931e'), emissiveIntensity: 0.18 });

  // Five ascending steps
  const steps: Mesh[] = [];
  const stepDefs = [
    { x: -3.2, y: -1.6, h: 1.0, w: 1.7, d: 1.7, m: glass },
    { x: -1.6, y: -1.0, h: 1.6, w: 1.7, d: 1.7, m: glass },
    { x: 0.0, y: -0.4, h: 2.4, w: 1.7, d: 1.7, m: glass },
    { x: 1.6, y: 0.3, h: 3.2, w: 1.7, d: 1.7, m: glass },
    { x: 3.2, y: 1.1, h: 4.2, w: 1.7, d: 1.7, m: accent },
  ];
  stepDefs.forEach((s, i) => {
    const geo = new RoundedBoxGeometry(s.w, s.h, s.d, 4, 0.18);
    const mesh = new Mesh(geo, s.m);
    mesh.position.set(s.x, s.y, i * -0.12);
    mesh.userData = { baseY: s.y, phase: i * 0.9 };
    group.add(mesh);
    steps.push(mesh);
  });

  // Floating accents
  const orbs: Mesh[] = [];
  const orbGeo = new SphereGeometry(0.22, 32, 32);
  const orbDefs = [
    { p: [-2.4, 2.2, 0.8], s: 1, m: accent2 }, { p: [1.0, 2.9, -0.6], s: 0.6, m: accent }, { p: [4.4, -0.8, 1.2], s: 0.8, m: accent2 },
    { p: [-4.2, 0.3, -1.0], s: 0.5, m: accent }, { p: [2.6, -2.2, 1.6], s: 0.45, m: accent2 },
  ];
  orbDefs.forEach((o, i) => {
    const mesh = new Mesh(orbGeo, o.m);
    mesh.position.set(o.p[0], o.p[1], o.p[2]);
    mesh.scale.setScalar(o.s);
    mesh.userData = { base: [...o.p], phase: i * 1.3 };
    group.add(mesh);
    orbs.push(mesh);
  });

  // Thin "ground" reflection plane substitute: a wide flat slab
  const slab = new Mesh(new BoxGeometry(14, 0.08, 6), new MeshStandardMaterial({ color: new Color('#f4eee6'), roughness: 0.6, metalness: 0, transparent: true, opacity: 0.55 }));
  slab.position.set(0, -2.4, -0.5);
  group.add(slab);

  scene.add(new AmbientLight('#fff4e8', 0.55));
  const key = new DirectionalLight('#ffffff', 2.2); key.position.set(4, 8, 6); scene.add(key);
  const rim = new DirectionalLight('#ffb347', 1.1); rim.position.set(-6, 3, -4); scene.add(rim);
  const cursorLight = new PointLight('#ff6b35', 14, 12, 1.6); cursorLight.position.set(0, 2, 4); scene.add(cursorLight);

  const clock = new Clock();
  let raf = 0;
  let targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
  let scrollShift = 0;
  let visible = true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const resize = () => {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const mobile = w < 720;
    group.scale.setScalar(mobile ? 0.62 : w < 1100 ? 0.8 : 1);
    group.position.set(mobile ? 0.4 : 1.1, mobile ? -0.4 : -0.2, 0);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    targetRY = nx * 0.22; targetRX = ny * 0.12;
    cursorLight.position.set(nx * 5, 2.5 - ny * 3, 4.5);
  };
  const onScroll = () => { scrollShift = Math.min(1, window.scrollY / (window.innerHeight || 1)); };
  const io = new IntersectionObserver((en) => { visible = en[0]?.isIntersecting ?? true; }, { threshold: 0 });
  io.observe(container);
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    curRX += (targetRX - curRX) * 0.06; curRY += (targetRY - curRY) * 0.06;
    group.rotation.x = curRX; group.rotation.y = curRY + (reduced ? 0 : Math.sin(t * 0.15) * 0.05);
    group.position.y = (container.clientWidth < 720 ? -0.4 : -0.2) + scrollShift * 1.6;
    if (!reduced) {
      steps.forEach((s) => { s.position.y = s.userData.baseY + Math.sin(t * 0.8 + s.userData.phase) * 0.06; });
      orbs.forEach((o) => { const b = o.userData.base; o.position.y = b[1] + Math.sin(t * 0.9 + o.userData.phase) * 0.25; o.position.x = b[0] + Math.cos(t * 0.5 + o.userData.phase) * 0.12; });
      const top = steps[4]; if (top) (top.material as MeshStandardMaterial).emissiveIntensity = 0.24 + Math.sin(t * 1.4) * 0.08;
    }
    renderer.render(scene, camera);
  };
  tick();
  requestAnimationFrame(() => container.classList.add('is-3d-ready'));

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      steps.forEach((s) => s.geometry.dispose()); orbGeo.dispose(); slab.geometry.dispose();
      glass.dispose(); accent.dispose(); accent2.dispose(); pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
