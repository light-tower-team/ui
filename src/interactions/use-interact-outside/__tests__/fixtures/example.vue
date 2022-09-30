<template>
  <div ref="elementRef" data-testid="test"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInteractOutside } from "../../use-interact-outside";

const props = defineProps<{
  isDisabled?: boolean;
  onInteractOutside?: (e: Event) => void;
  onInteractOutsideStart?: (e: Event) => void;
}>();

const elementRef = ref<HTMLDivElement | null>(null);

useInteractOutside(props, elementRef);
</script>
