---
title: Usage & Variants
---

# Usage & Variants

## Web component

```html
<ss-shape shape="soft-nova" variant="solid"></ss-shape>
<ss-shape shape="soft-nova" variant="outline" thickness="2.5"></ss-shape>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
<ss-shape shape="isometric-tall-prism" variant="tonal"></ss-shape>
<ss-shape shape="circle" variant="solid"></ss-shape>
```

| Attribute | Behavior |
| --- | --- |
| `shape` | Exact shape-folder slug from the catalog. |
| `variant` | Exact available variant: solid, outline, duotone, or tonal. |
| `thickness` | A finite positive stroke width, in source SVG units. Existing strokes only. |
| `aria-label` | Accessible name for a meaningful shape. |

Omitting `variant` selects the first available style in this order: solid, outline, duotone, tonal. Some shapes have only one style. An explicit unavailable variant, an empty variant, or an unknown shape renders empty. The library does not invent missing styles. Attribute changes update the drawing immediately.

Invalid or omitted thickness preserves the source strokes. Thickness does not affect filled geometry. Most source viewBoxes are 100 units wide; stroke values are not pixel sizes.

## CSS-only shapes

Include `@bookklik/senangstart-shapes/style.css` or the browser stylesheet:

```html
<link rel="stylesheet" href="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart.min.css">
<i class="ss-shape ss-shape-soft-nova"
   data-variant="duotone"
   style="color: #2563eb; font-size: 64px"
   aria-hidden="true"></i>
```

CSS masks use a single inherited text color, including duotone assets. Tonal opacity is retained. Loading the browser bundle upgrades these tags to inline SVGs with both colors. For enhanced tags, use `data-thickness` to adjust strokes. Use exactly one `ss-shape-<slug>` class per element. Changes to classes, variant, thickness, and newly inserted elements are observed.

Shape selectors and the loader are separate from SenangStart Icons, so both libraries can be loaded together.

## SVG strings

The collection uses exact filename stems, for example `soft-nova-duotone` or `circle-solid`. Each record in `catalog.shapes` includes `slug`, `name`, `category`, `variants`, `defaultVariant`, and an `assets` map from variant to asset ID.

Normalized SVG strings preserve clipping and original viewBoxes. For repeated direct inline insertion, namespace IDs and references per instance. The web component and loader do this automatically. SVGs loaded as images are isolated documents.
