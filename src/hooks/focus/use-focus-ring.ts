import { computed, onMounted, reactive, Ref, toRefs } from "vue";
import {
  isFocusVisible,
  SyntheticFocusEvent,
  SyntheticFocusWithinEvent,
  useFocus,
  UseFocusProps,
  useFocusVisibleListener,
  useFocusWithin,
  UseFocusWithinProps,
} from "~/interactions/use-focus";

export interface UseFocusRignProps {
  /**
   *  Whether to show the focus ring when something
   *  inside the container element has focus (true), or
   *  only if the container itself has focus (false).
   *  @default 'false'
   */
  within?: boolean;

  /** Whether the element is a text input.
   *  @default 'false'
   */
  isTextInput?: boolean;

  /** Whether the element will be auto focused.
   *  @default 'false'
   */
  autoFocus?: boolean;
}

export interface UseFocusRignProps extends UseFocusProps, UseFocusWithinProps {}

export interface UseFocusRignResult {
  /** Whether the element is currently focused. */
  isFocused: Ref<boolean>;

  /** Whether keyboard focus should be visible. */
  isFocusVisible: Ref<boolean>;

  /** Props to apply to the container element with the focus ring. */
  focusProps: UseFocusRignProps;
}

/**
 *  Determines whether a focus ring should be shown to indicate keyboard focus.
 *  Focus rings are visible only when the user is interacting with a keyboard,
 *  not with a mouse, touch, or other input methods.
 */
export function useFocusRign<T extends HTMLElement = HTMLElement>(
  props: UseFocusRignProps,
  el: Ref<T | null>
): UseFocusRignResult {
  const { within = false, autoFocus = false, isTextInput = false } = props;
  const state = reactive({
    isFocused: false,
    isFocusVisible: autoFocus || isFocusVisible(),
  });

  const { isFocusedVal, isFocusVisibleVal } = toRefs(
    reactive({
      isFocusedVal: false,
      isFocusVisibleVal: state.isFocused && state.isFocusVisible,
    })
  );

  const onFocusChange = ({
    isFocused,
  }: SyntheticFocusEvent & SyntheticFocusWithinEvent) => {
    state.isFocused = isFocused;

    isFocusedVal.value = isFocused;
    isFocusVisibleVal.value = state.isFocused && state.isFocusVisible;
  };

  useFocusVisibleListener(
    isFocusVisible => {
      state.isFocusVisible = isFocusVisible;

      isFocusVisibleVal.value = state.isFocused && state.isFocusVisible;
    },
    { isTextInput }
  );

  const { focusProps } = useFocus({
    isDisabled: within,
    onFocusChange,
  });

  const { focusWithinProps } = useFocusWithin({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange,
  });

  onMounted(() => {
    if (!autoFocus) return;

    el.value?.focus();
  });

  return {
    isFocused: isFocusedVal,
    isFocusVisible: computed(
      () => isFocusedVal.value && isFocusVisibleVal.value
    ),
    focusProps: within ? focusWithinProps : focusProps,
  };
}
