import { MaybeRef, computed, provide, ref, toRef } from "vue";
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from "../button";
import { BUTTON_GROUP, BUTTON_GROUP_ORIENTATION, GROUP_BUTTON_PLACE } from "./constants";
import { GroupButton } from "./types";

export interface UseButtonGroupParams {
  orientation: MaybeRef<BUTTON_GROUP_ORIENTATION>;
  color: MaybeRef<BUTTON_COLORS>;
  size: MaybeRef<BUTTON_SIZES>;
  variant: MaybeRef<BUTTON_VARIANTS>;
}

export function useButtonGroup(params: UseButtonGroupParams): void {
  let counter = 0;

  const buff = ref<Array<string>>([]);

  const orientation = toRef(params.orientation);
  const color = toRef(params.color);
  const size = toRef(params.size);
  const variant = toRef(params.variant);

  const count = computed(() => buff.value.length);

  function registerButton(): string {
    const id = `__${counter++}`;

    buff.value.push(id);

    return id;
  }

  function unregisterButton(id: string): boolean {
    const idx = buff.value.indexOf(id);

    if (idx === -1) {
      return false;
    }

    buff.value.splice(idx, 1);

    return true;
  }

  function getButtonPlaceById(id: string): GROUP_BUTTON_PLACE | undefined {
    const idx = buff.value.indexOf(id);

    if (idx === -1) {
      return;
    }

    if (count.value === 1) {
      return "first-and-last";
    }

    if (idx === 0) {
      return "first";
    }

    if (idx === count.value - 1) {
      return "last";
    }

    return "middle";
  }

  provide<GroupButton>(BUTTON_GROUP, {
    registerButton,
    unregisterButton,
    getButtonPlaceById,
    groupOrientation: orientation,
    color,
    size,
    variant,
  });
}
