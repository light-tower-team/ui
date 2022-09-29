import { Meta, StoryFn } from "@storybook/vue3";
import UiTextField from "./textfield.vue";

export default {
  title: "Components/TextField",
  component: UiTextField,
} as Meta<typeof UiTextField>;

export const Primary: StoryFn<typeof UiTextField> = () => ({
  components: { UiTextfield: UiTextField },
  template: `<ui-textfield label="Label" desc="some input"/>`,
});
