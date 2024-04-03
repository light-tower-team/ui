import { normalizeClass } from "vue";
import { RING_CLASS } from "../../../utils/constants";
import {
  BUTTON_CLASS,
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANTS,
  BUTTON_VARIANT_CLASSES,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
  DEFAULT_ROUNDED_BUTTON_CLASS,
  DISABLED_BUTTON_CLASS,
  FIRST_HORIZONTAL_GROUP_BUTTON_CLASS,
  FIRST_VERTICAL_GROUP_BUTTON_CLASS,
  FULL_BUTTON_WIDTH_CLASS,
  GROUP_BUTTON_CLASS,
  GROUP_BUTTON_VARIANT_CLASSES,
  ICON_BUTTON_SIZE_CLASSES,
  LAST_HORIZONTAL_GROUP_BUTTON_CLASS,
  LAST_VERTICAL_GROUP_BUTTON_CLASS,
  LOADING_BUTTON_CLASS,
  MIDDLE_HORIZONTAL_GROUP_BUTTON_CLASS,
  MIDDLE_VERTICAL_GROUP_BUTTON_CLASS,
  ROUNDED_BUTTON_CLASS,
  VERTICAL_GROUP_BUTTON_CLASS,
} from "../constants";
import { BUTTON_GROUP_ORIENTATION, GROUP_BUTTON_PLACE } from "../../button_group";

interface BuildButtonClassesParams {
  size?: BUTTON_SIZES;
  variant?: BUTTON_VARIANTS;
  color?: BUTTON_COLORS;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  hasOnlyIcon?: boolean;
  groupPlace?: GROUP_BUTTON_PLACE;
  groupOrientation?: BUTTON_GROUP_ORIENTATION;
}

export function buildButtonClasses({
  size = DEFAULT_BUTTON_SIZE,
  variant = DEFAULT_BUTTON_VARIANT,
  color = DEFAULT_BUTTON_COLOR,
  fullWidth = false,
  rounded = false,
  loading = false,
  hasOnlyIcon = false,
  groupPlace,
  groupOrientation,
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
      [FULL_BUTTON_WIDTH_CLASS]: fullWidth && !hasOnlyIcon && groupOrientation !== "vertical",
      [ROUNDED_BUTTON_CLASS]: rounded && !groupPlace,
      [DEFAULT_ROUNDED_BUTTON_CLASS]: !rounded && !groupPlace,
      [GROUP_BUTTON_CLASS]: !!groupPlace,
      [FIRST_HORIZONTAL_GROUP_BUTTON_CLASS]: groupOrientation === "horizontal" && groupPlace === "first",
      [MIDDLE_HORIZONTAL_GROUP_BUTTON_CLASS]: groupOrientation === "horizontal" && groupPlace === "middle",
      [LAST_HORIZONTAL_GROUP_BUTTON_CLASS]: groupOrientation === "horizontal" && groupPlace === "last",
      [VERTICAL_GROUP_BUTTON_CLASS]: groupOrientation === "vertical",
      [FIRST_VERTICAL_GROUP_BUTTON_CLASS]: groupOrientation === "vertical" && groupPlace === "first",
      [MIDDLE_VERTICAL_GROUP_BUTTON_CLASS]: groupOrientation === "vertical" && groupPlace === "middle",
      [LAST_VERTICAL_GROUP_BUTTON_CLASS]: groupOrientation === "vertical" && groupPlace === "last",
      [GROUP_BUTTON_VARIANT_CLASSES[variant]?.[color] ?? ""]: groupPlace && ["middle", "last"].includes(groupPlace),
    },
  ]);
}
