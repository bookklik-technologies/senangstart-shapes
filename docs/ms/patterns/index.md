---
layout: page
title: Koleksi Corak
description: Corak SVG berulang yang digubah daripada pustaka bentuk SenangStart.
---

<div class="ss-doc-library vp-doc">

# Koleksi Corak

Bentuk sedia ada, irama baharu. Terokai dua puluh corak berulang untuk latar, pembungkusan, dan projek jenama. Setiap gubahan memadankan palet pilihan dengan motif daripada pustaka bentuk.

Pilih kategori, cuba palet lain, atau laraskan skala ulangan. Salin CSS kendiri atau muat turun jubin SVG dengan tetapan semasa. Komponen bentuk dan JavaScript tidak diperlukan untuk menggunakan latar ini.

<PatternGallery locale="ms" />

## Gubahan berbeza, bukan sekadar bentuk berbeza

Koleksi ini merangkumi dua belas variasi tambahan di samping lapan reka bentuk asal:

- **Struktur hiasan:** Kipas Art Deco memadankan kipas bertentangan dengan garisan melengkung; Kekisi Roset melapiskan bunga dan gelang dalam kekisi daun yang bersambung pada tepi jubin.
- **Gerakan botani:** Jejak Bunga Liar menyusun ranting dan bunga secara berselang; Loket Kelopak menyusun bunga, pasangan daun, dan kipas dalam jubin menegak yang tinggi.
- **Irama cakerawala:** Perarakan Bulan menggunakan jalur bulan dan bintang yang lebar; Atlas Cakerawala menyusun motif orbit besar berselang dengan satelit dan kilauan kecil.
- **Bebas dan mengalir:** Alunan Reben menyambungkan gelung merentasi tepi jubin, Pesta Terazo menaburkan potongan organik pelbagai saiz, dan Jalur Berliku membahagikan reben dan gelombang kepada jalur tidak sekata.
- **Geometri grafik:** Irama Pasang Surut menghadapkan kipas gelombang secara bertentangan, Perarakan Prisma melapiskan layang-layang padu dalam kristal garis luar, dan Anyaman Bertangga membentuk reben bertangga bersambung yang dipisahkan oleh jalur ruang kosong yang kemas.

Gubahan ini menggunakan nisbah jubin, skala motif, putaran, lapisan, dan jarak yang berbeza. Menukar palet mengekalkan gubahan; menukar skala ulangan mengubah saiz keseluruhan jubin tanpa meregangkannya.

## Gunakan corak

Import helaian gaya corak dan gunakan kelas corak pada mana-mana elemen:

```js
import '@bookklik/senangstart-shapes/patterns.css';
```

```html
<section class="ss-pattern-quarter-turn">
  <!-- Kandungan anda -->
</section>
```

```css
.ss-pattern-quarter-turn {
  min-height: 240px;
  --ss-pattern-size: 120px 120px;
}
```

Helaian gaya menggunakan palet asal. **Salin CSS** menghasilkan peraturan kendiri dengan palet dan skala pilihan tanpa memerlukan helaian gaya. Latar CSS ialah hiasan dan tidak menyediakan nama boleh akses. Letakkan teks pada permukaan warna rata apabila corak menjejaskan kebolehbacaan.

## Rentetan SVG dan metadata

```js
import patterns, { catalog } from '@bookklik/senangstart-shapes/patterns';

const tile = patterns['leaf-weave'];
const dataUrl = `data:image/svg+xml,${encodeURIComponent(tile)}`;
```

```js
const { patterns, catalog } = require('@bookklik/senangstart-shapes/patterns');
```

`patterns` memetakan slug corak kepada jubin SVG kendiri. `catalog` menyenaraikan nama dan penerangan bahasa Inggeris dan Melayu, kategori, dimensi jubin, warna, dan slug bentuk asal. Metadata juga tersedia melalui `@bookklik/senangstart-shapes/pattern-catalog.json`.

Jubin SVG disertakan dalam `dist/patterns/<slug>.svg`. Gunakannya sebagai latar berulang, bukan imej yang diregangkan selebar bekas. **Muat turun SVG** menyimpan satu jubin, bukan keseluruhan pratonton; skala pilihan mengubah dimensi intrinsik sambil mengekalkan viewBox yang sama.

## Tambah corak

Takrifkan gubahan dalam `src/patterns/collection.json`. Setiap motif merujuk slug bentuk sedia ada dan boleh menentukan `x`, `y`, `size`, `rotate`, `tone` (`primary` atau `secondary`), dan `variant` (lalai `solid`). Motif yang melintasi tepi jubin memerlukan salinan sepadan di tepi bertentangan, seperti Susunan Kerang. Jalankan `npm run build` untuk menjana semula jubin SVG, CSS, metadata, dan eksport JavaScript.

</div>
