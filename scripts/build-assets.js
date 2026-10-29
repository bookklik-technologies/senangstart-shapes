const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src', 'shapes');
const dist = path.join(root, 'dist');
const generated = path.join(root, 'src/generated');
const priorities = ['solid', 'outline', 'duotone', 'tonal'];
const titleCase = value => value.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

function normalize(svg, assetId) {
  if (/<script\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:)/i.test(svg)) {
    throw new Error(`Unsupported active SVG content in ${assetId}`);
  }
  let result = svg.replace(/<\?xml[^>]*\?>/g, '').trim();
  if (!/^<svg\b/.test(result) || !/viewBox="[^"]+"/.test(result)) {
    throw new Error(`Invalid SVG or missing viewBox: ${assetId}`);
  }
  // Root dimensions and color must not override host sizing or inherited color.
  result = result.replace(/^<svg\b[^>]*>/, tag => tag
    .replace(/\s(?:width|height|color)="[^"]*"/g, ''));
  result = result.replace(/#2563eb/gi, 'var(--ss-shape-primary, #2563EB)')
    .replace(/#dbeafe/gi, 'var(--ss-shape-secondary, #DBEAFE)');
  const ids = new Map();
  result = result.replace(/\bid="([^"]+)"/g, (_, id) => {
    const next = `ss-shape-${assetId}-${id}`;
    ids.set(id, next);
    return `id="${next}"`;
  });
  result = result.replace(/url\(#([^)]*)\)/g, (match, id) => ids.has(id) ? `url(#${ids.get(id)})` : match);
  result = result.replace(/((?:xlink:)?href=")#([^"]+)"/g, (match, prefix, id) =>
    ids.has(id) ? `${prefix}#${ids.get(id)}"` : match);
  return result;
}

function buildAssets() {
  const shapes = {};
  const catalog = [];
  const categories = [];
  for (const category of fs.readdirSync(source).sort()) {
    if (!fs.statSync(path.join(source, category)).isDirectory()) continue;
    const categorySlug = category.replace(/^\d+-/, '');
    categories.push({ slug: categorySlug, name: titleCase(categorySlug), directory: category });
    for (const slug of fs.readdirSync(path.join(source, category)).sort()) {
      const folder = path.join(source, category, slug);
      if (!fs.statSync(folder).isDirectory()) continue;
      if (catalog.some(shape => shape.slug === slug)) throw new Error(`Duplicate shape: ${slug}`);
      const variants = [];
      const assets = {};
      for (const filename of fs.readdirSync(folder).sort()) {
        if (!filename.endsWith('.svg')) continue;
        const assetId = filename.slice(0, -4);
        const variant = assetId.slice(slug.length + 1);
        if (!assetId.startsWith(`${slug}-`) || !/^(solid|outline|duotone|tonal)(-alt-\d+)?$/.test(variant)) {
          throw new Error(`Unrecognized asset name: ${filename}`);
        }
        if (Object.hasOwn(shapes, assetId)) throw new Error(`Duplicate asset: ${assetId}`);
        const svg = normalize(fs.readFileSync(path.join(folder, filename), 'utf8'), assetId);
        shapes[assetId] = svg;
        assets[variant] = assetId;
        variants.push(variant);
      }
      variants.sort((a, b) => priorities.indexOf(a.split('-')[0]) - priorities.indexOf(b.split('-')[0]) || a.localeCompare(b));
      const defaultVariant = priorities.find(variant => variants.includes(variant)) || variants[0];
      if (!defaultVariant) throw new Error(`Empty shape: ${slug}`);
      catalog.push({ slug, name: titleCase(slug), category: categorySlug, variants, defaultVariant, assets });
    }
  }

  fs.mkdirSync(generated, { recursive: true });
  fs.mkdirSync(path.join(dist, 'svg'), { recursive: true });
  const metadata = { categories, shapes: catalog, assetCount: Object.keys(shapes).length };
  fs.writeFileSync(path.join(generated, 'shapes.js'),
    `// Generated from src/shapes/. Do not edit.\nconst shapes = ${JSON.stringify(shapes)};\nexport const catalog = ${JSON.stringify(metadata)};\nexport { shapes };\nexport default shapes;\n`);
  fs.writeFileSync(path.join(dist, 'catalog.json'), JSON.stringify(metadata, null, 2) + '\n');
  for (const [id, svg] of Object.entries(shapes)) fs.writeFileSync(path.join(dist, 'svg', id + '.svg'), svg + '\n');
  // Only remove stale files from the generated SVG directory.
  for (const filename of fs.readdirSync(path.join(dist, 'svg'))) {
    if (filename.endsWith('.svg') && !Object.hasOwn(shapes, filename.slice(0, -4))) fs.unlinkSync(path.join(dist, 'svg', filename));
  }

  const styleSource = fs.readFileSync(path.join(root, 'src/styles.js'), 'utf8');
  const baseStyles = styleSource.match(/export const loaderStyles = `([\s\S]*?)`;/)[1];
  let css = '/* SenangStart Shapes v0.1.2 | MIT | Generated from src/shapes/ */\n' + baseStyles;
  for (const shape of catalog) {
    css += `\n.ss-shape.ss-shape-${shape.slug}{--ss-shape-mask:none}\n`;
    for (const variant of shape.variants) {
      const svg = shapes[shape.assets[variant]]
        .replace(/var\(--ss-shape-(?:primary|secondary), #[0-9a-f]+\)/gi, '#000')
        .replace(/currentColor/g, '#000');
      const uri = 'url("data:image/svg+xml,' + encodeURIComponent(svg).replace(/'/g, '%27') + '")';
      const selector = `.ss-shape.ss-shape-${shape.slug}`;
      const defaultSelector = variant === shape.defaultVariant ? `${selector}:not([data-variant]),` : '';
      css += `${defaultSelector}${selector}[data-variant="${variant}"]{--ss-shape-mask:${uri}}\n`;
    }
  }
  fs.writeFileSync(path.join(dist, 'senangstart.min.css'), css.replace(/\s*([{}:;,])\s*/g, '$1').replace(/\s+/g, ' ').trim() + '\n');
  console.log(`Generated ${metadata.assetCount} SVGs, ${catalog.length} shapes, ${categories.length} categories and CSS masks.`);
  return { shapes, catalog: metadata };
}

module.exports = { buildAssets, root };
if (require.main === module) buildAssets();
