<script setup lang="ts">
import { ref, toRef, MaybeRef } from "vue";
import {
  useFloating,
  offset,
  flip,
  shift,
  MaybeReadonlyRef,
  Placement,
  OffsetOptions,
  arrow,
} from "@floating-ui/vue";
import TooltipArrow from "./tooltip_arrow.vue";

interface Props {
  title?: MaybeRef<string>;
  placement?: MaybeReadonlyRef<Placement | undefined>;
  offset?: OffsetOptions;
}

const props = defineProps<Props>();

const title = toRef(props.title);

const reference = ref();
const floating = ref();
const floatingArrow = ref();

const isOpen = ref(false);

const {
  floatingStyles,
  middlewareData,
  placement: currentPlacement,
} = useFloating(reference, floating, {
  open: isOpen,
  placement: props.placement,
  middleware: [
    offset(4),
    flip({ fallbackAxisSideDirection: "start" }),
    shift(),
    arrow({ element: floatingArrow }),
  ],
});

const setReferenceEl = (el: HTMLElement) => {
  reference.value = el;
};

const handlePointerEnterEvent = () => {
  isOpen.value = true;
};

const handlePointerLeaveEvent = () => {
  isOpen.value = false;
};
</script>

<template>
  <Teleport v-if="isOpen && !!title" to="body">
    <div
      ref="floating"
      role="tooltip"
      :style="floatingStyles"
      class="bg-neutral-900 rounded px-3 py-2 text-sm text-white leading-4"
      :data-placement="currentPlacement"
    >
      {{ title }}
      <TooltipArrow
        ref="floatingArrow"
        :placement="currentPlacement"
        :style="{
          left:
            middlewareData.arrow?.x != null
              ? `${middlewareData.arrow.x}px`
              : '',
          top:
            middlewareData.arrow?.y != null
              ? `${middlewareData.arrow.y}px`
              : '',
        }"
      ></TooltipArrow>
    </div>
  </Teleport>
  <slot
    :ref="setReferenceEl"
    :title="isOpen ? undefined : title"
    @pointerenter="handlePointerEnterEvent"
    @pointerleave="handlePointerLeaveEvent"
  />
</template>./tooltip_arrow.vue
