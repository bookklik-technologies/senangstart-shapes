<script setup>
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import { patterns, catalog } from '../../../dist/patterns.mjs';
import GalleryDropdown from './GalleryDropdown.vue';

const props = defineProps({ locale: { type: String, default: 'en' } });
const category = ref('all');
const palette = ref('curated');
const scale = ref(100);
const status = ref('');
const manualCopy = ref('');
const palettes = {
  ink: { primary: '#262626', secondary: '#929292', background: '#F5F3ED' },
  clay: { primary: '#AD4C35', secondary: '#D6A078', background: '#FBEEE2' },
  ocean: { primary: '#205675', secondary: '#7EACB5', background: '#EDF5F4' },
};
const text = computed(() => props.locale === 'ms' ? {
  category: 'Kategori', all: 'Semua corak', geometric: 'Geometri', botanical: 'Botani', expressive: 'Ekspresif',
  palette: 'Palet', curated: 'Pilihan asal', ink: 'Dakwat', clay: 'Tanah liat', ocean: 'Lautan',
  scale: 'Skala ulangan', copy: 'Salin CSS', download: 'Muat turun SVG', source: 'Bentuk asal',
  copied: 'CSS disalin untuk', failed: 'Papan klip tidak tersedia. Salin CSS di bawah secara manual.',
  count: 'corak', downloaded: 'Jubin SVG dimuat turun untuk', manual: 'CSS untuk disalin',
} : {
  category: 'Category', all: 'All patterns', geometric: 'Geometric', botanical: 'Botanical', expressive: 'Expressive',
  palette: 'Palette', curated: 'Original palettes', ink: 'Ink', clay: 'Clay', ocean: 'Ocean',
  scale: 'Repeat scale', copy: 'Copy CSS', download: 'Download SVG', source: 'Source shapes',
  copied: 'CSS copied for', failed: 'Clipboard unavailable. Copy the CSS below manually.',
  count: 'patterns', downloaded: 'SVG tile downloaded for', manual: 'CSS to copy',
});
const visible = computed(() => catalog.filter(pattern => category.value === 'all' || pattern.category === category.value));
const categoryOptions = computed(() => ['all', 'geometric', 'botanical', 'expressive'].map(value => ({ value, label: text.value[value] })));
const paletteOptions = computed(() => ['curated', 'ink', 'clay', 'ocean'].map(value => ({ value, label: text.value[value] })));
const name = pattern => props.locale === 'ms' ? pattern.nameMs : pattern.name;
const shapeName = slug => slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

function svgFor(pattern) {
  if (palette.value === 'curated') return patterns[pattern.slug];
  const colors = palettes[palette.value];
  return patterns[pattern.slug].replace(/#[0-9a-f]{6}/gi, color => {
    const tone = Object.keys(pattern.colors).find(key => pattern.colors[key].toLowerCase() === color.toLowerCase());
    return tone ? colors[tone] : color;
  });
}

