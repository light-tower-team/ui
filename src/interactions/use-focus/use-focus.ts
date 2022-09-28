import { setProp } from "~/utils/set-prop";
import { SyntheticFocusEvent } from "./events";
import { useSyntheticBlurEvent } from "./use-synthetic-blur-event";

export interface UseFocusProps {
  isDisabled?: boolean;
  onFocus?: (e: SyntheticFocusEvent) => void;
  onBlur?: (e: SyntheticFocusEvent) => void;
  onFocusChange?: (e: SyntheticFocusEvent) => void;
}

export interface FocusProps {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export interface UseFocusResult {
  focusProps: FocusProps;
}

export function useFocus(props: UseFocusProps = {}): UseFocusResult {
  const {
    isDisabled,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onFocusChange: onFocusChangeProp,
  } = props;

  const onBlur = (e: FocusEvent) => {
    if (e.target === e.currentTarget) {
      if (onBlurProp) {
        onBlurProp(new SyntheticFocusEvent("blur", e, { isFocused: false }));
      }

      if (onFocusChangeProp) {
        onFocusChangeProp(
          new SyntheticFocusEvent("focuschange", e, { isFocused: false })
        );
      }
    }
  };

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = (e: FocusEvent) => {
    if (e.target === e.currentTarget) {
      if (onFocusProp) {
        onFocusProp(new SyntheticFocusEvent("focus", e, { isFocused: true }));
      }

      if (onFocusChangeProp) {
        onFocusChangeProp(
          new SyntheticFocusEvent("focuschange", e, { isFocused: true })
        );
      }

      onSyntheticFocus(e);
    }
  };

  const focusProps: FocusProps = {};

  if (!isDisabled) {
    setProp(focusProps, "onFocusIn", onFocus);
    setProp(focusProps, "onFocusOut", onBlur);
  }

  return { focusProps };
}

export default useFocus;
