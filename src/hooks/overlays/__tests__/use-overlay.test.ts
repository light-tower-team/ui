import { describe, vi } from "vitest";
import { nextTick, ref } from "vue";
import { fireEvent, render } from "~/utils/__tests__/lib";
import { installPointerEvent } from "~/utils/__tests__/events";
import Overlay from "./fixtures/overlay.vue";

describe("useOverlay", () => {
  describe.each([
    {
      event: "pointer",
      prepare: installPointerEvent,
      actions: {
        pressStart: async (el: Element) =>
          await fireEvent.pointerDown(el, { button: 0, pointerId: 1 }),
        pressEnd: async (el: Element) =>
          await fireEvent.pointerUp(el, { button: 0, pointerId: 1 }),
      },
    },
    {
      event: "mouse",
      prepare: () => {},
      actions: {
        pressStart: async (el: Element) =>
          await fireEvent.mouseDown(el, { button: 0 }),
        pressEnd: async (el: Element) =>
          await fireEvent.mouseUp(el, { button: 0 }),
      },
    },
    {
      event: "touch",
      prepare: () => {},
      actions: {
        pressStart: async (el: Element) =>
          await fireEvent.touchStart(el, {
            changedTouches: [{ identifier: 1 }],
          }),
        pressEnd: async (el: Element) =>
          await fireEvent.touchEnd(el, { changedTouches: [{ identifier: 1 }] }),
      },
    },
  ])("$event", ({ prepare, actions: { pressStart, pressEnd } }) => {
    prepare();

    it("should not focus the overlay if a child is focused", async () => {
      const wrapper = render({
        components: {
          Overlay,
        },
        template: `
          <overlay is-open>
            <input ref="inputRef" data-testid="input" />
          </overlay>
        `,
        setup() {
          const inputRef = ref<HTMLInputElement | null>(null);
          return {
            inputRef,
          };
        },
        async mounted() {
          await nextTick();

          this.inputRef.focus();
        },
      });

      await nextTick();

      const input = wrapper.getByTestId("input");
      expect(input).toHaveFocus();
    });

    it("should hide the overlay when clicking outside if isDismissble is true", async () => {
      const onClose = vi.fn();
      render(Overlay, {
        props: {
          isOpen: true,
          isDismissable: true,
          onClose,
        },
      });

      await pressStart(document.body);
      await pressEnd(document.body);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should not hide the overlay when clicking outside if isDismissable is false", async () => {
      const onClose = vi.fn();
      render(Overlay, {
        props: {
          isOpen: true,
          isDismissable: false,
          onClose,
        },
      });

      await pressStart(document.body);
      await pressEnd(document.body);

      expect(onClose).toHaveBeenCalledTimes(0);
    });
  });

  it("should hide the overlay when pressing the escape key", async () => {
    const onClose = vi.fn();
    const wrapper = render(Overlay, {
      props: {
        isOpen: true,
        onClose,
      },
    });
    const el = wrapper.getByTestId("overlay");

    await fireEvent.keyDown(el, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should still hide the overlay when pressing the escape key if isDismissable is false", async () => {
    const onClose = vi.fn();
    const wrapper = render(Overlay, {
      props: {
        isOpen: true,
        isDismissable: false,
        onClose,
      },
    });
    const el = wrapper.getByTestId("overlay");

    await fireEvent.keyDown(el, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
