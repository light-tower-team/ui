import { normalizeClass } from "vue";
import {
  BUTTON_CLASS,
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_SIZE_CLASSES,
  BUTTON_SPACING_CLASS,
  BUTTON_VARIANTS,
  BUTTON_VARIANT_CLASSES,
  DEFAULT_BUTTON_WIDTH_CLASS,
  DEFAULT_ROUNDED_BUTTON_CLASS,
  DISABLED_BUTTON_CLASS,
  FULL_BUTTON_WIDTH_CLASS,
  ICON_BUTTON_SIZE_CLASSES,
  LOADING_BUTTON_CLASS,
  ROUNDED_BUTTON_CLASS,
} from "../constants";
import { RING_CLASS } from "../../../utils/constants";

interface BuildButtonClassesParams {
  size?: BUTTON_SIZES;
  variant?: BUTTON_VARIANTS;
  color?: BUTTON_COLORS;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  hasOnlyIcon?: boolean;
}

export function buildButtonClasses({
  size = "md",
  variant = "outlined",
  color = "neutral",
  fullWidth = false,
  rounded = false,
  loading = false,
  hasOnlyIcon = false,
}: BuildButtonClassesParams = {}): string {
  return normalizeClass([
    RING_CLASS,
    BUTTON_CLASS,
    DISABLED_BUTTON_CLASS,
    {
      [LOADING_BUTTON_CLASS]: loading,
      [BUTTON_VARIANT_CLASSES[variant][color]]: !loading,
      [ICON_BUTTON_SIZE_CLASSES[size]]: hasOnlyIcon,
      [BUTTON_SIZE_CLASSES[size]]: !hasOnlyIcon,
      [BUTTON_SPACING_CLASS]: !hasOnlyIcon,
      [FULL_BUTTON_WIDTH_CLASS]: fullWidth && !hasOnlyIcon,
      [DEFAULT_BUTTON_WIDTH_CLASS]: !fullWidth && !hasOnlyIcon,
      [ROUNDED_BUTTON_CLASS]: rounded,
      [DEFAULT_ROUNDED_BUTTON_CLASS]: !rounded,
    },
  ]);
}
