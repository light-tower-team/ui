<template>
  <button v-bind="focusProps">Hi!</button>
</template>

<script setup lang="ts">
import { useFocus } from "~/interactions/use-focus/use-focus";

const { focusProps } = useFocus({
  onFocus: () => console.log("focus"),
  onBlur: () => console.log("blur"),
});
</script>
