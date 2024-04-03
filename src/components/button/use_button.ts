import { Component, MaybeRef, computed, reactive, readonly, ref, toRef, toValue } from "vue";
import { contains } from "../../utils/contains";
import { BUTTON_TYPES, DEFAULT_BUTTON_TAG, DEFAULT_BUTTON_TYPE } from "./constants";

export interface UseButtonParams {
  is?: string | Component;
  loading?: MaybeRef<boolean | undefined>;
  type?: MaybeRef<BUTTON_TYPES | undefined>;
  disabled?: MaybeRef<boolean | undefined>;
  visuallyDisabled?: MaybeRef<boolean | undefined>;
  tabIndex?: MaybeRef<number | undefined>;
  href?: MaybeRef<string | undefined>;
  to?: MaybeRef<string | undefined>;
  ariaLabel?: MaybeRef<string | undefined>;
  onPressed?: (event: MouseEvent | KeyboardEvent) => void;
}

export interface ButtonProps {
  type: BUTTON_TYPES | undefined;
  disabled: true | undefined;
  tabIndex: number | undefined;
  href: string | undefined;
  to: string | undefined;
  role: string | undefined;
  ariaDisabled: true | undefined;
  ariaLabel: string | undefined;
  "data-pressed": true | undefined;
  onclick: (e: MouseEvent) => void;
  onkeydown: (e: KeyboardEvent) => void;
  onkeyup: (e: KeyboardEvent) => void;
}

export interface UseButtonReturnValue {
  is: string;
  buttonProps: ButtonProps;
}

export function useButton(params: UseButtonParams = {}): UseButtonReturnValue {
  const { onPressed } = params;

  const active = ref(false);

  const visuallyDisabled = toRef(params.visuallyDisabled);
  const href = toRef(params.href);
  const to = toRef(params.to);
  const ariaLabel = toRef(params.ariaLabel);

  const isLink = computed<boolean>(() => !!href.value || !!to.value);

  const is = computed(() => {
    const is = toValue(params.is);

    return isLink.value ? "a" : is ?? DEFAULT_BUTTON_TAG;
  });

  const isNativeButton = computed<boolean>(() => {
    const type = toValue(params.type);

    const isButton = is.value === "button";
    const isFormButton = is.value === "input" && contains(BUTTON_TYPES, type);

    return isButton || isFormButton;
  });

  const pressed = computed<true | undefined>(() => (!isNativeButton.value && active.value ? true : undefined));

  const isDisabled = computed<boolean>(() => {
    const disabled = toValue(params.disabled);
    const loading = toValue(params.loading);

    return !!disabled || !!loading;
  });

  const disabled = computed<true | undefined>(() => {
    return isDisabled.value && isNativeButton.value && !visuallyDisabled.value ? true : undefined;
  });

  const ariaDisabled = computed<true | undefined>(() => {
    return isDisabled.value && ((isNativeButton.value && visuallyDisabled.value) || !isNativeButton.value)
      ? true
      : undefined;
  });

  const type = computed(() => {
    const type = toValue(params.type);

    return isNativeButton.value ? type ?? DEFAULT_BUTTON_TYPE : undefined;
  });

  const tabIndex = computed(() => {
    const tabIndex = toValue(params.tabIndex);

    if (isNativeButton.value) {
      return;
    }

    return visuallyDisabled.value || !isDisabled.value ? tabIndex ?? 0 : -1;
  });

  const role = computed(() => (!isNativeButton.value ? "button" : undefined));

  function handleMouseClickEvent(event: MouseEvent) {
    !isDisabled.value && onPressed?.(event);
  }

  function handleKeyDownEvent(event: KeyboardEvent) {
    if (isNativeButton.value || isDisabled.value) {
      return;
    }

    event.preventDefault();

    if (event.key === " ") {
      active.value = true;
    }

    if (event.key === "Enter") {
      onPressed?.(event);
    }
  }

  function handleKeyUpEvent(event: KeyboardEvent) {
    active.value = false;

    if (!isNativeButton.value && !isDisabled.value && event.key === " ") {
      onPressed?.(event);
    }
  }

  const buttonProps = reactive({
    type,
    disabled,
    tabIndex,
    href,
    to,
    role,
    ariaDisabled,
    ariaLabel,
    onclick: handleMouseClickEvent,
    onkeydown: handleKeyDownEvent,
    onkeyup: handleKeyUpEvent,
    "data-pressed": pressed,
  });

  return {
    is: toValue(is),
    buttonProps: readonly(buttonProps),
  };
}
