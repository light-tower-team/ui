import { icons } from "feather-icons";

export const ICONS_PATH = "node_modules/feather-icons/dist/feather-sprite.svg";

export const ICON_SIZES = [16, 24, 32] as const;
export type ICON_SIZES = (typeof ICON_SIZES)[number];

export const ICON_NAMES = Object.keys(icons);
export type ICON_NAMES = (typeof ICON_NAMES)[number];

export const ICON_SIZE_CLASSES = {
  16: "w-4 h-4",
  24: "w-6 h-6",
  32: "w-8 h-8",
} as const satisfies Record<ICON_SIZES, string>;
