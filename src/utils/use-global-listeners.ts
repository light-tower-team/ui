import { onUnmounted, ref } from "vue";

export interface UseGlobalListenersResult {
  addGlobalListener<K extends keyof DocumentEventMap>(
    el: EventTarget,
    type: K,
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

export function useGlobalListeners(): UseGlobalListenersResult {
  const globalListeners = ref(new Map());

  const addGlobalListener = (eventTarget, type, listener, options) => {
    globalListeners.value.set(listener, { type, eventTarget, options });
    eventTarget.addEventListener(type, listener, options);
  };

  const removeGlobalListener = (eventTarget, type, listener, options) => {
    const fn = globalListeners.value.get(listener)?.fn || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.value.delete(listener);
  };

  const removeAllGlobalListeners = () => {
    globalListeners.value.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  };

  onUnmounted(() => {
    removeAllGlobalListeners();
  });

  return { addGlobalListener, removeGlobalListener, removeAllGlobalListeners };
}
