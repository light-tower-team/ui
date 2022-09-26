<template>
  <button v-bind="props">{{ isHovered ? "hovered" : "idle" }}</button>
</template>

<script setup lang="ts">
import { mergeProps } from "~/utils/merge-props";
import { useFocus } from "~/interactions/use-focus";
import { useHover } from "~/interactions/use-hover";

const { focusProps } = useFocus({});

const { hoverProps, isHovered } = useHover({});

const props = mergeProps(focusProps, hoverProps);
</script>
