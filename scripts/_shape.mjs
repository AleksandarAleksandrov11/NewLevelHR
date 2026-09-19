// Prints the shape of a dictionary module: node scripts/_shape.mjs src/i18n/en/services.ts [maxStringChars] [maxDepth]
const [,, file, maxArg, depthArg] = process.argv;
const max = parseInt(maxArg || '60', 10);
const maxDepth = parseInt(depthArg || '99', 10);
const mod = await import(new URL('../' + file, import.meta.url).href);
const obj = mod[Object.keys(mod).find((k) => typeof mod[k] === 'object')];
function walk(v, path, depth) {
  if (depth > maxDepth) return;
  if (Array.isArray(v)) {
    if (v.length && typeof v[0] === 'object') { console.log(`${path}: [${v.length}] {${Object.keys(v[0]).join(', ')}}`); walk(v[0], path + '[0]', depth + 1); }
    else console.log(`${path}: [${v.length}] ${JSON.stringify(v.slice(0, 2)).slice(0, max)}`);
    return;
  }
  if (v && typeof v === 'object') { console.log(`${path}: {${Object.keys(v).join(', ')}}`); for (const k of Object.keys(v)) walk(v[k], path + '.' + k, depth + 1); return; }
  if (max > 0) console.log(`${path}: ${JSON.stringify(String(v).slice(0, max))}`);
}
walk(obj, '$', 0);
