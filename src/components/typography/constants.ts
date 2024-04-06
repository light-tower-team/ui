export const TYPOGRAPHY_COLORS = ["inherit", "primary", "secondary", "tertiary", "danger", "success"] as const;
export type TYPOGRAPHY_COLORS = (typeof TYPOGRAPHY_COLORS)[number];

export const TYPOGRAPHY_VARIANTS = ["h1", "h2", "h3", "h4", "h5", "h6", "body"] as const;
export type TYPOGRAPHY_VARIANTS = (typeof TYPOGRAPHY_VARIANTS)[number];

export const TYPOGRAPHY_TRUNCATE_CLASS = "text-ellipsis overflow-hidden whitespace-nowrap";

export const TYPOGRAPHY_COLOR_CLASSES: Readonly<Record<TYPOGRAPHY_COLORS, string>> = {
  inherit: "text-inherit",
  primary: "text-zinc-800",
  secondary: "text-zinc-600",
  tertiary: "text-zinc-500",
  danger: "text-red-600",
  success: "text-green-600",
};

export const TYPOGRAPHY_VARIANT_CLASSES: Readonly<Record<TYPOGRAPHY_VARIANTS, string>> = {
  h1: "text-3xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-xl font-bold",
  h4: "text-lg font-bold",
  h5: "text-base font-bold",
  h6: "text-sm font-bold",
  body: "text-sm font-normal",
};

export const DEFAULT_TYPOGRAPHY_CLASS = "block";

export const DEFAULT_TYPOGRAPHY_ELEMENT = "p";
export const DEFAULT_TYPOGRAPHY_COLOR = "primary" satisfies TYPOGRAPHY_COLORS;
export const DEFAULT_TYPOGRAPHY_VARIANT = "body" satisfies TYPOGRAPHY_VARIANTS;
export const DEFAULT_TYPOGRAPHY_TRUNCATE = false;
