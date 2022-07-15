import React from "react";
import { render, queryHelpers } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from ".";
import { initialThemeConfig } from "./context";

describe("", () => {
  test("rendering app and portal roots component", () => {
    const { container } = render(<ThemeProvider></ThemeProvider>);

    expect(
      queryHelpers.queryByAttribute(
        "id",
        container,
        initialThemeConfig.APP_ROOT_DIR
      )
    ).not.toBeNull();

    expect(
      queryHelpers.queryByAttribute(
        "id",
        container,
        initialThemeConfig.APP_ROOT_DIR
      )
    ).toBeInTheDocument();

    expect(
      queryHelpers.queryByAttribute(
        "id",
        container,
        initialThemeConfig.PORTAL_ROOT_DIR
      )
    ).not.toBeNull();

    expect(
      queryHelpers.queryByAttribute(
        "id",
        container,
        initialThemeConfig.PORTAL_ROOT_DIR
      )
    ).toBeInTheDocument();
  });

  test("the checking to rendering children", () => {
    const testId = "some-content";

    const { getByTestId } = render(
      <ThemeProvider>
        <div data-testid={testId}></div>
      </ThemeProvider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });
});
