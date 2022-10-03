import { describe, vi } from "vitest";
import { nextTick } from "vue";
import OverlayPosition from "./fixtures/overlay-position.vue";
import { Offset } from "../helpers/types";
import { fireEvent, render } from "~/utils/__tests__/lib";

HTMLElement.prototype.getBoundingClientRect = function () {
  return {
    left: parseInt(this.style.left, 10) || 0,
    top: parseInt(this.style.top, 10) || 0,
    width: parseInt(this.style.width, 10) || 0,
    height: parseInt(this.style.height, 10) || 0,

    /// for implementation
    x: -1,
    y: -1,
    right: -1,
    bottom: -1,
    toJSON() {},
  };
};

const VIEWPORT_WIDTH = 1460;
const VIEWPORT_HEIGHT = 1080;

describe("useOverlayPosition", () => {
  const triggerOffset: Offset = {
    left: 30,
    top: 200,
    width: 100,
    height: 36,
  };

  const overlayOffset: Offset = {
    left: 0,
    top: 0,
    width: 100,
    height: 300,
  };

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: VIEWPORT_WIDTH,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: VIEWPORT_HEIGHT,
    });
  });

  it("should position the overlay relative to the trigger. Default placement is 'bottom-start'", async () => {
    const wrapper = render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
      },
    });

    const overlay = wrapper.getByTestId("overlay");

    await nextTick();

    expect(overlay).toHaveStyle(`
      position: absolute;
      left: ${triggerOffset.left}px;
      top: ${triggerOffset.top + triggerOffset.height}px;
      max-height: ${
        VIEWPORT_HEIGHT - triggerOffset.top - triggerOffset.height
      }px;
    `);
  });

  it("should update the position on window resize", async () => {
    const wrapper = render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
      },
    });

    const overlay = wrapper.getByTestId("overlay");

    await nextTick();

    expect(overlay).toHaveStyle(`
      position: absolute;
      left: ${triggerOffset.left}px;
      top: ${triggerOffset.top + triggerOffset.height}px;
      max-height: ${
        VIEWPORT_HEIGHT - triggerOffset.top - triggerOffset.height
      }px;
    `);

    const NEW_VIEWPORT_HEIGHT = 1080;

    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: NEW_VIEWPORT_HEIGHT,
    });

    await fireEvent(window, new Event("resize"));

    expect(overlay).toHaveStyle(`
      position: absolute;
      left: ${triggerOffset.left}px;
      top: ${triggerOffset.top + triggerOffset.height}px;
      max-height: ${
        NEW_VIEWPORT_HEIGHT - triggerOffset.top - triggerOffset.height
      }px;
    `);
  });

  it("should update the overlay's maxHeight by the given one if it's smaller than available viewport height", async () => {
    const INITIAL_MAX_HEIGHT = 450;

    const wrapper = render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
        maxHeight: INITIAL_MAX_HEIGHT,
      },
    });

    const overlay = wrapper.getByTestId("overlay");

    await nextTick();

    expect(overlay).toHaveStyle(`
      position: absolute;
      left: ${triggerOffset.left}px;
      top: ${triggerOffset.top + triggerOffset.height}px;
      max-height: ${INITIAL_MAX_HEIGHT}px;
    `);

    const NEW_MAX_HEIGHT = 300;

    await wrapper.rerender({
      triggerOffset,
      overlayOffset,
      maxHeight: NEW_MAX_HEIGHT,
    });

    expect(overlay).toHaveStyle(`
      position: absolute;
      left: ${triggerOffset.left}px;
      top: ${triggerOffset.top + triggerOffset.height}px;
      max-height: ${NEW_MAX_HEIGHT}px;
    `);
  });

  it("should close the overlay when the trigger scrolls", async () => {
    const onClose = vi.fn();

    const wrapper = render(
      {
        components: {
          OverlayPosition,
        },
        props: ["triggerOffset", "overlayOffset", "onClose"],
        template: `
          <div data-testid="scrollable">
            <overlay-position :trigger-offset="triggerOffset" :overlay-offset="overlayOffset" @close="onClose" />
          </div>
        `,
      },
      {
        props: {
          triggerOffset,
          overlayOffset,
          onClose,
        },
      }
    );

    const scrollable = wrapper.getByTestId("scrollable");

    await nextTick();

    await fireEvent.scroll(scrollable);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not close the overlay when an adjacent scrollable region scrolls", async () => {
    const onClose = vi.fn();

    const wrapper = render(
      {
        components: {
          OverlayPosition,
        },
        props: ["triggerOffset", "overlayOffset", "onClose"],
        template: `
          <div>
            <overlay-position :trigger-offset="triggerOffset" :overlay-offset="overlayOffset" @close="onClose" />
            <div data-testid="scrollable">test</div>
          </div>
        `,
      },
      {
        props: {
          triggerOffset,
          overlayOffset,
          onClose,
        },
      }
    );

    const scrollable = wrapper.getByTestId("scrollable");

    await fireEvent.scroll(scrollable);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should close the overlay when the body scrolls", async () => {
    const onClose = vi.fn();

    render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
        onClose,
      },
    });

    await fireEvent.scroll(document.body);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should close the overlay when the document scrolls", async () => {
    const onClose = vi.fn();

    render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
        onClose,
      },
    });

    await fireEvent.scroll(document);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should close the overlay when target is window in a scroll event", async () => {
    const onClose = vi.fn();

    render(OverlayPosition, {
      props: {
        triggerOffset,
        overlayOffset,
        onClose,
      },
    });

    await fireEvent.scroll(window);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
