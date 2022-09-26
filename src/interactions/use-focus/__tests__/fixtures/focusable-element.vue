<template>
  <div tabindex="-1" v-bind="focusProps" data-testid="root">
    <div tabindex="-1" data-testid="child"></div>
  </div>
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
