import { PointerType } from "~/shared";

export function pointerEvent<K extends keyof DocumentEventMap>(
  type: K,
  opts: {
    pointerId?: number;
    pointerType?: PointerType;
    button?: number;
    altKey?: boolean;
    clientX?: number;
    clientY?: number;
  } = {}
): Event {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(
    event,
    {
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      button: opts.button || 0,
    },
    opts
  );
  return event;
}
