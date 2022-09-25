import { onUnmounted, reactive, ref } from "vue";

export function useSyntheticBlurEvent(onBlur: (e: FocusEvent) => void) {
  const state = reactive<{
    focused: boolean;
    onBlur: (e: FocusEvent) => void;
    observer: MutationObserver | null;
  }>({
    focused: true,
    onBlur,
    observer: null,
  });

  onUnmounted(() => {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
  });

  return (e: FocusEvent) => {
    if (
      !(e.target instanceof HTMLButtonElement) &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLTextAreaElement) &&
      !(e.target instanceof HTMLSelectElement)
    )
      return;

    state.focused = true;

    const target = e.target;
    const onBlur = (e: FocusEvent) => {
      state.focused = false;

      if (target.disabled) {
        state.onBlur?.(new FocusEvent("blur", e));
      }

      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };

    target.addEventListener("focusout", onBlur as any, { once: true });

    state.observer = new MutationObserver(() => {
      if (state.focused && target.disabled && state.observer) {
        state.observer.disconnect();
        target.dispatchEvent(new FocusEvent("blur"));
        target.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
      }
    });

    state.observer.observe(target, {
      attributes: true,
      attributeFilter: ["disabled"],
    });
  };
}

export interface UseFocusProps {
  disabled?: boolean;
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
    disabled,
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

  if (!disabled) {
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
