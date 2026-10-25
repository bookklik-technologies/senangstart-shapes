const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { buildAssets, root } = require('./build-assets');
const { buildDocs } = require('./build-shape-docs');

buildAssets();
execFileSync(process.execPath, [require.resolve('webpack-cli/bin/cli.js'), '--mode', 'production'], { cwd: root, stdio: 'inherit' });
buildDocs();
fs.mkdirSync(path.join(root, 'docs/public'), { recursive: true });
fs.cpSync(path.join(root, 'dist'), path.join(root, 'docs/public/dist'), { recursive: true });
// Remove SVGs that disappeared from the catalog, including obsolete variants.
const publicSvgDir = path.join(root, 'docs/public/dist/svg');
const expectedSvgs = new Set(fs.readdirSync(path.join(root, 'dist/svg')));
for (const filename of fs.readdirSync(publicSvgDir)) {
  if (filename.endsWith('.svg') && !expectedSvgs.has(filename)) fs.unlinkSync(path.join(publicSvgDir, filename));
}
fs.cpSync(path.join(root, 'gallery'), path.join(root, 'docs/public/gallery'), { recursive: true });
console.log('SenangStart Shapes: library, gallery assets and bilingual shape pages built.');
