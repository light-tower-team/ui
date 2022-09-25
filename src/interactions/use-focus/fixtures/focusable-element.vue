<template>
  <div tabindex="-1" v-bind="focusProps" data-testid="root">
    <div tabindex="-1" data-testid="child"></div>
  </div>
</template>

<script setup lang="ts">
import { useFocus } from "~/interactions/use-focus/use-focus";

const props = defineProps(["disabled", "onFocus", "onBlur", "onFocusChange"]);

const { focusProps } = useFocus(props);
</script>
