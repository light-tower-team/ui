import { Dimensions, Offset, Position } from "./types";

export interface GetAvailableMaxHeightOptions {
  position: Position;
  boundaryDimensions: Dimensions;
  targetOffset: Offset;
}

export function getAvailableMaxHeight(options: GetAvailableMaxHeightOptions) {
  const { position, boundaryDimensions, targetOffset } = options;

  /// We want the distance between the top of the overlay to the bottom of the boundary
  if (position.top) {
    return Math.max(
      0,
      boundaryDimensions.height +
        boundaryDimensions.top +
        boundaryDimensions.scroll.top -
        position.top
    );
  }

  // We want the distance between the top of the trigger to the top of the boundary
  return Math.max(
    0,
    targetOffset.top - boundaryDimensions.top - boundaryDimensions.scroll.top
  );
}
