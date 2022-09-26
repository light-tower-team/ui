import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  Ref,
  toRefs,
  watchEffect,
} from "vue";

export interface UseFocusableProps {
  isDisabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
}

export interface FocusableProps {
  tabIndex?: number;
}

export interface UseFocusableResult {
  focusableProps: FocusableProps;
}

export function useFocusable<T extends HTMLElement>(
  props: UseFocusableProps,
  el: Ref<T | null>
): UseFocusableResult {
  const rProps = reactive(props);
  const { isDisabled, autoFocus, tabIndex } = toRefs(rProps);

  onMounted(async () => {
    try {
      if (autoFocus?.value) {
        await nextTick();

        el.value?.focus();
      }
    } catch (_e) {
      // Ignore
    }
  });

  const focusableProps: FocusableProps = {};

  const stopIsDisabledWatch = watchEffect(() => {
    focusableProps.tabIndex = isDisabled?.value ? -1 : tabIndex?.value;
  });

  onUnmounted(() => stopIsDisabledWatch());

  return {
    focusableProps,
  };
}
