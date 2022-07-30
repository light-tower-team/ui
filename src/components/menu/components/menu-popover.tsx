import React from "react";
import Popper, { PopperProps } from "../../popper";
import MenuContext, {
  MenuContextType,
  MetadataProps,
} from "../helpers/context.helper";

export interface MenuPopoverProps extends PopperProps, MetadataProps {}

export const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  ...props
}) => {
  const ctx = React.useContext<MenuContextType>(MenuContext);

  return (
    <>
      <Popper placement={ctx.placement} {...props}>
        {children}
      </Popper>
    </>
  );
};

export default MenuPopover;
