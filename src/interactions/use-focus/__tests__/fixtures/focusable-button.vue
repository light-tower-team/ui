<template>
  <button v-props="focusProps" :disabled="isDisabled" data-testid="root">
    Button
  </button>
</template>

<script setup lang="ts">
import { useFocus } from "~/interactions/use-focus";

const props = defineProps<{
  isDisabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onFocusChange?: () => void;
}>();

const { focusProps } = useFocus(props);
</script>
