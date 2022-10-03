import { Ref, StyleValue } from "vue";
import { AriaAttributes, AriaRole } from "./aria";
import { DOMEvents } from "./events";

export * from "./input";
export * from "./label";
export * from "./aria";
export * from "./events";

type Booleanish = boolean | "true" | "false";

export interface HTMLAttributes extends AriaAttributes, DOMEvents {
  // Standard HTML Attributes
  accessKey?: string;
  contentEditable?: Booleanish | "inherit";
  contextMenu?: string;
  dir?: string;
  draggable?: Booleanish;
  hidden?: boolean;
  id?: string;
  lang?: string;
  placeholder?: string;
  slot?: string;
  spellCheck?: Booleanish;
  tabIndex?: number;
  title?: string;
  translate?: "yes" | "no";

  // class or className
  style?: StyleValue | Ref<StyleValue>;

  // WAI-ARIA
  role?: AriaRole;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
}
