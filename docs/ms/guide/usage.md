---
title: Penggunaan & Varian
---

# Penggunaan & Varian

## Komponen web

```html
<ss-shape shape="soft-nova" variant="solid"></ss-shape>
<ss-shape shape="soft-nova" variant="outline" thickness="2.5"></ss-shape>
<ss-shape shape="soft-nova" variant="duotone"></ss-shape>
<ss-shape shape="isometric-tall-prism" variant="tonal"></ss-shape>
<ss-shape shape="circle" variant="solid"></ss-shape>
```

| Atribut | Tingkah laku |
| --- | --- |
| `shape` | Slug folder bentuk yang tepat dalam katalog. |
| `variant` | Varian tersedia: solid, outline, duotone, atau tonal. |
| `thickness` | Lebar strok positif terhingga dalam unit SVG sumber. |
| `aria-label` | Nama boleh akses untuk bentuk yang bermakna. |

Tanpa `variant`, gaya pertama yang tersedia dipilih mengikut turutan solid, outline, duotone, tonal. Sesetengah bentuk mempunyai satu gaya sahaja. Varian yang tidak tersedia, varian kosong atau bentuk yang tidak dikenali dipaparkan kosong. Perubahan atribut mengemas kini lukisan serta-merta.

Ketebalan tidak sah atau tidak ditetapkan mengekalkan strok sumber. Ketebalan tidak mengubah geometri berisi. Kebanyakan viewBox sumber berukuran 100 unit; nilai strok bukan saiz piksel.

## Bentuk CSS sahaja

Sertakan `@bookklik/senangstart-shapes/style.css` atau helaian gaya pelayar:

```html
<link rel="stylesheet" href="https://unpkg.com/@bookklik/senangstart-shapes@0.1.2/dist/senangstart.min.css">
<i class="ss-shape ss-shape-soft-nova"
   data-variant="duotone"
   style="color: #2563eb; font-size: 64px"
   aria-hidden="true"></i>
```

Topeng CSS menggunakan satu warna teks, termasuk aset duotona. Kelegapan tona dikekalkan. Bundel pelayar menukar tag ini kepada SVG sebaris dengan kedua-dua warna. Gunakan `data-thickness` untuk mengubah strok tag yang dipertingkat. Gunakan satu kelas `ss-shape-<slug>` bagi setiap elemen. Perubahan kelas, varian, ketebalan dan elemen baharu dipantau.

Pemilih dan pemuat bentuk berasingan daripada SenangStart Icons, jadi kedua-dua pustaka boleh digunakan bersama.

## Rentetan SVG

Kunci koleksi ialah nama fail tanpa sambungan, contohnya `soft-nova-duotone` dan `circle-solid`. Setiap rekod `catalog.shapes` mengandungi `slug`, `name`, `category`, `variants`, `defaultVariant` dan peta `assets` daripada varian kepada ID aset.

SVG ternormal mengekalkan klip dan viewBox asal. Untuk memasukkan rentetan SVG berulang secara terus, gunakan ruang nama ID dan rujukan bagi setiap salinan. Komponen web dan pemuat melakukannya secara automatik. SVG sebagai imej mempunyai dokumen tersendiri.
