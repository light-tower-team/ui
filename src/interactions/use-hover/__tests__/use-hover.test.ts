import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render } from "~/utils/__tests__/lib";
import { installPointerEvent } from "~/utils/__tests__/events";
import { HoverEvent } from "..";
import HoverableElement from "./fixtures/hoverable-element.vue";
import { pointerEvent } from "./helpers/pointer-event";

describe("useHover", () => {
  let events: HoverEvent[] = [];
  const addEvent = (e: HoverEvent) => events.push(e);

  afterEach(() => {
    events = [];
  });

  it("does not handle hover events if disabled", async () => {
    const wrapper = render(HoverableElement, {
      props: {
        isDisabled: true,
        onHoverStart: addEvent,
        onHoverEnd: addEvent,
        onHoverChange: addEvent,
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.mouseEnter(el);
    await fireEvent.mouseLeave(el);

    expect(events).toEqual([]);
  });

  describe("pointer events", () => {
    installPointerEvent();

    it("should fire hover events based on pointer events", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });

      const el = wrapper.getByTestId("root");
      await fireEvent(
        el,
        pointerEvent("pointerenter", { pointerType: "mouse" })
      );
      await fireEvent(
        el,
        pointerEvent("pointerleave", { pointerType: "mouse" })
      );

      expect(events).toEqual([
        {
          type: "hoverstart",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverend",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
      ]);
    });

    it("should not fire hover events when pointerType is touch", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });

      const el = wrapper.getByTestId("root");
      await fireEvent(
        el,
        pointerEvent("pointerenter", { pointerType: "touch" })
      );
      await fireEvent(
        el,
        pointerEvent("pointerleave", { pointerType: "touch" })
      );

      expect(events).toEqual([]);
    });

    it("should visually change component with pointer events", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("root");

      await fireEvent(
        el,
        pointerEvent("pointerenter", { pointerType: "mouse" })
      );
      expect(el.textContent?.trim()).toBe("test-hovered");

      await fireEvent(
        el,
        pointerEvent("pointerleave", { pointerType: "mouse" })
      );
      expect(el.textContent?.trim()).toBe("test");
    });

    it("should not visually change component when pointerType is touch", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("root");

      await fireEvent(
        el,
        pointerEvent("pointerenter", { pointerType: "touch" })
      );
      expect(el.textContent?.trim()).toBe("test");

      await fireEvent(
        el,
        pointerEvent("pointerleave", { pointerType: "touch" })
      );
      expect(el.textContent?.trim()).toBe("test");
    });

    it("should end hover when disabled", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      let el = wrapper.getByTestId("root");

      await fireEvent(
        el,
        pointerEvent("pointerenter", { pointerType: "mouse" })
      );

      expect(el.textContent?.trim()).toBe("test-hovered");
      expect(events).toEqual([
        {
          type: "hoverstart",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
      ]);
      events.pop();
      events.pop();

      await wrapper.rerender({
        isDisabled: true,
        onHoverStart: addEvent,
        onHoverEnd: addEvent,
        onHoverChange: addEvent,
      });

      el = wrapper.getByTestId("root");

      expect(el.textContent?.trim()).toBe("test");
      expect(events).toEqual([
        {
          type: "hoverend",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
      ]);
    });
  });

  describe("mouse events", () => {
    it("should fire hover events based on mouse events", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });

      const el = wrapper.getByTestId("root");
      await fireEvent.mouseEnter(el);
      await fireEvent.mouseLeave(el);

      expect(events).toEqual([
        {
          type: "hoverstart",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverend",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
      ]);
    });

    it("should visually change component with pointer events", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("root");

      await fireEvent.mouseEnter(el);
      expect(el.textContent?.trim()).toBe("test-hovered");

      await fireEvent.mouseLeave(el);
      expect(el.textContent?.trim()).toBe("test");
    });

    it.todo("ignores emulated mouse events following touch events");

    it("should end hover when disabled", async () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      let el = wrapper.getByTestId("root");

      await fireEvent.mouseEnter(el);
      expect(el.textContent?.trim()).toBe("test-hovered");
      expect(events).toEqual([
        {
          type: "hoverstart",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: true,
        },
      ]);
      events.pop();
      events.pop();

      await wrapper.rerender({
        isDisabled: true,
        onHoverStart: addEvent,
        onHoverEnd: addEvent,
        onHoverChange: addEvent,
      });
      el = wrapper.getByTestId("root");

      expect(el.textContent?.trim()).toBe("test");
      expect(events).toEqual([
        {
          type: "hoverend",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
        {
          type: "hoverchange",
          target: el,
          pointerType: "mouse",
          isHovering: false,
        },
      ]);
      fireEvent.mouseLeave(el);
    });
  });

  describe("touch events", () => {
    it("should not fire hover events based on touch events", () => {
      const wrapper = render(HoverableElement, {
        props: {
          onHoverStart: addEvent,
          onHoverEnd: addEvent,
          onHoverChange: addEvent,
        },
      });
      const el = wrapper.getByTestId("root");

      fireEvent.touchStart(el);
      fireEvent.touchMove(el);
      fireEvent.touchEnd(el);

      expect(events).toEqual([]);
    });
    it("should not visually change component with touch events", async () => {
      const wrapper = render(HoverableElement);
      const el = wrapper.getByTestId("root");

      await fireEvent.touchStart(el);
      expect(el.textContent?.trim()).toBe("test");

      await fireEvent.touchMove(el);
      expect(el.textContent?.trim()).toBe("test");

      await fireEvent.touchEnd(el);
      expect(el.textContent?.trim()).toBe("test");
    });
  });
});
