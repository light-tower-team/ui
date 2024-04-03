import { normalizeClass } from "vue";
import {
  BUTTON_GROUP_CLASS,
  BUTTON_GROUP_ORIENTATION,
  DEFAULT_BUTTON_GROUP_ORIENTATION,
  HORIZONTAL_BUTTON_GROUP_CLASS,
  VERTICAL_BUTTON_GROUP_CLASS,
} from "../constants";

interface BuildButtonGroupClassesParams {
  orientation?: BUTTON_GROUP_ORIENTATION;
}

export function buildButtonGroupClasses({
  orientation = DEFAULT_BUTTON_GROUP_ORIENTATION,
}: BuildButtonGroupClassesParams = {}): string {
  return normalizeClass([
    BUTTON_GROUP_CLASS,
    {
      [HORIZONTAL_BUTTON_GROUP_CLASS]: orientation === "horizontal",
      [VERTICAL_BUTTON_GROUP_CLASS]: orientation === "vertical",
    },
  ]);
}
