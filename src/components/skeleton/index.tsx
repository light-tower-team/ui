import React from "react";
import MUISkeleton, {
  SkeletonProps as MUISkeletonProps,
} from "@mui/material/Skeleton";

export type SkeletonProps = MUISkeletonProps;

export const Skeleton: React.FC<SkeletonProps> = props => {
  return <MUISkeleton {...props}></MUISkeleton>;
};

export default Skeleton;
