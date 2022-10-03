<template>
  <div ref="overlayRef" v-props="overlayProps" class="ui-overlay">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOverlay } from "~/hooks/overlays";

const props = defineProps<{
  onClose?: () => void;
}>();

const overlayRef = ref<HTMLDivElement | null>(null);

const { overlayProps } = useOverlay({
  overlayRef,
  isDismissable: true,
  onClose: props.onClose,
});
</script>

<style lang="scss" src="./overlay.scss" />
