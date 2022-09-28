import { HTMLAttributes, onUnmounted, Ref, ref, toRef } from "vue";
import { PointerType } from "~/shared";
import { isPointerEventAvailable } from "~/utils/is-pointer-event-available";
import { setProp } from "~/utils/set-prop";
import { useListeners } from "~/utils/use-listeners";
import {
  createPressEvent,
  EventBase,
  PressEvent,
} from "./helpers/create-press-event";
import { isTargetContainsPoint } from "./helpers/detect-overlap";
import {
  disableTextSelection,
  restoreTextSelection,
} from "./helpers/text-selection";
import { getTouchById, getTouchFromEvent } from "./helpers/touch-event";

export interface UsePressProps<T extends HTMLElement = HTMLElement> {
  allowTextSelectionOnPress?: boolean;
  shouldCancelOnPointerExit?: boolean;
  ignoreEmulatedMouseEvents?: boolean;
  isDisabled?: boolean;
  isPressed?: boolean;
  onPress?: (e: PressEvent<T>) => void;
  onPressStart?: (e: PressEvent<T>) => void;
  onPressEnd?: (e: PressEvent<T>) => void;
  onPressUp?: (e: PressEvent<T>) => void;
  onPressChange?: (e: PressEvent<T> & { isPressed: boolean }) => void;
}

export interface PressProps {
  onPointerDown?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onTouchStart?: (e: TouchEvent) => void;
}

export interface UsePressResult {
  isPressed: Ref<boolean>;
  pressProps: HTMLAttributes;
}

type PressCache<T> = {
  isPressed: boolean;
  isPressStarted: boolean;
  currentId: number | null;
  currentTarget: T | null;
};

