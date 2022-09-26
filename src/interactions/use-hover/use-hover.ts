import { onUnmounted, Ref, ref, toRef, watchEffect } from "vue";
import { setProp } from "~/utils/set-prop";

export type HoverType = "hoverstart" | "hoverend" | "hoverchange";

export type PointerType = "mouse" | "pen" | "touch";

export interface HoverProps {
  onPointerEnter?: (e: PointerEvent) => void;
  onPointerLeave?: (e: PointerEvent) => void;
  onMouseEnter?: (e: PointerEvent) => void;
  onMouseLeave?: (e: PointerEvent) => void;
}

export interface HoverEvent {
  type: HoverType;
  target: EventTarget | null;
  pointerType: PointerType | null;
  isHovering: boolean;
}

export interface UseHoverProps {
  isDisabled?: boolean;
  onHoverStart?: (e: HoverEvent) => void;
  onHoverEnd?: (e: HoverEvent) => void;
  onHoverChange?: (e: HoverEvent) => void;
}

export interface UseHoverResult {
  isHovered: Ref<boolean>;
  hoverProps: HoverProps;
}

export function useHover(props: UseHoverProps): UseHoverResult {
  const { onHoverStart, onHoverEnd, onHoverChange } = props;

  const isDisabled = toRef(props, "isDisabled");
  const isHovered = ref(false);

  const state: {
    target?: EventTarget;
    pointerType?: PointerType;
  } = {};

  const onHoverStartHandle = (
    target: EventTarget | null,
    pointerType: PointerType
  ) => {
    state.pointerType = pointerType as PointerType;

    if (isDisabled.value || isHovered.value || pointerType === "touch") return;

    isHovered.value = true;
    state.target = target ?? undefined;

    onHoverStart &&
      onHoverStart({
        type: "hoverstart",
        target,
        pointerType: pointerType as PointerType,
        isHovering: true,
      });

    onHoverChange &&
      onHoverChange({
        type: "hoverchange",
        target,
        pointerType: pointerType as PointerType,
        isHovering: true,
      });
  };

  const onHoverEndHandle = (
    target: EventTarget | null,
    pointerType: PointerType
  ) => {
    state.pointerType = undefined;
    state.target = undefined;

    if (!isHovered.value || pointerType === "touch") return;

    isHovered.value = false;

    onHoverEnd &&
      onHoverEnd({
        type: "hoverend",
        target,
        pointerType: pointerType as PointerType,
        isHovering: false,
      });

    onHoverChange &&
      onHoverChange({
        type: "hoverchange",
        target,
        pointerType: pointerType as PointerType,
        isHovering: false,
      });
  };

  const hoverProps: HoverProps = {};

  if (typeof PointerEvent !== "undefined") {
    setProp(hoverProps, "onPointerEnter", ({ target, pointerType }) => {
      onHoverStartHandle(target, pointerType as PointerType);
    });

    setProp(hoverProps, "onPointerLeave", ({ target, pointerType }) => {
      if (isDisabled.value) return;

      onHoverEndHandle(target, pointerType as PointerType);
    });
  } else {
    setProp(hoverProps, "onMouseEnter", ({ target }) => {
      onHoverStartHandle(target, "mouse");
    });

    setProp(hoverProps, "onMouseLeave", ({ target }) => {
      if (isDisabled.value) return;

      onHoverEndHandle(target, "mouse");
    });
  }

  const stopIsDisabledWatch = watchEffect(() => {
    if (isDisabled.value && state.target && state.pointerType) {
      onHoverEndHandle(state.target, state.pointerType);
    }
  });

  onUnmounted(() => stopIsDisabledWatch());

  return {
    isHovered,
    hoverProps,
  };
}
