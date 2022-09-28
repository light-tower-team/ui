import { render, waitFor } from "@testing-library/vue";
import { describe, it, vi } from "vitest";
import { fireEvent } from "~/utils/testing";
import { useFocusWithin } from "../use-focus-within";
import FocusableElement from "./fixtures/focus-within-element.vue";

describe("useFocusWithin", () => {
  let events: (FocusEvent | { isFocused: boolean })[] = [];
  const addEvent = (e: FocusEvent & { isFocused: boolean }) =>
    events.push({ type: e.type, target: e.target, isFocused: e.isFocused });

  afterEach(() => {
    events = [];
  });

  it("handles focus events on the target itself", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        onFocusWithin: addEvent,
        onBlurWithin: addEvent,
        onFocusWithinChange: addEvent,
      },
    });
    const el = wrapper.getByTestId("focusable");

    await fireEvent.focusIn(el);
    await fireEvent.focusOut(el);

    expect(events).toEqual([
      { type: "focus", target: el, isFocused: true },
      { type: "focuschange", target: el, isFocused: true },
      { type: "blur", target: el, isFocused: false },
      { type: "focuschange", target: el, isFocused: false },
    ]);
  });

  it("does handle focus events on children", async () => {
    const wrapper = render(
      {
        components: {
          FocusableElement,
        },
        template: `
          <focusable-element>
            <div tabindex="-1" data-testid="child" />
          </focusable-element>
        `,
      },
      {
        props: {
          onFocusWithin: addEvent,
          onBlurWithin: addEvent,
          onFocusWithinChange: addEvent,
        },
      }
    );
    const el = wrapper.getByTestId("focusable");
    const child = wrapper.getByTestId("child");

    await fireEvent.focusIn(child);
    await fireEvent.focusIn(el);
    await fireEvent.focusIn(child);
    await fireEvent.focusOut(child);

    expect(events).toEqual([
      { type: "focus", target: child, isFocused: true },
      { type: "focuschange", target: child, isFocused: true },
      { type: "blur", target: child, isFocused: false },
      { type: "focuschange", target: child, isFocused: false },
    ]);
  });

  it("does not handle focus events if disabled", async () => {
    const wrapper = render(
      {
        components: {
          FocusableElement,
        },
        template: `
          <focusable-element>
            <div tabindex="-1" data-testid="child" />
          </focusable-element>
        `,
      },
      {
        props: {
          isDisabled: true,
          onFocusWithin: addEvent,
          onBlurWithin: addEvent,
          onFocusWithinChange: addEvent,
        },
      }
    );
    const child = wrapper.getByTestId("child");

    await fireEvent.focusIn(child);
    await fireEvent.focusOut(child);

    expect(events).toEqual([]);
  });

  it("events do not bubble when stopPropagation is called", async () => {
    const onWrapperFocus = vi.fn();
    const onWrapperBlur = vi.fn();
    const onInnerFocus = vi.fn((e: FocusEvent) => e.stopPropagation());
    const onInnerBlur = vi.fn((e: FocusEvent) => e.stopPropagation());
    const wrapper = render(
      {
        components: {
          FocusableElement,
        },
        props: [
          "onWrapperFocus",
          "onWrapperBlur",
          "onInnerFocus",
          "onInnerBlur",
        ],
        template: `
          <div @focusin="onWrapperFocus" @focusout="onWrapperBlur">
            <focusable-element :onFocusWithin="onInnerFocus" :onBlurWithin="onInnerBlur">
              <div tabindex="-1" data-testid="child" />
            </focusable-element>
          </div>
        `,
      },
      {
        props: {
          onWrapperFocus,
          onWrapperBlur,
          onInnerFocus,
          onInnerBlur,
        },
      }
    );

    const child = wrapper.getByTestId("child");

    await fireEvent.focusIn(child);
    await fireEvent.focusOut(child);

    expect(onInnerFocus).toHaveBeenCalledTimes(1);
    expect(onInnerBlur).toHaveBeenCalledTimes(1);
    expect(onWrapperFocus).not.toHaveBeenCalled();
    expect(onWrapperBlur).not.toHaveBeenCalled();
  });

  it("events bubble by default", async () => {
    const onWrapperFocus = vi.fn();
    const onWrapperBlur = vi.fn();
    const onInnerFocus = vi.fn();
    const onInnerBlur = vi.fn();
    const wrapper = render(
      {
        components: {
          FocusableElement,
        },
        props: [
          "onWrapperFocus",
          "onWrapperBlur",
          "onInnerFocus",
          "onInnerBlur",
        ],
        template: `
          <div @focusin="onWrapperFocus" @focusout="onWrapperBlur">
            <focusable-element :onFocusWithin="onInnerFocus" :onBlurWithin="onInnerBlur">
              <div tabindex="-1" data-testid="child" />
            </focusable-element>
          </div>
        `,
      },
      {
        props: {
          onWrapperFocus,
          onWrapperBlur,
          onInnerFocus,
          onInnerBlur,
        },
      }
    );

    const child = wrapper.getByTestId("child");

    await fireEvent.focusIn(child);
    await fireEvent.focusOut(child);

    expect(onInnerFocus).toHaveBeenCalledTimes(1);
    expect(onInnerBlur).toHaveBeenCalledTimes(1);
    expect(onWrapperFocus).toHaveBeenCalledTimes(1);
    expect(onWrapperBlur).toHaveBeenCalledTimes(1);
  });

  it("should fire onBlur when a focused element is disabled", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const wrapper = render(
      {
        props: ["disabled", "onFocusWithin", "onBlurWithin"],
        setup(props) {
          return useFocusWithin(props);
        },
        template: `
          <div v-bind="focusWithinProps">
            <button :disabled="disabled" data-testid="btn">Button</button>
          </div>
        `,
      },
      {
        props: {
          onFocusWithin: onFocus,
          onBlurWithin: onBlur,
        },
      }
    );
    const el = wrapper.getByTestId("btn");

    await fireEvent.focusIn(el);

    expect(onFocus).toHaveBeenCalled();

    await wrapper.rerender({
      disabled: true,
      onFocusWithin: onFocus,
      onBlurWithin: onBlur,
    });

    await waitFor(() => expect(onBlur).toHaveBeenCalled());
  });
});
