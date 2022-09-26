import { useSyntheticBlurEvent } from "./use-synthetic-blur-event";

export interface UseFocusProps {
  isDisabled?: boolean;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocusChange?: (value: boolean) => void;
}

export interface UseFocusResult {
  focusProps: {
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
  };
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
        onBlurProp(e);
      }

      if (onFocusChangeProp) {
        onFocusChangeProp(false);
      }
    }
  };

  const onSyntheticFocus = useSyntheticBlurEvent(onBlur);

  const onFocus = (e: FocusEvent) => {
    if (e.target === e.currentTarget) {
      if (onFocusProp) {
        onFocusProp(e);
      }

      if (onFocusChangeProp) {
        onFocusChangeProp(true);
      }

      onSyntheticFocus(e);
    }
  };

  const result: UseFocusResult = {
    focusProps: {},
  };

  if (!isDisabled) {
    if (onFocusProp || onFocusChangeProp || onBlurProp) {
      result.focusProps.onFocus = onFocus;
    }

    if (onBlurProp || onFocusChangeProp) {
      result.focusProps.onBlur = onBlur;
    }
  }

  return result;
}

export default useFocus;
