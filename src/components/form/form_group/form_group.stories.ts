import type { Meta, StoryObj } from "@storybook/vue3";
import FormCheckbox from "../form_checkbox";
import FormInput from "../form_input";
import FormGroup from "./form_group.vue";

const meta: Meta<typeof FormGroup> = {
  title: "components/form/form_group",
  component: FormGroup,
  argTypes: {
    optional: {
      control: { type: "boolean" },
    },
    invalid: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
    labelDescription: {
      control: { type: "text" },
    },
    optionalText: {
      control: { type: "text" },
    },
    invalidFeedback: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  render: (args) => ({
    components: { FormGroup, FormInput },
    setup() {
      return { args };
    },
    template: `
      <FormGroup v-bind="args">
        <FormInput />
      </FormGroup>
    `,
  }),
  args: {
    optional: false,
    invalid: false,
    label: "Label Name",
    description: "form group description",
    labelDescription: "form label description",
    optionalText: "(optional)",
    invalidFeedback: "Please try again.",
  },
};

export const Disabled: Story = {
  render: () => ({
    components: { FormGroup, FormInput },
    template: `
      <FormGroup
        label="Label Name"
        description="form group description"
        label-description="form label description"
      >
        <FormInput disabled />
      </FormGroup>
    `,
  }),
};

export const Optional: Story = {
  render: () => ({
    components: { FormGroup, FormInput },
    template: `
      <FormGroup
        label="Label Name"
        description="form group description"
        label-description="form label description"
        optional
        optional-text="(optional)"
      >
        <FormInput  />
      </FormGroup>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    components: { FormGroup, FormInput },
    template: `
      <FormGroup
        label="Label Name"
        description="form group description"
        label-description="form label description"
        invalid
        invalid-feedback="This field is required."
      >
        <FormInput  />
      </FormGroup>
    `,
  }),
};

export const WithCheckboxes: Story = {
  render: () => ({
    components: { FormGroup, FormCheckbox },
    template: `
      <FormGroup label="Label Name">
        <FormCheckbox>First</FormCheckbox>
        <FormCheckbox>Second</FormCheckbox>
        <FormCheckbox>Third</FormCheckbox>
      </FormGroup>
    `,
  }),
};
