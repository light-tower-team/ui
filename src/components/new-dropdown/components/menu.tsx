import React from "react";
import Popper, { PopperProps } from "../../popper";
import FocusableBox, { FocusableBoxProps } from "./focusable-box";
import DropdownMenuInner from "./menu-inner";

export interface DropdownMenuProps extends PopperProps {
  FocusableBoxProps?: Partial<FocusableBoxProps>;
  children?: React.ReactElement | React.ReactElement[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  FocusableBoxProps,
  ...props
}) => {
  return (
    <Popper
      {...props}
      PaperProps={{
        className: "ui-dropdown-menu",
        "data-open": true,
        "data-depth": 0,
      }}
    >
      <FocusableBox {...FocusableBoxProps}>
        <DropdownMenuInner>{children}</DropdownMenuInner>
      </FocusableBox>
    </Popper>
  );
};

export default DropdownMenu;
