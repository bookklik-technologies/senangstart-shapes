---
title: Kebolehcapaian
---

# Kebolehcapaian

## Bentuk hiasan

Komponen JavaScript dan tag dipertingkat ialah hiasan secara lalai, dengan `aria-hidden="true"`. SVG dalaman disembunyikan daripada teknologi bantuan dan tidak menerima fokus.

```html
<ss-shape shape="soft-nova"></ss-shape>
```

Untuk elemen CSS sahaja, tambah `aria-hidden="true"` secara jelas.

## Bentuk bermakna

Berikan nama yang menerangkan makna bentuk. Komponen menambah `role="img"` dan membuang keadaan tersembunyi lalai apabila `aria-label` tidak kosong.

```html
<ss-shape shape="cloud" aria-label="Cuaca mendung"></ss-shape>
<i class="ss-shape ss-shape-cloud"
   role="img" aria-label="Cuaca mendung"></i>
```

Atribut `role` dan `aria-hidden` yang ditetapkan oleh pengguna diutamakan. Buang `aria-hidden="true"` yang ditetapkan secara jelas apabila menukar hiasan kepada kandungan bermakna.

## Butang dan pautan

Namakan kawalan dan kekalkan bentuk sebagai hiasan. Jangan bergantung pada warna atau bentuk sahaja untuk menyampaikan status.

```html
<button type="button" aria-label="Ramalan cuaca">
  <ss-shape shape="cloud"></ss-shape>
</button>
```

Galeri menyokong navigasi papan kekunci, fokus yang jelas, penapis berlabel, fokus modal, Escape untuk menutup, tab kod dengan kekunci anak panah serta pengumuman salinan dan muat turun.
