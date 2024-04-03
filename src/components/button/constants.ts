export const ANCHOR_TARGET = ["_self", "_blank", "_parent", "_top"] as const;
export type ANCHOR_TARGET = (typeof ANCHOR_TARGET)[number];

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type BUTTON_TYPES = (typeof BUTTON_TYPES)[number];

export const BUTTON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type BUTTON_SIZES = (typeof BUTTON_SIZES)[number];

export const BUTTON_VARIANTS = ["filled", "filled-tonal", "text", "outlined"] as const;
export type BUTTON_VARIANTS = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_COLORS = ["neutral", "primary", "danger"] as const;
export type BUTTON_COLORS = (typeof BUTTON_COLORS)[number];

export const DEFAULT_BUTTON_TAG = "button";
export const DEFAULT_BUTTON_TYPE = "button" satisfies BUTTON_TYPES;
export const DEFAULT_BUTTON_COLOR = "neutral" satisfies BUTTON_COLORS;
export const DEFAULT_BUTTON_SIZE = "md" satisfies BUTTON_SIZES;
export const DEFAULT_BUTTON_VARIANT = "outlined" satisfies BUTTON_VARIANTS;

export const BUTTON_SIZE_CLASSES: Readonly<Record<BUTTON_SIZES, string>> = {
  xs: "h-4 px-1 py-0",
  sm: "h-6 px-2 py-1",
  md: "h-8 px-3 py-2",
  lg: "h-10 px-3 py-2",
  xl: "h-12 px-4 py-3",
};

export const ICON_BUTTON_SIZE_CLASSES: Readonly<Record<BUTTON_SIZES, string>> = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

export const BUTTON_VARIANT_CLASSES: Readonly<Record<BUTTON_VARIANTS, Readonly<Record<BUTTON_COLORS, string>>>> = {
  filled: {
    neutral:
      "text-white border-transparent bg-gray-600 enabled:hover:text-white enabled:hover:bg-gray-700 enabled:focus:text-white enabled:focus:bg-gray-700 enabled:active:text-white enabled:active:bg-gray-800",
    primary:
      "text-white border-transparent bg-blue-600 enabled:hover:text-white enabled:hover:bg-blue-700 enabled:focus:text-white enabled:focus:bg-blue-700 enabled:active:text-white enabled:active:bg-blue-800",
    danger:
      "text-white border-transparent bg-red-600 enabled:hover:text-white enabled:hover:bg-red-700 enabled:focus:text-white enabled:focus:bg-red-700 enabled:active:text-white enabled:active:bg-red-800",
  },
  "filled-tonal": {
    neutral:
      "text-gray-600 border-transparent bg-gray-200 enabled:hover:text-gray-700 enabled:hover:bg-gray-300 enabled:focus:text-gray-700 enabled:focus:bg-gray-300 enabled:active:text-gray-800 enabled:active:bg-gray-400",
    primary:
      "text-blue-700 border-transparent bg-blue-200 enabled:hover:text-blue-800 enabled:hover:bg-blue-300 enabled:focus:text-blue-800 enabled:focus:bg-blue-300 enabled:active:text-blue-900 enabled:active:bg-blue-400",
    danger:
      "text-red-800 border-transparent bg-red-200 enabled:hover:text-red-900 enabled:hover:bg-red-300 enabled:focus:text-red-900 enabled:focus:bg-red-300 enabled:active:text-red-900 enabled:active:bg-red-400",
  },
  text: {
    neutral:
      "text-gray-600 border-transparent enabled:hover:text-gray-700 enabled:hover:bg-gray-100 enabled:focus:text-gray-700 enabled:focus:bg-gray-100 enabled:active:text-gray-800 enabled:active:bg-gray-200",
    primary:
      "text-blue-600 border-transparent enabled:hover:text-blue-700 enabled:hover:bg-blue-100 enabled:focus:text-blue-700 enabled:focus:bg-blue-100 enabled:active:text-blue-800 enabled:active:bg-blue-200",
    danger:
      "text-red-600 border-transparent enabled:hover:text-red-700 enabled:hover:bg-red-100 enabled:focus:text-red-700 enabled:focus:bg-red-100 enabled:active:text-red-800 enabled:active:bg-red-200",
  },
  outlined: {
    neutral:
      "text-gray-600 border-gray-600 hover:text-gray-700 enabled:hover:bg-gray-100 enabled:hover:border-gray-700 enabled:focus:text-gray-700 enabled:focus:bg-gray-100 enabled:focus:border-gray-700 enabled:active:text-gray-800 enabled:active:bg-gray-200 enabled:active:border-gray-800",
    primary:
      "text-blue-600 border-blue-600 enabled:hover:text-blue-700 enabled:hover:bg-blue-100 enabled:hover:border-blue-700 enabled:focus:text-blue-700 enabled:focus:bg-blue-100 enabled:focus:border-blue-700 enabled:active:text-blue-800 enabled:active:bg-blue-200 enabled:active:border-blue-800",
    danger:
      "text-red-600 border-red-600 enabled:hover:text-red-700 enabled:hover:bg-red-100 enabled:hover:border-red-700 enabled:focus:text-red-700 enabled:focus:bg-red-100 enabled:focus:border-red-700 enabled:active:text-red-800 enabled:active:bg-red-200 enabled:active:border-red-800",
  },
};

export const GROUP_BUTTON_VARIANT_CLASSES: Readonly<
  Partial<Record<BUTTON_VARIANTS, Readonly<Record<BUTTON_COLORS, string>>>>
> = {
  filled: {
    neutral: "border-l-gray-700",
    primary: "border-l-blue-700",
    danger: "border-l-red-700",
  },
  "filled-tonal": {
    neutral: "border-l-gray-300",
    primary: "border-l-blue-300",
    danger: "border-l-red-300",
  },
};

export const LOADING_BUTTON_CLASS = "text-gray-500 bg-gray-100 border-gray-300";

export const BUTTON_CLASS =
  "inline-flex justify-center items-center outline-none border transition-all font-normal gap-1 select-none";

export const FULL_BUTTON_WIDTH_CLASS = "w-full";

export const DEFAULT_ROUNDED_BUTTON_CLASS = "rounded";
export const ROUNDED_BUTTON_CLASS = "rounded-full";

export const GROUP_BUTTON_CLASS = "focus:z-10";

export const FIRST_HORIZONTAL_GROUP_BUTTON_CLASS = "rounded-l";
export const MIDDLE_HORIZONTAL_GROUP_BUTTON_CLASS = "-ml-px";
export const LAST_HORIZONTAL_GROUP_BUTTON_CLASS = "-ml-px rounded-r";

export const VERTICAL_GROUP_BUTTON_CLASS = "w-auto";

export const FIRST_VERTICAL_GROUP_BUTTON_CLASS = "rounded-t";
export const MIDDLE_VERTICAL_GROUP_BUTTON_CLASS = "-mt-px";
export const LAST_VERTICAL_GROUP_BUTTON_CLASS = "-mt-px rounded-b";

export const DISABLED_BUTTON_CLASS = "disabled:opacity-75 disabled:select-none disabled:cursor-default";

export const BUTTON_WARNINGS = {
  noLabel: "[button]: Accessible name missing. Please add aria-label.",
} as const;
