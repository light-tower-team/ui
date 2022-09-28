import { describe, expect, it, test, vi } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/vue";
import FocusableElement from "./fixtures/focusable-element.vue";
import FocusableButton from "./fixtures/focusable-button.vue";
import StopPropagationWrapper from "./fixtures/stop-propagation-wrapper.vue";
import { SyntheticFocusEvent } from "../events";

interface ShouldFocusEvent {
  type: string;
  target: Element;
  isFocused: boolean;
}

describe("useFocus", () => {
  let events: ShouldFocusEvent[] = [];
  const addEvent = (e: SyntheticFocusEvent) =>
    events.push({ type: e.type, target: e.target, isFocused: e.isFocused });

  afterEach(() => {
    events = [];
  });

  it("handles focus events on the immediate target", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: addEvent,
      },
    });

    const el = wrapper.getByTestId("root");

    await fireEvent.focusIn(el);
    await fireEvent.focusOut(el);

    expect(events).toEqual([
      { type: "focus", target: el, isFocused: true },
      { type: "focuschange", target: el, isFocused: true },
      { type: "blur", target: el, isFocused: false },
      { type: "focuschange", target: el, isFocused: false },
    ]);
  });

  it("does not handle focus events on children", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: addEvent,
      },
    });

    const el = wrapper.getByTestId("root");
    const child = wrapper.getByTestId("child");

    await fireEvent.focusIn(child);
    await fireEvent.focusOut(child);

    expect(events).toEqual([]);

    await fireEvent.focusIn(el);
    await fireEvent.focusOut(el);

    expect(events).toEqual([
      { type: "focus", target: el, isFocused: true },
      { type: "focuschange", target: el, isFocused: true },
      { type: "blur", target: el, isFocused: false },
      { type: "focuschange", target: el, isFocused: false },
    ]);
  });

  test("does not handle focus events if disabled", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        isDisabled: true,
        onFocus: addEvent,
        onBlur: addEvent,
        onFocusChange: addEvent,
      },
    });

    const el = wrapper.getByTestId("root");

    await fireEvent.focusIn(el);
    await fireEvent.focusOut(el);

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

    await fireEvent.focusIn(el);
    await fireEvent.focusOut(el);

    expect(onInnerFocus).toHaveBeenCalledTimes(1);
    expect(onInnerBlur).toHaveBeenCalledTimes(1);
    expect(onWrapperFocus).not.toHaveBeenCalled();
    expect(onWrapperBlur).not.toHaveBeenCalled();
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

    await fireEvent.focusIn(el);

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
