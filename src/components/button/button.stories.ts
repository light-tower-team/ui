import { Meta, StoryFn } from "@storybook/vue3";
import UiButton from "./button.vue";

export default {
  title: "Components/Button",
  component: UiButton,
} as Meta<typeof UiButton>;

export const Primary: StoryFn<typeof UiButton> = () => ({
  components: { UiButton },
  template: "<ui-button />",
});
