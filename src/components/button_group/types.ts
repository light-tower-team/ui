import { Ref } from "vue";
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from "../button/constants";
import { BUTTON_GROUP_ORIENTATION, GROUP_BUTTON_PLACE } from "./constants";

export interface GroupButton {
  registerButton(): string;
  unregisterButton(id: string): void;
  getButtonPlaceById(id: string): GROUP_BUTTON_PLACE | undefined;
  groupOrientation: Readonly<Ref<BUTTON_GROUP_ORIENTATION>>;
  color: Readonly<Ref<BUTTON_COLORS>>;
  size: Readonly<Ref<BUTTON_SIZES>>;
  variant: Readonly<Ref<BUTTON_VARIANTS>>;
}
