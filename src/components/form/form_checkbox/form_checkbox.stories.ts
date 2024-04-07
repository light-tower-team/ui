import type { Meta, StoryObj } from "@storybook/vue3";
import FormCheckbox from "./form_checkbox.vue";

const meta: Meta<typeof FormCheckbox> = {
  title: "components/form/form_checkbox",
  component: FormCheckbox,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    helpText: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormCheckbox>;

export const Default: Story = {
  render: (args) => ({
    components: { FormCheckbox },
    setup() {
      return { args };
    },
    template: `
      <FormCheckbox v-bind="args">{{ args.default }}</FormCheckbox>
    `,
  }),
  args: {
    disabled: false,
    indeterminate: false,
    modelValue: false,
    default: "Default option",
  },
};

export const Checked: Story = {
  render: () => ({
    components: { FormCheckbox },
    template: `
      <FormCheckbox modelValue>Checked option</FormCheckbox>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    components: { FormCheckbox },
    template: `
      <FormCheckbox indeterminate>Indeterminate option</FormCheckbox>
    `,
  }),
};

export const WithHelpText: Story = {
  render: () => ({
    components: { FormCheckbox },
    template: `
      <FormCheckbox helpText="With help text">Slot option</FormCheckbox>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { FormCheckbox },
    template: `
      <FormCheckbox disabled>Disabled option</FormCheckbox>
      <FormCheckbox modelValue disabled>Checked disabled option</FormCheckbox>
      <FormCheckbox helpText="With help text" disabled>Disabled option</FormCheckbox>
      <FormCheckbox indeterminate disabled>Indeterminate disabled option</FormCheckbox>
    `,
  }),
};
