<script setup lang="ts">
import { PropType, computed } from "vue";
import {
  ICONS_PATH,
  ICON_NAMES,
  ICON_SIZES,
  ICON_SIZE_CLASSES,
} from "./constants";
import { contains } from "../../utils/contains";

const props = defineProps({
  name: {
    type: String as PropType<ICON_NAMES>,
    required: true,
    validator: (value) => contains(ICON_NAMES, value),
  },
  size: {
    type: Number as PropType<ICON_SIZES>,
    required: false,
    default: 16,
    validator: (value) => contains(ICON_SIZES, value),
  },
  ariaLabel: { type: String, required: false, default: undefined },
});

const href = computed(() => `${ICONS_PATH}#${props.name}`);
const sizeClass = computed(() => ICON_SIZE_CLASSES[props.size]);
const ariaHidden = computed<true | undefined>(() =>
  !props.ariaLabel ? true : undefined,
);
</script>

<template>
  <svg
    role="img"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    :class="sizeClass"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <use :href="href" />
  </svg>
</template>
