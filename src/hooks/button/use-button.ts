import { Ref, HTMLAttributes } from "vue";
import { usePress, UsePressProps } from "~/interactions/use-press";
import { mergeProps } from "~/utils/merge-props";
import { useFocusable, UseFocusableProps } from "~/hooks/focus";

export interface AriaAttrs {
  "aria-disabled"?: boolean;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: boolean | "true" | "false";
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?:
    | boolean
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"
    | "true"
    | "false";
  /** Identifies the element (or elements) whose contents or presence are controlled by the current element. */
  "aria-controls"?: string;
  /** Indicates the current "pressed" state of toggle buttons. */
  "aria-pressed"?: boolean | "true" | "false" | "mixed";
}

export interface UseButtonProps
  extends UseFocusableProps,
    UsePressProps,
    AriaAttrs {
  as?: "button" | "a" | "div" | "input" | "span";
  role?: string;
  /**
   * The behavior of the button when used in an HTML form.
   * @default 'button'
   */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tabIndex?: number;
  /** A URL to link to if as="a". */
  href?: string;
  /** The target window for the link. */
  target?: string;
  /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string;
}

export interface UseButtonResult {
  isPressed: Ref<boolean>;
  buttonProps: HTMLAttributes | AriaAttrs;
}

/**
 * Provides the behavior and accessibility implementation for a button component. Handles mouse, keyboard, and touch interactions,
 * focus behavior, and ARIA props for both native button elements and custom element types.
 * @param props - Props to be applied to the button.
 * @param buttonRef - A ref to a DOM element for the button.
 */
export function useButton(
  props: UseButtonProps,
  buttonRef: Ref<HTMLElement | null>
): UseButtonResult {
  const { as, type, target, href, rel, isDisabled } = props;
  const { focusableProps } = useFocusable(props, buttonRef);
  const { pressProps, isPressed } = usePress(props);

  let buttonProps: UseButtonProps = {
    "aria-haspopup": props["aria-haspopup"],
    "aria-expanded": props["aria-expanded"],
    "aria-controls": props["aria-controls"],
    "aria-pressed": props["aria-pressed"],
  };

  if (as === "button") {
    buttonProps = {
      ...buttonProps,
      type,
      disabled: isDisabled,
    };
  } else {
    buttonProps = {
      ...buttonProps,
      role: "button",
      tabIndex: isDisabled ? undefined : 0,
      href: as === "a" && isDisabled ? undefined : href,
      target: as === "a" ? target : undefined,
      type: as === "input" ? type : undefined,
      disabled: as === "input" ? isDisabled : undefined,
      "aria-disabled": !isDisabled || as === "input" ? undefined : isDisabled,
      rel: as === "a" ? rel : undefined,
    };
  }

  return {
    isPressed,
    buttonProps: mergeProps(buttonProps, pressProps, focusableProps),
  };
}
