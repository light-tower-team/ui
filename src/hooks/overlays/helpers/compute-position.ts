import {
  Offset,
  PlacementMetadata,
  Position,
  FLIPPED_DIRECTION,
  Dimensions,
} from "./types";

export interface ComputePositionOptions {
  boundaryDimensions: Dimensions;
  targetOffset: Offset;
  overlayOffset: Offset;
  placementMetadata: PlacementMetadata;
}

export function computePosition(options: ComputePositionOptions): Position {
  const { boundaryDimensions, targetOffset, overlayOffset, placementMetadata } =
    options;
  const { placement, crossPlacement, axis, size, crossAxis, crossSize } =
    placementMetadata;

  const position: Position = {};

  let crossAxisPosition = targetOffset[crossAxis];

  if (crossPlacement === "center") {
    crossAxisPosition +=
      (targetOffset[crossSize] - overlayOffset[crossSize]) / 2;
  } else if (crossPlacement === "end") {
    crossAxisPosition += targetOffset[crossSize] - overlayOffset[crossSize];
  } else if (crossPlacement === "start") {
    /// nothing to do
  }

  position[crossAxis] = crossAxisPosition;

  /// if axis is 'top' and 'left' then inverse direction
  if (placement === axis) {
    position[FLIPPED_DIRECTION[axis]] = Math.floor(
      boundaryDimensions[size] - targetOffset[axis]
    );
  } else {
    position[axis] = Math.floor(targetOffset[axis] + targetOffset[size]);
  }

  return position;
}
