---
title: Getting Started
---

# Getting Started

SenangStart Shapes is a collection of **496 SVG assets**, covering **302 shapes** in **14 categories**. Use a native web component, CSS masks, or SVG strings in your own renderer. No framework or runtime dependency is required.

## Install

```bash
npm install @bookklik/senangstart-shapes
```

```js
import '@bookklik/senangstart-shapes';
```

## Add a shape

```html
<ss-shape shape="soft-nova" variant="duotone"
  style="font-size: 80px"></ss-shape>
```

<ss-shape shape="soft-nova" variant="duotone" style="font-size:80px"></ss-shape>

Use paired opening and closing tags in HTML. Custom elements are not HTML void elements.

The default size is `1em`. Change `font-size`, or set `width` and `height` directly. Browse the [shape library](../shapes/) to find names, variants, and copyable examples.

## Use a CDN

```html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.2/dist/senangstart-shape.min.js"></script>
<ss-shape shape="ten-lobe-rosette"></ss-shape>
```

CDN examples assume version 0.1.2 has been published. During local development, use `dist/senangstart-shape.min.js` after running `npm run build`.

Read [installation](./installation), [usage](./usage), and [styling](./styling) for more options.
