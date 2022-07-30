import React from "react";
import Typography from "../../typography";
import Stack, { StackProps } from "../../stack";

export interface DropdownHeaderProps extends StackProps {
  label: string;
}

export const DropdownHeader: React.FC<DropdownHeaderProps> = ({
  label,
  children,
}) => {
  return (
    <Stack className="ui-dropdown-header-inner">
      <Typography
        variant="h6"
        component="p"
        className="ui-dropdown-header-label"
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

export default DropdownHeader;
