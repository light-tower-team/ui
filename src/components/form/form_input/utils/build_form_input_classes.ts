import { normalizeClass } from "vue";
import { RING_CLASS } from "../../../../utils/constants";
import {
  DEFAULT_FORM_INPUT_CLASS,
  DEFAULT_FORM_INPUT_SIZE,
  FORM_INPUT_SIZES,
  FORM_INPUT_SIZE_CLASSES,
} from "../constants";

export interface BuildFormInputClassesParams {
  size?: FORM_INPUT_SIZES;
  hasIcon?: boolean;
  hasAddon?: boolean;
}

export function buildFormInputClasses({
  size = DEFAULT_FORM_INPUT_SIZE,
  hasIcon = false,
  hasAddon = false,
}: BuildFormInputClassesParams = {}): string {
  return normalizeClass([
    RING_CLASS,
    DEFAULT_FORM_INPUT_CLASS,
    FORM_INPUT_SIZE_CLASSES[size],
    {
      "pl-9": hasIcon,
      "pr-9": hasAddon,
    },
  ]);
}
