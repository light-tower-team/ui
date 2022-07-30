import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FolderIcon from "@mui/icons-material/Folder";
import Dropdown from ".";

export default {
  title: "Base/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const Default: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Item>First Item</Dropdown.Item>
    <Dropdown.Item>Second Item</Dropdown.Item>
    <Dropdown.Item>Third Item</Dropdown.Item>
    <Dropdown.Item>Fourth Item</Dropdown.Item>
    <Dropdown.Item>Fifth Item</Dropdown.Item>
    <Dropdown.Item>Sixth Item</Dropdown.Item>
    <Dropdown.Item>Seventh Item</Dropdown.Item>
  </Dropdown>
);

export const WithSubMenu: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Item>First Item</Dropdown.Item>
    <Dropdown.SubMenu label="Second Item" depth={1}>
      <Dropdown.Item>First Item</Dropdown.Item>
      <Dropdown.Item>Second Item</Dropdown.Item>
      <Dropdown.Item>Third Item</Dropdown.Item>
      <Dropdown.Item>Fourth Item</Dropdown.Item>
    </Dropdown.SubMenu>
    <Dropdown.Item>Third Item</Dropdown.Item>
    <Dropdown.Item>Fourth Item</Dropdown.Item>
    <Dropdown.Item>Fifth Item</Dropdown.Item>
    <Dropdown.Item>Sixth Item</Dropdown.Item>
    <Dropdown.Item>Seventh Item</Dropdown.Item>
  </Dropdown>
);

export const WithHeaderAndFooter: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Header label="Header"></Dropdown.Header>
    <Dropdown.Item>First Item</Dropdown.Item>
    <Dropdown.SubMenu label="Second Item" depth={1}>
      <Dropdown.Item>First Item</Dropdown.Item>
      <Dropdown.Item>Second Item</Dropdown.Item>
      <Dropdown.Item>Third Item</Dropdown.Item>
      <Dropdown.Item>Fourth Item</Dropdown.Item>
    </Dropdown.SubMenu>
    <Dropdown.Item>Third Item</Dropdown.Item>
    <Dropdown.Item>Fourth Item</Dropdown.Item>
    <Dropdown.Item>Fifth Item</Dropdown.Item>
    <Dropdown.Item>Sixth Item</Dropdown.Item>
    <Dropdown.Item>Seventh Item</Dropdown.Item>
    <Dropdown.Footer>
      <Dropdown.Item>First Footer Item</Dropdown.Item>
      <Dropdown.Item>Second Footer Item</Dropdown.Item>
    </Dropdown.Footer>
  </Dropdown>
);

export const WithAsyncLoadingItems: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Header label="Header"></Dropdown.Header>
    <Dropdown.Item>First Item</Dropdown.Item>
    <Dropdown.SubMenu label="Async Second Item" depth={1}>
      {() =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve([
              <Dropdown.Item key={1}>First Item</Dropdown.Item>,
              <Dropdown.Item key={2}>Second Item</Dropdown.Item>,
              <Dropdown.Item key={3}>Third Item</Dropdown.Item>,
              <Dropdown.Item key={4}>Fourth Item</Dropdown.Item>,
            ]);
          }, 1000);
        })
      }
    </Dropdown.SubMenu>
    <Dropdown.Item>Third Item</Dropdown.Item>
    <Dropdown.Item>Fourth Item</Dropdown.Item>
    <Dropdown.Item>Fifth Item</Dropdown.Item>
    <Dropdown.Item>Sixth Item</Dropdown.Item>
    <Dropdown.Item>Seventh Item</Dropdown.Item>
    <Dropdown.Footer>
      <Dropdown.Item>First Footer Item</Dropdown.Item>
      <Dropdown.Item>Second Footer Item</Dropdown.Item>
    </Dropdown.Footer>
  </Dropdown>
);

export const WithSectionAndDivider: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Section label="Primary items">
      <Dropdown.Item>First Item</Dropdown.Item>
      <Dropdown.SubMenu label="Async Second Item" depth={1}>
        {() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve([
                <Dropdown.Item key={1}>First Item</Dropdown.Item>,
                <Dropdown.Item key={2}>Second Item</Dropdown.Item>,
                <Dropdown.Item key={3}>Third Item</Dropdown.Item>,
                <Dropdown.Item key={4}>Fourth Item</Dropdown.Item>,
              ]);
            }, 1000);
          })
        }
      </Dropdown.SubMenu>
      <Dropdown.Item>Third Item</Dropdown.Item>
      <Dropdown.Item>Fourth Item</Dropdown.Item>
    </Dropdown.Section>
    <Dropdown.Divider />
    <Dropdown.Section label="Secondary items">
      <Dropdown.Item>Fifth Item</Dropdown.Item>
      <Dropdown.Item>Sixth Item</Dropdown.Item>
      <Dropdown.Item>Seventh Item</Dropdown.Item>
    </Dropdown.Section>
  </Dropdown>
);

export const WithStartIcons: ComponentStory<typeof Dropdown> = () => (
  <Dropdown>
    <Dropdown.Section label="Primary items">
      <Dropdown.Item startIcon={<FolderIcon />}>First Item</Dropdown.Item>
      <Dropdown.SubMenu
        label="Async Second Item"
        depth={1}
        startIcon={<FolderIcon />}
      >
        {() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve([
                <Dropdown.Item key={1} startIcon={<FolderIcon />}>
                  First Item
                </Dropdown.Item>,
                <Dropdown.Item key={2} startIcon={<FolderIcon />}>
                  Second Item
                </Dropdown.Item>,
                <Dropdown.Item key={3} startIcon={<FolderIcon />}>
                  Third Item
                </Dropdown.Item>,
                <Dropdown.Item key={4} startIcon={<FolderIcon />}>
                  Fourth Item
                </Dropdown.Item>,
              ]);
            }, 1000);
          })
        }
      </Dropdown.SubMenu>
      <Dropdown.Item startIcon={<FolderIcon />}>Third Item</Dropdown.Item>
      <Dropdown.Item startIcon={<FolderIcon />}>Fourth Item</Dropdown.Item>
    </Dropdown.Section>
    <Dropdown.Divider />
    <Dropdown.Section label="Secondary items">
      <Dropdown.Item startIcon={<FolderIcon />}>Fifth Item</Dropdown.Item>
      <Dropdown.Item startIcon={<FolderIcon />}>Sixth Item</Dropdown.Item>
      <Dropdown.Item startIcon={<FolderIcon />}>Seventh Item</Dropdown.Item>
    </Dropdown.Section>
  </Dropdown>
);
