<script setup lang="ts">
import { PropType, computed, inject, useSlots } from "vue";
import { DEFAULT_FORM_INPUT_SIZE, DEFAULT_FORM_INPUT_TYPE, FORM_INPUT_SIZES, FORM_INPUT_TYPES } from "./constants";
import { contains } from "../../../utils/contains";
import { buildFormInputClasses } from "./utils/build_form_input_classes";
import { FORM_GROUP_SYMBOL, FormGroup } from "../form_group/constants";
import Icon, { ICON_NAMES } from "../../icon";
import Button from "../../button";
import { isEmpty } from "../../../utils/is_empty";
import { buildFormInputWrapperClasses } from "./utils/build_form_input_wrapper_classes";

const value = defineModel<string>({ default: "" });

const props = defineProps({
  placeholder: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  readonly: { type: Boolean, required: false, default: false },
  invalid: { type: Boolean, required: false, default: false },
  optional: { type: Boolean, required: false, default: false },
  clearable: { type: Boolean, required: false, default: false },
  size: {
    type: String as PropType<FORM_INPUT_SIZES>,
    required: false,
    default: DEFAULT_FORM_INPUT_SIZE,
    validator: (value) => contains(FORM_INPUT_SIZES, value),
  },
  type: {
    type: String as PropType<FORM_INPUT_TYPES>,
    required: false,
    default: DEFAULT_FORM_INPUT_TYPE,
    validator: (value) => contains(FORM_INPUT_TYPES, value),
  },
  icon: {
    type: String as PropType<ICON_NAMES>,
    required: false,
    validator: (value) => contains(ICON_NAMES, value),
  },
});

const slots = useSlots();

const hasAddon = computed<boolean>(() => !!slots.addon && !isEmpty(slots.addon()));

const classes = computed(() =>
  buildFormInputClasses({ size: props.size, hasIcon: !!props.icon, hasAddon: hasAddon.value }),
);

const wrapperClasses = computed(() => buildFormInputWrapperClasses({ size: props.size }));

const { inputId, descId, invalid: groupInvalid, optional: groupOptional } = inject<FormGroup>(FORM_GROUP_SYMBOL, {});

const optional = computed(() => groupOptional?.value ?? props.optional);
const invalid = computed(() => groupInvalid?.value ?? props.invalid);

const required = computed(() => !optional.value);

function clearValue() {
  value.value = "";
}
</script>

<template>
  <div :class="wrapperClasses">
    <Icon v-if="icon" :name="icon" class="absolute left-2.5 text-zinc-600" />
    <input
      v-model="value"
      :id="inputId"
      :type="type"
      :class="classes"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :aria-invalid="invalid ? true : undefined"
      :aria-description="descId"
    />
    <div
      v-if="clearable || hasAddon"
      class="absolute right-2.5 flex flex-row items-center gap-1"
      data-testid="addon-wrapper"
    >
      <Button
        v-if="clearable && value"
        leading-icon="x-circle"
        variant="text"
        size="sm"
        aria-label="clear"
        @click="clearValue"
        data-testid="clear-btn"
      />
      <slot name="addon"></slot>
    </div>
  </div>
</template>
