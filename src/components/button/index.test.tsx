import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("", () => {
  test("correct rendering button element", () => {
    render(<Button text="sample button"></Button>);

    expect(screen.getByText(/sample button/i)).toBeInTheDocument();
  });
});
