export const LOADING_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type LOADING_SIZES = (typeof LOADING_SIZES)[number];

export const LOADING_SIZES_CLASSES: Readonly<Record<LOADING_SIZES, string>> = {
  xs: "w-4 h-4 border-2",
  sm: "w-5 h-5 border-2",
  md: "w-6 h-6 border-3",
  lg: "w-7 h-7 border-3",
  xl: "w-8 h-8 border-3",
};

export const DEFAULT_LOADING_LABEL = "loading";
