import { ref } from "vue";
import { setProp } from "~/utils/set-prop";
import { SyntheticFocusWithinEvent } from "./events";
import { useSyntheticBlurEvent } from "./use-synthetic-blur-event";

export interface UseFocusWithinProps {
  isDisabled?: boolean;
  onFocusWithin?: (e: SyntheticFocusWithinEvent) => void;
  onBlurWithin?: (e: SyntheticFocusWithinEvent) => void;
  onFocusWithinChange?: (e: SyntheticFocusWithinEvent) => void;
}

export interface FocusWithinProps {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export interface UseFocusWithinResult {
  focusWithinProps: FocusWithinProps;
}

export function useFocusWithin<T extends HTMLElement = HTMLElement>(
  props: UseFocusWithinProps = {}
): UseFocusWithinResult {
  const { isDisabled, onFocusWithin, onBlurWithin, onFocusWithinChange } =
    props;
  const isFocusWithin = ref(false);

  const onBlur = (e: FocusEvent) => {
    if (
      !isFocusWithin.value ||
      (e.currentTarget as T).contains(e.relatedTarget as T)
    )
      return;

    isFocusWithin.value = false;

    if (onBlurWithin) {
      onBlurWithin(
        new SyntheticFocusWithinEvent("blur", e, { isFocused: false })
      );
    }

    if (onFocusWithinChange) {
      onFocusWithinChange(
        new SyntheticFocusWithinEvent("focuschange", e, { isFocused: false })
      );
    }
  };

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = (e: FocusEvent) => {
    if (isFocusWithin.value) return;

    isFocusWithin.value = true;

    if (onFocusWithin) {
      onFocusWithin(
        new SyntheticFocusWithinEvent("focus", e, { isFocused: true })
      );
    }

    if (onFocusWithinChange) {
      onFocusWithinChange(
        new SyntheticFocusWithinEvent("focuschange", e, { isFocused: true })
      );
    }

    onSyntheticFocus(e);
  };

  const focusWithinProps: FocusWithinProps = {};

  if (!isDisabled) {
    setProp(focusWithinProps, "onFocusIn", onFocus);
    setProp(focusWithinProps, "onFocusOut", onBlur);
  }

  return {
    focusWithinProps,
  };
}
