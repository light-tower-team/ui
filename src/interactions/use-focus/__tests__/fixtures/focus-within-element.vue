<template>
  <div v-bind="focusWithinProps" tabindex="-1" data-testid="focusable">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useFocusWithin } from "~/interactions/use-focus";

const props = defineProps<{
  isDisabled?: boolean;
  onFocusWithin?: (e: FocusEvent) => void;
  onBlurWithin?: (e: FocusEvent) => void;
  onFocusWithinChange?: (e: FocusEvent & { isFocused: boolean }) => void;
}>();

const { focusWithinProps } = useFocusWithin(props);
</script>
