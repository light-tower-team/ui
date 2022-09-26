<template>
  <div v-bind="hoverProps" data-testid="root">
    test{{ isHovered ? "-hovered" : "" }}
    <div data-testid="inner" />
  </div>
</template>

<script setup lang="ts">
import { useHover } from "~/interactions/use-hover";

const props = defineProps([
  "isDisabled",
  "onHoverStart",
  "onHoverEnd",
  "onHoverChange",
]);

const { hoverProps, isHovered } = useHover(props);
</script>
