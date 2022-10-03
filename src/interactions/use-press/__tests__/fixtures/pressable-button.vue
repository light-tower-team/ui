<template>
  <button v-props="pressProps" data-testid="pressable"></button>
</template>

<script setup lang="ts">
import { usePress } from "~/interactions/use-press";

const props = defineProps<{
  allowTextSelectionOnPress?: boolean;
  shouldCancelOnPointerExit?: boolean;
  isDisabled?: boolean;
  isPressed?: boolean;
  onPress?: () => void;
  onPressStart?: () => void;
  onPressEnd?: () => void;
  onPressUp?: () => void;
  onPressChange?: () => void;
}>();

const { pressProps } = usePress(props);
</script>
