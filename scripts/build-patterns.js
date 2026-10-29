const fs = require('node:fs');
const path = require('node:path');
const collection = require('../src/patterns/collection.json');
const { root } = require('./build-assets');

function buildPatterns({ shapes, catalog }) {
  const patterns = {};
  const output = path.join(root, 'dist/patterns');
  fs.mkdirSync(output, { recursive: true });
  const slugs = new Set();
  for (const pattern of collection) {
    if (!/^[a-z][a-z0-9-]*$/.test(pattern.slug) || slugs.has(pattern.slug)) {
      throw new Error(`Invalid or duplicate pattern slug: ${pattern.slug}`);
    }
    slugs.add(pattern.slug);
    if (![pattern.width, pattern.height].every(value => Number.isFinite(value) && value > 0)
      || !['primary', 'secondary', 'background'].every(tone => /^#[0-9a-f]{6}$/i.test(pattern.colors[tone]))) {
      throw new Error(`Invalid dimensions or colors: ${pattern.slug}`);
    }
    const motifs = pattern.motifs.map((motif, index) => {
      const shape = catalog.shapes.find(item => item.slug === motif.shape);
      const asset = shape?.assets[motif.variant || 'solid'];
      if (!asset || !shapes[asset]) throw new Error(`Unknown shape or variant in ${pattern.slug}: ${motif.shape}`);
      if (![motif.x, motif.y, motif.size, motif.rotate ?? 0].every(Number.isFinite) || motif.size <= 0
        || !['primary', 'secondary'].includes(motif.tone || 'primary')) {
        throw new Error(`Invalid motif ${index} in ${pattern.slug}`);
      }
      const prefix = `ss-pattern-${pattern.slug}-${index}-`;
      let svg = shapes[asset]
        .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
        .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
        .replace(/((?:xlink:)?href=")#([^"]+)"/g, (_, attribute, id) => `${attribute}#${prefix}${id}"`)
        .replace(/currentColor/g, pattern.colors[motif.tone || 'primary'])
        .replace(/var\(--ss-shape-primary, #[0-9a-f]+\)/gi, pattern.colors.primary)
        .replace(/var\(--ss-shape-secondary, #[0-9a-f]+\)/gi, pattern.colors.secondary)
        .replace(/<title\b[^>]*>[\s\S]*?<\/title>/g, '')
        .replace(/^<svg\b/, `<svg x="${motif.x}" y="${motif.y}" width="${motif.size}" height="${motif.size}"`);
      if (motif.rotate) svg = `<g transform="rotate(${motif.rotate} ${motif.x + motif.size / 2} ${motif.y + motif.size / 2})">${svg}</g>`;
      return svg;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pattern.width}" height="${pattern.height}" viewBox="0 0 ${pattern.width} ${pattern.height}"><rect width="100%" height="100%" fill="${pattern.colors.background}"/>${motifs}</svg>`;
    patterns[pattern.slug] = svg;
    fs.writeFileSync(path.join(output, `${pattern.slug}.svg`), svg + '\n');
  }
  for (const filename of fs.readdirSync(output)) {
    if (filename.endsWith('.svg') && !slugs.has(filename.slice(0, -4))) fs.unlinkSync(path.join(output, filename));
  }
  const patternCatalog = collection.map(({ motifs, ...pattern }) => ({
    ...pattern,
    shapes: [...new Set(motifs.map(motif => motif.shape))],
  }));
  const data = `const patterns = ${JSON.stringify(patterns)};\nconst catalog = ${JSON.stringify(patternCatalog)};\n`;
  fs.writeFileSync(path.join(root, 'dist/patterns.mjs'), data + 'export { patterns, catalog };\nexport default patterns;\n');
  fs.writeFileSync(path.join(root, 'dist/patterns.cjs'), data + 'module.exports = { patterns, catalog };\n');
  fs.writeFileSync(path.join(root, 'dist/pattern-catalog.json'), JSON.stringify(patternCatalog, null, 2) + '\n');
  const css = patternCatalog.map(pattern => {
    const uri = encodeURIComponent(patterns[pattern.slug]).replace(/'/g, '%27');
    return `.ss-pattern-${pattern.slug}{background-image:url("data:image/svg+xml,${uri}");background-repeat:repeat;background-size:var(--ss-pattern-size,${pattern.width}px ${pattern.height}px)}`;
  }).join('\n');
  fs.writeFileSync(path.join(root, 'dist/patterns.css'), css + '\n');
  console.log(`Generated ${patternCatalog.length} curated patterns, SVG tiles and CSS backgrounds.`);
}

module.exports = { buildPatterns };
