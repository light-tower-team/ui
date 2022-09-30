import { onMounted, ref, Ref } from "vue";
import { isPointerEventAvailable } from "~/utils/is-pointer-event-available";
import { useListeners } from "~/utils/use-listeners";

export interface UseInteractOutsideProps {
  /** Whether the interact outside events should be disabled. */
  isDisabled?: boolean;

  onInteractOutside?: (e: Event) => void;
  onInteractOutsideStart?: (e: Event) => void;
}

function isValidEvent<T extends HTMLElement = HTMLElement>(
  e: Event,
  elementRef: Ref<T | null>
) {
  if ((e as PointerEvent)?.button > 0) return false;

  const target = e.target as Element | undefined;
  const ownerDocument = target?.ownerDocument;

  // if the event target is no longer in the document
  if (!target || !ownerDocument?.documentElement.contains(target)) return false;

  return elementRef.value && !elementRef.value.contains(target);
}

/**
 * Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the
 */
export function useInteractOutside<T extends HTMLElement = HTMLElement>(
  props: UseInteractOutsideProps = {},
  elementRef: Ref<T | null>
): void {
  const { isDisabled, onInteractOutside, onInteractOutsideStart } = props;

  const isPointerDown = ref(false);
  const ignoreEmulatedMouseEvents = ref(false);

  const { addListener } = useListeners();

  onMounted(() => {
    if (isDisabled) return;

    const onInteractStart = (e: Event) => {
      if (!isValidEvent(e, elementRef)) return;

      e.stopPropagation();
      e.preventDefault();

      isPointerDown.value = true;

      onInteractOutsideStart?.(e);
    };

    const onInteractEnd = (e: Event) => {
      if (!isPointerDown.value || !isValidEvent(e, elementRef)) return;

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
