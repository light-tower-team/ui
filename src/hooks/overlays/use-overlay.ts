import { Ref } from "vue";
import { useFocusWithin } from "~/interactions/use-focus";
import { useInteractOutside } from "~/interactions/use-interact-outside";
import { HTMLAttributes } from "~/shared/dom";
import { mergeProps } from "~/utils/merge-props";
import { setProp } from "~/utils/set-prop";

export interface UseOverlayProps {
  /**
   *  Whether the overlay is currently open.
   *  @default false
   */
  isOpen?: boolean;

  /**
   *  Whether to close the overlay when the user interacts outside it.
   *  @default false
   */
  isDismissable?: boolean;

  /**
   *  Whether the overlay should close when focus is lost or moves outside it.
   *  @default false
   */
  shouldCloseOnBlur?: boolean;

  /**
   *  Whether pressing the escape key to close the overlay should be disabled.
   *  @default false
   */
  isKeyboardDismissDisabled?: boolean;

  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
}

export interface UseOverlayResult {
  /** Props to apply to the overlay container element. */
  overlayProps: HTMLAttributes;
  /** Props to apply to the underlay element, if any. */
  underlayProps: HTMLAttributes;
}

/**
 *  Provides the behavior for overlays such as dialogs, popovers, and menus.
 *  Hides the overlay when the user interacts outside it, when the Escape key is pressed,
 *  or optionally, on blur. Only the top-most overlay will close at once.
 */
export function useOverlay<T extends HTMLElement = HTMLElement>(
  props: UseOverlayProps = {},
  overlayRef: Ref<T | null>
): UseOverlayResult {
  const {
    isDismissable,
    shouldCloseOnBlur,
    isKeyboardDismissDisabled,
    onClose,
  } = props;

  // Handle clicking outside the overlay to close it
  useInteractOutside(
    {
      onInteractOutside: isDismissable ? onClose : undefined,
    },
    overlayRef
  );

  const { focusWithinProps } = useFocusWithin({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: onClose,
  });

  // Handle the escape key
  const onKeyDown = e => {
    if (e.key !== "Escape" || isKeyboardDismissDisabled) return;

    e.stopPropagation();
    e.preventDefault();

    onClose?.();
  };

  const keyboardProps: HTMLAttributes = {};

  setProp(keyboardProps, "onKeyDown", onKeyDown);

  const onPointerDownUnderlay = (e: PointerEvent) => {
    // fixes a firefox issue that starts text selection https://bugzilla.mozilla.org/show_bug.cgi?id=1675846
    if (e.target === e.currentTarget) e.preventDefault();
  };

  const overlayProps: HTMLAttributes = mergeProps(
    focusWithinProps,
    keyboardProps
  );

  const underlayProps: HTMLAttributes = {
    onPointerDown: onPointerDownUnderlay,
  };

  return {
    overlayProps,
    underlayProps,
  };
}
