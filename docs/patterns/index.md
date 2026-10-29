---
layout: page
title: Curated Patterns
description: Repeating SVG patterns composed from the SenangStart shape library.
---

<div class="ss-doc-library vp-doc">

# Curated Patterns

Existing shapes, new rhythms. Explore twenty repeating patterns for backgrounds, packaging, and brand projects. Each composition pairs a considered palette with motifs from the shape library.

Choose a category, try a different palette, or adjust the repeat scale. Copy self-contained CSS or download an SVG tile with your current settings. No shape component or JavaScript runtime is needed to use the backgrounds.

<PatternGallery locale="en" />

## Different compositions, not just different shapes

The collection includes twelve additional variations alongside the original eight designs:

- **Ornamental structure:** Deco Fanfare pairs opposing fans with curved linework; Rosette Lattice layers flowers and rings inside an edge-wrapped leaf trellis.
- **Botanical movement:** Wildflower Trail staggers sprigs and blossoms; Petal Pendant arranges flowers, paired leaves, and fans along a tall vertical tile.
- **Celestial rhythms:** Lunar Procession uses a wide moon-and-star band; Celestial Atlas offsets oversized orbital motifs with tiny satellites and sparks.
- **Loose and flowing:** Ribbon Drift carries loops across tile edges, Terrazzo Party scatters mixed-size organic cutouts, and Serpentine Stripe separates ribbons and waves into unequal lanes.
- **Graphic geometry:** Tidal Counterpoint opposes sweeping wave fans, Prism Parade nests solid kites inside outline crystals, and Stepped Weave forms continuous stair-step ribbons separated by crisp negative-space channels.

These compositions use different tile proportions, motif scales, rotations, layering, and spacing. Changing the palette preserves the composition; changing the repeat scale resizes the entire tile without stretching it.

## Use a pattern

Import the pattern stylesheet and apply a pattern class to any element:

```js
import '@bookklik/senangstart-shapes/patterns.css';
```

```html
<section class="ss-pattern-quarter-turn">
  <!-- Your content -->
</section>
```

```css
.ss-pattern-quarter-turn {
  min-height: 240px;
  --ss-pattern-size: 120px 120px;
}
```

The stylesheet includes the original palettes. **Copy CSS** produces a standalone rule with the selected palette and scale; it does not require the stylesheet. CSS backgrounds are decorative and do not provide accessible names. Keep text on a separate solid surface when a pattern would reduce readability.

## SVG strings and metadata

```js
import patterns, { catalog } from '@bookklik/senangstart-shapes/patterns';

const tile = patterns['leaf-weave'];
const dataUrl = `data:image/svg+xml,${encodeURIComponent(tile)}`;
```

```js
const { patterns, catalog } = require('@bookklik/senangstart-shapes/patterns');
```

`patterns` maps each pattern slug to a self-contained SVG tile. `catalog` lists English and Malay names and descriptions, categories, tile dimensions, colors, and source shape slugs. Metadata is also available from `@bookklik/senangstart-shapes/pattern-catalog.json`.

SVG tiles are included in `dist/patterns/<slug>.svg`. Use them as repeating backgrounds, not stretched full-width images. **Download SVG** saves one tile, not the entire preview; the selected scale changes its intrinsic dimensions while keeping the same viewBox.

## Extend the collection

Define compositions in `src/patterns/collection.json`. Each motif references an existing shape slug and can specify `x`, `y`, `size`, `rotate`, `tone` (`primary` or `secondary`), and `variant` (defaults to `solid`). Repeat-edge motifs must include matching copies on opposite edges, as in Scallop Stacks. Run `npm run build` to regenerate the SVG tiles, CSS, metadata, and JavaScript exports.

</div>
