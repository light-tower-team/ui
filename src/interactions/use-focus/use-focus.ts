import { HTMLAttributes } from "~/shared/dom";
import { SyntheticFocusEvent } from "./events";
import { useSyntheticBlurEvent } from "./use-synthetic-blur-event";

export interface UseFocusProps {
  isDisabled?: boolean;
  onFocus?: (e: SyntheticFocusEvent) => void;
  onBlur?: (e: SyntheticFocusEvent) => void;
  onFocusChange?: (e: SyntheticFocusEvent) => void;
}

export interface UseFocusResult {
  focusProps: HTMLAttributes;
}

export function useFocus(props: UseFocusProps = {}): UseFocusResult {
  const {
    isDisabled,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onFocusChange: onFocusChangeProp,
  } = props;

  const onBlur = (e: FocusEvent) => {
    if (e.target !== e.currentTarget) return;

    onBlurProp?.(new SyntheticFocusEvent("blur", e, { isFocused: false }));

    onFocusChangeProp?.(
      new SyntheticFocusEvent("focuschange", e, { isFocused: false })
    );
  };

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = (e: FocusEvent) => {
    if (e.target !== e.currentTarget) return;

    onFocusProp?.(new SyntheticFocusEvent("focus", e, { isFocused: true }));

    onFocusChangeProp?.(
      new SyntheticFocusEvent("focuschange", e, { isFocused: true })
    );

    onSyntheticFocus(e);
  };

  const focusProps: HTMLAttributes = {};

  if (!isDisabled) {
    focusProps.onFocusIn = onFocus;
    focusProps.onFocusOut = onBlur;
  }

  return { focusProps };
}

export default useFocus;
