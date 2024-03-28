<script setup lang="ts">
import { type Ref, computed, toValue } from "vue";
import { type Placement } from "@floating-ui/vue";

interface Props {
  placement: Ref<Placement> | Placement;
}

const props = defineProps<Props>();

const placement = computed(() => toValue(props.placement));

const placementClass = computed(() => {
  if (placement.value.startsWith("bottom")) {
    return "top-0 -mt-1 before:border-b-neutral-900 before:border-t-0 before:border-x-4 before:border-b-4";
  }
});
</script>

<template>
  <span
    ref="floatingArrow"
    class="absolute w-2 h-2 block before:content-[''] before:absolute before:border-solid before:border-transparent"
    :class="placementClass"
  />
</template>
