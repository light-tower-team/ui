export interface UseGlobalListenersResult {
  addGlobalListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addGlobalListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeGlobalListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeGlobalListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  removeAllGlobalListeners(): void;
}

const listeners = new Map();

export function useGlobalListeners(): UseGlobalListenersResult {
  const addGlobalListener = (eventTarget, type, listener, options) => {
    listeners.set(listener, { type, eventTarget, options });
    eventTarget.addEventListener(type, listener, options);
  };

  const removeGlobalListener = (eventTarget, type, listener, options) => {
    const fn = listeners.get(listener)?.fn || listener;
    eventTarget.removeEventListener(type, fn, options);
    listeners.delete(listener);
  };

  const removeAllGlobalListeners = () => {
    listeners.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  };

  return { addGlobalListener, removeGlobalListener, removeAllGlobalListeners };
}
