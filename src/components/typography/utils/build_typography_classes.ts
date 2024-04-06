import { normalizeClass } from "vue";
import {
  DEFAULT_TYPOGRAPHY_CLASS,
  DEFAULT_TYPOGRAPHY_COLOR,
  DEFAULT_TYPOGRAPHY_TRUNCATE,
  DEFAULT_TYPOGRAPHY_VARIANT,
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_COLOR_CLASSES,
  TYPOGRAPHY_TRUNCATE_CLASS,
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_VARIANT_CLASSES,
} from "../constants";

export interface BuildTypographyClassesParams {
  color?: TYPOGRAPHY_COLORS;
  variant?: TYPOGRAPHY_VARIANTS;
  truncate?: boolean;
}

export function buildTypographyClasses({
  color = DEFAULT_TYPOGRAPHY_COLOR,
  variant = DEFAULT_TYPOGRAPHY_VARIANT,
  truncate = DEFAULT_TYPOGRAPHY_TRUNCATE,
}: BuildTypographyClassesParams = {}): string {
  return normalizeClass([
    DEFAULT_TYPOGRAPHY_CLASS,
    TYPOGRAPHY_VARIANT_CLASSES[variant],
    TYPOGRAPHY_COLOR_CLASSES[color],
    { [TYPOGRAPHY_TRUNCATE_CLASS]: truncate },
  ]);
}
