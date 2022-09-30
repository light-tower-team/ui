<template>
  <div v-bind="underlayProps">
    <div v-bind="overlayProps" ref="overlayRef" data-testid="overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOverlay } from "../../use-overlay";

const props = defineProps<{
  isOpen?: boolean;
  isDismissable?: boolean;
  onClose?: () => void;
}>();

const overlayRef = ref<HTMLElement | null>(null);

const { overlayProps, underlayProps } = useOverlay(props, overlayRef);
</script>
