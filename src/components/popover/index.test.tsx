import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Popover } from ".";
import ThemeProvider from "../theme";
import { initialThemeConfig } from "../theme/context";

describe("", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("rendering without root theme component", () => {
    const getElementByIdWrapper = jest.spyOn(document, "getElementById");
    const consoleErrorWrapper = jest.spyOn(console, "error");
    const testId = "popover-id";

    render(<Popover data-testid={testId} open={true}></Popover>);

    expect(getElementByIdWrapper).toBeCalledTimes(1);
    expect(getElementByIdWrapper).toBeCalledWith(
      initialThemeConfig.APP_ROOT_DIR
    );
    expect(getElementByIdWrapper).toHaveReturnedWith(null);
    expect(consoleErrorWrapper).toBeCalledWith(
      "Was not found theme context. Please use theme provider as the root component in your app"
    );

    expect(screen.queryByTestId(testId)).toBeNull();
  });

  test("correct rendering theme component", () => {
    const consoleErrorWrapper = jest.spyOn(console, "error");
    const testId = "popover-id";

    render(
      <ThemeProvider>
        <Popover data-testid={testId} open={true}></Popover>
      </ThemeProvider>
    );

    expect(consoleErrorWrapper).not.toBeCalled();

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  test("the correct unsubscribing of click event while closing popover", () => {
    const getElementByIdWrapper = jest.spyOn(document, "getElementById");
    const testId = "popover-id";
    const mockedAppRoot: any = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const onClose = () => {};

    getElementByIdWrapper.mockReturnValue(mockedAppRoot);

    const { rerender } = render(
      <ThemeProvider>
        <Popover data-testid={testId} open={true} onClose={onClose}></Popover>
      </ThemeProvider>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();

    rerender(
      <Popover data-testid={testId} open={false} onClose={onClose}></Popover>
    );

    expect(getElementByIdWrapper).toBeCalledTimes(1);
    expect(mockedAppRoot.removeEventListener).toBeCalledWith("click", onClose);

    expect(screen.queryByTestId(testId)).toBeNull();
  });
});
