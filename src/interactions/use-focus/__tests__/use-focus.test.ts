import { describe, expect, it, test, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/vue";
import FocusableElement from "./fixtures/focusable-element.vue";
import FocusableButton from "./fixtures/focusable-button.vue";
import CaptureWrapper from "./fixtures/capture-wrapper.vue";
import StopPropagationWrapper from "./fixtures/stop-propagation-wrapper.vue";

interface ShouldFocusEvent {
  type: string;
  target?: string;
  focused?: boolean;
}

describe("useFocus", () => {
  it("handles focus events on the immediate target", async () => {
    const events: ShouldFocusEvent[] = [];
    const addEvent = e => events.push({ type: e.type, target: e.target });
    const wrapper = render(FocusableElement, {
      props: {
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: focused => events.push({ type: "focuschange", focused }),
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.focus(el);
    await fireEvent.blur(el);

    expect(events).toEqual([
      { type: "focus", target: el },
      { type: "focuschange", focused: true },
      { type: "blur", target: el },
      { type: "focuschange", focused: false },
    ]);
  });

  it("does not handle focus events on children", async () => {
    const events: ShouldFocusEvent[] = [];
    const addEvent = e => events.push({ type: e.type, target: e.target });
    const wrapper = render(FocusableElement, {
      props: {
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: focused => events.push({ type: "focuschange", focused }),
      },
    });

    const el = wrapper.getByTestId("root");
    const child = wrapper.getByTestId("child");

    await fireEvent.focus(child);
    await fireEvent.blur(child);

    expect(events).toEqual([]);

    await fireEvent.focus(el);
    await fireEvent.blur(el);

    expect(events).toEqual([
      { type: "focus", target: el },
      { type: "focuschange", focused: true },
      { type: "blur", target: el },
      { type: "focuschange", focused: false },
    ]);
  });

  test("does not handle focus events if disabled", async () => {
    const events: ShouldFocusEvent[] = [];
    const addEvent = e => events.push({ type: e.type, target: e.target });
    const wrapper = render(FocusableElement, {
      props: {
        isDisabled: true,
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: focused => events.push({ type: "focuschange", focused }),
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.focus(el);
    await fireEvent.blur(el);

    expect(events).toEqual([]);
  });

  test("events do not bubble when stopPropagation is called", async () => {
    const onWrapperFocus = vi.fn();
    const onWrapperBlur = vi.fn();
    const onInnerFocus = vi.fn(e => e.stopPropagation());
    const onInnerBlur = vi.fn(e => e.stopPropagation());

    const wrapper = render(StopPropagationWrapper, {
      props: {
        onInnerFocus: onInnerFocus,
        onInnerBlur: onInnerBlur,
        onWrapperFocus: onWrapperFocus,
        onWrapperBlur: onWrapperBlur,
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.focus(el);
    await fireEvent.blur(el);

    expect(onInnerFocus).toHaveBeenCalledTimes(1);
    expect(onInnerBlur).toHaveBeenCalledTimes(1);
    expect(onWrapperFocus).not.toHaveBeenCalled();
    expect(onWrapperBlur).not.toHaveBeenCalled();
  });

  test("events bubble by with capture attr", async () => {
    const onWrapperFocus = vi.fn();
    const onWrapperBlur = vi.fn();
    const onInnerFocus = vi.fn();
    const onInnerBlur = vi.fn();

    const wrapper = render(CaptureWrapper, {
      props: {
        onInnerFocus: onInnerFocus,
        onInnerBlur: onInnerBlur,
        onWrapperFocus: onWrapperFocus,
        onWrapperBlur: onWrapperBlur,
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.focus(el);
    await fireEvent.blur(el);

    expect(onInnerFocus).toHaveBeenCalledTimes(1);
    expect(onInnerBlur).toHaveBeenCalledTimes(1);
    expect(onWrapperFocus).toHaveBeenCalledTimes(0);
    expect(onWrapperBlur).toHaveBeenCalledTimes(0);
  });

  test("should fire onBlur when a focused Fixture is disabled", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const wrapper = render(FocusableButton, {
      props: {
        onFocus,
        onBlur,
      },
    });

    const el = wrapper.getByTestId("root");
    await fireEvent.focus(el);

    expect(onFocus).toHaveBeenCalled();

    await wrapper.rerender({
      isDisabled: true,
      onFocus,
      onBlur,
    });

    // MutationObserver is async
    await waitFor(() => expect(onBlur).toHaveBeenCalled());
  });
});
