import React from "react";
import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  Toolbar,
} from "@mui/material";
import "./index.scss";

export interface AppBarProps extends MUIAppBarProps {}

export const AppBar: React.FC<AppBarProps> = ({ children, ...props }) => {
  return (
    <MUIAppBar
      elevation={0}
      position="sticky"
      {...props}
      className="ui-app-bar"
    >
      <Toolbar>{children}</Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
