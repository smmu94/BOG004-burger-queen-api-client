import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from ".";

const props = {
  onClick: jest.fn(),
  children: "Test Button",
};

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("render default", () => {
    render(<Button {...props} />);
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByText(props.children)).toBeInTheDocument();
  });
  test("calls onClick when clicked", () => {
    render(<Button {...props} />);
    fireEvent.click(screen.getByTestId("button"));
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
  test("renders with custom className", () => {
    const customClassName = "custom-class";
    render(<Button {...props} className={customClassName} />);
    expect(screen.getByTestId("button")).toHaveClass(customClassName);
  });
  test("renders with custom type", () => {
    const customType = "submit";
    render(<Button {...props} type={customType} />);
    expect(screen.getByTestId("button")).toHaveAttribute("type", customType);
  });
  test("renders with custom disabled state", () => {
    render(<Button {...props} disabled={true} />);
    expect(screen.getByTestId("button")).toBeDisabled();
  });
  test("renders with custom variant", () => {
    const customVariant = "primary";
    render(<Button {...props} variant={customVariant} />);
    expect(screen.getByTestId("button")).toHaveClass(`variant-${customVariant}`);
  });
  test("renders with custom size", () => {
    const customSize = "large";
    render(<Button {...props} size={customSize} />);
    expect(screen.getByTestId("button")).toHaveClass(`size-${customSize}`);
  });
  test("renders with fullWidth prop", () => {
    render(<Button {...props} fullWidth={true} />);
    expect(screen.getByTestId("button")).toHaveClass("fullWidth");
  });
});
