<template>
  <button v-bind="focusProps" :disabled="disabled" data-testid="root">
    Button
  </button>
</template>

<script setup lang="ts">
import { useFocus } from "~/interactions/use-focus";

const props = defineProps(["disabled", "onFocus", "onBlur", "onFocusChange"]);

const { focusProps } = useFocus({ ...props, isDisabled: props.disabled });
</script>
