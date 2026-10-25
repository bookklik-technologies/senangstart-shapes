---
title: Pemasangan
---

# Pemasangan

## npm dan pembundel

```bash
npm install @bookklik/senangstart-shapes
```

```js
// Mendaftarkan <ss-shape> dan mempertingkat tag <i class="ss-shape ...">.
import '@bookklik/senangstart-shapes';

// Pilihan untuk penggunaan CSS sahaja.
import '@bookklik/senangstart-shapes/style.css';
```

## Skrip pelayar

```html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
```

Objek global menyediakan `SenangStartShapes.shapes` dan `SenangStartShapes.catalog`. Skrip berfungsi dalam kepala dokumen, dengan `defer`, atau selepas dokumen dimuatkan.

## Koleksi SVG sahaja

```js
import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes';
const svg = shapes['soft-nova-duotone'];
console.log(catalog.assetCount); // 496
```

```js
const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes');
const svg = shapes['circle-solid'];
```

Import koleksi tidak mengubah DOM dan boleh digunakan dalam Node.js. Metadata juga tersedia melalui `@bookklik/senangstart-shapes/catalog.json`. Fail SVG ternormal tersedia melalui `@bookklik/senangstart-shapes/svg/<asset-id>.svg`.

## Pembangunan tempatan

Memerlukan Node.js 20 atau lebih baharu.

```bash
npm ci
npm run build
npm run preview
```

Buka URL localhost yang dipaparkan untuk galeri. Gunakan `npm run docs:dev` untuk dokumentasi. `npm run dev` memantau kod pustaka; jalankan semula `build:svg` selepas mengubah SVG sumber. Arahan binaan dan dokumentasi tidak menjalankan ujian unit.
