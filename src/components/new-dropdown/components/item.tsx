import React from "react";
import PropTypes from "prop-types";
import Typography from "../../typography";

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  ref?: React.Ref<HTMLLIElement>;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> =
  React.forwardRef(
    ({ children, ...props }, ref: React.Ref<HTMLLIElement> | undefined) => {
      return (
        <li
          {...props}
          ref={ref}
          className={["ui-dropdown-menu-item", props.className].join(" ")}
        >
          <Typography className="ui-dropdown-menu-item-label">
            {children}
          </Typography>
        </li>
      );
    }
  );

DropdownMenuItem.displayName = "DropdownMenuItem";
DropdownMenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DropdownMenuItem;
