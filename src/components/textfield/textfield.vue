<template>
  <div :style="{ display: 'flex', flexDirection: 'column', width: 200 }">
    <label v-bind="labelProps">{{ label }}</label>
    <input v-bind="inputProps" ref="el" />
    <div
      v-if="desc"
      :style="{
        fontSize: 12,
      }"
    >
      {{ desc }}
    </div>
    <div v-if="error" :style="{ color: 'red', fontSize: 12 }">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTextField } from "~/hooks/textfield";

defineProps<{
  label?: string;
  desc?: string;
  error?: string;
}>();

const el = ref<null | HTMLElement>(null);

const { labelProps, inputProps } = useTextField(
  {
    id: "input",
    isRequired: true,
  },
  el
);
</script>

<style lang="scss" src="./textfield.scss" />
