import { faker } from "@faker-js/faker";
import { mount } from "@vue/test-utils";
import FormCheckbox from "../form_checkbox";
import FormInput from "../form_input";
import FormGroup from "./form_group.vue";

describe("FormGroup", () => {
  describe("with FormInput", () => {
    it("should render an input", () => {
      const wrapper = mount(FormGroup, {
        slots: { default: FormInput },
      });

      const input = wrapper.findComponent(FormInput);

      expect(input.exists()).toBeTruthy();
    });

    it("should set an unique id for the input", () => {
      const wrapper = mount(FormGroup, {
        slots: { default: FormInput },
      });

      const input = wrapper.get("input");

      expect(input.attributes("id")).toBeDefined();
    });

    it("should render a wrapper", () => {
      const wrapper = mount(FormGroup, {
        slots: { default: FormInput },
      });

      const group = wrapper.find("[role='group']");

      expect(group.exists()).toBeTruthy();
      expect(group.element.tagName).toEqual("DIV");
    });

    it("should render a label when 'label' prop is set", () => {
      const text = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: text },
        slots: { default: FormInput },
      });

      const label = wrapper.find("[data-testid='label']");

      expect(label.exists()).toBeTruthy();
      expect(label.element.tagName).toEqual("LABEL");
      expect(label.text()).toEqual(text);
    });

    it.each(["", undefined] as const)("should not render a label when 'label' prop is '%s'", (text) => {
      const wrapper = mount(FormGroup, {
        props: { label: text },
        slots: { default: FormInput },
      });

      const label = wrapper.find("[data-testid='label']");

      expect(label.exists()).toBeFalsy();
    });

    it("should have an label and an input with the same id", () => {
      const text = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: text },
        slots: { default: FormInput },
      });

      const input = wrapper.get("input");
      const inputId = input.attributes("id");

      const label = wrapper.get("[data-testid='label']");

      expect(label.attributes("for")).toEqual(inputId);
    });

    it("should render a description when 'description' prop is set", () => {
      const text = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { description: text },
        slots: { default: FormInput },
      });

      const desc = wrapper.find("[data-testid='desc']");

      expect(desc.exists()).toBeTruthy();
      expect(desc.attributes("id")).toBeDefined();
      expect(desc.text()).toEqual(text);
    });

    it.each(["", undefined] as const)("should not render a description when 'description' prop is '%s'", (text) => {
      const wrapper = mount(FormGroup, {
        props: { description: text },
        slots: { default: FormInput },
      });

      const desc = wrapper.find("[data-testid='desc']");

      expect(desc.exists()).toBeFalsy();
    });

    it("should have an input with 'aria-description' attr when 'description' is set", () => {
      const text = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { description: text },
        slots: { default: FormInput },
      });

      const desc = wrapper.get("[data-testid='desc']");
      const descId = desc.attributes("id");

      const input = wrapper.get("input");
      const inputAriaDesc = input.attributes("aria-description");

      expect(inputAriaDesc).toEqual(descId);
    });

    it.each(["", undefined] as const)(
      "should not have an input with 'aria-description' attr when 'description' is '%s'",
      (text) => {
        const wrapper = mount(FormGroup, {
          props: { description: text },
          slots: { default: FormInput },
        });

        const input = wrapper.get("input");

        expect(input.attributes("aria-description")).toBeUndefined();
      },
    );

    it("should render a label description", () => {
      const labelText = faker.string.alpha(10);
      const labelDescText = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: labelText, labelDescription: labelDescText },
        slots: { default: FormInput },
      });

      const labelDesc = wrapper.find("[data-testid='label-desc']");

      expect(labelDesc.exists()).toBeTruthy();
      expect(labelDesc.element.tagName).toEqual("SPAN");
      expect(labelDesc.text()).toEqual(labelDescText);
    });

    it.each(["", undefined] as const)(
      "should not render a label description when 'label' prop is '%s'",
      (labelText) => {
        const labelDescText = faker.string.alpha(10);

        const wrapper = mount(FormGroup, {
          props: { label: labelText, labelDescription: labelDescText },
          slots: { default: FormInput },
        });

        const labelDesc = wrapper.find("[data-testid='label-desc']");

        expect(labelDesc.exists()).toBeFalsy();
      },
    );

    it.each(["", undefined] as const)(
      "should not render a label description when 'label-description' prop is '%s'",
      (labelDescText) => {
        const labelText = faker.string.alpha(10);

        const wrapper = mount(FormGroup, {
          props: { label: labelText, labelDescription: labelDescText },
          slots: { default: FormInput },
        });

        const labelDesc = wrapper.find("[data-testid='label-desc']");

        expect(labelDesc.exists()).toBeFalsy();
      },
    );

    it("should render an optional text", () => {
      const labelText = faker.string.alpha(10);
      const optionalText = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: labelText, optional: true, optionalText },
        slots: { default: FormInput },
      });

      const optional = wrapper.find("[data-testid='optional']");

      expect(optional.exists()).toBeTruthy();
      expect(optional.element.tagName).toEqual("SPAN");
      expect(optional.text()).toEqual(optionalText);
    });

    it.each([false, undefined] as const)(
      "should not render an optional text when 'optional' prop is '%s'",
      (optional) => {
        const labelText = faker.string.alpha(10);
        const optionalText = faker.string.alpha(10);

        const wrapper = mount(FormGroup, {
          props: { label: labelText, optional, optionalText },
          slots: { default: FormInput },
        });

        const optionalEl = wrapper.find("[data-testid='optional']");

        expect(optionalEl.exists()).toBeFalsy();
      },
    );

    it.each(["", undefined] as const)("should not render an optional text when 'label' prop is '%s'", (labelText) => {
      const optionalText = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: labelText, optional: true, optionalText },
        slots: { default: FormInput },
      });

      const optional = wrapper.find("[data-testid='optional']");

      expect(optional.exists()).toBeFalsy();
    });

    it.each(["", undefined] as const)(
      "should not render an optional text when 'optional-text' prop is '%s'",
      (optionalText) => {
        const labelText = faker.string.alpha(10);

        const wrapper = mount(FormGroup, {
          props: { label: labelText, optional: true, optionalText },
          slots: { default: FormInput },
        });

        const optional = wrapper.find("[data-testid='optional']");

        expect(optional.exists()).toBeFalsy();
      },
    );

    it("should render a validation feedback", () => {
      const invalidFeedback = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { invalid: true, invalidFeedback },
        slots: { default: FormInput },
      });

      const invalid = wrapper.find("[data-testid='invalid']");

      expect(invalid.exists()).toBeTruthy();
      expect(invalid.element.tagName).toEqual("SPAN");
      expect(invalid.text()).toEqual(invalidFeedback);
    });

    it("should not render a validation feedback when 'invalid' prop is not set", () => {
      const invalidFeedback = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { invalidFeedback },
        slots: { default: FormInput },
      });

      const invalid = wrapper.find("[data-testid='invalid']");

      expect(invalid.exists()).toBeFalsy();
    });

    it.each(["", undefined] as const)(
      "should not render a validation feedback when 'invalid-feedback' prop is '%s'",
      (invalidFeedback) => {
        const wrapper = mount(FormGroup, {
          props: { invalid: true, invalidFeedback },
          slots: { default: FormInput },
        });

        const invalid = wrapper.find("[data-testid='invalid']");

        expect(invalid.exists()).toBeFalsy();
      },
    );
  });

  describe("with FormCheckboxes", () => {
    it("should render checkboxes", () => {
      const wrapper = mount(FormGroup, {
        slots: { default: [FormCheckbox, FormCheckbox] },
      });

      const checkboxes = wrapper.findAllComponents(FormCheckbox);

      expect(checkboxes.length).toEqual(2);
    });

    it("should render a wrapper", () => {
      const wrapper = mount(FormGroup, {
        slots: { default: [FormCheckbox, FormCheckbox] },
      });

      const group = wrapper.find("[role='group']");

      expect(group.exists()).toBeTruthy();
      expect(group.element.tagName).toEqual("FIELDSET");
    });

    it("should render a label when 'label' prop is set", () => {
      const text = faker.string.alpha(10);

      const wrapper = mount(FormGroup, {
        props: { label: text },
        slots: { default: [FormCheckbox, FormCheckbox] },
      });

      const label = wrapper.find("[data-testid='label']");

      expect(label.exists()).toBeTruthy();
      expect(label.element.tagName).toEqual("LEGEND");
      expect(label.text()).toEqual(text);
    });
  });
});
