import { ref, Ref, watchEffect } from "vue";
import { isPointerEventAvailable } from "~/utils/is-pointer-event-available";
import { useListeners } from "~/utils/use-listeners";
import { isValidEvent } from "./helpers/is-valid-event";

export interface UseInteractOutsideProps<T extends HTMLElement = HTMLElement> {
  /**
   *  The ref for the overlay element.
   */
  overlayRef: Ref<T | null>;

  /**   Whether the interact outside events should be disabled. */
  isDisabled?: Ref<boolean>;

  onInteractOutside?: (e: Event) => void;
  onInteractOutsideStart?: (e: Event) => void;
}

/**
 * Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the
 */
export function useInteractOutside<T extends HTMLElement = HTMLElement>(
  props: UseInteractOutsideProps<T>
): void {
  const { overlayRef, isDisabled, onInteractOutside, onInteractOutsideStart } =
    props;

  const isPointerDown = ref(false);
  const ignoreEmulatedMouseEvents = ref(false);

  const { addListener, removeAllListeners } = useListeners();

  watchEffect(() => {
    if (isDisabled?.value) {
      removeAllListeners();
      return;
    }

    const onInteractStart = (e: Event) => {
      if (!isValidEvent(e, overlayRef)) return;

      e.stopPropagation();
      e.preventDefault();

      isPointerDown.value = true;

      onInteractOutsideStart?.(e);
    };

    const onInteractEnd = (e: Event) => {
      if (!isPointerDown.value || !isValidEvent(e, overlayRef)) return;

      e.stopPropagation();
      e.preventDefault();

      isPointerDown.value = false;

      onInteractOutside?.(e);
    };

    if (isPointerEventAvailable()) {
      addListener(document, "pointerdown", onInteractStart, true);
      addListener(document, "pointerup", onInteractEnd, true);
    } else {
      const onMouseUp = (e: MouseEvent) => {
        if (ignoreEmulatedMouseEvents.value) {
          ignoreEmulatedMouseEvents.value = false;
          return;
        }

        onInteractEnd(e);
      };

      const onTouchEnd = (e: TouchEvent) => {
        ignoreEmulatedMouseEvents.value = true;

        onInteractEnd(e);
      };

      addListener(document, "mousedown", onInteractStart, true);
      addListener(document, "mouseup", onMouseUp, true);
      addListener(document, "touchstart", onInteractStart, true);
      addListener(document, "touchend", onTouchEnd, true);
    }
  });
}
