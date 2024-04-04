<script setup lang="ts">
import { PropType, computed } from "vue";
import {
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_COLORS,
  DEFAULT_TYPOGRAPHY_COLOR,
  DEFAULT_TYPOGRAPHY_VARIANT,
  DEFAULT_TYPOGRAPHY_TRUNCATE,
  DEFAULT_TYPOGRAPHY_ELEMENT,
} from "./constants";
import { buildTypographyClasses } from "./utils/build_typography_classes";
import { contains } from "../../utils/contains";

const props = defineProps({
  is: { type: String, required: false, default: DEFAULT_TYPOGRAPHY_ELEMENT },
  color: {
    type: String as PropType<TYPOGRAPHY_COLORS>,
    required: false,
    default: DEFAULT_TYPOGRAPHY_COLOR,
    validator: (value) => contains(TYPOGRAPHY_COLORS, value),
  },
  variant: {
    type: String as PropType<TYPOGRAPHY_VARIANTS>,
    required: false,
    default: DEFAULT_TYPOGRAPHY_VARIANT,
    validator: (value) => contains(TYPOGRAPHY_VARIANTS, value),
  },
  truncate: { type: Boolean, required: false, default: DEFAULT_TYPOGRAPHY_TRUNCATE },
});

const classes = computed(() =>
  buildTypographyClasses({
    color: props.color,
    variant: props.variant,
    truncate: props.truncate,
  }),
);
</script>

<template>
  <component :is="is" :class="classes">
    <slot></slot>
  </component>
</template>
