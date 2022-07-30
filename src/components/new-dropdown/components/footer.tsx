import React from "react";
import Stack, { StackProps } from "../../stack";

export interface DropdownFooterProps extends StackProps {}

export const DropdownFooter: React.FC<DropdownFooterProps> = ({
  className,
  ...props
}) => {
  return (
    <Stack
      {...props}
      className={["ui-dropdown-footer-inner", className].join(" ")}
    />
  );
};

export default DropdownFooter;
