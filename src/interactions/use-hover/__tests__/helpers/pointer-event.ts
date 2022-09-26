export function pointerEvent(type, opts) {
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
