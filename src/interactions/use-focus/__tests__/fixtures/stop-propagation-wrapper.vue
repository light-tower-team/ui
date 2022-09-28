<template>
  <div tabindex="-1" @focusin="onWrapperFocus" @focusout="onWrapperBlur">
    <focusable-element :on-focus="onInnerFocus" :on-blur="onInnerBlur" />
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
