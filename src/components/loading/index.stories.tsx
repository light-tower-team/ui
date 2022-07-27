import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loading } from ".";

export default {
  title: "Base/Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const DefaultLoading: ComponentStory<typeof Loading> = args => (
  <Loading {...args} />
);
