<script setup lang="ts">
import { computed, toRefs, PropType } from "vue";
import { useButtonGroup } from "./use_button_group";
import { BUTTON_GROUP_ORIENTATION, DEFAULT_BUTTON_GROUP_ORIENTATION } from "./constants";
import { contains } from "../../utils/contains";
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from "../button";
import { buildButtonGroupClasses } from "./utils/build_button_group_classes";

const props = defineProps({
  is: { type: String, required: false, default: "div" },
  orientation: {
    type: String as PropType<BUTTON_GROUP_ORIENTATION>,
    required: false,
    default: DEFAULT_BUTTON_GROUP_ORIENTATION,
    validator: (value) => contains(BUTTON_GROUP_ORIENTATION, value),
  },
  color: {
    type: String as PropType<BUTTON_COLORS>,
    required: false,
    default: DEFAULT_BUTTON_COLOR,
    validator: (value) => contains(BUTTON_COLORS, value),
  },
  size: {
    type: String as PropType<BUTTON_SIZES>,
    required: false,
    default: DEFAULT_BUTTON_SIZE,
    validator: (value) => contains(BUTTON_SIZES, value),
  },
  variant: {
    type: String as PropType<BUTTON_VARIANTS>,
    required: false,
    default: DEFAULT_BUTTON_VARIANT,
    validator: (value) => contains(BUTTON_VARIANTS, value),
  },
});

useButtonGroup({ ...toRefs(props) });

const classes = computed(() => buildButtonGroupClasses({ orientation: props.orientation }));
</script>

<template>
  <component role="group" :is="is" :class="classes"><slot></slot></component>
</template>