function styleFor(pattern) {
  const uri = encodeURIComponent(svgFor(pattern)).replace(/'/g, '%27');
  return {
    backgroundImage: `url("data:image/svg+xml,${uri}")`,
    backgroundRepeat: 'repeat',
    backgroundSize: `${pattern.width * scale.value / 100}px ${pattern.height * scale.value / 100}px`,
  };
}

async function copyCss(pattern) {
  const style = styleFor(pattern);
  const css = `.ss-pattern-${pattern.slug} {\n  background-image: ${style.backgroundImage};\n  background-repeat: repeat;\n  background-size: ${style.backgroundSize};\n}`;
  manualCopy.value = '';
  status.value = '';
  try {
    await navigator.clipboard.writeText(css);
    status.value = `${text.value.copied} ${name(pattern)}.`;
  } catch {
    manualCopy.value = css;
    status.value = text.value.failed;
  }
}

function downloadSvg(pattern) {
  const svg = svgFor(pattern).replace(/^<svg\b[^>]*>/, tag => tag
    .replace(/width="[^"]+"/, `width="${pattern.width * scale.value / 100}"`)
    .replace(/height="[^"]+"/, `height="${pattern.height * scale.value / 100}"`));
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${pattern.slug}.svg`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.value = `${text.value.downloaded} ${name(pattern)}.`;
}
</script>

<template>
  <section class="ss-pattern-gallery ss-gallery" :aria-label="locale === 'ms' ? 'Koleksi corak' : 'Pattern collection'">
    <div class="ss-pattern-controls">
      <div class="ss-pattern-field">
        <span>{{ text.category }}</span>
        <GalleryDropdown :id="`ss-pattern-${locale}-category`" v-model="category" :label="text.category" :options="categoryOptions" />
      </div>
      <div class="ss-pattern-field">
        <span>{{ text.palette }}</span>
        <GalleryDropdown :id="`ss-pattern-${locale}-palette`" v-model="palette" :label="text.palette" :options="paletteOptions" />
      </div>
      <label>{{ text.scale }} <span>{{ scale }}%</span>
        <input v-model.number="scale" type="range" min="50" max="150" step="10" :aria-valuetext="`${scale}%`">
      </label>
    </div>
    <div class="ss-pattern-feedback">
      <span>{{ visible.length }} {{ text.count }}</span>
      <p role="status" aria-live="polite" aria-atomic="true">{{ status }}</p>
    </div>
    <label v-if="manualCopy" class="ss-pattern-manual">{{ text.manual }}
      <textarea :value="manualCopy" readonly rows="5" @focus="$event.target.select()"></textarea>
    </label>
    <div class="ss-pattern-grid">
      <article v-for="pattern in visible" :key="pattern.slug" class="ss-pattern-item">
        <div class="ss-pattern-preview" :style="styleFor(pattern)" role="img" :aria-label="name(pattern)"></div>
        <div class="ss-pattern-heading">
          <h2>{{ name(pattern) }}</h2>
          <span>{{ text[pattern.category] }}</span>
        </div>
        <p class="ss-pattern-description">{{ locale === 'ms' ? pattern.descriptionMs : pattern.description }}</p>
        <p class="ss-pattern-sources">{{ text.source }}:
          <template v-for="(shape, index) in pattern.shapes" :key="shape">
            <span v-if="index">, </span><a :href="withBase(`${locale === 'ms' ? '/ms' : ''}/shapes/${shape}`)">{{ shapeName(shape) }}</a>
          </template>
        </p>
        <div class="ss-pattern-actions">
          <button type="button" :aria-label="`${text.copy}: ${name(pattern)}`" @click="copyCss(pattern)">{{ text.copy }}</button>
          <button type="button" :aria-label="`${text.download}: ${name(pattern)}`" @click="downloadSvg(pattern)">{{ text.download }}</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.ss-pattern-gallery { margin-top: 32px; }
.ss-pattern-controls { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.2fr); gap: 24px; padding-block: 20px; border-block: 1px solid var(--vp-c-divider); }
.ss-pattern-controls > :is(.ss-pattern-field, label) { display: grid; min-width: 0; gap: 8px; font-size: 14px; font-weight: 500; }
.ss-pattern-controls label:last-child { grid-template-columns: 1fr auto; }
.ss-pattern-controls input { grid-column: 1 / -1; width: 100%; min-height: 32px; accent-color: var(--vp-c-brand-1); }
.ss-pattern-feedback { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 24px; padding-block: 16px; font-size: 14px; color: var(--vp-c-text-2); }
.ss-pattern-feedback p { margin: 0; }
.ss-pattern-manual { display: grid; gap: 8px; margin-bottom: 24px; }
.ss-pattern-manual textarea { width: 100%; padding: 12px; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font: 13px var(--vp-font-family-mono); resize: vertical; }
.ss-pattern-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 28px; }
.ss-pattern-item { min-width: 0; display: flex; flex-direction: column; }
.ss-pattern-preview { height: 260px; border-radius: 12px; }
.ss-pattern-heading { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; margin-top: 16px; }
.ss-pattern-heading h2 { margin: 0; padding: 0; border: 0; font-size: 23px; line-height: 1.3; letter-spacing: -.02em; }
.ss-pattern-heading span { color: var(--vp-c-text-2); font-size: 13px; }
.ss-pattern-description { margin: 10px 0 8px; color: var(--vp-c-text-2); line-height: 1.6; }
.ss-pattern-sources { margin: 0 0 18px; font-size: 13px; color: var(--vp-c-text-2); }
.ss-pattern-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
.ss-pattern-actions button { padding: 9px 14px; min-height: 44px; border: 1px solid var(--vp-c-divider); border-radius: 6px; font: inherit; font-size: 14px; font-weight: 500; background: var(--vp-c-bg); color: var(--vp-c-text-1); cursor: pointer; }
.ss-pattern-actions button:first-child { background: var(--vp-c-brand-1); color: var(--vp-c-white); border-color: transparent; }
.ss-pattern-actions button:hover { background: var(--vp-c-bg-soft); }
.ss-pattern-actions button:first-child:hover { background: var(--vp-c-brand-2); }
.ss-pattern-gallery :is(button, input, textarea, a):focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
@media (max-width: 640px) {
  .ss-pattern-controls { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .ss-pattern-controls label:last-child { grid-column: 1 / -1; }
  .ss-pattern-grid { grid-template-columns: 1fr; }
  .ss-pattern-preview { height: 240px; }
}
</style>
