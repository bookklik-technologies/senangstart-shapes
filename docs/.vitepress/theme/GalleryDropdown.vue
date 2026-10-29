<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createDropdown } from '../../../gallery/dropdown.mjs';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  options: { type: Array, required: true },
  modelValue: { type: String, required: true },
});
const emit = defineEmits(['update:modelValue']);
const container = ref(null);
const selectedLabel = computed(() => props.options.find(option => option.value === props.modelValue)?.label || props.label);
let dropdown;

function mountDropdown() {
  if (!container.value) return;
  dropdown?.destroy();
  dropdown = createDropdown(container.value, {
    id: props.id,
    label: props.label,
    options: props.options,
    value: props.modelValue,
    onChange: value => emit('update:modelValue', value),
  });
}

onMounted(mountDropdown);
watch([() => props.id, () => props.label, () => props.options], mountDropdown);
watch(() => props.modelValue, value => dropdown?.setValue(value));
onBeforeUnmount(() => dropdown?.destroy());
</script>

<template>
  <div ref="container" class="ss-dropdown">
    <button v-once type="button" class="ss-dropdown-trigger" :aria-label="label" disabled>
      <span class="ss-dropdown-value">{{ selectedLabel }}</span>
    </button>
  </div>
</template>
