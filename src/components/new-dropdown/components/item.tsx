import React from "react";
import PropTypes from "prop-types";
import Typography from "../../typography";
import Stack, { StackProps } from "../../stack";

export interface DropdownMenuItemProps extends StackProps {
  ref?: React.Ref<HTMLLIElement>;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> =
  React.forwardRef(
    (
      { children, startIcon, endIcon, className, ...props },
      ref: React.Ref<HTMLLIElement> | undefined
    ) => {
      return (
        <Stack
          {...props}
          component="li"
          ref={ref}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={["ui-dropdown-menu-item", className].join(" ")}
        >
          <Stack className="ui-dropdown-menu-item-start-icon">
            {startIcon}
          </Stack>
          <Stack className="ui-w-full ui-overflow-hidden">
            <Typography className="ui-dropdown-menu-item-label">
              {children}
            </Typography>
          </Stack>
          <Stack className="ui-dropdown-menu-item-start-icon">{endIcon}</Stack>
        </Stack>
      );
    }
  );

DropdownMenuItem.displayName = "DropdownMenuItem";
DropdownMenuItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
};

export default DropdownMenuItem;
