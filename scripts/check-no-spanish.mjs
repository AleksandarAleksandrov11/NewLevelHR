/**
 * Guards the "EN / DE / BG only" rule: scans sources, docs and the built HTML
 * for Spanish words and phrases. Exits with code 1 on any hit.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const SELF = path.resolve(new URL(import.meta.url).pathname);
const TARGETS = ['src', 'public', 'api', 'docs', 'scripts', 'README.md', 'TODO-CLIENT.md', 'PR_SUMMARY.md', '.env.example', 'vercel.json', 'astro.config.mjs', 'package.json', 'dist'];
const EXT = new Set(['.ts', '.mjs', '.js', '.astro', '.md', '.json', '.php', '.css', '.html', '.txt', '.xml', '.example', '.htaccess', '.webmanifest']);
const SKIP_DIRS = new Set(['node_modules', '.git', '_astro', '.astro', 'qa-screenshots', 'reference']);

// Words and phrases that are unambiguously Spanish and do not occur in English, German, Bulgarian (Latin slugs) or code.
const WORDS = [
  'también', 'página', 'páginas', 'información', 'teléfono', 'años', 'español', 'servicios', 'nosotros', 'nosotras',
  'contacto', 'contáctanos', 'empresa', 'empresas', 'gracias', 'hola', 'correo electrónico', 'enviar', 'aviso legal',
  'política de privacidad', 'política de cookies', 'aceptar', 'rechazar', 'configurar', 'leer más', 'ver más',
  'acerca de', 'sobre nosotros', 'trabajamos', 'equipo', 'clientes', 'solución', 'soluciones', 'preguntas frecuentes',
  'reservar', 'llamada', 'gratuita', 'gratuito', 'mensaje', 'nombre', 'apellido', 'ciudad', 'país', 'idioma',
  'inicio', 'buscar', 'cerrar', 'abrir', 'siguiente', 'anterior', 'cargando', 'según', 'aquí', 'más de', 'desde',
  'hasta', 'porque', 'pero', 'para', 'con el', 'con la', 'de la', 'de los', 'de las', 'en el', 'en la', 'que', 'sí',
];
const RE = new RegExp(`(^|[^\\p{L}\\p{N}_-])(${WORDS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?=$|[^\\p{L}\\p{N}_-])`, 'iu');

const hits = [];
function scanFile(file) {
  const ext = path.extname(file) || path.basename(file);
  if (!EXT.has(ext) && !file.endsWith('.htaccess')) return;
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    // Ignore attribute soup in built HTML and base64 blobs.
    if (line.length > 4000) return;
    const m = line.match(RE);
    if (m) hits.push({ file: path.relative(ROOT, file), line: i + 1, word: m[2], text: line.trim().slice(0, 120) });
  });
}
function walk(p) {
  if (!fs.existsSync(p)) return;
  if (path.resolve(p) === SELF) return;
  const stat = fs.statSync(p);
  if (stat.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(p))) return;
    for (const e of fs.readdirSync(p)) walk(path.join(p, e));
  } else scanFile(p);
}
for (const t of TARGETS) walk(path.join(ROOT, t));

if (hits.length) {
  console.error(`Found ${hits.length} possible Spanish word(s):`);
  for (const h of hits.slice(0, 80)) console.error(`  ${h.file}:${h.line}  [${h.word}]  ${h.text}`);
  process.exitCode = 1;
} else {
  console.log('No Spanish found in sources, docs or build output.');
}
