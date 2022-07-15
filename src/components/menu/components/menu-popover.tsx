import React from "react";
import Popover, { PopoverProps } from "../../popover";
import MenuContext, {
  MenuContextType,
  MetadataProps,
} from "../helpers/context.helper";

export interface MenuPopoverProps extends PopoverProps, MetadataProps {}

export const MenuPopover: React.FC<MenuPopoverProps> = ({
  children,
  onClose = () => {},
  ...props
}) => {
  const ctx = React.useContext<MenuContextType>(MenuContext);

  return (
    <>
      <Popover placement={ctx.placement} onClose={onClose} {...props}>
        {children}
      </Popover>
    </>
  );
};

export default MenuPopover;
