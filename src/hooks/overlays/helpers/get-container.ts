import { Ref } from "vue";

export interface Container {
  element: Element;
  isBody: boolean;
}

/** Get the nearest ancestor that has a position other than static or document body */
export function getContainer<T extends HTMLElement = HTMLElement>(
  overlayRef: Ref<T | null>
): Container {
  const element = overlayRef.value?.offsetParent ?? document.body;

  return {
    element,
    isBody: element.tagName === "BODY",
  };
}
