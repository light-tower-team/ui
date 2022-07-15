import React from "react";
import PropTypes from "prop-types";
import MUIChip, { ChipProps as MUIChipProps } from "@mui/material/Chip";

export interface BadgeProps extends MUIChipProps {}

export const Badge: React.FC<BadgeProps> = (props) => {
  return <MUIChip {...props} className={"ui-badge"} />;
};

Badge.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(["filled", "outlined", null, undefined]),
  avatar: PropTypes.element,
  icon: PropTypes.element,
  size: PropTypes.oneOf(["small", "medium", null, undefined]),
};

export default Badge;
