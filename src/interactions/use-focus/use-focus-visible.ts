import { Ref, ref } from "vue";
import {
  isFocusVisible,
  useFocusVisibleListener,
} from "./use-focus-visible-listener";

export interface UseFocusVisibleProps {
  /** Whether the element is a text input. */
  isTextInput?: boolean;

  /** Whether the element will be auto focused. */
  autoFocus?: boolean;
}

export interface UseFocusVisibleResult {
  /** Whether keyboard focus is visible globally. */
  isFocusVisible: Ref<boolean>;
}

/**
 * Manages focus visible state for the page, and subscribes individual components for updates.
 */
export function useFocusVisible(
  props: UseFocusVisibleProps = {}
): UseFocusVisibleResult {
  const { isTextInput, autoFocus } = props;

  const isFocusVisibleState = ref(autoFocus || isFocusVisible());

  useFocusVisibleListener(
    isFocusVisible => {
      isFocusVisibleState.value = isFocusVisible;
    },
    { isTextInput }
  );

  return {
    isFocusVisible: isFocusVisibleState,
  };
}
