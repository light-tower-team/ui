import React from "react";
import Typography from "../../typography";
import Stack, { StackProps } from "../../stack";

export interface DropdownSectionProps extends StackProps {
  label: string;
}

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  label,
  children,
  ...props
}) => {
  return (
    <Stack {...props} component="section" className="ui-dropdown-menu-section">
      <Typography
        variant="h6"
        component="p"
        className="ui-dropdown-menu-section-label"
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

export default DropdownSection;
