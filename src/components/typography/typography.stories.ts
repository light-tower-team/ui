import type { Meta, StoryObj } from "@storybook/vue3";

import { TYPOGRAPHY_COLORS, TYPOGRAPHY_VARIANTS } from "./constants";
import Typography from "./typography.vue";

const meta: Meta<typeof Typography> = {
  component: Typography,
  argTypes: {
    variant: {
      options: TYPOGRAPHY_VARIANTS,
      control: { type: "select" },
    },
    color: {
      options: TYPOGRAPHY_COLORS,
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (args) => ({
    components: { Typography },
    setup() {
      return { args };
    },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Typography v-bind="args">Some text</Typography>
      </div>
    `,
  }),
  args: {
    color: "primary",
    variant: "body",
  },
};

export const AllVariantsAndColors: Story = {
  render: () => ({
    components: { Typography },
    template: `
      <div class="inline-flex flex-row gap-2 p-2">
        <div class="inline-flex flex-col gap-2 p-2">
          <Typography variant="h1" color="primary">Heading 1</Typography>
          <Typography variant="h2" color="primary">Heading 2</Typography>
          <Typography variant="h3" color="primary">Heading 3</Typography>
          <Typography variant="h4" color="primary">Heading 4</Typography>
          <Typography variant="h5" color="primary">Heading 5</Typography>
          <Typography variant="h6" color="primary">Heading 6</Typography>
          <Typography variant="body" color="primary">Body</Typography>
        </div>
        <div class="inline-flex flex-col gap-2 p-2">
          <Typography variant="h1" color="secondary">Heading 1</Typography>
          <Typography variant="h2" color="secondary">Heading 2</Typography>
          <Typography variant="h3" color="secondary">Heading 3</Typography>
          <Typography variant="h4" color="secondary">Heading 4</Typography>
          <Typography variant="h5" color="secondary">Heading 5</Typography>
          <Typography variant="h6" color="secondary">Heading 6</Typography>
          <Typography variant="body" color="secondary">Body</Typography>
        </div>
        <div class="inline-flex flex-col gap-2 p-2">
          <Typography variant="h1" color="tertiary">Heading 1</Typography>
          <Typography variant="h2" color="tertiary">Heading 2</Typography>
          <Typography variant="h3" color="tertiary">Heading 3</Typography>
          <Typography variant="h4" color="tertiary">Heading 4</Typography>
          <Typography variant="h5" color="tertiary">Heading 5</Typography>
          <Typography variant="h6" color="tertiary">Heading 6</Typography>
          <Typography variant="body" color="tertiary">Body</Typography>
        </div>
      </div>
    `,
  }),
};
