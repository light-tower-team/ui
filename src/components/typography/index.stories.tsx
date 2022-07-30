import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Typography } from ".";

export default {
  title: "Base/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "button",
      ],
    },
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = args => (
  <Typography {...args} />
);

export const Text = Template.bind({});
Text.args = {
  variant: "h1",
  children: "Hello World",
};
