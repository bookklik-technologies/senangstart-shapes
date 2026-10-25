---
title: Styling
---

# Styling

## Size and inherited color

```css
ss-shape {
  font-size: 64px;
  color: #2563eb;
}
.banner-shape { width: 120px; height: 120px; }
```

Shape sizing is independent of the original viewBox. Non-square viewBoxes retain their aspect ratio. Monochrome styles and tonal layers inherit `currentColor`.

## Duotone palette

Duotones default to SenangStart blue `#2563EB` and light blue `#DBEAFE`. Override either variable on a shape or an ancestor:

```css
.my-design {
  --ss-shape-primary: #2563eb;
  --ss-shape-secondary: #dbeafe;
}
```

```html
<div class="my-design">
  <ss-shape shape="soft-nova" variant="duotone"></ss-shape>
</div>
```

Set `--ss-shape-primary: currentColor` to make a duotone primary layer inherit text color. Source duotone SVGs use SenangStart blue (`#2563EB`) and light blue (`#DBEAFE`); generated assets expose these through the theme variables above.

CSS variables apply to inline SVGs. An external SVG loaded through `<img>` cannot inherit variables from the page; use a downloaded SVG with resolved colors instead. The gallery download resolves its selected colors into standalone SVG attributes.

## Dark mode

```css
.dark .my-design {
  color: #dbeafe;
  --ss-shape-primary: #82aeff;
  --ss-shape-secondary: #24354f;
}
```

The library does not impose application fonts, page colors, or animations. Add motion through standard CSS and respect `prefers-reduced-motion` when animating.
