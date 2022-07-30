import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Breadcrumbs from ".";
import BreadcrumbsLink from "./components/link";

export default {
  title: "Base/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

export const Default: ComponentStory<typeof Breadcrumbs> = () => (
  <Breadcrumbs>
    <BreadcrumbsLink href="#1">Folder 1</BreadcrumbsLink>
    <BreadcrumbsLink href="#2">Folder 2</BreadcrumbsLink>
    <BreadcrumbsLink href="#3">Folder 3</BreadcrumbsLink>
    <BreadcrumbsLink href="#4">Folder 4</BreadcrumbsLink>
    <BreadcrumbsLink href="#5">Folder 5</BreadcrumbsLink>
    <BreadcrumbsLink href="#6">Folder 6</BreadcrumbsLink>
    <BreadcrumbsLink href="#7">Folder 7</BreadcrumbsLink>
    <BreadcrumbsLink href="#8">Folder 8</BreadcrumbsLink>
    <BreadcrumbsLink href="#9">Folder 9</BreadcrumbsLink>
    <BreadcrumbsLink href="#10">Folder 10</BreadcrumbsLink>
    <BreadcrumbsLink href="#11">Folder 11</BreadcrumbsLink>
    <BreadcrumbsLink href="#12">Folder 12</BreadcrumbsLink>
  </Breadcrumbs>
);

export const NonCollapsed: ComponentStory<typeof Breadcrumbs> = () => (
  <Breadcrumbs>
    <BreadcrumbsLink href="#1">Folder 1</BreadcrumbsLink>
    <BreadcrumbsLink href="#2">Folder 2</BreadcrumbsLink>
    <BreadcrumbsLink href="#3">Folder 3</BreadcrumbsLink>
    <BreadcrumbsLink href="#4">Folder 4</BreadcrumbsLink>
  </Breadcrumbs>
);
