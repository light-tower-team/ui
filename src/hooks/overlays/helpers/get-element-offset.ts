import { Offset } from "./types";

export function getElementOffset(element: Element): Offset {
  const { top, left, width, height } = element.getBoundingClientRect();
  const { scrollTop, scrollLeft, clientTop, clientLeft } =
    document.documentElement;

  return {
    top: top + scrollTop - clientTop,
    left: left + scrollLeft - clientLeft,
    width,
    height,
  };
}
