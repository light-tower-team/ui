import { ComponentMountingOptions, mount } from "@vue/test-utils";
import FormInput from "./form_input.vue";
import { buildFormInputClasses } from "./utils/build_form_input_classes";
import { buildFormInputWrapperClasses } from "./utils/build_form_input_wrapper_classes";
import { DEFAULT_FORM_INPUT_TYPE, FORM_INPUT_SIZES, FORM_INPUT_TYPES } from "./constants";
import { faker } from "@faker-js/faker";
import { FORM_GROUP_SYMBOL } from "../form_group/constants";
import { ref } from "vue";

describe("FormInput", () => {
  const mountFormInput = (options?: ComponentMountingOptions<typeof FormInput>) => {
    const wrapper = mount(FormInput, options);

    const inputWrapper = wrapper.get("div");
    const input = wrapper.get("input");

    return { input, inputWrapper, wrapper };
  };

  it("should have default structure", () => {
    const { input, inputWrapper } = mountFormInput();

    expect(inputWrapper.classes().join(" ")).toEqual(buildFormInputWrapperClasses());

    expect(input.classes().join(" ")).toEqual(buildFormInputClasses());
    expect(input.attributes("type")).toEqual(DEFAULT_FORM_INPUT_TYPE);
    expect(input.attributes("placeholder")).toBeUndefined();
    expect(input.attributes("readonly")).toBeUndefined();
    expect(input.attributes("disabled")).toBeUndefined();
    expect(input.attributes("required")).toBeDefined();
    expect(input.attributes("aria-invalid")).toBeUndefined();
    expect(input.attributes("aria-description")).toBeUndefined();
  });

  it("should be reactive", async () => {
    const { input, wrapper } = mountFormInput({
      props: {
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
      },
    });

    const value = faker.string.alpha(10);

    await input.setValue(value);

    expect(wrapper.props("modelValue")).toEqual(value);
  });

  it.each(FORM_INPUT_TYPES)("should have '%s' 'type' attr when 'type' is set", (type) => {
    const { input } = mountFormInput({
      props: { type },
    });

    expect(input.attributes("type")).toEqual(type);
  });

  it("should have 'text' type attr by default", () => {
    const { input } = mountFormInput();

    expect(input.attributes("type")).toEqual("text");
  });

  it.each(FORM_INPUT_SIZES)("should have '%s' 'size' class when 'size' is set", (size) => {
    const { input, inputWrapper } = mountFormInput({
      props: { size },
    });

    expect(inputWrapper.classes().join(" ")).toEqual(buildFormInputWrapperClasses({ size }));
    expect(input.classes().join(" ")).toEqual(buildFormInputClasses({ size }));
  });

  it("should have 'unset' size class by default", () => {
    const { input, inputWrapper } = mountFormInput();

    expect(inputWrapper.classes().join(" ")).toEqual(buildFormInputWrapperClasses({ size: "unset" }));
    expect(input.classes().join(" ")).toEqual(buildFormInputClasses({ size: "unset" }));
  });

  it("should have 'placeholder' attr when 'placeholder' prop is set", () => {
    const placeholder = faker.string.alpha(10);

    const { input } = mountFormInput({
      props: { placeholder },
    });

    expect(input.attributes("placeholder")).toEqual(placeholder);
  });

  it("should not have 'placeholder' attr when 'placeholder' prop is not set", () => {
    const { input } = mountFormInput();

    expect(input.attributes("placeholder")).toBeUndefined();
  });

  it("should have 'readonly' attr when 'readonly' prop is set", () => {
    const { input } = mountFormInput({
      props: { readonly: true },
    });

    expect(input.attributes("readonly")).toBeDefined();
  });

  it("should not have 'readonly' attr when 'readonly' prop is not set", () => {
    const { input } = mountFormInput();

    expect(input.attributes("readonly")).toBeUndefined();
  });

  it("should have 'disabled' attr when 'disabled' prop is set", () => {
    const { input } = mountFormInput({
      props: { disabled: true },
    });

    expect(input.attributes("disabled")).toBeDefined();
  });

  it("should not have 'disabled' attr when 'disabled' prop is not set", () => {
    const { input } = mountFormInput();

    expect(input.attributes("disabled")).toBeUndefined();
  });

  it("should have aria-invalid='true' attr when 'invalid' prop is set", () => {
    const { input } = mountFormInput({
      props: { invalid: true },
    });

    expect(input.attributes("aria-invalid")).toBeTruthy();
  });

  it("should not have aria-invalid='true' attr when 'invalid' prop is not set", () => {
    const { input } = mountFormInput();

    expect(input.attributes("aria-invalid")).toBeUndefined();
  });

  it("should have 'required' attr when 'optional' prop value is not set", () => {
    const { input } = mountFormInput();

    expect(input.attributes("required")).toBeDefined();
  });

  it("should not have 'required' attr when 'optional' prop value is set", () => {
    const { input } = mountFormInput({
      props: { optional: true },
    });

    expect(input.attributes("required")).toBeUndefined();
  });

  describe("clearable", () => {
    const mountFormInputWithClearButton = ({
      value: modelValue = faker.string.alpha(10),
      clearable = true,
    }: { value?: string; clearable?: boolean } = {}) => {
      const { wrapper } = mountFormInput({
        props: {
          modelValue,
          clearable,
          "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
        },
      });

      const btn = wrapper.find("[data-testid='clear-btn']");

      return { wrapper, btn };
    };

    it("should render a clear button when 'clearable' prop is set", () => {
      const { btn } = mountFormInputWithClearButton();

      expect(btn.exists()).toBeTruthy();
    });

    it("should render an addon wrapper", () => {
      const { wrapper } = mountFormInputWithClearButton();

      const addonWrapper = wrapper.find("[data-testid='addon-wrapper']");

      expect(addonWrapper.exists()).toBeTruthy();
    });

    it("should not render a clear button when 'clearable' prop is not set", () => {
      const { btn } = mountFormInputWithClearButton({ clearable: false });

      expect(btn.exists()).toBeFalsy();
    });

    it("should not render a clear button when value is empty", () => {
      const { btn } = mountFormInputWithClearButton({ value: "" });

      expect(btn.exists()).toBeFalsy();
    });

    it("should clear input value when a clear button is released", async () => {
      const { btn, wrapper } = mountFormInputWithClearButton();

      await btn.trigger("click");

      expect(wrapper.props("modelValue")).toEqual("");
    });

    it("should has a clear button with aria-label='clear'", () => {
      const { btn } = mountFormInputWithClearButton();

      expect(btn.attributes("aria-label")).toEqual("clear");
    });
  });

  describe("with icon", () => {
    it("should render an icon when 'icon' prop is set", () => {
      const { wrapper } = mountFormInput({
        props: { icon: "search" },
      });

      const icon = wrapper.find("[role='img']");

      expect(icon.exists()).toBeTruthy();
    });

    it("should not render an icon when 'icon' prop is not set", () => {
      const { wrapper } = mountFormInput();

      const icon = wrapper.find("[role='img']");

      expect(icon.exists()).toBeFalsy();
    });

    it("should have left padding when 'icon' prop is set", () => {
      const { input } = mountFormInput({
        props: { icon: "search" },
      });

      expect(input.classes().join(" ")).toEqual(buildFormInputClasses({ hasIcon: true }));
    });

    it("should not have left padding when 'icon' prop is not set", () => {
      const { input } = mountFormInput();

      expect(input.classes().join(" ")).toEqual(buildFormInputClasses());
    });
  });

  describe("with addon", () => {
    it("should render an addon button", () => {
      const { wrapper } = mountFormInput({
        slots: { addon: "<button data-testid='addon-btn'>Addon btn</button>" },
      });

      const addonBtn = wrapper.find("[data-testid='addon-btn']");

      expect(addonBtn.exists()).toBeTruthy();
    });

    it("should render an addon wrapper", () => {
      const { wrapper } = mountFormInput({
        slots: { addon: "<button data-testid='addon-btn'>Addon btn</button>" },
      });

      const addonWrapper = wrapper.find("[data-testid='addon-wrapper']");

      expect(addonWrapper.exists()).toBeTruthy();
    });

    it("should have right padding when addon slot is not empty", () => {
      const { input } = mountFormInput({
        slots: { addon: "<button data-testid='addon-btn'>Addon btn</button>" },
      });

      expect(input.classes().join(" ")).toEqual(buildFormInputClasses({ hasAddon: true }));
    });

    it("should not have right padding when addon slot is empty", () => {
      const { input } = mountFormInput();

      expect(input.classes().join(" ")).toEqual(buildFormInputClasses());
    });
  });

  it("should not render an addons' wrapper when 'clearable' is not set and 'addon' slot is empty", () => {
    const { wrapper } = mountFormInput();

    const addonWrapper = wrapper.find("[data-testid='addon-wrapper']");

    expect(addonWrapper.exists()).toBeFalsy();
  });

  describe("in the group", () => {
    it("should have 'id' attr", () => {
      const inputId = faker.string.uuid();

      const { input } = mountFormInput({
        global: {
          provide: {
            [FORM_GROUP_SYMBOL]: { inputId },
          },
        },
      });

      expect(input.attributes("id")).toEqual(inputId);
    });

    it("should have 'aria-description' attr", () => {
      const descId = faker.string.uuid();

      const { input } = mountFormInput({
        global: {
          provide: {
            [FORM_GROUP_SYMBOL]: { descId },
          },
        },
      });

      expect(input.attributes("aria-description")).toEqual(descId);
    });

    it("should override 'optional' prop", () => {
      const { input } = mountFormInput({
        props: { optional: false },
        global: {
          provide: {
            [FORM_GROUP_SYMBOL]: { optional: ref(false) },
          },
        },
      });

      expect(input.attributes("required")).toBeDefined();
    });

    it("should override 'invalid' prop", () => {
      const { input } = mountFormInput({
        props: { invalid: false },
        global: {
          provide: {
            [FORM_GROUP_SYMBOL]: { invalid: ref(true) },
          },
        },
      });

      expect(input.attributes("aria-invalid")).toBeDefined();
    });
  });
});
