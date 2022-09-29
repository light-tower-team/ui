import { describe, vi } from "vitest";
import { ref } from "vue";
import { useTextField } from "../use-textfield";

describe("useTextField", () => {
  it("with default textfield props if no props are provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});
    const { inputProps } = useTextField({}, ref(null));
    expect(inputProps.type).toBe("text");
    expect(inputProps.disabled).toBeFalsy();
    expect(inputProps.readOnly).toBeFalsy();
    expect(inputProps["aria-invalid"]).toBeUndefined();
    expect(inputProps["aria-required"]).toBeUndefined();
    // expect(typeof inputProps.onInput).toBe("function");
    expect(inputProps.autoFocus).toBeFalsy();
    expect(consoleWarnSpy.mock.calls.map(([call]) => call)).toContain(
      "If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility"
    );
  });

  it("with appropriate props if type is defined", () => {
    const type = "search";
    const { inputProps } = useTextField(
      {
        type,
        "aria-label": "mandatory label",
      },
      ref(null)
    );
    expect(inputProps.type).toBe(type);
  });

  it("with appropriate props if isDisabled is defined", () => {
    let { inputProps } = useTextField(
      { isDisabled: true, "aria-label": "mandatory label" },
      ref(null)
    );
    expect(inputProps.disabled).toBeTruthy();

    inputProps = useTextField(
      { isDisabled: false, "aria-label": "mandatory label" },
      ref(null)
    ).inputProps;

    expect(inputProps.disabled).toBeFalsy();
  });

  it("with appropriate props if isRequired is defined", () => {
    let { inputProps } = useTextField(
      { isRequired: true, "aria-label": "mandatory label" },
      ref(null)
    );
    expect(inputProps["aria-required"]).toBeTruthy();

    inputProps = useTextField(
      { isRequired: false, "aria-label": "mandatory label" },
      ref(null)
    ).inputProps;

    expect(inputProps["aria-required"]).toBeUndefined();
  });

  it("with appropriate props if isReadOnly is defined", () => {
    let { inputProps } = useTextField(
      { isReadOnly: true, "aria-label": "mandatory label" },
      ref(null)
    );
    expect(inputProps.readOnly).toBeTruthy();

    inputProps = useTextField(
      { isReadOnly: false, "aria-label": "mandatory label" },
      ref(null)
    ).inputProps;
    expect(inputProps.readOnly).toBeFalsy();
  });

  it("without type prop if inputElementType is textarea", () => {
    const type = "search";
    const pattern = /pattern/;
    const { inputProps } = useTextField(
      { type, pattern, inputElementType: "textarea" },
      ref(null)
    );
    expect(inputProps.type).toBeUndefined();
    expect(inputProps.pattern).toBeUndefined();
  });
});
