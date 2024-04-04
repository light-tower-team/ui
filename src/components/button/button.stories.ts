import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./button.vue";
import { BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_COLORS } from "./constants";

const meta: Meta<typeof Button> = {
  title: "components/button",
  component: Button,
  argTypes: {
    size: {
      options: BUTTON_SIZES,
    },
    variant: {
      options: BUTTON_VARIANTS,
    },
    color: {
      options: BUTTON_COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button v-bind="args" is="span">Default button</Button>
      </div>
    `,
  }),
  args: {
    variant: "outlined",
    color: "neutral",
    size: "md",
  },
};

export const Rounded: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button variant='text' rounded>Text button</Button>
        <Button variant='filled-tonal' rounded>Filled button</Button>
        <Button variant='outlined' rounded>Outlined button</Button>
        <Button variant='filled' rounded>Filled button</Button>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-2 p-2">
        <Button variant='text' full-width>Text button</Button>
        <Button variant='filled-tonal' full-width>Filled button</Button>
        <Button variant='outlined' full-width>Outlined button</Button>
        <Button variant='filled' full-width>Filled button</Button>
      </div>
    `,
  }),
};

export const WithTooltip: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button title="some title">With tooltip</Button>
      </div>
    `,
  }),
};

export const IconButton: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button v-bind="args" />
      </div>
    `,
  }),
  args: {
    leadingIcon: "star",
    ariaLabel: "favorite",
  },
};

export const LoadingButton: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button loading>Loading button</Button>
      </div>
    `,
  }),
};

export const LinkButton: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button href="#">Link button</Button>
      </div>
    `,
  }),
};

export const WithOverflowedText: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button class="w-20">Very long text</Button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Button size='xs'>Extra small button</Button>
        <Button size='sm'>Small button</Button>
        <Button size='md'>Medium button</Button>
        <Button size='lg'>Large button</Button>
        <Button size='xl'>Extra large button</Button>
      </div>
    `,
  }),
};

export const AllVariantsAndColors: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="inline-flex flex-row gap-2 p-2">
        <div class="inline-flex flex-col gap-2 p-2">
          <Button color='neutral' variant='filled'>Neutral button</Button>
          <Button color='neutral' variant='filled-tonal'>Neutral button</Button>
          <Button color='neutral' variant='text'>Neutral button</Button>
          <Button color='neutral' variant='outlined'>Neutral button</Button>
          <Button color='neutral' variant='filled' disabled>Neutral button</Button>
          <Button color='neutral' variant='filled-tonal' disabled>Neutral button</Button>
          <Button color='neutral' variant='text' disabled>Neutral button</Button>
          <Button color='neutral' variant='outlined' disabled>Neutral button</Button>
        </div>
        <div class="inline-flex flex-col gap-2 p-2">
          <Button color='primary' variant='filled'>Primary button</Button>
          <Button color='primary' variant='filled-tonal'>Primary button</Button>
          <Button color='primary' variant='text'>Primary button</Button>
          <Button color='primary' variant='outlined'>Primary button</Button>
          <Button color='primary' variant='filled' disabled>Primary button</Button>
          <Button color='primary' variant='filled-tonal' disabled>Primary button</Button>
          <Button color='primary' variant='text' disabled>Primary button</Button>
          <Button color='primary' variant='outlined' disabled>Primary button</Button>
        </div>
        <div class="inline-flex flex-col gap-2 p-2">
          <Button color='danger' variant='filled'>Primary button</Button>
          <Button color='danger' variant='filled-tonal'>Primary button</Button>
          <Button color='danger' variant='text'>Primary button</Button>
          <Button color='danger' variant='outlined'>Primary button</Button>
          <Button color='danger' variant='filled' disabled>Danger button</Button>
          <Button color='danger' variant='filled-tonal' disabled>Danger button</Button>
          <Button color='danger' variant='text' disabled>Danger button</Button>
          <Button color='danger' variant='outlined' disabled>Danger button</Button>
        </div>
      </div>
    `,
  }),
};
