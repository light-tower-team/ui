import React from "react";
import * as ReactDOMClient from "react-dom/client";
import ThemeProvider from "./components/theme";
import "./scss/main.global.scss";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider></ThemeProvider>
  </React.StrictMode>
);
