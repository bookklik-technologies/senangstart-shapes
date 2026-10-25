---
title: Integrasi Rangka Kerja
---

# Integrasi Rangka Kerja

SenangStart Shapes menggunakan elemen tersuai asli. Daftarkan pustaka sekali pada titik masuk pelayar. Import koleksi sahaja selamat untuk pemaparan pelayan.

## Vue

Konfigurasikan Vue untuk mengenali elemen tersuai:

```js
// vite.config.js, menggunakan @vitejs/plugin-vue
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

Untuk JSX TypeScript, isytiharkan `ss-shape` dalam jenis elemen intrinsik rangka kerja anda dengan atribut rentetan `shape`, `variant` dan `thickness`.

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

## Aplikasi SSR

Import bundel komponen pada klien, contohnya dalam `onMounted` Vue atau `useEffect` React. Import `@bookklik/senangstart-shapes/shapes` pada pelayan untuk rentetan SVG atau metadata. Pendaftaran dilindungi daripada panggilan berulang; import koleksi tidak mendaftarkan elemen.
