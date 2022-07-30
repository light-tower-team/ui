import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button } from ".";
import Stack from "../stack";
import Badge from "../badge";

export default {
  title: "Base/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = args => (
  <Button {...args} />
);

Default.args = {
  children: "Default Button",
};

export const WithIcon: ComponentStory<typeof Button> = args => (
  <div>
    <Stack spacing={2}>
      <Button {...args} />
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<StarBorderIcon />}
          variant="outlined"
          size="large"
        />
        <Button
          startIcon={<StarBorderIcon />}
          variant="outlined"
          size="medium"
        />
        <Button
          startIcon={<StarBorderIcon />}
          variant="outlined"
          size="small"
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<StarBorderIcon />} variant="outlined" size="large">
          Icon text
        </Button>
        <Button startIcon={<StarBorderIcon />} variant="outlined" size="medium">
          Icon text
        </Button>
        <Button startIcon={<StarBorderIcon />} variant="outlined" size="small">
          Icon text
        </Button>
      </Stack>
    </Stack>
  </div>
);

WithIcon.args = {
  startIcon: <StarBorderIcon />,
};

export const WithLoadingState: ComponentStory<typeof Button> = args => (
  <div>
    <Stack spacing={2}>
      <Button {...args}>Loading Button</Button>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<StarBorderIcon />} variant="outlined" />
        <Button
          startIcon={<StarBorderIcon />}
          variant="outlined"
          loading={true}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button startIcon={<StarBorderIcon />} variant="outlined">
          Icon text
        </Button>
        <Button
          startIcon={<StarBorderIcon />}
          variant="outlined"
          loading={true}
        >
          Icon text
        </Button>
      </Stack>
    </Stack>
  </div>
);

WithLoadingState.args = {
  loading: true,
};

export const WithBadge: ComponentStory<typeof Button> = () => (
  <div>
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Button
          variant="contained"
          startIcon={<StarBorderIcon />}
          endIcon={<Badge label={5} size="small" />}
        >
          Icon text
        </Button>
        <Button
          variant="outlined"
          startIcon={<StarBorderIcon />}
          endIcon={<Badge label={5} size="small" />}
        >
          Icon text
        </Button>
        <Button
          variant="text"
          startIcon={<StarBorderIcon />}
          endIcon={<Badge label={5} size="small" />}
        >
          Icon text
        </Button>
      </Stack>
    </Stack>
  </div>
);

WithBadge.args = {};
