import React from "react";
import MUICircularProgress from "@mui/material/CircularProgress";
import "./index.scss";

export interface LoadingProps {
  color: "neutral" | "primary";
}

export const Loading: React.FC<LoadingProps> = ({
  color = "neutral",
  ...props
}) => {
  return (
    <MUICircularProgress
      {...props}
      className={["ui-loading", `ui-loading__color--${color}`].join(" ")}
    />
  );
};

export default Loading;
