import React from "react";
import * as ReactDOMClient from "react-dom/client";
import Stack from "./components/stack";
import Breadcrumbs from "./components/breadcrumbs";
import BreadcrumbsLink from "./components/breadcrumbs/components/link";
import ThemeProvider from "./components/theme";
import "./scss/main.global.scss";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Stack className="ui-w-full ui-h-screen ui-p-16" spacing={2}>
        <Stack>
          <Breadcrumbs onRedirect={href => console.log(href)}>
            <BreadcrumbsLink href="#1">Folder 1</BreadcrumbsLink>
          </Breadcrumbs>
        </Stack>
        <Stack>
          <Breadcrumbs onRedirect={href => console.log(href)}>
            <BreadcrumbsLink href="#1">Folder 1</BreadcrumbsLink>
            <BreadcrumbsLink href="#2">Folder 2</BreadcrumbsLink>
          </Breadcrumbs>
        </Stack>
        <Stack>
          <Breadcrumbs onRedirect={href => console.log(href)}>
            <Breadcrumbs.Link href="#1">Folder 1</Breadcrumbs.Link>
            <Breadcrumbs.Link href="#2">Folder 2</Breadcrumbs.Link>
            <Breadcrumbs.Link href="#3">Folder 3</Breadcrumbs.Link>
            <Breadcrumbs.Link href="#3">Folder 4</Breadcrumbs.Link>
          </Breadcrumbs>
        </Stack>
        <Stack>
          <Breadcrumbs onRedirect={href => console.log(href)}>
            <BreadcrumbsLink href="#1">Folder 1</BreadcrumbsLink>
            <BreadcrumbsLink href="#2">Folder 2</BreadcrumbsLink>
            <BreadcrumbsLink href="#3">Folder 3</BreadcrumbsLink>
            <BreadcrumbsLink href="#4">Folder 4</BreadcrumbsLink>
            <BreadcrumbsLink href="#5">Folder 5</BreadcrumbsLink>
          </Breadcrumbs>
        </Stack>
        <Stack>
          <Breadcrumbs onRedirect={href => console.log(href)}>
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
        </Stack>
      </Stack>
    </ThemeProvider>
  </React.StrictMode>
);
