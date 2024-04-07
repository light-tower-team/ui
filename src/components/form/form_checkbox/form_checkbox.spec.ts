import { mount } from "@vue/test-utils";
import FormCheckbox from "./form_checkbox.vue";
import { faker } from "@faker-js/faker";
import { useMockedConsole } from "../../../utils/__tests__/use_mocked_console";
import { FORM_CHECKBOX_WARNINGS } from "./constants";

describe("FormCheckbox", () => {
  it("should have default structure", () => {
    const labelText = faker.string.alpha(10);

    const wrapper = mount(FormCheckbox, {
      slots: { default: labelText },
    });

    const input = wrapper.find("input");
    const label = wrapper.find("label");

    expect(input.exists()).toBeTruthy();
    expect(input.attributes("type")).toEqual("checkbox");
    expect(input.attributes("id")).toBeDefined();

    const inputId = input.attributes("id");

    expect(label.exists()).toBeTruthy();
    expect(label.attributes("for")).toEqual(inputId);
    expect(label.text()).toEqual(labelText);
  });

  it("should be reactive", async () => {
    const labelText = faker.string.alpha(10);

    const wrapper = mount(FormCheckbox, {
      slots: { default: labelText },
      props: {
        modelValue: false,
        "onUpdate:modelValue": (e) => {
          wrapper.setProps({ modelValue: e });
        },
      },
    });

    const input = wrapper.get("input");

    await input.setValue(true);

    expect(wrapper.props("modelValue")).toBeTruthy();
  });

  it("should reset 'indeterminate' prop when checked", async () => {
    const labelText = faker.string.alpha(10);

    const wrapper = mount(FormCheckbox, {
      slots: { default: labelText },
      props: {
        modelValue: false,
        "onUpdate:modelValue": (e) => {
          wrapper.setProps({ modelValue: e });
        },
        indeterminate: true,
        "onUpdate:indeterminate": (e) => {
          wrapper.setProps({ indeterminate: e });
        },
      },
    });

    expect(wrapper.props("modelValue")).toBeFalsy();
    expect(wrapper.props("indeterminate")).toBeTruthy();

    const input = wrapper.get("input");

    await input.setValue(true);

    expect(wrapper.props("modelValue")).toBeTruthy();
    expect(wrapper.props("indeterminate")).toBeFalsy();
  });

  describe("label", () => {
    useMockedConsole();

    it("should show warning when default slot is not set", () => {
      mount(FormCheckbox);

      expect(console.warn).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(FORM_CHECKBOX_WARNINGS.noLabel);
    });

    it("should show warning when default slot is empty", () => {
      mount(FormCheckbox, {
        slots: { default: "" },
      });

      expect(console.warn).toHaveBeenCalledOnce();
      expect(console.warn).toHaveBeenCalledWith(FORM_CHECKBOX_WARNINGS.noLabel);
    });
  });

  it("should render helper text", () => {
    const labelText = faker.string.alpha(10);
    const helpText = faker.string.alpha(10);

    const wrapper = mount(FormCheckbox, {
      slots: { default: labelText },
      props: { helpText },
    });

    const help = wrapper.find("[data-testid='help-text']");

    expect(help.exists()).toBeTruthy();
    expect(help.element.tagName).toEqual("P");
    expect(help.text()).toEqual(helpText);
  });

  it.each(["", undefined] as const)("should not render helper text when 'helpText' is '%s'", (helpText) => {
    const labelText = faker.string.alpha(10);

    const wrapper = mount(FormCheckbox, {
      slots: { default: labelText },
      props: { helpText },
    });

    const help = wrapper.find("[data-testid='help-text']");

    expect(help.exists()).toBeFalsy();
  });
});
