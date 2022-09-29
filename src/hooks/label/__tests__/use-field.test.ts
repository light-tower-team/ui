import { describe } from "vitest";
import { useField } from "../use-field";

describe("useField", () => {
  it("should return label props", () => {
    const { labelProps, fieldProps } = useField({ label: "Test" });
    expect(labelProps.id).toBeDefined();
    expect(fieldProps.id).toBeDefined();
  });
});
