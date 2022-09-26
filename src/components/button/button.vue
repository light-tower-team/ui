<template>
  <button v-bind="props" ref="el">{{ isHovered ? "hovered" : "idle" }}</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { mergeProps } from "~/utils/merge-props";
import { useHover } from "~/interactions/use-hover";
import { useFocus } from "~/interactions/use-focus";
import { useFocusable } from "~/hooks/focus/use-focusable";

const el = ref(null);

const { focusProps } = useFocus({});

const { hoverProps, isHovered } = useHover({});

const { focusableProps } = useFocusable({ autoFocus: true }, el);

const props = mergeProps(focusableProps, focusProps, hoverProps);
</script>
