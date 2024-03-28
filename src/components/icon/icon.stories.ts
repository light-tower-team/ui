import type { Meta, StoryObj } from "@storybook/vue3";
import { ICON_NAMES, ICON_SIZES } from "./constants";
import Icon from "./icon.vue";

const meta: Meta<typeof Icon> = {
  component: Icon,
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
    size: {
      options: ICON_SIZES,
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => ({
    components: { Icon },
    setup() {
      return { args };
    },
    template: `<Icon v-bind="args" />`,
  }),
  args: {
    name: "check-circle",
    size: 32,
  },
};
