<template>
  <button
    v-bind="props"
    ref="el"
    class="ui-btn"
    :class="{ 'ui-focused': isFocusVisible }"
  >
    Testing
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useButton } from "~/hooks/button";
import { useFocusRign } from "~/hooks/focus";
import { mergeProps } from "~/utils/merge-props";

const el = ref<null | HTMLElement>(null);

const { buttonProps } = useButton({}, el);
const { focusProps, isFocusVisible } = useFocusRign(
  {
    autoFocus: true,
  },
  el
);

const props = mergeProps(buttonProps, focusProps);
</script>

<style lang="scss" src="./button.scss" />
