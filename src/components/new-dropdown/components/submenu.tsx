import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Popper from "../../popper";
import DropdownMenuItem, { DropdownMenuItemProps } from "./item";
import DropdownContext from "../helpers/context";
import DropdownMenuInner, { DynamicSubMenuFunc } from "./menu-inner";
export interface DropdownSubMenuProps
  extends Omit<DropdownMenuItemProps, "children"> {
  depth: number;
  label: string;
  children?: React.ReactElement | React.ReactElement[] | DynamicSubMenuFunc;
}

export const DropdownSubMenu: React.FC<DropdownSubMenuProps> = ({
  depth,
  label,
  children,
  ...props
}) => {
  const ctx = React.useContext(DropdownContext);
  const toggleRef = React.useRef<HTMLLIElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <DropdownMenuItem
        {...props}
        ref={toggleRef}
        endIcon={<KeyboardArrowRightIcon fontSize="small" />}
        data-submenu={true}
      >
        {label}
      </DropdownMenuItem>
      <Popper
        ref={popoverRef}
        open={Boolean(
          depth <= ctx.depth && toggleRef.current?.getAttribute("data-open")
        )}
        anchorEl={toggleRef.current}
        placement="right-start"
        PaperProps={{
          className: "ui-dropdown-menu",
          "data-depth": depth,
          "data-open": toggleRef.current?.getAttribute("data-open"),
        }}
      >
        <DropdownMenuInner>{children}</DropdownMenuInner>
      </Popper>
    </>
  );
};

export default DropdownSubMenu;
