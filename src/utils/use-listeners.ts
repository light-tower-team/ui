import { onUnmounted, ref } from "vue";

export interface UseListenersResult {
  addListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeListener(
    el: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  removeAllListeners(): void;
}

/**
 * @returns UseListenersResult
 */
export function useListeners(): UseListenersResult {
  const listeners = ref(new Map());

  const addListener = (eventTarget, type, listener, options) => {
    listeners.value.set(listener, { type, eventTarget, options });
    eventTarget.addEventListener(type, listener, options);
  };

  const removeListener = (eventTarget, type, listener, options) => {
    const fn = listeners.value.get(listener)?.fn || listener;
    eventTarget.removeEventListener(type, fn, options);
    listeners.value.delete(listener);
  };

  const removeAllListeners = () => {
    listeners.value.forEach((value, key) => {
      removeListener(value.eventTarget, value.type, key, value.options);
    });
  };

  onUnmounted(() => {
    removeAllListeners();
  });

  return { addListener, removeListener, removeAllListeners };
}
