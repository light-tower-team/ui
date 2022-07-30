import React from "react";

export interface IDropdownContext {
  depth: number;
  mutate: (newCtx: IDropdownContext) => void;
}

export const initialContext: IDropdownContext = {
  depth: -1,
  mutate: () => {},
};

export const DropdownContext =
  React.createContext<IDropdownContext>(initialContext);

export const useDropdownContext = () => {
  const ctx = React.useContext(DropdownContext);

  return {
    ctx,
    close: () => ctx.mutate({ ...ctx, depth: -1 }),
  };
};

export default DropdownContext;
