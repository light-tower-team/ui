import { Offset } from "./types";

export function getElementScroll(element: Element): Offset {
  return {
    top: element.scrollTop,
    left: element.scrollLeft,
    width: element.scrollWidth,
    height: element.scrollHeight,
  };
}
