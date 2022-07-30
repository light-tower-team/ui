import React from "react";
import Stack from "../../stack";

export interface DividerProps {}

export const DropdownDivider: React.FC<DividerProps> = () => {
  return <Stack component="li" className="ui-dropdown-menu-divider" />;
};

export default DropdownDivider;
