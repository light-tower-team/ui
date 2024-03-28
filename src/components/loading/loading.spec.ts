import { ComponentMountingOptions, mount } from "@vue/test-utils";
import Loading from "./loading.vue";
import { DEFAULT_LOADING_LABEL, LOADING_SIZES } from "./constants";
import { useMockedConsole } from "../../utils/__tests__/use_mocked_console";

function mountLoading(options?: ComponentMountingOptions<typeof Loading>) {
  const wrapper = mount(Loading, options);

  const loading = wrapper.get("span");

  return { loading, wrapper };
}

describe("loading", () => {
  it("should have a default 'aria-label' attr", () => {
    const { loading } = mountLoading();

    expect(loading.attributes("aria-label")).toEqual(DEFAULT_LOADING_LABEL);
  });

  it("should have provided 'aria-label' attr", () => {
    const TEST_LABEL = "progress";

    const { loading } = mountLoading({ props: { ariaLabel: TEST_LABEL } });

    expect(loading.attributes("aria-label")).toEqual(TEST_LABEL);
  });

  it("should has a role='status'", () => {
    const { loading } = mountLoading();

    expect(loading.attributes("role")).toEqual("status");
  });

  describe("size validator", () => {
    useMockedConsole();

    it("should not display a warning when the size is correct", () => {
      mountLoading({ props: { size: "xl" } });

      expect(console.warn).not.toHaveBeenCalled();
    });

    it("should display a warning when the size is incorrect", () => {
      mountLoading({ props: { size: "__unknown" as LOADING_SIZES } });

      expect(console.warn).toHaveBeenCalledOnce();
    });
  });
});
