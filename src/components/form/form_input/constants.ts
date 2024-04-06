export const FORM_INPUT_SIZES = ["xs", "sm", "md", "lg", "xl", "unset"] as const;
export type FORM_INPUT_SIZES = (typeof FORM_INPUT_SIZES)[number];

export const FORM_INPUT_SIZE_CLASSES: Readonly<Record<FORM_INPUT_SIZES, string>> = {
  xs: "w-20",
  sm: "w-40",
  md: "w-60",
  lg: "w-80",
  xl: "w-100",
  unset: "w-full",
};

export const FORM_INPUT_TYPES = [
  "text",
  "password",
  "email",
  "number",
  "url",
  "tel",
  "search",
  "range",
  "color",
  "date",
  "time",
  "datetime",
  "datetime-local",
  "month",
  "week",
] as const;
export type FORM_INPUT_TYPES = (typeof FORM_INPUT_TYPES)[number];

export const DEFAULT_FORM_INPUT_CLASS =
  "border-1 rounded border-zinc-400 outline-none py-1.5 px-2.5 h-8 text-sm text-zinc-800 placeholder:text-zinc-400 enabled:hover:border-zinc-500 enabled:focus:border-zinc-800 disabled:text-zinc-500 disabled:placeholder:text-zinc-500 disabled:bg-zinc-50 disabled:border-zinc-300 read-only:placeholder:text-zinc-500 read-only:bg-zinc-50 read-only:border-zinc-300 invalid:border-red-400 enabled:invalid:hover:border-red-600 enabled:invalid:focus:border-red-600";

export const DEFAULT_FORM_INPUT_SIZE = "unset" satisfies FORM_INPUT_SIZES;

export const DEFAULT_FORM_INPUT_TYPE = "text" satisfies FORM_INPUT_TYPES;
