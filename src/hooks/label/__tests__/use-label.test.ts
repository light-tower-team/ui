import { describe, vi } from "vitest";
import { useLabel } from "../use-label";

describe("useLable", () => {
  it("should return props for visible label", () => {
    const { labelProps, fieldProps } = useLabel({ label: "Test" });
    expect(labelProps.id).toBeDefined();
    expect(fieldProps.id).toBeDefined();
    expect(labelProps.id).toBe(fieldProps["aria-labelledby"]);
    expect(labelProps.for).toBe(fieldProps.id);
    // check that generated ids are unique
    expect(labelProps.id).not.toBe(fieldProps.id);
  });

  it("should combine aria-labelledby if visible label is also provided", () => {
    const { labelProps, fieldProps } = useLabel({
      label: "Test",
      "aria-labelledby": "foo",
    });
    expect(labelProps.id).toBeDefined();
    expect(fieldProps.id).toBeDefined();
    expect(fieldProps["aria-labelledby"]).toBe(`foo ${labelProps.id}`);
    expect(labelProps.for).toBe(fieldProps.id);
    expect(labelProps.id).not.toBe(fieldProps.id);
  });

  it("should combine aria-labelledby if visible label and aria-label is also provided", () => {
    const { labelProps, fieldProps } = useLabel({
      label: "Test",
      "aria-labelledby": "foo",
      "aria-label": "aria",
    });
    expect(labelProps.id).toBeDefined();
    expect(fieldProps.id).toBeDefined();
    expect(fieldProps["aria-label"]).toBe("aria");
    expect(fieldProps["aria-labelledby"]).toBe(
      `foo ${labelProps.id} ${fieldProps.id}`
    );
    expect(labelProps.for).toBe(fieldProps.id);
    expect(labelProps.id).not.toBe(fieldProps.id);
  });

  it("should work without a visisble label", () => {
    const { labelProps, fieldProps } = useLabel({ "aria-label": "Label" });
    expect(labelProps.id).toBeUndefined();
    expect(labelProps.for).toBeUndefined();
    expect(fieldProps.id).toBeDefined();
    expect(fieldProps["aria-labelledby"]).toBeUndefined();
    expect(fieldProps["aria-label"]).toBe("Label");
  });

  it("should work without a visible label and both aria-label and aria-labelledby", () => {
    const { labelProps, fieldProps } = useLabel({
      "aria-label": "Label",
      "aria-labelledby": "foo",
    });
    expect(labelProps.id).toBeUndefined();
    expect(labelProps.for).toBeUndefined();
    expect(fieldProps.id).toBeDefined();
    expect(fieldProps["aria-labelledby"]).toBe(`foo ${fieldProps.id}`);
    expect(fieldProps["aria-label"]).toBe("Label");
  });

  it("should warn if no visible label or aria labels are provided", () => {
    const spyWarn = vi.spyOn(console, "warn").mockImplementation(() => {});
    useLabel({});
    expect(spyWarn).toHaveBeenCalledWith(
      "If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility"
    );
  });

  it("should not return a `for` attribute when the label element type is not <label>", () => {
    const { labelProps, fieldProps } = useLabel({
      label: "Test",
      labelElementType: "span",
    });
    expect(labelProps.id).toBeDefined();
    expect(fieldProps.id).toBeDefined();
    expect(labelProps.id).toBe(fieldProps["aria-labelledby"]);
    expect(labelProps.for).toBeUndefined();
  });
});