import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Button from "../../button";
import { ICON_NAMES } from "../../icon";
import { DEFAULT_FORM_INPUT_SIZE, DEFAULT_FORM_INPUT_TYPE, FORM_INPUT_SIZES, FORM_INPUT_TYPES } from "./constants";
import FormInput from "./form_input.vue";

const meta: Meta<typeof FormInput> = {
  title: "components/form/form_input",
  component: FormInput,
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    readonly: {
      control: { type: "boolean" },
    },
    invalid: {
      control: { type: "boolean" },
    },
    optional: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: FORM_INPUT_SIZES,
    },
    type: {
      control: { type: "select" },
      options: FORM_INPUT_TYPES,
    },
    icon: {
      control: { type: "select" },
      options: ICON_NAMES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  render: (args) => ({
    components: { FormInput },
    setup() {
      return { args };
    },
    template: `
      <FormInput v-bind="args" />
    `,
  }),
  args: {
    readonly: false,
    optional: false,
    invalid: false,
    disabled: false,
    clearable: false,
    size: DEFAULT_FORM_INPUT_SIZE,
    type: DEFAULT_FORM_INPUT_TYPE,
    placeholder: "Enter email",
    modelValue: "",
  },
};

export const WithPlaceholder: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <FormInput placeholder="Enter email" />
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { FormInput },
    setup() {
      const value = ref("With input value");
      return { value };
    },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput placeholder="With placeholder" disabled />
        <FormInput v-model="value" disabled />
      </div>
    `,
  }),
};

export const Readonly: Story = {
  render: () => ({
    components: { FormInput },
    setup() {
      const value = ref("With input value");
      return { value };
    },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput placeholder="With placeholder" readonly />
        <FormInput v-model="value" readonly />
      </div>
    `,
  }),
};

export const Optional: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <FormInput modelValue="Optional value" optional />
    `,
  }),
};

export const Clearable: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput modelValue="Some value" size="md" clearable />
        <FormInput modelValue="Some value" clearable />
      </div>
    `,
  }),
};

export const Invalid: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <FormInput modelValue="Invalid value" invalid />
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput size="xs" placeholder="xs" readonly />
        <FormInput size="sm" placeholder="sm" readonly />
        <FormInput size="md" placeholder="md" readonly />
        <FormInput size="lg" placeholder="lg" readonly />
        <FormInput size="xl" placeholder="xl" readonly />
        <FormInput placeholder="unset" readonly />
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    components: { FormInput },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput size='md' placeholder="With 'md' size" icon="search" />
        <FormInput placeholder="With 'unset' size" icon="search" />
      </div>
    `,
  }),
};

export const WithAddon: Story = {
  render: () => ({
    components: { Button, FormInput },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput size='md' placeholder="With 'md' size">
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
        <FormInput placeholder="With 'unset' size">
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
      </div>
    `,
  }),
};

export const WithIconAndAddon: Story = {
  render: () => ({
    components: { Button, FormInput },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput size='md' placeholder="With 'md' size" icon="search">
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
        <FormInput placeholder="With 'unset' size" icon="search">
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
      </div>
    `,
  }),
};

export const ClearableWithIconAndAddon: Story = {
  render: () => ({
    components: { FormInput, Button },
    template: `
      <div class="flex flex-col gap-2">
        <FormInput size='md' model-value="With 'md' size" icon="search" clearable>
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
        <FormInput model-value="With 'unset' size" icon="search" clearable>
          <template #addon>
            <Button
              leading-icon="eye-off"
              variant="text"
              size="sm"
              aria-label="visibility"
            />
          </template>
        </FormInput>
      </div>
    `,
  }),
};
