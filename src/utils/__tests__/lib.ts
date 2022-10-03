import {
  fireEvent as fireEventBase,
  render as renderBase,
  RenderOptions,
} from "@testing-library/vue";
import PropBindPlugin from "~/plugins/prop-bind";

export const fireEvent = fireEventBase;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(TestComponent: any, options?: RenderOptions) {
  return renderBase(TestComponent, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), PropBindPlugin],
    },
  });
}
