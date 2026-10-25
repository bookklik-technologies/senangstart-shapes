const guides = {
  en: {
    'getting-started': ['Getting Started', `# Getting Started

SenangStart Shapes is a collection of **496 SVG assets**, covering **302 shapes** in **14 categories**. Use a native web component, CSS masks, or SVG strings in your own renderer. No framework or runtime dependency is required.

## Install

\`\`\`bash
npm install @bookklik/senangstart-shapes
\`\`\`

\`\`\`js
import '@bookklik/senangstart-shapes';
\`\`\`

## Add a shape

\`\`\`html
<ss-shape shape="soft-nova" variant="duotone"
  style="font-size: 80px"></ss-shape>
\`\`\`

<ss-shape shape="soft-nova" variant="duotone" style="font-size:80px"></ss-shape>

Use paired opening and closing tags in HTML. Custom elements are not HTML void elements.

The default size is \`1em\`. Change \`font-size\`, or set \`width\` and \`height\` directly. Browse the [shape library](../shapes/) to find names, variants, and copyable examples.

## Use a CDN

\`\`\`html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="ten-lobe-rosette"></ss-shape>
\`\`\`

CDN examples assume version 0.1.1 has been published. During local development, use \`dist/senangstart-shape.min.js\` after running \`npm run build\`.

Read [installation](./installation), [usage](./usage), and [styling](./styling) for more options.`],
    installation: ['Installation', `# Installation

## npm and bundlers

\`\`\`bash
npm install @bookklik/senangstart-shapes
\`\`\`

\`\`\`js
// Registers <ss-shape> and enhances <i class="ss-shape ...">.
import '@bookklik/senangstart-shapes';

// Optional CSS-only usage; JavaScript is not required for masks.
import '@bookklik/senangstart-shapes/style.css';
\`\`\`

## Browser script

\`\`\`html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
\`\`\`

The browser global exposes \`SenangStartShapes.shapes\` and \`SenangStartShapes.catalog\`. The script works in the document head, with \`defer\`, or after the document has loaded.

## SVG collection only

\`\`\`js
import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes';
const svg = shapes['soft-nova-duotone'];
console.log(catalog.assetCount); // 496
\`\`\`

\`\`\`js
const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes');
const svg = shapes['circle-solid'];
\`\`\`

This entry point has no DOM side effects and works in Node.js. Metadata is also exported at \`@bookklik/senangstart-shapes/catalog.json\`. Individual normalized SVGs are available under \`@bookklik/senangstart-shapes/svg/<asset-id>.svg\`.

## Local development

Requires Node.js 20 or later.

\`\`\`bash
npm ci
npm run build
npm run preview
\`\`\`

Open the printed localhost URL for the standalone gallery. Run \`npm run docs:dev\` for documentation. \`npm run dev\` watches library code; rerun \`build:svg\` after editing the source SVGs. Neither build nor documentation commands run unit tests.`],
    usage: ['Usage & Variants', `# Usage & Variants

## Web component

\`\`\`html
<ss-shape shape="soft-nova" variant="solid"></ss-shape>
<ss-shape shape="soft-nova" variant="outline" thickness="2.5"></ss-shape>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
<ss-shape shape="isometric-tall-prism" variant="tonal"></ss-shape>
<ss-shape shape="circle" variant="solid"></ss-shape>
\`\`\`

| Attribute | Behavior |
| --- | --- |
| \`shape\` | Exact shape-folder slug from the catalog. |
| \`variant\` | Exact available variant: solid, outline, duotone, or tonal. |
| \`thickness\` | A finite positive stroke width, in source SVG units. Existing strokes only. |
| \`aria-label\` | Accessible name for a meaningful shape. |

Omitting \`variant\` selects the first available style in this order: solid, outline, duotone, tonal. Some shapes have only one style. An explicit unavailable variant, an empty variant, or an unknown shape renders empty. The library does not invent missing styles. Attribute changes update the drawing immediately.

Invalid or omitted thickness preserves the source strokes. Thickness does not affect filled geometry. Most source viewBoxes are 100 units wide; stroke values are not pixel sizes.

## CSS-only shapes

Include \`@bookklik/senangstart-shapes/style.css\` or the browser stylesheet:

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart.min.css">
<i class="ss-shape ss-shape-soft-nova"
   data-variant="duotone"
   style="color: #2563eb; font-size: 64px"
   aria-hidden="true"></i>
\`\`\`

CSS masks use a single inherited text color, including duotone assets. Tonal opacity is retained. Loading the browser bundle upgrades these tags to inline SVGs with both colors. For enhanced tags, use \`data-thickness\` to adjust strokes. Use exactly one \`ss-shape-<slug>\` class per element. Changes to classes, variant, thickness, and newly inserted elements are observed.

Shape selectors and the loader are separate from SenangStart Icons, so both libraries can be loaded together.

## SVG strings

The collection uses exact filename stems, for example \`soft-nova-duotone\` or \`circle-solid\`. Each record in \`catalog.shapes\` includes \`slug\`, \`name\`, \`category\`, \`variants\`, \`defaultVariant\`, and an \`assets\` map from variant to asset ID.

Normalized SVG strings preserve clipping and original viewBoxes. For repeated direct inline insertion, namespace IDs and references per instance. The web component and loader do this automatically. SVGs loaded as images are isolated documents.`],
    styling: ['Styling', `# Styling

## Size and inherited color

\`\`\`css
ss-shape {
  font-size: 64px;
  color: #2563eb;
}
.banner-shape { width: 120px; height: 120px; }
\`\`\`

Shape sizing is independent of the original viewBox. Non-square viewBoxes retain their aspect ratio. Monochrome styles and tonal layers inherit \`currentColor\`.

## Duotone palette

Duotones default to SenangStart blue \`#2563EB\` and light blue \`#DBEAFE\`. Override either variable on a shape or an ancestor:

\`\`\`css
.my-design {
  --ss-shape-primary: #2563eb;
  --ss-shape-secondary: #dbeafe;
}
\`\`\`

\`\`\`html
<div class="my-design">
  <ss-shape shape="soft-nova" variant="duotone"></ss-shape>
</div>
\`\`\`

Set \`--ss-shape-primary: currentColor\` to make a duotone primary layer inherit text color. Source duotone SVGs use SenangStart blue (\`#2563EB\`) and light blue (\`#DBEAFE\`); generated assets expose these through the theme variables above.

CSS variables apply to inline SVGs. An external SVG loaded through \`<img>\` cannot inherit variables from the page; use a downloaded SVG with resolved colors instead. The gallery download resolves its selected colors into standalone SVG attributes.

## Dark mode

\`\`\`css
.dark .my-design {
  color: #dbeafe;
  --ss-shape-primary: #82aeff;
  --ss-shape-secondary: #24354f;
}
\`\`\`

The library does not impose application fonts, page colors, or animations. Add motion through standard CSS and respect \`prefers-reduced-motion\` when animating.`],
    accessibility: ['Accessibility', `# Accessibility

## Decorative shapes

The JavaScript component and enhanced tags are decorative by default: they receive \`aria-hidden="true"\`. Internal SVGs are hidden from assistive technology and cannot receive focus.

\`\`\`html
<ss-shape shape="soft-nova"></ss-shape>
\`\`\`

For CSS-only elements, explicitly add \`aria-hidden="true"\`.

## Meaningful shapes

Provide a useful accessible name. The component adds \`role="img"\` and removes its default hidden state when a nonempty \`aria-label\` is supplied.

\`\`\`html
<ss-shape shape="cloud" aria-label="Cloudy weather"></ss-shape>
<i class="ss-shape ss-shape-cloud"
   role="img" aria-label="Cloudy weather"></i>
\`\`\`

Explicit caller-provided \`role\` and \`aria-hidden\` attributes take precedence. Remove an explicit \`aria-hidden="true"\` when turning a decorative shape into meaningful content.

## Buttons and links

Name the control and keep its shape decorative. Do not rely on color or shape alone to communicate a status.

\`\`\`html
<button type="button" aria-label="Weather forecast">
  <ss-shape shape="cloud"></ss-shape>
</button>
\`\`\`

The gallery supports keyboard navigation, visible focus, named filters, modal focus containment, Escape to close, arrow-key code tabs, and announced copy/download results.`],
    configuration: ['Framework Integration', `# Framework Integration

SenangStart Shapes uses native custom elements. Register the library once in your browser entry point. The collection-only entry point is safe for server rendering.

## Vue

Configure Vue to recognize the custom element:

\`\`\`js
// vite.config.js, using @vitejs/plugin-vue
vue({ template: { compilerOptions: {
  isCustomElement: tag => tag === 'ss-shape'
} } })
\`\`\`

\`\`\`vue
<script setup>
import '@bookklik/senangstart-shapes';
</script>
<template>
  <ss-shape shape="soft-nova" variant="duotone"
    style="font-size: 64px"></ss-shape>
</template>
\`\`\`

## React

\`\`\`jsx
import '@bookklik/senangstart-shapes';

export default function Shape() {
  return <ss-shape shape="soft-nova" variant="duotone"
    style={{ fontSize: '64px' }}></ss-shape>;
}
\`\`\`

For TypeScript JSX, declare \`ss-shape\` in your framework’s intrinsic element types, with string attributes \`shape\`, \`variant\`, and \`thickness\`.

## Angular

\`\`\`ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@bookklik/senangstart-shapes';

@Component({
  selector: 'app-shape',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<ss-shape shape="soft-nova" variant="duotone"></ss-shape>'
})
export class ShapeComponent {}
\`\`\`

## SSR applications

Import the component bundle on the client, for example inside Vue’s \`onMounted\` or React’s \`useEffect\`. Import \`@bookklik/senangstart-shapes/shapes\` on the server when you only need SVG strings or catalog data. Registration is guarded against duplicate calls; collection imports do not register elements.`],
  },
  ms: {
    'getting-started': ['Bermula', `# Bermula

SenangStart Shapes menyediakan **496 aset SVG**, merangkumi **302 bentuk** dalam **14 kategori**. Gunakan komponen web asli, topeng CSS, atau rentetan SVG dalam pemapar anda sendiri. Tiada rangka kerja atau kebergantungan masa jalan diperlukan.

## Pemasangan

\`\`\`bash
npm install @bookklik/senangstart-shapes
\`\`\`

\`\`\`js
import '@bookklik/senangstart-shapes';
\`\`\`

## Tambah bentuk

\`\`\`html
<ss-shape shape="soft-nova" variant="duotone"
  style="font-size: 80px"></ss-shape>
\`\`\`

<ss-shape shape="soft-nova" variant="duotone" style="font-size:80px"></ss-shape>

Gunakan tag pembuka dan penutup berpasangan dalam HTML. Elemen tersuai bukan elemen kosong HTML.

Saiz lalai ialah \`1em\`. Ubah \`font-size\`, atau tetapkan \`width\` dan \`height\` secara terus. Layari [pustaka bentuk](../shapes/) untuk nama, varian dan contoh yang boleh disalin.

## Gunakan CDN

\`\`\`html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="ten-lobe-rosette"></ss-shape>
\`\`\`

Contoh CDN mengandaikan versi 0.1.1 telah diterbitkan. Untuk pembangunan tempatan, gunakan \`dist/senangstart-shape.min.js\` selepas menjalankan \`npm run build\`.

Baca panduan [pemasangan](./installation), [penggunaan](./usage) dan [penggayaan](./styling).`],
    installation: ['Pemasangan', `# Pemasangan

## npm dan pembundel

\`\`\`bash
npm install @bookklik/senangstart-shapes
\`\`\`

\`\`\`js
// Mendaftarkan <ss-shape> dan mempertingkat tag <i class="ss-shape ...">.
import '@bookklik/senangstart-shapes';

// Pilihan untuk penggunaan CSS sahaja.
import '@bookklik/senangstart-shapes/style.css';
\`\`\`

## Skrip pelayar

\`\`\`html
<script src="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart-shape.min.js"></script>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
\`\`\`

Objek global menyediakan \`SenangStartShapes.shapes\` dan \`SenangStartShapes.catalog\`. Skrip berfungsi dalam kepala dokumen, dengan \`defer\`, atau selepas dokumen dimuatkan.

## Koleksi SVG sahaja

\`\`\`js
import shapes, { catalog } from '@bookklik/senangstart-shapes/shapes';
const svg = shapes['soft-nova-duotone'];
console.log(catalog.assetCount); // 496
\`\`\`

\`\`\`js
const { shapes, catalog } = require('@bookklik/senangstart-shapes/shapes');
const svg = shapes['circle-solid'];
\`\`\`

Import koleksi tidak mengubah DOM dan boleh digunakan dalam Node.js. Metadata juga tersedia melalui \`@bookklik/senangstart-shapes/catalog.json\`. Fail SVG ternormal tersedia melalui \`@bookklik/senangstart-shapes/svg/<asset-id>.svg\`.

## Pembangunan tempatan

Memerlukan Node.js 20 atau lebih baharu.

\`\`\`bash
npm ci
npm run build
npm run preview
\`\`\`

Buka URL localhost yang dipaparkan untuk galeri. Gunakan \`npm run docs:dev\` untuk dokumentasi. \`npm run dev\` memantau kod pustaka; jalankan semula \`build:svg\` selepas mengubah SVG sumber. Arahan binaan dan dokumentasi tidak menjalankan ujian unit.`],
    usage: ['Penggunaan & Varian', `# Penggunaan & Varian

## Komponen web

\`\`\`html
<ss-shape shape="soft-nova" variant="solid"></ss-shape>
<ss-shape shape="soft-nova" variant="outline" thickness="2.5"></ss-shape>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
<ss-shape shape="isometric-tall-prism" variant="tonal"></ss-shape>
<ss-shape shape="circle" variant="solid"></ss-shape>
\`\`\`

| Atribut | Tingkah laku |
| --- | --- |
| \`shape\` | Slug folder bentuk yang tepat dalam katalog. |
| \`variant\` | Varian tersedia: solid, outline, duotone, atau tonal. |
| \`thickness\` | Lebar strok positif terhingga dalam unit SVG sumber. |
| \`aria-label\` | Nama boleh akses untuk bentuk yang bermakna. |

Tanpa \`variant\`, gaya pertama yang tersedia dipilih mengikut turutan solid, outline, duotone, tonal. Sesetengah bentuk mempunyai satu gaya sahaja. Varian yang tidak tersedia, varian kosong atau bentuk yang tidak dikenali dipaparkan kosong. Perubahan atribut mengemas kini lukisan serta-merta.

Ketebalan tidak sah atau tidak ditetapkan mengekalkan strok sumber. Ketebalan tidak mengubah geometri berisi. Kebanyakan viewBox sumber berukuran 100 unit; nilai strok bukan saiz piksel.

## Bentuk CSS sahaja

Sertakan \`@bookklik/senangstart-shapes/style.css\` atau helaian gaya pelayar:

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/@bookklik/senangstart-shapes@0.1.1/dist/senangstart.min.css">
<i class="ss-shape ss-shape-soft-nova"
   data-variant="duotone"
   style="color: #2563eb; font-size: 64px"
   aria-hidden="true"></i>
\`\`\`

Topeng CSS menggunakan satu warna teks, termasuk aset duotona. Kelegapan tona dikekalkan. Bundel pelayar menukar tag ini kepada SVG sebaris dengan kedua-dua warna. Gunakan \`data-thickness\` untuk mengubah strok tag yang dipertingkat. Gunakan satu kelas \`ss-shape-<slug>\` bagi setiap elemen. Perubahan kelas, varian, ketebalan dan elemen baharu dipantau.

Pemilih dan pemuat bentuk berasingan daripada SenangStart Icons, jadi kedua-dua pustaka boleh digunakan bersama.

## Rentetan SVG

Kunci koleksi ialah nama fail tanpa sambungan, contohnya \`soft-nova-duotone\` dan \`circle-solid\`. Setiap rekod \`catalog.shapes\` mengandungi \`slug\`, \`name\`, \`category\`, \`variants\`, \`defaultVariant\` dan peta \`assets\` daripada varian kepada ID aset.

SVG ternormal mengekalkan klip dan viewBox asal. Untuk memasukkan rentetan SVG berulang secara terus, gunakan ruang nama ID dan rujukan bagi setiap salinan. Komponen web dan pemuat melakukannya secara automatik. SVG sebagai imej mempunyai dokumen tersendiri.`],
    styling: ['Penggayaan', `# Penggayaan

## Saiz dan warna warisan

\`\`\`css
ss-shape { font-size: 64px; color: #2563eb; }
.banner-shape { width: 120px; height: 120px; }
\`\`\`

Saiz bentuk tidak bergantung pada viewBox asal. ViewBox bukan segi empat sama mengekalkan nisbahnya. Gaya monokrom dan lapisan tona mewarisi \`currentColor\`.

## Palet duotona

Warna lalai ialah biru SenangStart \`#2563EB\` dan biru muda \`#DBEAFE\`. Ubah pemboleh ubah pada bentuk atau elemen induk:

\`\`\`css
.my-design {
  --ss-shape-primary: #2563eb;
  --ss-shape-secondary: #dbeafe;
}
\`\`\`

\`\`\`html
<div class="my-design">
  <ss-shape shape="soft-nova" variant="duotone"></ss-shape>
</div>
\`\`\`

Gunakan \`--ss-shape-primary: currentColor\` untuk mewarisi warna teks. SVG sumber duotona menggunakan biru SenangStart (\`#2563EB\`) dan biru muda (\`#DBEAFE\`); aset terjana mendedahkan warna ini melalui pemboleh ubah tema di atas.

Pemboleh ubah CSS berfungsi pada SVG sebaris. SVG luaran melalui \`<img>\` tidak mewarisi pemboleh ubah halaman; gunakan SVG muat turun dengan warna tetap. Muat turun galeri menerapkan warna yang dipilih ke dalam SVG.

## Mod gelap

\`\`\`css
.dark .my-design {
  color: #dbeafe;
  --ss-shape-primary: #82aeff;
  --ss-shape-secondary: #24354f;
}
\`\`\`

Pustaka tidak menetapkan fon aplikasi, warna halaman atau animasi. Gunakan CSS biasa untuk gerakan dan hormati \`prefers-reduced-motion\`.`],
    accessibility: ['Kebolehcapaian', `# Kebolehcapaian

## Bentuk hiasan

Komponen JavaScript dan tag dipertingkat ialah hiasan secara lalai, dengan \`aria-hidden="true"\`. SVG dalaman disembunyikan daripada teknologi bantuan dan tidak menerima fokus.

\`\`\`html
<ss-shape shape="soft-nova"></ss-shape>
\`\`\`

Untuk elemen CSS sahaja, tambah \`aria-hidden="true"\` secara jelas.

## Bentuk bermakna

Berikan nama yang menerangkan makna bentuk. Komponen menambah \`role="img"\` dan membuang keadaan tersembunyi lalai apabila \`aria-label\` tidak kosong.

\`\`\`html
<ss-shape shape="cloud" aria-label="Cuaca mendung"></ss-shape>
<i class="ss-shape ss-shape-cloud"
   role="img" aria-label="Cuaca mendung"></i>
\`\`\`

Atribut \`role\` dan \`aria-hidden\` yang ditetapkan oleh pengguna diutamakan. Buang \`aria-hidden="true"\` yang ditetapkan secara jelas apabila menukar hiasan kepada kandungan bermakna.

## Butang dan pautan

Namakan kawalan dan kekalkan bentuk sebagai hiasan. Jangan bergantung pada warna atau bentuk sahaja untuk menyampaikan status.

\`\`\`html
<button type="button" aria-label="Ramalan cuaca">
  <ss-shape shape="cloud"></ss-shape>
</button>
\`\`\`

Galeri menyokong navigasi papan kekunci, fokus yang jelas, penapis berlabel, fokus modal, Escape untuk menutup, tab kod dengan kekunci anak panah serta pengumuman salinan dan muat turun.`],
    configuration: ['Integrasi Rangka Kerja', `# Integrasi Rangka Kerja

SenangStart Shapes menggunakan elemen tersuai asli. Daftarkan pustaka sekali pada titik masuk pelayar. Import koleksi sahaja selamat untuk pemaparan pelayan.

## Vue

Konfigurasikan Vue untuk mengenali elemen tersuai:

\`\`\`js
// vite.config.js, menggunakan @vitejs/plugin-vue
vue({ template: { compilerOptions: {
  isCustomElement: tag => tag === 'ss-shape'
} } })
\`\`\`

\`\`\`vue
<script setup>
import '@bookklik/senangstart-shapes';
</script>
<template>
  <ss-shape shape="soft-nova" variant="duotone"
    style="font-size: 64px"></ss-shape>
</template>
\`\`\`

## React

\`\`\`jsx
import '@bookklik/senangstart-shapes';

export default function Shape() {
  return <ss-shape shape="soft-nova" variant="duotone"
    style={{ fontSize: '64px' }}></ss-shape>;
}
\`\`\`

Untuk JSX TypeScript, isytiharkan \`ss-shape\` dalam jenis elemen intrinsik rangka kerja anda dengan atribut rentetan \`shape\`, \`variant\` dan \`thickness\`.

## Angular

\`\`\`ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@bookklik/senangstart-shapes';

@Component({
  selector: 'app-shape',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: '<ss-shape shape="soft-nova" variant="duotone"></ss-shape>'
})
export class ShapeComponent {}
\`\`\`

## Aplikasi SSR

Import bundel komponen pada klien, contohnya dalam \`onMounted\` Vue atau \`useEffect\` React. Import \`@bookklik/senangstart-shapes/shapes\` pada pelayan untuk rentetan SVG atau metadata. Pendaftaran dilindungi daripada panggilan berulang; import koleksi tidak mendaftarkan elemen.`],
  },
};
module.exports = { guides };
