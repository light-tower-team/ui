import React from "react";
import MUICircularProgress from "@mui/material/CircularProgress";
import "./index.scss";

export interface LoadingProps {
  color?: "neutral" | "primary"; // for correct display in the storybook
}

export const Loading: React.FC<LoadingProps> = ({
  color = "neutral",
  ...props
}) => {
  return (
    <MUICircularProgress {...props} color={color} className="ui-loading" />
  );
};

export default Loading;
