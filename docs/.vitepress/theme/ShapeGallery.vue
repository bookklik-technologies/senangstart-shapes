<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { withBase } from 'vitepress';
const props = defineProps({ locale: { type: String, default: 'en' } });
const container = ref(null);
let dispose;
let disposed = false;
onMounted(async () => {
  const { mountGallery } = await import('../../../gallery/gallery.js');
  if (disposed) return;
  dispose = mountGallery(container.value, { locale: props.locale, detailBase: withBase(`${props.locale === 'ms' ? '/ms' : ''}/shapes/`) });
});
onBeforeUnmount(() => { disposed = true; dispose?.(); });
</script>
<template><div ref="container" class="ss-gallery"><p role="status">{{ locale === 'ms' ? 'Memuatkan bentuk…' : 'Loading shapes…' }}</p></div></template>
