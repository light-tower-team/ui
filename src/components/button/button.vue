<script setup lang="ts">
import {
  toRefs,
  PropType,
  computed,
  toValue,
  useSlots,
  watchEffect,
} from "vue";
import Tooltip from "../tooltip";
import Loading from "../loading";
import Icon from "../icon";
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
  BUTTON_WARNINGS,
} from "./constants";
import { useButton } from "./use_button";

import { contains } from "../../utils/contains";
import { ICON_NAMES } from "../icon/constants";
import { buildButtonClasses } from "./utils/build_button_classes";
import { isEmpty } from "../../utils/isEmpty";

const props = defineProps({
  is: { type: String, required: false, default: "button" },
  type: {
    type: String as PropType<BUTTON_TYPES>,
    required: false,
    validator: (value) => contains(BUTTON_TYPES, value),
  },
  color: {
    type: String as PropType<BUTTON_COLORS>,
    required: false,
    default: "neutral",
    validator: (value) => contains(BUTTON_COLORS, value),
  },
  size: {
    type: String as PropType<BUTTON_SIZES>,
    required: false,
    default: "md",
    validator: (value) => contains(BUTTON_SIZES, value),
  },
  variant: {
    type: String as PropType<BUTTON_VARIANTS>,
    required: false,
    default: "outlined",
    validator: (value) => contains(BUTTON_VARIANTS, value),
  },
  leadingIcon: { type: String as PropType<ICON_NAMES>, required: false },
  trailingIcon: { type: String as PropType<ICON_NAMES>, required: false },
  fullWidth: { type: Boolean, required: false, default: false },
  rounded: { type: Boolean, required: false, default: false },
  loading: { type: Boolean, required: false, default: false },
  visuallyDisabled: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
  href: { type: String, required: false },
  to: { type: String, required: false },
  ariaLabel: { type: String, required: false },
  tabIndex: { type: Number, required: false },
});

const emits = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent];
}>();

const slots = useSlots();

const hasContent = computed<boolean>(
  () => !!slots.default && !isEmpty(slots.default()),
);

const hasOnlyIcon = computed<boolean>(() => {
  const withoutContent = !hasContent.value;
  const withOnlyLeadingIcon = !!props.leadingIcon && !props.trailingIcon;
  const withOnlyTrailingIcon = !props.leadingIcon && !!props.trailingIcon;

  return withoutContent && (withOnlyLeadingIcon || withOnlyTrailingIcon);
});

const classes = computed(() =>
  buildButtonClasses({
    loading: toValue(props.loading),
    variant: toValue(props.variant),
    color: toValue(props.color),
    size: toValue(props.size),
    fullWidth: toValue(props.fullWidth),
    rounded: toValue(props.rounded),
    hasOnlyIcon: hasOnlyIcon.value,
  }),
);

const { is, buttonProps } = useButton({
  ...toRefs(props),
  onPressed: (event) => emits("click", event),
});

watchEffect(
  () => {
    if (hasOnlyIcon.value && !props.ariaLabel) {
      console.warn(BUTTON_WARNINGS.noLabel);
    }
  },
  // prevent display of the vue warning about a default slot
  { flush: "post" },
);
</script>

<template>
  <Tooltip :title="title" placement="top">
    <template #default="attrs">
      <component
        v-bind="{ ...$attrs, ...attrs, ...buttonProps }"
        :is="is"
        :class="classes"
      >
        <slot v-if="loading" name="loading">
          <Loading />
        </slot>
        <Icon v-if="leadingIcon" :name="leadingIcon" />
        <span class="text-ellipsis overflow-hidden whitespace-nowrap"
          ><slot></slot
        ></span>
        <Icon v-if="trailingIcon" :name="trailingIcon" />
      </component>
    </template>
  </Tooltip>
</template>
