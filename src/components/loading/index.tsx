import React from "react";
import MUICircularProgress from "@mui/material/CircularProgress";
import "./index.scss";

export interface LoadingProps {
  className?: string;
  size?: number;
  color?: "neutral" | "primary"; // for correct display in the storybook
}

export const Loading: React.FC<LoadingProps> = ({
  color = "neutral",
  size = 24,
  className,
  ...props
}) => {
  return (
    <MUICircularProgress
      {...props}
      color={color}
      className={["ui-loading", className].join(" ")}
      style={{ width: size, height: size }}
    />
  );
};

export default Loading;
