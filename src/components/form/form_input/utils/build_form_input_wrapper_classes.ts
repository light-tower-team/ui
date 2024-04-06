import { normalizeClass } from "vue";
import { DEFAULT_FORM_INPUT_SIZE, FORM_INPUT_SIZES } from "../constants";

export interface BuildFormInputWrapperClassesParams {
  size?: FORM_INPUT_SIZES;
}

export function buildFormInputWrapperClasses({
  size = DEFAULT_FORM_INPUT_SIZE,
}: BuildFormInputWrapperClassesParams = {}): string {
  return normalizeClass(["relative flex flex-row items-center", { "w-fit": size !== "unset" }]);
}
