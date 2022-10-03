import { ref } from "vue";
import { HTMLAttributes } from "~/shared/dom";
import { SyntheticFocusWithinEvent } from "./events";
import { useSyntheticBlurEvent } from "./use-synthetic-blur-event";

export interface UseFocusWithinProps {
  isDisabled?: boolean;
  onFocusWithin?: (e: SyntheticFocusWithinEvent) => void;
  onBlurWithin?: (e: SyntheticFocusWithinEvent) => void;
  onFocusWithinChange?: (e: SyntheticFocusWithinEvent) => void;
}

export interface UseFocusWithinResult {
  focusWithinProps: HTMLAttributes;
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

    onBlurWithin?.(
      new SyntheticFocusWithinEvent("blur", e, { isFocused: false })
    );

    onFocusWithinChange?.(
      new SyntheticFocusWithinEvent("focuschange", e, { isFocused: false })
    );
  };

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = (e: FocusEvent) => {
    if (isFocusWithin.value) return;

    isFocusWithin.value = true;

    onFocusWithin?.(
      new SyntheticFocusWithinEvent("focus", e, { isFocused: true })
    );

    onFocusWithinChange?.(
      new SyntheticFocusWithinEvent("focuschange", e, { isFocused: true })
    );

    onSyntheticFocus(e);
  };

  const focusWithinProps: HTMLAttributes = {};

  if (!isDisabled) {
    focusWithinProps.onFocusIn = onFocus;
    focusWithinProps.onFocusOut = onBlur;
  }

  return {
    focusWithinProps,
  };
}