export function usePress<T extends HTMLElement = HTMLElement>(
  props: UsePressProps = {}
): UsePressResult {
  const {
    onPress,
    onPressStart,
    onPressEnd,
    onPressUp,
    onPressChange,
    allowTextSelectionOnPress,
    shouldCancelOnPointerExit,
    ignoreEmulatedMouseEvents,
  } = props;
  const isPressed = ref(false);
  const isDisabled = toRef(props, "isDisabled");

  const cache: PressCache<T> = {
    isPressed: false,
    isPressStarted: false,
    currentId: null,
    currentTarget: null,
  };

  const { addListener, removeAllListeners } = useListeners();

  const pressProps: HTMLAttributes = {};

  const triggerPressStart = (e: EventBase<T>) => {
    if (isDisabled.value || cache.isPressStarted) return;

    isPressed.value = true;
    cache.isPressStarted = true;

    if (onPressStart) {
      onPressStart({
        ...e,
        type: "pressstart",
      });
    }

    if (onPressChange) {
      onPressChange({
        ...e,
        type: "presschange",
        isPressed: true,
      });
    }
  };

  const triggerPressEnd = (e: EventBase<T>, wasPress = true) => {
    if (!cache.isPressStarted) return;

    isPressed.value = false;
    cache.isPressStarted = false;

    if (onPressEnd) {
      onPressEnd({
        ...e,
        type: "pressend",
      });
    }

    if (onPressChange) {
      onPressChange({
        ...e,
        type: "presschange",
        isPressed: false,
      });
    }

    if (onPress && wasPress && !isDisabled.value) {
      onPress({
        ...e,
        type: "press",
      });
    }
  };

  const triggerPressUp = (e: EventBase<T>) => {
    if (isDisabled.value) return;

    if (onPressUp) {
      onPressUp({
        ...e,
        type: "pressup",
      });
    }
  };

  const attach = (target: T, pointerId?: number) => {
    isPressed.value = true;

    cache.isPressed = true;
    // cache.isPressStarted = true;
    cache.currentId = pointerId ?? null;
    cache.currentTarget = target;

    if (!allowTextSelectionOnPress) disableTextSelection();
  };

  const detach = () => {
    if (!cache.isPressed) return;

    isPressed.value = false;

    cache.isPressed = false;
    // cache.isPressStarted = false;
    cache.currentId = null;
    cache.currentTarget = null;

    removeAllListeners();

    if (!allowTextSelectionOnPress) restoreTextSelection();
  };

  if (isPointerEventAvailable()) {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== cache.currentId) return;

      if (isTargetContainsPoint(cache.currentTarget, e)) {
        triggerPressStart(
          createPressEvent<T>(
            e,
            cache.currentTarget,
            e.pointerType as PointerType
          )
        );
      } else if (cache.isPressStarted) {
        triggerPressEnd(
          createPressEvent<T>(
            e,
            cache.currentTarget,
            e.pointerType as PointerType
          ),
          false
        );

        if (shouldCancelOnPointerExit) {
          detach();
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      // Only handle left clicks and dispose press only if down and up pointer ids are matches.
      if (e.button !== 0 || !cache.isPressed || e.pointerId !== cache.currentId)
        return;

      if (isTargetContainsPoint(cache.currentTarget, e)) {
        triggerPressEnd(
          createPressEvent<T>(
            e,
            cache.currentTarget,
            e.pointerType as PointerType
          )
        );
      } else if (cache.isPressStarted) {
        triggerPressEnd(
          createPressEvent<T>(
            e,
            cache.currentTarget,
            e.pointerType as PointerType
          ),
          false
        );
      }

      detach();
    };

    const onPointerCancel = (e: PointerEvent) => {
      if (!cache.isPressed) return;

      triggerPressEnd(
        createPressEvent<T>(
          e,
          cache.currentTarget,
          e.pointerType as PointerType
        )
      );

      detach();
    };

    setProp(pressProps, "onPointerDown", (e: PointerEvent) => {
      // Only handle left clicks
      if (e.button !== 0) return;

      e.preventDefault();
      e.stopPropagation();

      if (cache.isPressed || isDisabled.value) return;

      attach(e.currentTarget as T, e.pointerId);

      triggerPressStart(
        createPressEvent<T>(
          e,
          cache.currentTarget,
          e.pointerType as PointerType
        )
      );

      addListener(document, "pointermove", onPointerMove, false);
      addListener(document, "pointerup", onPointerUp, false);
      addListener(document, "pointercancel", onPointerCancel, false);
    });

    setProp(pressProps, "onPointerUp", (e: PointerEvent) => {
      // Only handle left clicks
      if (e.button !== 0 || !isTargetContainsPoint(cache.currentTarget, e))
        return;

      triggerPressUp(
        createPressEvent<T>(
          e,
          cache.currentTarget,
          e.pointerType as PointerType
        )
      );
    });
  } else {
    const onMouseUp = (e: MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0 || !cache.isPressed) return;

      if (isTargetContainsPoint(cache.currentTarget, e)) {
        triggerPressEnd(createPressEvent<T>(e, cache.currentTarget, "mouse"));
      } else if (cache.isPressStarted) {
        triggerPressEnd(
          createPressEvent<T>(e, cache.currentTarget, "mouse"),
          false
        );
      }

      detach();
    };

    setProp(pressProps, "onMouseDown", (e: MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0) return;

      e.preventDefault();
      e.stopPropagation();

      if (cache.isPressed || isDisabled.value) return;

      attach(e.currentTarget as T);

      triggerPressStart(createPressEvent<T>(e, cache.currentTarget, "mouse"));

      addListener(document, "mouseup", onMouseUp, false);
    });

    setProp(pressProps, "onMouseUp", (e: MouseEvent) => {
      // Only handle left clicks
      if (e.button !== 0 || !isTargetContainsPoint(cache.currentTarget, e))
        return;

      triggerPressUp(createPressEvent<T>(e, cache.currentTarget, "mouse"));
    });

    setProp(pressProps, "onMouseEnter", (e: MouseEvent) => {
      e.stopPropagation();

      if (!cache.isPressed || ignoreEmulatedMouseEvents) return;

      triggerPressStart(createPressEvent<T>(e, cache.currentTarget, "mouse"));
    });

    setProp(pressProps, "onMouseLeave", (e: MouseEvent) => {
      e.stopPropagation();

      if (!cache.isPressed || ignoreEmulatedMouseEvents) return;

      triggerPressEnd(
        createPressEvent<T>(e, cache.currentTarget, "mouse"),
        false
      );

      if (shouldCancelOnPointerExit) {
        detach();
      }
    });

    const onTouchMove = (e: TouchEvent) => {
      const touch = getTouchById(e, cache.currentId);

      if (!touch) return;

      if (isTargetContainsPoint(cache.currentTarget, touch)) {
        triggerPressStart(createPressEvent(e, cache.currentTarget, "touch"));
      } else {
        triggerPressEnd(
          createPressEvent<T>(e, cache.currentTarget, "touch"),
          false
        );

        if (shouldCancelOnPointerExit) {
          detach();
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = getTouchById(e, cache.currentId);

      // Dispose press only if down and up pointer ids are matches.
      if (touch?.identifier !== cache.currentId) return;

      if (isTargetContainsPoint(cache.currentTarget, touch)) {
        triggerPressUp(createPressEvent(e, cache.currentTarget, "touch"));
        triggerPressEnd(createPressEvent(e, cache.currentTarget, "touch"));
      }

      detach();
    };

    // Cancel event can be fired while scroll.
    const onTouchCancel = (e: TouchEvent) => {
      if (cache.isPressed) {
        triggerPressEnd(
          createPressEvent(e, cache.currentTarget, "touch"),
          false
        );
      }

      detach();
    };

    setProp(pressProps, "onTouchStart", (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const touch = getTouchFromEvent(e);

      if (!touch || cache.isPressed || isDisabled.value) return;

      attach(e.currentTarget as T, touch.identifier);

      triggerPressStart(createPressEvent<T>(e, cache.currentTarget, "touch"));

      addListener(document, "touchmove", onTouchMove, false);
      addListener(document, "touchend", onTouchEnd, false);
      addListener(document, "touchcancel", onTouchCancel, false);
    });
  }

  onUnmounted(() => {
    if (!allowTextSelectionOnPress) {
      restoreTextSelection();
    }
  });

  return {
    isPressed,
    pressProps,
  };
}
