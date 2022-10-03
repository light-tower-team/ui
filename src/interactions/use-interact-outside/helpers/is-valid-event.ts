import { Ref } from "vue";

/** @private */
export function isValidEvent<T extends HTMLElement = HTMLElement>(
  e: Event,
  overlayRef: Ref<T | null>
) {
  if ((e as PointerEvent)?.button > 0) return false;

  const target = e.target as Element | undefined;
  const ownerDocument = target?.ownerDocument;

  // if the event target is no longer in the document
  if (!target || !ownerDocument?.documentElement.contains(target)) return false;

  return !overlayRef.value?.contains(target);
}
