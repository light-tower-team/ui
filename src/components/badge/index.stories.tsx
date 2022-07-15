import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Badge } from ".";

export default {
  title: "Base/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const DefaultBadge: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);
DefaultBadge.args = {
  label: "Default Button",
};
