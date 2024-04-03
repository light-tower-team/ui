import { computed, ComputedRef, inject, onUnmounted } from "vue";
import { BUTTON_GROUP, GROUP_BUTTON_PLACE } from "./constants";
import { GroupButton } from "./types";

export interface UseGroupButtonReturnValue
  extends Partial<Pick<GroupButton, "groupOrientation" | "color" | "size" | "variant">> {
  groupPlace?: ComputedRef<GROUP_BUTTON_PLACE | undefined>;
}

export function useGroupButton(): UseGroupButtonReturnValue {
  const groupButton = inject<GroupButton | null>(BUTTON_GROUP, null);

  if (!groupButton) {
    return {};
  }

  const { registerButton, unregisterButton, getButtonPlaceById, ...params } = groupButton;

  const id = registerButton();

  const groupPlace = computed(() => getButtonPlaceById(id));

  onUnmounted(() => unregisterButton(id));

  return { ...params, groupPlace };
}
