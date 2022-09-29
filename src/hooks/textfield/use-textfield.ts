import { Ref } from "vue";
import { HTMLAttributes, InputHTMLAttributes } from "~/shared/dom";
import { mergeProps } from "~/utils/merge-props";
import { useFocusable } from "../focus";
import { useField } from "../label";

export interface UseTextFieldProps extends InputHTMLAttributes {
  isDisabled?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  defaultValue?: string;
  inputElementType?: string;
}

export interface UseTextFieldResult {
  labelProps: HTMLAttributes;
  inputProps: InputHTMLAttributes;
}

export function useTextField<T extends HTMLElement = HTMLElement>(
  props: UseTextFieldProps = {},
  el: Ref<T | null>
): UseTextFieldResult {
  const {
    isDisabled,
    isRequired,
    isReadOnly,
    value,
    defaultValue,
    autoComplete,
    maxLength,
    minLength,
    name,
    placeholder,
    inputMode,
    type = "text",
    inputElementType = "input",
    "aria-errormessage": ariaErrormessage,
    "aria-activedescendant": ariaActivedescendant,
    "aria-autocomplete": ariaAutocomplete,
    "aria-haspopup": ariaHaspopup,
    onCopy,
    onCut,
    onPaste,
    onCompositionEnd,
    onCompositionStart,
    onCompositionUpdate,
    onInput,
  } = props;

  const { focusableProps } = useFocusable(props, el);
  const { labelProps, fieldProps } = useField(props);

  const inputOnlyProps = {
    type,
    pattern: props.pattern,
  };

  return {
    labelProps,
    inputProps: mergeProps(
      focusableProps,
      fieldProps,
      inputElementType === "input" ? inputOnlyProps : {},
      {
        disabled: isDisabled,
        readOnly: isReadOnly,
        required: isRequired,

        /// TODO: Add aria-invalid,
        "aria-required": isRequired || undefined,
        "aria-errormessage": ariaErrormessage,
        "aria-activedescendant": ariaActivedescendant,
        "aria-autocomplete": ariaAutocomplete,
        "aria-haspopup": ariaHaspopup,

        value,
        defaultValue: value ? undefined : defaultValue,

        autoComplete,
        maxLength,
        minLength,
        name,
        placeholder,
        inputMode,

        // Clipboard events
        onCopy,
        onCut,
        onPaste,

        // Composition events
        onCompositionEnd,
        onCompositionStart,
        onCompositionUpdate,

        // Input events
        onInput,
      }
    ),
  };
}
