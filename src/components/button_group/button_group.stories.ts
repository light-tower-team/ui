import type { Meta, StoryObj } from "@storybook/vue3";
import ButtonGroup from "./button_group.vue";
import Button, {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from "../button";
import { BUTTON_GROUP_ORIENTATION, DEFAULT_BUTTON_GROUP_ORIENTATION } from "./constants";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: BUTTON_GROUP_ORIENTATION,
    },
    color: {
      control: { type: "select" },
      options: BUTTON_COLORS,
    },
    size: {
      control: { type: "select" },
      options: BUTTON_SIZES,
    },
    variant: {
      control: { type: "select" },
      options: BUTTON_VARIANTS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonGroup, Button },
    setup() {
      return { args };
    },
    template: `
      <ButtonGroup v-bind="args">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
        <Button>Forth</Button>
        <Button>Fifth</Button>
      </ButtonGroup>
    `,
  }),
  args: {
    orientation: DEFAULT_BUTTON_GROUP_ORIENTATION,
    color: DEFAULT_BUTTON_COLOR,
    size: DEFAULT_BUTTON_SIZE,
    variant: DEFAULT_BUTTON_VARIANT,
  },
};

export const Vertical: Story = {
  render: (args) => ({
    components: { ButtonGroup, Button },
    setup() {
      return { args };
    },
    template: `
      <ButtonGroup v-bind="args" orientation="vertical">
        <Button>First</Button>
        <Button>Second</Button>
        <Button>Third</Button>
        <Button>Forth</Button>
        <Button>Fifth</Button>
      </ButtonGroup>
    `,
  }),
};
