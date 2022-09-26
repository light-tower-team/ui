import { onUnmounted, reactive } from "vue";

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

    target.addEventListener("focusout", onBlur as EventListener, {
      once: true,
    });

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
