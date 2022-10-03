import { Ref, ref, toRef, watchEffect } from "vue";
import { PointerType } from "~/shared";
import { HTMLAttributes } from "~/shared/dom";
import { isPointerEventAvailable } from "~/utils/is-pointer-event-available";

export type HoverType = "hoverstart" | "hoverend" | "hoverchange";

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
  hoverProps: HTMLAttributes;
}

export function useHover(props: UseHoverProps = {}): UseHoverResult {
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

    onHoverStart?.({
      type: "hoverstart",
      target,
      pointerType: pointerType as PointerType,
      isHovering: true,
    });

    onHoverChange?.({
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

    onHoverEnd?.({
      type: "hoverend",
      target,
      pointerType: pointerType as PointerType,
      isHovering: false,
    });

    onHoverChange?.({
      type: "hoverchange",
      target,
      pointerType: pointerType as PointerType,
      isHovering: false,
    });
  };

  const hoverProps: HTMLAttributes = {};

  if (isPointerEventAvailable()) {
    hoverProps.onPointerEnter = ({ target, pointerType }) => {
      onHoverStartHandle(target, pointerType as PointerType);
    };

    hoverProps.onPointerLeave = ({ target, pointerType }) => {
      if (isDisabled.value) return;

      onHoverEndHandle(target, pointerType as PointerType);
    };
  } else {
    hoverProps.onMouseEnter = ({ target }) => {
      onHoverStartHandle(target, "mouse");
    };

    hoverProps.onMouseLeave = ({ target }) => {
      if (isDisabled.value) return;

      onHoverEndHandle(target, "mouse");
    };
  }

  watchEffect(() => {
    if (!isDisabled.value || !state.target || !state.pointerType) return;

    onHoverEndHandle(state.target, state.pointerType);
  });

  return {
    isHovered,
    hoverProps,
  };
}
