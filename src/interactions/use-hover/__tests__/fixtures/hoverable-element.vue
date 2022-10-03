<template>
  <div v-props="hoverProps" data-testid="root">
    test{{ isHovered ? "-hovered" : "" }}
    <div data-testid="inner" />
  </div>
</template>

<script setup lang="ts">
import { useHover } from "~/interactions/use-hover";

const props = defineProps<{
  isDisabled?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onHoverChange?: () => void;
}>();

const { hoverProps, isHovered } = useHover(props);
</script>
