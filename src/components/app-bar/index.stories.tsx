import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AppBar } from ".";
import { Stack } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Logo from "../logo";
import Avatar from "../avatar";
import Button from "../button";

export default {
  title: "Base/AppBar",
  component: AppBar,
} as ComponentMeta<typeof AppBar>;

export const DefaultAppBar: ComponentStory<typeof AppBar> = (args) => (
  <Stack className="ui-border-1 ui-pos-rel ui-h-screen">
    <AppBar {...args}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="ui-w-full"
      >
        <Logo />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            startIcon={<InfoOutlinedIcon />}
            variant="text"
            color="neutral"
            rounded
          />
          <Button
            startIcon={<SettingsOutlinedIcon />}
            variant="text"
            color="neutral"
            rounded
          />
          <Avatar name="Avatar" />
        </Stack>
      </Stack>
    </AppBar>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At ipsum sapiente
      tempore repudiandae aliquid, debitis ut, eaque laborum vel veritatis
      commodi delectus voluptatum incidunt pariatur doloribus! Molestiae
      blanditiis unde cupiditate!
    </p>
  </Stack>
);
