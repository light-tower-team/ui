import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Dropdown } from ".";
import Stack from "../stack";
import DropdownMenuItem from "./components/item";
import DropdownNestedMenu from "./components/nested-menu";
import DropdownMenuHeader from "./components/header";
import DropdownMenuFooter from "./components/footer";

export default {
  title: "Base/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const Default: ComponentStory<typeof Dropdown> = args => (
  <Dropdown {...args} />
);

Default.args = {
  text: "Default Dropdown",
  children: (
    <>
      <DropdownMenuItem text={"First Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Second Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Third Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Fourth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Fifth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Sixth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Seventh Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Eighth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Ninth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Tenth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Eleventh Item"}></DropdownMenuItem>
    </>
  ),
};

export const NestedMenu: ComponentStory<typeof Dropdown> = args => (
  <Dropdown {...args} />
);

NestedMenu.args = {
  text: "Nested Dropdown Menu",
  children: (
    <>
      <DropdownMenuItem text={"First Item"}></DropdownMenuItem>
      <DropdownNestedMenu text="Second Item">
        <DropdownMenuItem text={"Nested First Item"}></DropdownMenuItem>
        <DropdownMenuItem text={"Nested Second Item"}></DropdownMenuItem>
        <DropdownMenuItem text={"Nested Third Item"}></DropdownMenuItem>
        <DropdownMenuItem text={"Nested Fourth Item"}></DropdownMenuItem>
      </DropdownNestedMenu>
      <DropdownMenuItem text={"Third Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Fourth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Fifth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Sixth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Seventh Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Eighth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Ninth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Tenth Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Eleventh Item"}></DropdownMenuItem>
    </>
  ),
};

export const WithHeaderAndFooterNestedMenu: ComponentStory<
  typeof Dropdown
> = () => (
  <Dropdown text="With Header And Footer Nested Dropdown Menu">
    {/* <DropdownMenuHeader label="Header"></DropdownMenuHeader> */}
    <DropdownMenuItem text={"First Item"}></DropdownMenuItem>
    <DropdownNestedMenu text="Second Item">
      <DropdownMenuItem text={"Nested First Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Nested Second Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Nested Third Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Nested Fourth Item"}></DropdownMenuItem>
    </DropdownNestedMenu>
    <DropdownMenuItem text={"Third Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Fourth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Fifth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Sixth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Seventh Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Eighth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Ninth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Tenth Item"}></DropdownMenuItem>
    <DropdownMenuItem text={"Eleventh Item"}></DropdownMenuItem>
    {/*   <DropdownMenuFooter>
      <DropdownMenuItem text={"First Footer Item"}></DropdownMenuItem>
      <DropdownMenuItem text={"Second Footer Item"}></DropdownMenuItem>
    </DropdownMenuFooter> */}
  </Dropdown>
);
