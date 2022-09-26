<template>
  <div
    tabindex="-1"
    @onFocus.capture="onWrapperFocus"
    @onBlur.capture="onWrapperBlur"
  >
    <focusable-element :onFocus="onInnerFocus" :onBlur="onInnerBlur" />
  </div>
</template>

<script setup lang="ts">
import FocusableElement from "./focusable-element.vue";

defineProps(["onInnerFocus", "onInnerBlur", "onWrapperFocus", "onWrapperBlur"]);
</script>
