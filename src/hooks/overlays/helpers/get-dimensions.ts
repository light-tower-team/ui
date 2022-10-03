import { getElementOffset } from "./get-element-offset";
import { Dimensions } from "./types";

export interface GetDimensionsOptions {
  element: Element;
  viewport?: VisualViewport | null;
}

export function getElementDimensions(
  options: GetDimensionsOptions
): Dimensions {
  const { element, viewport } = options;

  const dimensions: Dimensions = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    scroll: {
      top: 0,
      left: 0,
    },
  };

  if (element.tagName === "BODY") {
    const documentElement = document.documentElement;
    dimensions.width = viewport?.width ?? documentElement.clientWidth;
    dimensions.height = viewport?.height ?? documentElement.clientHeight;

    dimensions.scroll.top = documentElement.scrollTop || element.scrollTop;
    dimensions.scroll.left = documentElement.scrollLeft || element.scrollLeft;
  } else {
    const offset = getElementOffset(element);

    dimensions.top = offset.top;
    dimensions.left = offset.left;
    dimensions.width = offset.width;
    dimensions.height = offset.height;
    dimensions.scroll.top = element.scrollTop;
    dimensions.scroll.left = element.scrollLeft;
  }

  return dimensions;
}
