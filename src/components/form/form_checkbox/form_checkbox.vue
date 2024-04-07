<script setup lang="ts">
import { computed, useSlots, watchEffect } from "vue";
import { useId } from "../../../utils/use_id";
import Typography from "../../typography";
import { isEmpty } from "../../../utils/is_empty";
import { FORM_CHECKBOX_WARNINGS } from "./constants";

const value = defineModel<boolean>({ default: false });
const indeterminate = defineModel<boolean>("indeterminate", { default: false });

defineProps({
  disabled: { type: Boolean, required: false, default: false },
  helpText: { type: String, required: false },
});

const id = useId();

const slots = useSlots();

const hasLabel = computed<boolean>(() => !!slots.default && !isEmpty(slots.default()));

watchEffect(() => {
  if (value.value && indeterminate.value) {
    indeterminate.value = false;
  }
});

watchEffect(
  () => {
    if (!hasLabel.value) {
      console.warn(FORM_CHECKBOX_WARNINGS.noLabel);
    }
  }, // prevent display of the vue warning about a default slot
  { flush: "post" },
);
</script>

<template>
  <div class="pl-4 relative z-[1] block min-h-6">
    <input
      v-model="value"
      type="checkbox"
      class="peer absolute left-0 -z-[1] w-4 h-5 opacity-0 p-0 enabled:cursor-pointer"
      :id="id"
      :disabled="disabled"
    />
    <Typography
      is="label"
      :for="id"
      :class="[
        // label
        'relative inline-block pl-2 mb-2 peer-enabled:cursor-pointer align-top select-none',
        // before
        'before:absolute before:w-4 before:h-4 before:pointer-events-none before:top-0 before:-left-4 before:transition before:border before:rounded before:border-zinc-400',
        // after
        'after:absolute after:w-4 after:h-4 after:pointer-events-none after:top-0 after:-left-4 after:transition after:mask-no-repeat after:mask-center after:bg-no-repeat after:bg-center',
        // ring
        'before:ring-offset-1 before:ring-offset-inherit before:ring-blue-600 peer-focus:before:ring-2',
        // checked
        {
          'peer-checked:before:bg-blue-600 peer-checked:before:border-blue-600 peer-checked:bg-white peer-checked:after:bg-check peer-checked:after:mask-image-check':
            !indeterminate,
        },
        {
          'after:bg-stroke after:mask-image-stroke before:bg-blue-600 peer-enabled:before:border-blue-600 bg-white':
            indeterminate,
        },
        // disabled
        'peer-disabled:before:border-transparent peer-disabled:before:bg-zinc-300 peer-disabled:before:border-zinc-300 peer-disabled:text-zinc-400 peer-disabled:peer-checked:after:bg-zinc-600 peer-disabled:after:bg-none',
      ]"
    >
      <slot />
      <Typography v-if="helpText" is="p" class="mt-1" color="tertiary" truncate data-testid="help-text">
        {{ helpText }}
      </Typography>
    </Typography>
  </div>
</template>
