const fs = require('node:fs');
const path = require('node:path');
const { root } = require('./build-assets');
const { guides } = require('./docs-content');

function buildDocs() {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'dist/catalog.json'), 'utf8'));
  const categoryNamesMs = { 'geometric-basics': 'Asas geometri', 'stars-bursts': 'Bintang & pancaran', 'flowers-leaves': 'Bunga & daun', 'rings-orbits': 'Gelang & orbit', 'arches-fans': 'Lengkung & kipas', 'waves-linework': 'Gelombang & garisan', 'loops-ribbons': 'Gelung & reben', 'organic-abstract': 'Organik & abstrak', 'tiles-grids': 'Jubin & grid', 'steps-pixels': 'Tangga & piksel', 'arrows-direction': 'Anak panah & arah', 'facets-isometric': 'Faset & isometrik', 'eyes-expressions': 'Mata & ekspresi', 'weather-sky': 'Cuaca & langit' };
  for (const locale of ['en', 'ms']) {
    const folder = path.join(root, 'docs', locale === 'en' ? '' : 'ms');
    const ms = locale === 'ms';
    fs.mkdirSync(path.join(folder, 'guide'), { recursive: true });
    fs.mkdirSync(path.join(folder, 'shapes'), { recursive: true });
    for (const [slug, [title, content]] of Object.entries(guides[locale])) {
      fs.writeFileSync(path.join(folder, 'guide', slug + '.md'), `---\ntitle: ${title}\n---\n\n${content}\n`);
    }
    fs.writeFileSync(path.join(folder, 'shapes/index.md'), `---\nlayout: page\ntitle: ${ms ? 'Pustaka Bentuk' : 'Shape Library'}\n---\n\n<div class="ss-doc-library vp-doc">\n\n# ${ms ? 'Pustaka Bentuk' : 'Shape Library'}\n\n${ms ? 'Cari dan sesuaikan 496 aset SVG dalam 14 kategori. Pilih bentuk untuk menyalin kod atau memuat turun SVG.' : 'Explore 496 SVG assets across 14 categories. Select a shape to copy code or download your customized SVG.'}\n\n<ShapeGallery locale="${locale}" />\n\n</div>\n`);

    for (const shape of catalog.shapes) {
      const variants = shape.variants.map(variant => `## ${variant}\n\n<ss-shape shape="${shape.slug}" variant="${variant}" aria-label="${shape.name} ${variant}" style="font-size:100px;margin:20px 0"></ss-shape>\n\n\`\`\`html\n<ss-shape shape="${shape.slug}" variant="${variant}"></ss-shape>\n\`\`\`\n\n[${ms ? 'Muat turun SVG' : 'Download SVG'}](/dist/svg/${shape.assets[variant]}.svg)\n`).join('\n');
      // Absolute site paths are resolved through VitePress's configured base.
      const categoryName = ms ? categoryNamesMs[shape.category] : catalog.categories.find(category => category.slug === shape.category).name;
      const source = `---\ntitle: ${shape.name}\n---\n\n# ${shape.name}\n\n${ms ? 'Kategori' : 'Category'}: **${categoryName}** · ${ms ? 'Varian lalai' : 'Default variant'}: \`${shape.defaultVariant}\`\n\n${variants}\n## ${ms ? 'CSS sahaja' : 'CSS only'}\n\n\`\`\`html\n<i class="ss-shape ss-shape-${shape.slug}"\n   data-variant="${shape.defaultVariant}" aria-hidden="true"></i>\n\`\`\`\n\n${ms ? 'Sertakan style.css. Topeng CSS menggunakan satu warna. Bundel pelayar menyokong kedua-dua warna duotona.' : 'Include style.css. CSS masks use one color. The browser bundle supports both duotone colors.'}\n\n## JavaScript\n\n\`\`\`js\nimport shapes from '@bookklik/senangstart-shapes/shapes';\nconst svg = shapes['${shape.assets[shape.defaultVariant]}'];\n\`\`\`\n\n[${ms ? 'Kembali ke pustaka' : 'Back to library'}](./)\n`;
      fs.writeFileSync(path.join(folder, 'shapes', shape.slug + '.md'), source);
    }
    const expected = new Set(['index.md', ...catalog.shapes.map(shape => shape.slug + '.md')]);
    for (const filename of fs.readdirSync(path.join(folder, 'shapes'))) {
      if (filename.endsWith('.md') && !expected.has(filename)) fs.unlinkSync(path.join(folder, 'shapes', filename));
    }
  }
  const llms = `# SenangStart Shapes\n\nA native web-component and SVG library by Bookklik Technologies.\n\nPackage: @bookklik/senangstart-shapes\nVersion: 0.1.1\nLicense: MIT\nAssets: ${catalog.assetCount}; shapes: ${catalog.shapes.length}; categories: ${catalog.categories.length}.\n\nUsage: <ss-shape shape="soft-nova" variant="duotone"></ss-shape>\nSizing: font-size or width/height.\nColors: currentColor for monochrome; --ss-shape-primary (#2563EB), --ss-shape-secondary (#DBEAFE) for duotones.\nDefault variant order: solid, outline, duotone, tonal. Explicit missing variants render empty.\nCollections: import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes'.\nCommonJS: const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes').\nCSS: import '@bookklik/senangstart-shapes/style.css'; <i class="ss-shape ss-shape-soft-nova" aria-hidden="true"></i>. CSS-only masks are monochrome.\n\n${Object.values(guides.en).map(([, content]) => content).join('\n\n')}\n`;
  fs.mkdirSync(path.join(root, 'docs/public'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/public/llms.txt'), llms);
  // Brand artwork in docs/public/assets is maintained directly, not generated.
  console.log(`Generated ${catalog.shapes.length * 2} localized shape pages and 12 guides.`);
}

module.exports = { buildDocs };
if (require.main === module) buildDocs();
