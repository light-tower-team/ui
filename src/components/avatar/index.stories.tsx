import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Avatar } from ".";
import { Stack } from "@mui/material";

export default {
  title: "Base/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

export const DefaultBadge: ComponentStory<typeof Avatar> = args => (
  <Avatar {...args} />
);

DefaultBadge.args = {
  name: "Avatar",
};

export const SizeBadge: ComponentStory<typeof Avatar> = () => (
  <Stack spacing={2}>
    <Stack direction="row" spacing={2}>
      <Avatar name="avatar" size="xs" />
      <Avatar name="avatar" size="sm" />
      <Avatar name="avatar" size="md" />
      <Avatar name="avatar" size="lg" />
      <Avatar name="avatar" size="xl" />
    </Stack>
    <Stack direction="row" spacing={2}>
      <Avatar name="avatar" size="xs" rounded />
      <Avatar name="avatar" size="sm" rounded />
      <Avatar name="avatar" size="md" rounded />
      <Avatar name="avatar" size="lg" rounded />
      <Avatar name="avatar" size="xl" rounded />
    </Stack>
  </Stack>
);

export const ColorBadge: ComponentStory<typeof Avatar> = () => (
  <Stack spacing={2}>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Avatar name="avatar" size="xs" />
        <Avatar name="avatar" size="sm" />
        <Avatar name="avatar" size="md" />
        <Avatar name="avatar" size="lg" />
        <Avatar name="avatar" size="xl" />
      </Stack>
    </Stack>
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Avatar name="avatar" size="xs" color="primary" />
        <Avatar name="avatar" size="sm" color="primary" />
        <Avatar name="avatar" size="md" color="primary" />
        <Avatar name="avatar" size="lg" color="primary" />
        <Avatar name="avatar" size="xl" color="primary" />
      </Stack>
    </Stack>
  </Stack>
);
