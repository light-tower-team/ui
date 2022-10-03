<template>
  <div v-props="underlayProps">
    <div ref="overlayRef" v-props="overlayProps" data-testid="overlay">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOverlay } from "../../use-overlay";

const props = defineProps<{
  isDismissable?: boolean;
  onClose?: () => void;
}>();

const overlayRef = ref<HTMLElement | null>(null);

const { overlayProps, underlayProps } = useOverlay({
  ...props,
  overlayRef,
});
</script>
