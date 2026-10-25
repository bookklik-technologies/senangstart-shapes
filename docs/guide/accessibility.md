---
title: Accessibility
---

# Accessibility

## Decorative shapes

The JavaScript component and enhanced tags are decorative by default: they receive `aria-hidden="true"`. Internal SVGs are hidden from assistive technology and cannot receive focus.

```html
<ss-shape shape="soft-nova"></ss-shape>
```

For CSS-only elements, explicitly add `aria-hidden="true"`.

## Meaningful shapes

Provide a useful accessible name. The component adds `role="img"` and removes its default hidden state when a nonempty `aria-label` is supplied.

```html
<ss-shape shape="cloud" aria-label="Cloudy weather"></ss-shape>
<i class="ss-shape ss-shape-cloud"
   role="img" aria-label="Cloudy weather"></i>
```

Explicit caller-provided `role` and `aria-hidden` attributes take precedence. Remove an explicit `aria-hidden="true"` when turning a decorative shape into meaningful content.

## Buttons and links

Name the control and keep its shape decorative. Do not rely on color or shape alone to communicate a status.

```html
<button type="button" aria-label="Weather forecast">
  <ss-shape shape="cloud"></ss-shape>
</button>
```

The gallery supports keyboard navigation, visible focus, named filters, modal focus containment, Escape to close, arrow-key code tabs, and announced copy/download results.
