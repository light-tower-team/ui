import matchers from "@testing-library/jest-dom/matchers";
import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import FocusableElement from "./fixtures/focusable-element.vue";

expect.extend(matchers);

describe("useFocusable", () => {
  it("should render component with auto focus", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        autoFocus: true,
      },
    });

    await nextTick();

    const el = wrapper.getByTestId("focusable");
    expect(el).toHaveFocus();
  });

  it("should render disabled component with negative tabIndex", () => {
    const wrapper = render(FocusableElement, {
      props: {
        isDisabled: true,
      },
    });
    const el = wrapper.getByTestId("focusable");
    console.log(el.tabIndex);
    expect(el).toHaveAttribute("tabIndex", "-1");
  });

  it("should render component with custom tabIndex", () => {
    const wrapper = render(FocusableElement, {
      props: {
        tabIndex: 2,
      },
    });
    const el = wrapper.getByTestId("focusable");
    expect(el).toHaveAttribute("tabIndex", "2");
  });

  it("should render component with -1 tabIndex if disabled", async () => {
    const wrapper = render(FocusableElement, {
      props: {
        tabIndex: 2,
      },
    });
    let el = wrapper.getByTestId("focusable");
    expect(el).toHaveAttribute("tabIndex", "2");

    await wrapper.rerender({
      isDisabled: true,
      tabIndex: 2,
    });

    el = wrapper.getByTestId("focusable");
    expect(el).toHaveAttribute("tabIndex", "-1");
  });
});
