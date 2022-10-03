<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }"
  >
    <ui-button ref="target" @press="onPress">Click to open</ui-button>
    <Teleport to="body">
      <ui-overlay
        v-if="isOpen"
        ref="overlay"
        v-props="overlayProps"
        :is-open="isOpen"
        @close="onClose"
      >
        Hello
      </ui-overlay>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import UiButton from "~/components/button";
import UiOverlay from "~/components/overlay";
import { useOverlayPosition } from "./hooks/overlays";
import { useComponentRef, useValueRef } from "./utils/use-ref";

const isOpen = useValueRef(false);

const [target, targetRef] = useComponentRef<typeof UiButton>();
const [overlay, overlayRef] = useComponentRef<typeof UiOverlay>();

const onPress = () => {
  isOpen.value = true;
};

const onClose = () => {
  isOpen.value = false;
};

const { overlayProps } = useOverlayPosition({
  targetRef,
  overlayRef,
  isOpen,
  placement: "bottom-start",
});
</script>

<style scoped></style>
