import { ComponentMountingOptions, shallowMount } from "@vue/test-utils";
import Icon from "./icon.vue";
import { ICON_SIZES } from "./constants";
import { useMockedConsole } from "../../utils/__tests__/use_mocked_console";

const TEST_ICON_NAME = "check-circle";

function mountIcon(
  options?: ComponentMountingOptions<typeof Icon>,
  tag = "svg",
) {
  const wrapper = shallowMount(Icon, {
    ...options,
    props: { name: TEST_ICON_NAME, ...options?.props },
  });

  const icon = wrapper.get(tag);

  return { icon, wrapper };
}

describe("icon", () => {
  it("should have role='img'", () => {
    const { icon } = mountIcon();

    expect(icon.attributes("role")).toBe("img");
  });

  describe("size validator", () => {
    useMockedConsole();

    it("should not display a warning when the size is correct", () => {
      mountIcon({ props: { name: TEST_ICON_NAME, size: 16 } });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should display a warning when the size is incorrect", () => {
      mountIcon({ props: { name: TEST_ICON_NAME, size: -1 as ICON_SIZES } });

      expect(console.warn).toHaveBeenCalledOnce();
    });
  });

  describe("name validator", () => {
    useMockedConsole();

    it("should not display a warning when the name is correct", () => {
      mountIcon({ props: { name: TEST_ICON_NAME } });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should display a warning when the name is incorrect", () => {
      mountIcon({ props: { name: "__unknown" } });

      expect(console.warn).toHaveBeenCalledOnce();
    });
  });

  describe("hidden", () => {
    it("should be hidden when there is no 'aria-label'", () => {
      const { icon } = mountIcon();

      expect(icon.attributes("aria-label")).toBeUndefined();
      expect(icon.attributes("aria-hidden")).toEqual("true");
    });

    it("should not be hidden when there is 'aria-label'", () => {
      const TEST_ICON_LABEL = "circle";
      const { icon } = mountIcon({
        props: { name: TEST_ICON_NAME, ariaLabel: TEST_ICON_LABEL },
      });

      expect(icon.attributes("aria-label")).toEqual(TEST_ICON_LABEL);
      expect(icon.attributes("aria-hidden")).toBeUndefined();
    });
  });
});
