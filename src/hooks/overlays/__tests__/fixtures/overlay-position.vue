<template>
  <div
    ref="targetRef"
    data-testid="trigger"
    :style="{
      left: `${triggerOffset.left}px`,
      top: `${triggerOffset.top}px`,
      width: `${triggerOffset.width}px`,
      height: `${triggerOffset.height}px`,
    }"
  >
    Trigger
  </div>
  <div
    ref="overlayRef"
    v-props="overlayProps"
    data-testid="overlay"
    :style="{
      ...overlayProps.style,
      width: `${overlayOffset.width}px`,
      height: `${overlayOffset.height}px`,
    }"
  >
    Overlay
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import { Offset } from "../../helpers/types";
import { useOverlayPosition } from "../../use-overlay-position";

const props = defineProps<{
  triggerOffset: Offset;
  overlayOffset: Offset;
  maxHeight?: number;
  onClose?: () => void;
}>();

const { maxHeight } = toRefs(props);

const targetRef = ref<HTMLButtonElement | null>(null);
const overlayRef = ref<HTMLDivElement | null>(null);

const { overlayProps } = useOverlayPosition({
  targetRef,
  overlayRef,
  isOpen: ref(true),
  maxHeight,
  onClose: props.onClose,
});
</script>
