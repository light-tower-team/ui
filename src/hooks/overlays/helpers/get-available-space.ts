import { Dimensions, Offset, PlacementMetadata } from "./types";

export interface GetAvailableSpaceOptions {
  boundaryDimensions: Dimensions;
  placementMetadata: PlacementMetadata;
  targetOffset: Offset;
}

export function getAvailableSpace(options: GetAvailableSpaceOptions): number {
  const { boundaryDimensions, placementMetadata, targetOffset } = options;
  const { axis } = placementMetadata;

  return Math.max(
    0,
    targetOffset[axis] -
      boundaryDimensions[axis] -
      boundaryDimensions.scroll[axis]
  );
}
