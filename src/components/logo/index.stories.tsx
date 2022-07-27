import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Logo } from ".";

export default {
  title: "Base/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const DefaultLogo: ComponentStory<typeof Logo> = (args) => (
  <Logo {...args} />
);
