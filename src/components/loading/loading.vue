<script setup lang="ts">
import { PropType, computed } from "vue";
import { contains } from "../../utils/contains";
import { DEFAULT_LOADING_LABEL, LOADING_SIZES, LOADING_SIZES_CLASSES } from "./constants";

const props = defineProps({
  size: {
    type: String as PropType<LOADING_SIZES>,
    required: false,
    default: "xs",
    validator: (value) => contains(LOADING_SIZES, value),
  },
  ariaLabel: {
    type: String,
    required: false,
    default: DEFAULT_LOADING_LABEL,
  },
});

const sizeClass = computed(() => LOADING_SIZES_CLASSES[props.size]);
</script>

<template>
  <span
    role="status"
    class="relative inline-flex animation-spin rounded-full border-gray-300 border-t-gray-600"
    :class="sizeClass"
    :aria-label="ariaLabel"
  />
</template>
