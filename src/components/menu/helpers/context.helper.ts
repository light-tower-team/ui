import React from "react";

export type MenuPlacement =
  /* | "auto-end"
  | "auto-start"
  | "auto" */
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";

export interface MetadataProps {
  __uuid?: string;
}

export interface MenuItemType {
  __uuid: string;
  __parent: MenuItemType;
  __children: MenuItemType[];
  __el: React.ReactElement;
}

export interface MenuContextType {
  items: MenuItemType[];
  currentItemUUIDs: string[];
  collapse: boolean;
  hovering: boolean;
  placement: MenuPlacement;
  mutate: (newCtx: MenuContextType) => void;
}

export const initialCtx: MenuContextType = {
  items: [],
  currentItemUUIDs: [],
  collapse: false,
  hovering: false,
  placement: "right-start",
  mutate: () => {},
};

export const MenuContext = React.createContext<MenuContextType>(initialCtx);

export default MenuContext;
