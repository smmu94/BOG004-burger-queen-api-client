import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Input from ".";

const props = {
  id: "test-input",
  field: { name: "test", value: "", onChange: jest.fn(), onBlur: jest.fn() },
};

describe("Input Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders input with default props", () => {
    render(<Input id={props.id} field={props.field} />);
    const input = screen.getByTestId("input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("id", props.id);
  });
  test("renders input with custom type", () => {
    const mockType = "email";
    render(<Input id={props.id} field={props.field} type={mockType} />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", mockType);
  });
  test("renders input with label", () => {
    const mockLabel = "Test Label";
    render(<Input id={props.id} field={props.field} label={mockLabel} />);
    const label = screen.getByText(mockLabel);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", props.id);
  });
  test("renders input with placeholder", () => {
    const mockPlaceholder = "Test Placeholder";
    render(<Input id={props.id} field={props.field} placeholder={mockPlaceholder} />);
    const input = screen.getByPlaceholderText(mockPlaceholder);
    expect(input).toBeInTheDocument();
  });
  test("renders input with error message", () => {
    const mockErrorMessage = "Test Error";
    render(<Input id={props.id} field={props.field} error message={mockErrorMessage} />);
    const errorMessage = screen.getByText(mockErrorMessage);
    expect(errorMessage).toBeInTheDocument();
  });
  test("calls onChange when input value changes", () => {
    const mockValue = "Test Value";
    render(<Input {...props} />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: mockValue } });
    expect(props.field.onChange).toHaveBeenCalledWith(mockValue);
  });
  test("calls onBlur when input is blurred", () => {
    render(<Input id={props.id} field={props.field} />);
    const input = screen.getByTestId("input");
    fireEvent.blur(input);
    expect(props.field.onBlur).toHaveBeenCalled();
  });
  test("renders select input with options", () => {
    const mockOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];
    render(<Input id={props.id} field={props.field} type="select" options={mockOptions} />);
    const select = screen.getByTestId("select");
    expect(select).toBeInTheDocument();
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });
});
