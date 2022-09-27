import { render } from "@testing-library/vue";
import { describe } from "vitest";
import { e } from "vitest/dist/index-6e18a03a";
import { pointerEvent } from "~/interactions/use-hover/__tests__/helpers/pointer-event";
import { fireEvent } from "~/utils/testing";
import { installPointerEvent } from "~/utils/__tests__/events";
import { PressEvent } from "../helpers/create-press-event";
import PressableButton from "./fixtures/pressable-button.vue";

describe("usePress", () => {
  // TODO: JSDOM doesn't yet support pointer events. Once they do, convert these tests.
  // https://github.com/jsdom/jsdom/issues/2527
  describe.each([
    { event: "pointer", isPointerEvent: true },
    { event: "mouse", isPointerEvent: false },
    { event: "touch", isPointerEvent: false },
  ])("", ({ event, isPointerEvent }) => {
    if (isPointerEvent) {
      installPointerEvent();
    }

    let events: PressEvent[] = [];
    const addEvent = (e: PressEvent) => events.push(e);

    afterEach(() => {
      events = [];
    });

    it(`should fire press events based on ${event} events`, async () => {
      const wrapper = render(PressableButton, {
        props: {
          onPress: addEvent,
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressUp: addEvent,
          onPressChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("pressable");

      if (event === "pointer") {
        await fireEvent(
          el,
          pointerEvent("pointerdown", {
            pointerId: 1,
            pointerType: "mouse",
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointerup", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 0,
            clientY: 0,
            altKey: false,
          })
        );
      } else if (event === "mouse") {
        await fireEvent.mouseDown(el, { detail: 1 });
        await fireEvent.mouseUp(el, { detail: 1 });
        await fireEvent.click(el, { detail: 1 });
      } else if (event === "touch") {
        await fireEvent.touchStart(el, {
          targetTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
        await fireEvent.touchEnd(el, {
          changedTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
      }

      const shouldEvent = {
        currentTarget: el,
        target: el,
        pointerType: event === "touch" ? "touch" : "mouse",
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
      };

      expect(events).toEqual([
        {
          ...shouldEvent,
          type: "pressstart",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: true,
        },
        {
          ...shouldEvent,
          type: "pressup",
        },
        {
          ...shouldEvent,
          type: "pressend",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: false,
        },
        {
          ...shouldEvent,
          type: "press",
        },
      ]);
    });

    it(`should fire press change events when moving ${event} outside target`, async () => {
      const wrapper = render(PressableButton, {
        props: {
          onPress: addEvent,
          onPressStart: addEvent,
          onPressEnd: addEvent,
          onPressUp: addEvent,
          onPressChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("pressable");

      const shouldEvent = {
        currentTarget: el,
        target: el,
        pointerType: event === "touch" ? "touch" : "mouse",
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        altKey: false,
      };

      if (event === "pointer") {
        await fireEvent(
          el,
          pointerEvent("pointerdown", {
            pointerId: 1,
            pointerType: "mouse",
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointermove", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 100,
            clientY: 100,
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointerup", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 100,
            clientY: 100,
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointermove", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 0,
            clientY: 0,
            altKey: false,
          })
        );
      } else if (event === "mouse") {
        await fireEvent.mouseDown(el, { detail: 1 });
        await fireEvent.mouseLeave(el);
        await fireEvent.mouseUp(document.body, {
          detail: 1,
          clientX: 100,
          clientY: 100,
        });
        await fireEvent.mouseEnter(el);
      } else if (event === "touch") {
        await fireEvent.touchStart(el, {
          targetTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
        await fireEvent.touchMove(el, {
          changedTouches: [{ identifier: 1, clientX: 100, clientY: 100 }],
        });
        await fireEvent.touchEnd(el, {
          changedTouches: [{ identifier: 1, clientX: 100, clientY: 100 }],
        });
      }

      expect(events).toEqual([
        {
          ...shouldEvent,
          type: "pressstart",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: true,
        },
        {
          ...shouldEvent,
          type: "pressend",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: false,
        },
      ]);

      events = [];

      if (event === "pointer") {
        await fireEvent(
          el,
          pointerEvent("pointerdown", {
            pointerId: 1,
            pointerType: "mouse",
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointermove", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 100,
            clientY: 100,
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointermove", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 0,
            clientY: 0,
            altKey: false,
          })
        );
        await fireEvent(
          el,
          pointerEvent("pointerup", {
            pointerId: 1,
            pointerType: "mouse",
            clientX: 0,
            clientY: 0,
            altKey: false,
          })
        );
      } else if (event === "mouse") {
        await fireEvent.mouseDown(el, { detail: 1 });
        await fireEvent.mouseLeave(el);
        await fireEvent.mouseEnter(el);
        await fireEvent.mouseUp(el, { detail: 1 });
        await fireEvent.click(el, { detail: 1 });
      } else if (event === "touch") {
        await fireEvent.touchStart(el, {
          targetTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
        await fireEvent.touchMove(el, {
          changedTouches: [{ identifier: 1, clientX: 100, clientY: 100 }],
        });
        await fireEvent.touchMove(el, {
          changedTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
        await fireEvent.touchEnd(el, {
          changedTouches: [{ identifier: 1, clientX: 0, clientY: 0 }],
        });
      }

      expect(events).toEqual([
        {
          ...shouldEvent,
          type: "pressstart",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: true,
        },
        {
          ...shouldEvent,
          type: "pressend",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: false,
        },
        {
          ...shouldEvent,
          type: "pressstart",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: true,
        },
        {
          ...shouldEvent,
          type: "pressup",
        },
        {
          ...shouldEvent,
          type: "pressend",
        },
        {
          ...shouldEvent,
          type: "presschange",
          isPressed: false,
        },
        {
          ...shouldEvent,
          type: "press",
        },
      ]);
    });
  });
});
