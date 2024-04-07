<script setup lang="ts">
import { computed, provide, toRef, useSlots } from "vue";
import { useId } from "../../../utils/use_id";
import Typography from "../../typography";
import FormInput from "../form_input";
import { FORM_GROUP_SYMBOL, FormGroup } from "./constants";

const props = defineProps({
  optional: { type: Boolean, required: false, default: false },
  invalid: { type: Boolean, required: false, default: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  labelDescription: { type: String, required: false },
  optionalText: { type: String, required: false },
  invalidFeedback: { type: String, required: false },
});

const inputId = useId();
const descId = useId();

const hasValidationFeedback = computed<boolean>(() => props.invalid && !!props.invalidFeedback);

const slots = useSlots();

const isInput = computed<boolean>(() => {
  const vnodes = slots.default?.();

  if (vnodes?.length !== 1) {
    return false;
  }

  const child = vnodes[0];

  return child.type === FormInput;
});

const wrapperEl = computed<"div" | "fieldset">(() => (isInput.value ? "div" : "fieldset"));
const labelEl = computed<"label" | "legend">(() => (isInput.value ? "label" : "legend"));
const labelFor = computed<string | undefined>(() => (isInput.value ? inputId : undefined));

provide<FormGroup>(FORM_GROUP_SYMBOL, {
  inputId: labelFor,
  descId: computed(() => (props.description ? descId : undefined)),
  optional: toRef(props, "optional"),
  invalid: toRef(props, "invalid"),
});
</script>

<template>
  <component :is="wrapperEl" role="group" class="mb-4">
    <Typography v-if="label" :is="labelEl" :for="labelFor" variant="h6" class="pb-2" data-testid="label">
      {{ label }}
      <Typography v-if="optional && optionalText" is="span" variant="body" class="inline-block" data-testid="optional">
        {{ optionalText }}
      </Typography>
      <Typography v-if="labelDescription" is="span" variant="body" class="pt-2" data-testid="label-desc">
        {{ labelDescription }}
      </Typography>
    </Typography>
    <slot></slot>
    <Typography v-if="hasValidationFeedback" is="span" variant="body" class="pt-2" color="danger" data-testid="invalid">
      {{ invalidFeedback }}
    </Typography>
    <Typography
      v-if="description"
      :id="descId"
      is="small"
      variant="body"
      :class="{
        'pt-1': hasValidationFeedback,
        'pt-2': !hasValidationFeedback,
      }"
      color="tertiary"
      data-testid="desc"
    >
      {{ description }}
    </Typography>
  </component>
</template>
