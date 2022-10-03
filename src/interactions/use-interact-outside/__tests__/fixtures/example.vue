<template>
  <div ref="overlayRef" data-testid="test"></div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useInteractOutside } from "../../use-interact-outside";

const props = defineProps<{
  isDisabled?: boolean;
  onInteractOutside?: (e: Event) => void;
  onInteractOutsideStart?: (e: Event) => void;
}>();

const isDisabled = computed(() => Boolean(props.isDisabled));

const overlayRef = ref<HTMLDivElement | null>(null);

useInteractOutside({ ...props, overlayRef, isDisabled });
</script>
