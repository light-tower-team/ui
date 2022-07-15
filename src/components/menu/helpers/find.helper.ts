import { MenuItemType } from "./context.helper";

export default function find(
  children: MenuItemType[],
  uuid: string
): MenuItemType | null {
  if (!children) return null;

  for (const child of children) {
    if (child.__uuid === uuid) return child;

    const found = find(child.__children, uuid);

    if (found) return found;
  }

  return null;
}
