import { Ref } from "vue";
import { computePosition } from "./compute-position";
import { getAvailableMaxHeight } from "./get-available-max-height";
import { getAvailableSpace } from "./get-available-space";
// import { Container, getContainer } from "./get-container";
import { getElementDimensions } from "./get-dimensions";
import { getElementOffset } from "./get-element-offset";
import { getElementScroll } from "./get-element-scroll";
import { getPlacementMetadata } from "./get-placement-metadata";
import { Dimensions, FLIPPED_DIRECTION, Placement, Position } from "./types";

export interface CalculatePositionOptions<
  B extends HTMLElement = HTMLBodyElement,
  T extends HTMLElement = HTMLElement,
  O extends HTMLElement = HTMLElement
> {
  rootBoundary: B;
  targetRef: Ref<T>;
  overlayRef: Ref<O>;
  placement: Placement;
  shouldFlip?: boolean;
  maxHeight?: Ref<number | undefined>;
}

export interface CalculatedPosition {
  position: Position;
  maxHeight: number;
}

export function calculatePosition<
  B extends HTMLElement = HTMLBodyElement,
  T extends HTMLElement = HTMLElement,
  O extends HTMLElement = HTMLElement
>(options: CalculatePositionOptions<B, T, O>): CalculatedPosition {
  const {
    targetRef,
    overlayRef,
    rootBoundary,
    placement,
    shouldFlip,
    maxHeight,
  } = options;
  // const position: Position = {};

  /** Get the nearest ancestor that has a position other than static or document body */
  // TODO: const container: Container = getContainer(overlayRef);

  let placementMetadata = getPlacementMetadata(placement);

  const boundaryDimensions: Dimensions = getElementDimensions({
    element: rootBoundary,
    viewport: window?.visualViewport,
  });

  /// TODO: check container.isBody
  const targetOffset = getElementOffset(targetRef.value);

  /// TODO: container.isBody
  const overlayOffset = getElementOffset(overlayRef.value);

  const overlayScroll = getElementScroll(overlayRef.value);

  let position = computePosition({
    boundaryDimensions,
    targetOffset,
    overlayOffset,
    placementMetadata,
  });

  let avalibleSpace = getAvailableSpace({
    boundaryDimensions,
    targetOffset,
    placementMetadata,
  });

  if (shouldFlip && overlayScroll[placementMetadata.size] > avalibleSpace) {
    const flippedPlacementMetadata = getPlacementMetadata(
      `${FLIPPED_DIRECTION[placementMetadata.placement]} ${
        placementMetadata.crossPlacement
      }` as Placement
    );

    const flippedPosition = computePosition({
      boundaryDimensions,
      targetOffset,
      overlayOffset,
      placementMetadata: flippedPlacementMetadata,
    });

    const flippedAvalibleSpace = getAvailableSpace({
      boundaryDimensions,
      targetOffset,
      placementMetadata: flippedPlacementMetadata,
    });

    if (flippedAvalibleSpace > avalibleSpace) {
      placementMetadata = flippedPlacementMetadata;
      position = flippedPosition;
      avalibleSpace = flippedAvalibleSpace;
    }
  }

  let availableMaxHeight = getAvailableMaxHeight({
    position,
    boundaryDimensions,
    targetOffset,
  });

  if (maxHeight?.value && maxHeight.value < availableMaxHeight) {
    availableMaxHeight = maxHeight.value;
  }

  position = computePosition({
    boundaryDimensions,
    targetOffset,
    overlayOffset: {
      ...overlayOffset,
      height: Math.min(overlayOffset.height, availableMaxHeight),
    },
    placementMetadata,
  });

  return {
    position,
    maxHeight: availableMaxHeight,
  };
}
