export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "left-start"
  | "left"
  | "left-end";

export type CrossPlacement = "start" | "center" | "end";

export type AxisX = "left";
export type AxisY = "top";
export type Axis = AxisX | AxisY;

export type UnknownAxis = "left" | "right" | "top" | "bottom";

export type AxisSize = "width" | "height";

export interface Area {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Position {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface Offset extends Area {}

export interface Dimensions extends Area {
  scroll: {
    top: number;
    left: number;
  };
}

export interface PlacementMetadata {
  placement: UnknownAxis;
  crossPlacement: CrossPlacement;
  axis: Axis;
  crossAxis: Axis;
  size: AxisSize;
  crossSize: AxisSize;
}

export const FLIPPED_DIRECTION = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};
