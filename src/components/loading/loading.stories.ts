import type { Meta, StoryObj } from "@storybook/vue3";

import Loading from "./loading.vue";

const meta: Meta<typeof Loading> = {
  title: "components/loading",
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div class="inline-flex flex-col gap-2 p-2">
        <Loading />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Loading },
    template: `
      <div class="inline-flex flex-row items-center gap-2 p-2">
        <Loading size="xs" />
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
        <Loading size="xl" />
      </div>
    `,
  }),
};
