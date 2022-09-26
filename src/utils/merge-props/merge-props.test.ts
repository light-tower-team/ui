import clsx from "clsx";
import { describe, it, expect, vi } from "vitest";
import { mergeProps } from "./";

describe("mergeProps", () => {
  it("handles one argument", () => {
    const onClick = () => {};
    const className = "primary";
    const id = "test_id";
    const mergedProps = mergeProps({ onClick, className, id });

    expect(mergedProps.onClick).toBe(onClick);
    expect(mergedProps.className).toBe(className);
    expect(mergedProps.id).toBe(id);
  });

  it("combines callbacks", function () {
    const mockFn = vi.fn();
    const message1 = "click1";
    const message2 = "click2";
    const message3 = "click3";
    const mergedProps = mergeProps(
      { onClick: () => mockFn(message1) },
      { onClick: () => mockFn(message2) },
      { onClick: () => mockFn(message3) }
    );
    mergedProps.onClick();
    expect(mockFn).toHaveBeenNthCalledWith(1, message1);
    expect(mockFn).toHaveBeenNthCalledWith(2, message2);
    expect(mockFn).toHaveBeenNthCalledWith(3, message3);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it("merges props with different keys", function () {
    const mockFn = vi.fn();
    const click1 = "click1";
    const click2 = "click2";
    const hover = "hover";
    const focus = "focus";
    const margin = 2;
    const mergedProps = mergeProps(
      { onClick: () => mockFn(click1) },
      { onHover: () => mockFn(hover), styles: { margin } },
      { onClick: () => mockFn(click2), onFocus: () => mockFn(focus) }
    );

    mergedProps.onClick();
    expect(mockFn).toHaveBeenNthCalledWith(1, click1);
    expect(mockFn).toHaveBeenNthCalledWith(2, click2);

    mergedProps.onFocus();
    expect(mockFn).toHaveBeenNthCalledWith(3, focus);

    mergedProps.onHover();
    expect(mockFn).toHaveBeenNthCalledWith(4, hover);
    expect(mockFn).toHaveBeenCalledTimes(4);
    expect(mergedProps.styles.margin).toBe(margin);
  });

  it("merges aria-labelledby prop", () => {
    const a = { "aria-labelledby": "foo" };
    const b = { "aria-labelledby": "bar" };

    const result = mergeProps(a, b);
    expect(result["aria-labelledby"]).toBe("foo bar");
  });

  it("should not repeat prop value", () => {
    const a = { "aria-labelledby": "foo" };
    const b = { "aria-labelledby": "foo" };

    const result = mergeProps(a, b);
    expect(result["aria-labelledby"]).toBe("foo");
  });

  it("combines classNames", function () {
    const className1 = "primary";
    const className2 = "hover";
    const className3 = "focus";
    const mergedProps = mergeProps(
      { className: className1 },
      { className: className2 },
      { className: className3 }
    );
    const mergedClassNames = clsx(className1, className2, className3);
    expect(mergedProps.className).toBe(mergedClassNames);
  });
});
