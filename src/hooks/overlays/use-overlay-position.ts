import { computed, Ref, watchEffect } from "vue";
import { HTMLAttributes } from "~/shared/dom";
import { useValueRef } from "~/utils/use-ref";
import { useResize } from "~/utils/use-resize";
import {
  CalculatedPosition,
  calculatePosition,
} from "./helpers/calculate-position";
import { Placement } from "./helpers/types";
import { useCloseOnScroll } from "./use-close-on-scroll";

export interface UseOverlayPositionProps<
  B extends HTMLElement = HTMLBodyElement,
  T extends HTMLElement = HTMLElement,
  O extends HTMLElement = HTMLElement
> {
  /**
   *  Element that that serves as the positioning boundary.
   *  @default document.body
   */
  rootBoundary?: B;

  /**
   * T  he ref for the element which the overlay positions itself with respect to.
   */
  targetRef: Ref<T | null>;

  /**
   *  The ref for the overlay element.
   */
  overlayRef: Ref<O | null>;

  /**
   *  Whether change the placement of a popper when it's scheduled to overflow a given boundary.
   *  @default true
   */
  shouldFlip?: boolean;

  /**
   *  @default bottom
   */
  placement?: Placement;

  isOpen: Ref<boolean>;

  /**
   * The maxHeight specified for the overlay element.
   * By default, it will take all space up to the current viewport height.
   */
  maxHeight?: Ref<number | undefined>;

  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
}

export interface UseOverlayPositionResult {
  /** Props for the overlay container element. */
  overlayProps: Ref<HTMLAttributes>;
}

/**
 *  Handles positioning overlays like popovers and menus relative to a trigger
 *  element, and updating the position when the window resizes.
 */
export function useOverlayPosition<
  B extends HTMLElement = HTMLBodyElement,
  T extends HTMLElement = HTMLElement,
  O extends HTMLElement = HTMLElement
>(props: UseOverlayPositionProps<B, T, O>): UseOverlayPositionResult {
  const {
    rootBoundary = document?.body,
    targetRef,
    overlayRef,
    shouldFlip = true,
    placement = "bottom-start",
    isOpen,
    maxHeight,
    onClose,
  } = props;

  const position = useValueRef<CalculatedPosition>();

  const updatePosition = async () => {
    if (!targetRef.value || !overlayRef.value || !isOpen.value) return;

    position.value = calculatePosition({
      targetRef: targetRef as Ref<T>,
      overlayRef: overlayRef as Ref<O>,
      rootBoundary,
      placement,
      shouldFlip,
      maxHeight,
    });
  };

  useResize(updatePosition);

  useCloseOnScroll({
    targetRef,
    isOpen,
    onClose,
  });

  watchEffect(updatePosition);

  const overlayProps = computed<HTMLAttributes>(() => ({
    style: {
      position: "absolute",
      top: position.value?.position.top && `${position.value?.position.top}px`,
      left:
        position.value?.position.left && `${position.value?.position.left}px`,
      right:
        position.value?.position.right && `${position.value?.position.right}px`,
      bottom:
        position.value?.position.bottom &&
        `${position.value?.position.bottom}px`,
      maxHeight: position.value?.maxHeight && `${position.value?.maxHeight}px`,
    },
  }));

  return {
    overlayProps,
  };
}
