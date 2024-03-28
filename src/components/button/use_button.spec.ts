import { ButtonProps, useButton } from "./use_button";

const expectButtonProps = (current: ButtonProps, required: Partial<ButtonProps>): void => {
  expect(current.type).toEqual(required.type);
  expect(current.disabled).toEqual(required.disabled);
  expect(current.tabIndex).toEqual(required.tabIndex);
  expect(current.href).toEqual(required.href);
  expect(current.to).toEqual(required.to);
  expect(current.role).toEqual(required.role);
  expect(current.ariaDisabled).toEqual(required.ariaDisabled);
  expect(current.ariaLabel).toEqual(required.ariaLabel);
  expect(current["data-pressed"]).toEqual(required["data-pressed"]);
  expect(current.onclick).toBeInstanceOf(Function);
  expect(current.onkeydown).toBeInstanceOf(Function);
  expect(current.onkeyup).toBeInstanceOf(Function);
};

describe("useButton", () => {
  it("should have default structure", () => {
    const { is, buttonProps } = useButton();

    expect(is).toEqual("button");
    expectButtonProps(buttonProps, { type: "button" });
  });

  describe("interactive", () => {
    describe.each([
      { tag: "button", type: "button" },
      { tag: "input", type: "button" },
      { tag: "input", type: "submit" },
      { tag: "input", type: "reset" },
    ] as const)("disabled button with $tag tag and $type type", ({ tag, type }) => {
      it("should has disabled attr when 'disabled' is set", () => {
        const { is, buttonProps } = useButton({
          is: tag,
          type,
          disabled: true,
        });

        expect(is).toEqual(tag);
        expectButtonProps(buttonProps, { type, disabled: true });
      });

      it("should has aria-disabled='true' attr when 'disabled' and 'visuallyDisabled' are set", () => {
        const { is, buttonProps } = useButton({
          is: tag,
          type,
          disabled: true,
          visuallyDisabled: true,
        });

        expect(is).toEqual(tag);
        expectButtonProps(buttonProps, { type, ariaDisabled: true });
      });
    });
  });

  describe("non-interactive", () => {
    it("should has role='button' and tabIndex='0' attrs by default", () => {
      const { is, buttonProps } = useButton({ is: "span" });

      expect(is).toEqual("span");
      expectButtonProps(buttonProps, { role: "button", tabIndex: 0 });
    });

    it("should has aria-disabled='true' and tabindex='-1' when 'disabled' is set", () => {
      const { is, buttonProps } = useButton({ is: "span", disabled: true });

      expect(is).toEqual("span");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        tabIndex: -1,
      });
    });

    it("should has aria-disabled='true' and tabIndex='0' attrs when 'disabled' and 'visuallyDisabled' are set", () => {
      const { is, buttonProps } = useButton({
        is: "span",
        disabled: true,
        visuallyDisabled: true,
      });

      expect(is).toEqual("span");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        tabIndex: 0,
      });
    });

    it("should have aria-disabled='true' and tabIndex='-1' attrs when 'loading' is set", () => {
      const { is, buttonProps } = useButton({
        is: "span",
        loading: true,
      });

      expect(is).toEqual("span");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        tabIndex: -1,
      });
    });

    it("should have aria-disabled='true' and tabIndex='0' attrs when 'loading' and 'visuallyDisabled' are set", () => {
      const { is, buttonProps } = useButton({
        is: "span",
        loading: true,
        visuallyDisabled: true,
      });

      expect(is).toEqual("span");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        tabIndex: 0,
      });
    });
  });

  describe("link", () => {
    it("should has aria-disabled='true' and tabIndex='-1' attr when 'disabled' is set", () => {
      const { is, buttonProps } = useButton({ href: "#", disabled: true });

      expect(is).toEqual("a");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        href: "#",
        tabIndex: -1,
      });
    });

    it("should has aria-disabled='true' and tabIndex='0' attr when 'disabled' and 'visuallyDisabled' are set", () => {
      const { is, buttonProps } = useButton({
        href: "#",
        disabled: true,
        visuallyDisabled: true,
      });

      expect(is).toEqual("a");
      expectButtonProps(buttonProps, {
        role: "button",
        ariaDisabled: true,
        href: "#",
        tabIndex: 0,
      });
    });

    it("should have aria-disabled='true' and tabIndex='-1' attrs when 'loading' is set", () => {
      const { is, buttonProps } = useButton({
        href: "#",
        loading: true,
      });

      expect(is).toEqual("a");
      expectButtonProps(buttonProps, {
        href: "#",
        role: "button",
        ariaDisabled: true,
        tabIndex: -1,
      });
    });

    it("should have aria-disabled='true' and tabIndex='0' attrs when 'loading' and 'visuallyDisabled' are set", () => {
      const { is, buttonProps } = useButton({
        href: "#",
        loading: true,
        visuallyDisabled: true,
      });

      expect(is).toEqual("a");
      expectButtonProps(buttonProps, {
        href: "#",
        role: "button",
        ariaDisabled: true,
        tabIndex: 0,
      });
    });
  });

  describe("events", () => {
    describe("interactive", () => {
      it("should emit pressed event when clicked", () => {
        const onPressed = vi.fn();
        const event = new MouseEvent("click");

        const { buttonProps } = useButton({ onPressed });

        buttonProps.onclick(event);

        expect(onPressed).toHaveBeenCalledOnce();
        expect(onPressed).toHaveBeenCalledWith(event);
      });

      it("should not emit pressed event when clicked and disabled", () => {
        const onPressed = vi.fn();
        const event = new MouseEvent("click");

        const { buttonProps } = useButton({ onPressed, disabled: true });

        buttonProps.onclick(event);

        expect(onPressed).not.toHaveBeenCalled();
      });

      it("should not call preventDefault when key down event emitted", () => {
        const event = new KeyboardEvent("keydown", { key: "Enter" });

        const { buttonProps } = useButton();

        buttonProps.onkeydown(event);

        expect(event.defaultPrevented).toBeFalsy();
      });

      it("should not emit pressed event when enter key pressed", () => {
        const onPressed = vi.fn();
        const event = new KeyboardEvent("keydown", { key: "Enter" });

        const { buttonProps } = useButton({ onPressed });

        buttonProps.onkeydown(event);

        expect(onPressed).not.toHaveBeenCalled();
      });

      it("should not be pressed when space key pressed", () => {
        const event = new KeyboardEvent("keydown", { key: " " });

        const { buttonProps } = useButton();

        buttonProps.onkeydown(event);

        expect(buttonProps["data-pressed"]).toBeUndefined();
      });

      it("should not emit pressed event when space key released", () => {
        const onPressed = vi.fn();
        const keydown = new KeyboardEvent("keydown", { key: " " });
        const keyup = new KeyboardEvent("keyup", { key: " " });

        const { buttonProps } = useButton({ onPressed });

        buttonProps.onkeydown(keydown);
        buttonProps.onkeyup(keyup);

        expect(onPressed).not.toHaveBeenCalled();
      });
    });

    describe("non-interactive", () => {
      it("should emit pressed event when clicked", () => {
        const onPressed = vi.fn();
        const event = new MouseEvent("click");

        const { buttonProps } = useButton({ is: "span", onPressed });

        buttonProps.onclick(event);

        expect(onPressed).toHaveBeenCalledOnce();
        expect(onPressed).toHaveBeenCalledWith(event);
      });

      it("should not emit pressed event when clicked and disabled", () => {
        const onPressed = vi.fn();
        const event = new MouseEvent("click");

        const { buttonProps } = useButton({
          is: "span",
          onPressed,
          disabled: true,
        });

        buttonProps.onclick(event);

        expect(onPressed).not.toHaveBeenCalled();
      });

      it("should emit pressed event when enter key pressed", () => {
        const onPressed = vi.fn();
        const event = new KeyboardEvent("keydown", { key: "Enter" });

        const { buttonProps } = useButton({ is: "span", onPressed });

        buttonProps.onkeydown(event);

        expect(onPressed).toHaveBeenCalledOnce();
        expect(onPressed).toHaveBeenCalledWith(event);
      });

      it("should not emit pressed event when enter key pressed and disabled", () => {
        const onPressed = vi.fn();
        const event = new KeyboardEvent("keydown", { key: "Enter" });

        const { buttonProps } = useButton({
          is: "span",
          onPressed,
          disabled: true,
        });

        buttonProps.onkeydown(event);

        expect(onPressed).not.toHaveBeenCalled();
      });

      it("should be pressed when space key pressed", () => {
        const event = new KeyboardEvent("keydown", { key: " " });

        const { buttonProps } = useButton({ is: "span" });

        buttonProps.onkeydown(event);

        expectButtonProps(buttonProps, {
          role: "button",
          tabIndex: 0,
          "data-pressed": true,
        });
      });

      it("should not be pressed when space key pressed and disabled", () => {
        const event = new KeyboardEvent("keydown", { key: " " });

        const { buttonProps } = useButton({
          is: "span",
          disabled: true,
        });

        buttonProps.onkeydown(event);

        expectButtonProps(buttonProps, {
          role: "button",
          ariaDisabled: true,
          tabIndex: -1,
        });
      });

      it("should not emit pressed event when space key pressed", () => {
        const onPressed = vi.fn();
        const event = new KeyboardEvent("keydown", { key: " " });

        const { buttonProps } = useButton({ is: "span", onPressed });

        buttonProps.onkeydown(event);

        expect(onPressed).not.toHaveBeenCalled();
      });

      it("should be not pressed when space key released", () => {
        const spaceKeyDownEvent = new KeyboardEvent("keydown", { key: " " });
        const spaceKeyUpEvent = new KeyboardEvent("keyup", { key: " " });

        const { buttonProps } = useButton({ is: "span" });

        buttonProps.onkeydown(spaceKeyDownEvent);
        buttonProps.onkeyup(spaceKeyUpEvent);

        expectButtonProps(buttonProps, { role: "button", tabIndex: 0 });
      });

      it("should emit pressed event when space key released", () => {
        const onPressed = vi.fn();
        const spaceKeyDownEvent = new KeyboardEvent("keydown", { key: " " });
        const spaceKeyUpEvent = new KeyboardEvent("keyup", { key: " " });

        const { buttonProps } = useButton({ is: "span", onPressed });

        buttonProps.onkeydown(spaceKeyDownEvent);
        buttonProps.onkeyup(spaceKeyUpEvent);

        expect(onPressed).toHaveBeenCalledOnce();
        expect(onPressed).toHaveBeenCalledWith(spaceKeyUpEvent);
      });

      it("should call preventDefault when enter key pressed", () => {
        const event = new KeyboardEvent("keydown", {
          key: "Enter",
          cancelable: true,
        });

        const { buttonProps } = useButton({ is: "span" });

        buttonProps.onkeydown(event);

        expect(event.defaultPrevented).toBeTruthy();
      });

      it("should call preventDefault when space key pressed", () => {
        const event = new KeyboardEvent("keydown", {
          key: " ",
          cancelable: true,
        });

        const { buttonProps } = useButton({ is: "span" });

        buttonProps.onkeydown(event);

        expect(event.defaultPrevented).toBeTruthy();
      });
    });
  });
});
