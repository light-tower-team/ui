import React from "react";
import MUICircularProgress, {
  CircularProgressProps as MUICircularProgressProps,
} from "@mui/material/CircularProgress";

export type LoadingProps = MUICircularProgressProps;

export const Loading: React.FC<LoadingProps> = (props) => {
  return <MUICircularProgress {...props}></MUICircularProgress>;
};

export default Loading;
