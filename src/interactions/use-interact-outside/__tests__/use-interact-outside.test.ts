import { describe, it, vi } from "vitest";
import { pointerEvent } from "~/interactions/use-hover/__tests__/helpers/pointer-event";
import { fireEvent, render } from "~/utils/__tests__/lib";
import { installPointerEvent } from "~/utils/__tests__/events";
import Example from "./fixtures/example.vue";
import ExampleWithPortal from "./fixtures/example-with-portal.vue";

// TODO: JSDOM doesn't yet support pointer events. Once they do, convert these tests.
// https://github.com/jsdom/jsdom/issues/2527
describe("useInteractOutside", () => {
  describe.each([
    { event: "pointer", isPointerEvent: true, isPortal: false },
    { event: "mouse", isPointerEvent: false, isPortal: false },
    { event: "touch", isPointerEvent: false, isPortal: false },
    { event: "pointer", isPointerEvent: true, isPortal: true },
    { event: "mouse", isPointerEvent: false, isPortal: true },
    { event: "touch", isPointerEvent: false, isPortal: true },
  ])("", ({ event, isPointerEvent, isPortal }) => {
    if (isPointerEvent) installPointerEvent();

    const Fixture = isPortal ? ExampleWithPortal : Example;

    describe(`${event} events`, () => {
      it(`should fire interact outside events based on ${event} events`, async () => {
        const onInteractOutside = vi.fn();
        const wrapper = render(Fixture, {
          props: {
            onInteractOutside,
          },
        });
        const el = wrapper.getByTestId("test");

        if (event === "pointer") {
          await fireEvent(el, pointerEvent("pointerdown"));
          await fireEvent(el, pointerEvent("pointerup"));
        } else if (event === "mouse") {
          await fireEvent.mouseDown(el);
          await fireEvent.mouseUp(el);
        } else {
          await fireEvent.touchStart(el);
          await fireEvent.touchEnd(el);
        }

        expect(onInteractOutside).not.toHaveBeenCalled();

        if (event === "pointer") {
          await fireEvent(document.body, pointerEvent("pointerdown"));
          await fireEvent(document.body, pointerEvent("pointerup"));
        } else if (event === "mouse") {
          await fireEvent.mouseDown(document.body);
          await fireEvent.mouseUp(document.body);
        } else if (event === "touch") {
          await fireEvent.touchStart(document.body);
          await fireEvent.touchEnd(document.body);
        }

        expect(onInteractOutside).toHaveBeenCalledTimes(1);
      });

      if (event === "touch") {
        it("should ignore emulated mouse events", async () => {
          const onInteractOutside = vi.fn();
          const wrapper = render(Fixture, {
            props: {
              onInteractOutside,
            },
          });
          const el = wrapper.getByTestId("test");

          await fireEvent.touchStart(el);
          await fireEvent.touchEnd(el);
          await fireEvent.mouseUp(el);

          expect(onInteractOutside).not.toHaveBeenCalled();

          await fireEvent.touchStart(document.body);
          await fireEvent.touchEnd(document.body);
          await fireEvent.mouseUp(document.body);

          expect(onInteractOutside).toHaveBeenCalledTimes(1);
        });
      } else {
        it("should only listen for the left mouse button", async () => {
          const onInteractOutside = vi.fn();
          render(Fixture, {
            props: {
              onInteractOutside,
            },
          });

          if (event === "pointer") {
            await fireEvent(
              document.body,
              pointerEvent("pointerdown", { button: 1 })
            );
            await fireEvent(
              document.body,
              pointerEvent("pointerup", { button: 1 })
            );
          } else if (event === "mouse") {
            await fireEvent.mouseDown(document.body, { button: 1 });
            await fireEvent.mouseUp(document.body, { button: 1 });
          }
          expect(onInteractOutside).not.toHaveBeenCalled();

          if (event === "pointer") {
            await fireEvent(
              document.body,
              pointerEvent("pointerdown", { button: 0 })
            );
            await fireEvent(
              document.body,
              pointerEvent("pointerup", { button: 0 })
            );
          } else if (event === "mouse") {
            await fireEvent.mouseDown(document.body, { button: 0 });
            await fireEvent.mouseUp(document.body, { button: 0 });
          }

          expect(onInteractOutside).toHaveBeenCalledTimes(1);
        });
      }

      it(`should not fire interact outside if there is a ${event} up event without a ${event} down first`, async () => {
        // Fire pointer down before component with useInteractOutside is mounted
        if (event === "pointer") {
          await fireEvent(document.body, pointerEvent("pointerdown"));
        } else if (event === "mouse") {
          await fireEvent.mouseDown(document.body);
        } else if (event === "touch") {
          await fireEvent.touchStart(document.body);
        }

        const onInteractOutside = vi.fn();
        render(Fixture, {
          props: {
            onInteractOutside,
          },
        });

        if (event === "pointer") {
          await fireEvent(document.body, pointerEvent("pointerup"));
        } else if (event === "mouse") {
          await fireEvent.mouseUp(document.body);
        } else if (event === "touch") {
          await fireEvent.touchEnd(document.body);
        }

        expect(onInteractOutside).not.toHaveBeenCalled();
      });
    });
  });
});
