---
title: Penggayaan
---

# Penggayaan

## Saiz dan warna warisan

```css
ss-shape { font-size: 64px; color: #2563eb; }
.banner-shape { width: 120px; height: 120px; }
```

Saiz bentuk tidak bergantung pada viewBox asal. ViewBox bukan segi empat sama mengekalkan nisbahnya. Gaya monokrom dan lapisan tona mewarisi `currentColor`.

## Palet duotona

Warna lalai ialah biru SenangStart `#2563EB` dan biru muda `#DBEAFE`. Ubah pemboleh ubah pada bentuk atau elemen induk:

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

Gunakan `--ss-shape-primary: currentColor` untuk mewarisi warna teks. SVG sumber duotona menggunakan biru SenangStart (`#2563EB`) dan biru muda (`#DBEAFE`); aset terjana mendedahkan warna ini melalui pemboleh ubah tema di atas.

Pemboleh ubah CSS berfungsi pada SVG sebaris. SVG luaran melalui `<img>` tidak mewarisi pemboleh ubah halaman; gunakan SVG muat turun dengan warna tetap. Muat turun galeri menerapkan warna yang dipilih ke dalam SVG.

## Mod gelap

```css
.dark .my-design {
  color: #dbeafe;
  --ss-shape-primary: #82aeff;
  --ss-shape-secondary: #24354f;
}
```

Pustaka tidak menetapkan fon aplikasi, warna halaman atau animasi. Gunakan CSS biasa untuk gerakan dan hormati `prefers-reduced-motion`.
