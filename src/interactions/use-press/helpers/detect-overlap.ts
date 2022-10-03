interface Point
  extends PointerEvent,
    MouseEvent,
    Pick<Touch, "radiusX" | "radiusY"> {}

function getPointClientRect(point: Point) {
  const offsetX = point.width / 2 || point.radiusX || 0;
  const offsetY = point.height / 2 || point.radiusY || 0;

  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX,
  };
}

export function isTargetContainsPoint(
  target: HTMLElement | null,
  point: Point
) {
  if (!target) {
    return false;
  }

  // Use native API for detect overlap,
  // but jsdom not implement this api and we use fallback.
  if (document.elementFromPoint) {
    // Calculate pointer target because event.target returns for ios always first target.
    const element = document.elementFromPoint(point.clientX, point.clientY);

    return target.contains(element);
  }

  const rect = target.getBoundingClientRect();
  const pointRect = getPointClientRect(point);

  // Check if they cannot overlap on x axis.
  if (rect.left > pointRect.right || pointRect.left > rect.right) {
    return false;
  }

  // Check if they cannot overlap on y axis.
  if (rect.top > pointRect.bottom || pointRect.top > rect.bottom) {
    return false;
  }

  return true;
}
