import { AriaAttributes, AriaRole } from "./aria";
import { DOMEvents } from "./events";

export * from "./input";
export * from "./label";
export * from "./aria";
export * from "./events";

type Booleanish = boolean | "true" | "false";

export interface HTMLAttributes extends AriaAttributes, DOMEvents {
  // Standard HTML Attributes
  accessKey?: string | undefined;
  contentEditable?: Booleanish | "inherit" | undefined;
  contextMenu?: string | undefined;
  dir?: string | undefined;
  draggable?: Booleanish | undefined;
  hidden?: boolean | undefined;
  id?: string | undefined;
  lang?: string | undefined;
  placeholder?: string | undefined;
  slot?: string | undefined;
  spellCheck?: Booleanish | undefined;
  tabIndex?: number | undefined;
  title?: string | undefined;
  translate?: "yes" | "no" | undefined;

  // WAI-ARIA
  role?: AriaRole | undefined;

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
    | "search"
    | undefined;
}
