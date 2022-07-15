import React from "react";
import MUIPortal, { PortalProps as MUIPortalProps } from "@mui/material/Portal";

export type PortalProps = MUIPortalProps;

export const Portal: React.FC<PortalProps> = ({ children, ...props }) => {
  return <MUIPortal {...props}>{children}</MUIPortal>;
};

export default Portal;
