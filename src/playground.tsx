import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Stack } from "./components";
import Dropdown from "./components/new-dropdown";
import ThemeProvider from "./components/theme";
import "./scss/main.global.scss";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement as HTMLElement);

const click = (e: React.MouseEvent) =>
  console.log("Item: ", e.currentTarget.innerHTML);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Stack
        alignItems="center"
        justifyContent="center"
        className="ui-w-full ui-pt-14"
      >
        <Dropdown>
          <Dropdown.Header label="Header"></Dropdown.Header>
          <Dropdown.Item onClick={click}>First Item</Dropdown.Item>
          <Dropdown.SubMenu label="Second Item" depth={1}>
            <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
            <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
            <Dropdown.SubMenu label="Nested Third Item" depth={2}>
              <Dropdown.Item onClick={click}>
                Nested Nested First Item
              </Dropdown.Item>
              <Dropdown.Item onClick={click}>
                Nested Nested Second Item
              </Dropdown.Item>
              <Dropdown.Item onClick={click}>
                Nested Nested Third Item
              </Dropdown.Item>
              <Dropdown.Item onClick={click}>
                Nested Nested Fourth Item
              </Dropdown.Item>
              <Dropdown.SubMenu label="Nested Third Item" depth={3}>
                <Dropdown.Item onClick={click}>
                  Nested Nested Nested First Item
                </Dropdown.Item>
                <Dropdown.Item onClick={click}>
                  Nested Nested Nested Second Item
                </Dropdown.Item>
                <Dropdown.Item onClick={click}>
                  Nested Nested Nested Third Item
                </Dropdown.Item>
                <Dropdown.Item onClick={click}>
                  Nested Nested Nested Fourth Item
                </Dropdown.Item>
              </Dropdown.SubMenu>
            </Dropdown.SubMenu>
            <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          </Dropdown.SubMenu>
          <Dropdown.Item onClick={click}>Third Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Fourth Item</Dropdown.Item>
          <Dropdown.SubMenu label="Fifth Item" depth={1}>
            <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
            <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
            <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          </Dropdown.SubMenu>
          <Dropdown.Footer>
            <Dropdown.Item onClick={click}>Footer First Item</Dropdown.Item>
            <Dropdown.Item onClick={click}>Footer Second Item</Dropdown.Item>
          </Dropdown.Footer>
          <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested First Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Second Item</Dropdown.Item>
          <Dropdown.Item onClick={click}>Nested Fourth Item</Dropdown.Item>
        </Dropdown>
      </Stack>
    </ThemeProvider>
  </React.StrictMode>
);
