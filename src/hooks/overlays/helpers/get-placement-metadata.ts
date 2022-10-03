import {
  Axis,
  Placement,
  AxisSize,
  UnknownAxis,
  CrossPlacement,
  PlacementMetadata,
} from "./types";

/** We do not have bottom and right directions, so we replace them on x and y directions */
const AXIS: {
  top: Axis;
  bottom: Axis;
  left: Axis;
  right: Axis;
} = {
  top: "top",
  bottom: "top",
  left: "left",
  right: "left",
};

const CROSS_AXIS: {
  top: Axis;
  left: Axis;
} = {
  top: "left",
  left: "top",
};

const AXIS_SIZE: {
  top: AxisSize;
  left: AxisSize;
} = {
  top: "height",
  left: "width",
};

/** Get a metadata from placement */
export function getPlacementMetadata(input: Placement): PlacementMetadata {
  const [placement, crossPlacement] = input.split("-") as [
    UnknownAxis,
    CrossPlacement | undefined
  ];

  const axis: Axis = AXIS[placement];
  const crossAxis: Axis = CROSS_AXIS[axis];

  const size: AxisSize = AXIS_SIZE[axis];
  const crossSize: AxisSize = AXIS_SIZE[crossAxis];

  return {
    placement,
    crossPlacement: crossPlacement ?? "center",
    axis,
    crossAxis,
    size,
    crossSize,
  };
}
