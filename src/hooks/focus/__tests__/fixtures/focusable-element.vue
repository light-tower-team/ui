<template>
  <button v-bind="focusableProps" ref="el" data-testid="focusable" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFocusable } from "~/hooks/focus/use-focusable";

const el = ref<HTMLButtonElement | null>(null);

const props = defineProps<{
  isDisabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
}>();

const { focusableProps } = useFocusable(props, el);
</script>
