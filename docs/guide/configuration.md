---
title: Framework Integration
---

# Framework Integration

SenangStart Shapes uses native custom elements. Register the library once in your browser entry point. The collection-only entry point is safe for server rendering.

## Vue

Configure Vue to recognize the custom element:

```js
// vite.config.js, using @vitejs/plugin-vue
vue({ template: { compilerOptions: {
  isCustomElement: tag => tag === 'ss-shape'
} } })
```

```vue
<script setup>
import '@bookklik/senangstart-shapes';
</script>
<template>
  <ss-shape shape="soft-nova" variant="duotone"
    style="font-size: 64px"></ss-shape>
</template>
```

## React

```jsx
import '@bookklik/senangstart-shapes';

export default function Shape() {
  return <ss-shape shape="soft-nova" variant="duotone"
    style={{ fontSize: '64px' }}></ss-shape>;
}
```

For TypeScript JSX, declare `ss-shape` in your framework’s intrinsic element types, with string attributes `shape`, `variant`, and `thickness`.

## Angular

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@bookklik/senangstart-shapes';

@Component({
  selector: 'app-shape',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<ss-shape shape="soft-nova" variant="duotone"></ss-shape>'
})
export class ShapeComponent {}
```

## SSR applications

Import the component bundle on the client, for example inside Vue’s `onMounted` or React’s `useEffect`. Import `@bookklik/senangstart-shapes/shapes` on the server when you only need SVG strings or catalog data. Registration is guarded against duplicate calls; collection imports do not register elements.
