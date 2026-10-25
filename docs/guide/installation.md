---
title: Installation
---

# Installation

## npm and bundlers

```bash
npm install @bookklik/senangstart-shapes
```

```js
// Registers <ss-shape> and enhances <i class="ss-shape ...">.
import '@bookklik/senangstart-shapes';

// Optional CSS-only usage; JavaScript is not required for masks.
import '@bookklik/senangstart-shapes/style.css';
```

## Browser script

```html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
```

The browser global exposes `SenangStartShapes.shapes` and `SenangStartShapes.catalog`. The script works in the document head, with `defer`, or after the document has loaded.

## SVG collection only

```js
import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes';
const svg = shapes['soft-nova-duotone'];
console.log(catalog.assetCount); // 496
```

```js
const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes');
const svg = shapes['circle-solid'];
```

This entry point has no DOM side effects and works in Node.js. Metadata is also exported at `@bookklik/senangstart-shapes/catalog.json`. Individual normalized SVGs are available under `@bookklik/senangstart-shapes/svg/<asset-id>.svg`.

## Local development

Requires Node.js 20 or later.

```bash
npm ci
npm run build
npm run preview
```

Open the printed localhost URL for the standalone gallery. Run `npm run docs:dev` for documentation. `npm run dev` watches library code; rerun `build:svg` after editing the source SVGs. Neither build nor documentation commands run unit tests.
