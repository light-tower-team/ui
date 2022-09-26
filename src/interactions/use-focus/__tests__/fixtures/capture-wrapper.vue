<template>
  <div
    tabindex="-1"
    @onFocus.capture="onWrapperFocus"
    @onBlur.capture="onWrapperBlur"
  >
    <focusable-element @focus="onInnerFocus" @blur="onInnerBlur" />
  </div>
</template>

<script setup lang="ts">
import FocusableElement from "./focusable-element.vue";

defineProps<{
  onInnerFocus: () => void;
  onInnerBlur: () => void;
  onWrapperFocus: () => void;
  onWrapperBlur: () => void;
}>();
</script>
