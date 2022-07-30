import React from "react";

export interface IDropdownContext {
  depth: number;
  mutate: (newCtx: IDropdownContext) => void;
  close: () => void;
}

export const initialContext: IDropdownContext = {
  depth: -1,
  mutate: () => {},
  close: () => {},
};

export const DropdownContext =
  React.createContext<IDropdownContext>(initialContext);

export default DropdownContext;
