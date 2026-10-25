# SenangStart Shapes

Curated Starter shapes designed for web projects. `senangstart-shapes` provides a collection of 496 SVG assets across 302 shapes and 14 categories that can be easily used via the `ss-shape` web component or the `ss-shape ss-shape-<name>` classes. Shapes are designed to be simple & scalable, with solid, outline, duotone, and tonal styles.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

## Installation

```bash
npm i @bookklik/senangstart-shapes
```

## Usage

### Node.js / Bundlers

You can import the shapes collection using ES Modules (recommended) or CommonJS.

**ES Modules:**

```js
import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes';

// Access specific shapes by SVG filename stem
const { 'soft-nova-duotone': SoftNova } = shapes;
```

**CommonJS:**

```js
const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes');

const { 'soft-nova-duotone': SoftNova } = shapes;
```

To register the web component in a bundled application:

```js
import '@bookklik/senangstart-shapes';
```

### Browser / Web Components

You may use the `<ss-shape>` tag:

```html
<head>
  <script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
</head>
<body>
  <ss-shape shape="soft-nova" variant="duotone"></ss-shape>
</body>
```

> **Note:**
> Use paired tags in HTML. Omit `variant` to use the first available style in this order: solid, outline, duotone, tonal. Unknown shapes and unavailable variants render empty.
>
> Customize size with `font-size`, monochrome shapes with `color`, and duotones with `--ss-shape-primary` (default `#2563EB`) and `--ss-shape-secondary` (default `#DBEAFE`). A positive `thickness` value overrides existing strokes; otherwise, source stroke widths are preserved.
>
> Shapes are decorative by default. Add `aria-label` when a shape conveys meaning.

### CSS Shapes

Or use the `ss-shape` class:

```html
<head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart.min.css"
  />
</head>
<body>
  <i class="ss-shape ss-shape-soft-nova"
     data-variant="duotone"
     aria-hidden="true"></i>
</body>
```

For bundlers, import `@bookklik/senangstart-shapes/style.css`.

CSS alone renders monochrome masks using the inherited text color. Loading the browser bundle enhances these elements with inline SVGs supporting both duotone colors and dynamically added elements.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

Keep source SVGs in `src/shapes/`. Run `npm run build` to regenerate library assets and shape documentation. Do not edit generated files directly. Ask before running any unit tests.

## Documentation

Full English and Bahasa Melayu docs at [bookklik-technologies.github.io/senangstart-shapes](https://bookklik-technologies.github.io/senangstart-shapes/)

## License

Read [MIT License](LICENSE.md)
