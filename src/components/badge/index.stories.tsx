import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Badge } from ".";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Stack } from "@mui/material";
import Avatar from "../avatar";

export default {
  title: "Base/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const DefaultBadge: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args} />
);

DefaultBadge.args = {
  label: "Default Badge",
};

export const SizeBadge: ComponentStory<typeof Badge> = () => (
  <Stack spacing={2}>
    <Stack spacing={1}>
      <Badge label="Small Badge" size="small" />
      <Badge label="Outlined Small Badge" variant="outlined" size="small" />
    </Stack>
    <Stack spacing={1}>
      <Badge label="Medium Badge" />
      <Badge label="Outlined Medium Badge" variant="outlined" />
    </Stack>
  </Stack>
);

export const IconBadge: ComponentStory<typeof Badge> = () => (
  <Stack spacing={2}>
    <Stack spacing={1}>
      <Badge icon={<StarBorderIcon />} label="Icon Badge" />
      <Badge
        icon={<StarBorderIcon />}
        label="Outlined Icon Badge"
        variant="outlined"
      />
    </Stack>
    <Stack spacing={1}>
      <Badge icon={<StarBorderIcon />} label="Icon Badge" size="small" />
      <Badge
        icon={<StarBorderIcon />}
        label="Outlined Icon Badge"
        variant="outlined"
        size="small"
      />
    </Stack>
  </Stack>
);

export const AvatarBadge: ComponentStory<typeof Badge> = () => (
  <Stack spacing={2}>
    <Stack spacing={1}>
      <Badge avatar={<Avatar name="F" />} label="Icon Badge" size="small" />
      <Badge
        avatar={<Avatar name="F" />}
        label="Outlined Icon Badge"
        variant="outlined"
        size="small"
      />
    </Stack>
    <Stack spacing={1}>
      <Badge avatar={<Avatar name="F" />} label="Icon Badge" />
      <Badge
        avatar={<Avatar name="F" />}
        label="Outlined Icon Badge"
        variant="outlined"
      />
    </Stack>
  </Stack>
);
