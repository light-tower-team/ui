export const BUTTON_GROUP = Symbol("button_group");

export const GROUP_BUTTON_PLACE = ["first", "middle", "last", "first-and-last"] as const;
export type GROUP_BUTTON_PLACE = (typeof GROUP_BUTTON_PLACE)[number];

export const BUTTON_GROUP_ORIENTATION = ["horizontal", "vertical"] as const;
export type BUTTON_GROUP_ORIENTATION = (typeof BUTTON_GROUP_ORIENTATION)[number];

export const DEFAULT_BUTTON_GROUP_ORIENTATION = "horizontal" satisfies BUTTON_GROUP_ORIENTATION;

export const BUTTON_GROUP_CLASS = "inline-flex rounded";
export const HORIZONTAL_BUTTON_GROUP_CLASS = "flex-row";
export const VERTICAL_BUTTON_GROUP_CLASS = "flex-col";
