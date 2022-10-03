<template>
  <button
    ref="buttonRef"
    v-props="buttonProps"
    class="ui-btn"
    :class="{ 'ui-focused': isFocusVisible }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useButton } from "~/hooks/button";
import { useFocusRign } from "~/hooks/focus";
import { mergeProps } from "~/utils/merge-props";

const providedProps = defineProps<{
  onPress?: () => void;
}>();

const buttonRef = ref<null | HTMLElement>(null);

let { buttonProps } = useButton(providedProps, buttonRef);
const { focusProps, isFocusVisible } = useFocusRign({}, buttonRef);

buttonProps = mergeProps(buttonProps, focusProps);
</script>

<style lang="scss" src="./button.scss" />
