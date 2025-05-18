import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateForm from ".";

const props = {
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      rules: { required: "Username is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: { required: "Email is required" },
    },
  ],
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  initialValues: { username: "", email: "" },
  status: { message: "" },
  isEditing: false,
};

describe("CreateForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders default", () => {
    render(<CreateForm {...props} />);
    const form = document.querySelector("[data-testid='admin-create-form']");
    expect(form).toBeInTheDocument();
  });
  test("renders with every field", () => {
    render(<CreateForm {...props} />);
    props.fields.forEach((field) => {
      const input = document.querySelector(`#${field.name}`);
      expect(input).toBeInTheDocument();
    });
  });
  test("renders with error message", () => {
    const status = {
      action: "add",
      type: "error",
      message: "An error occurred",
    };
    render(<CreateForm {...props} status={status} />);
    const errorMessage = document.querySelector(".alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(status.message);
  });
  test("renders with success message", () => {
    const status = {
      action: "add",
      type: "success",
      message: "Success!",
    };
    render(<CreateForm {...props} status={status} />);
    const successMessage = document.querySelector(".alert");
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toHaveTextContent(status.message);
  });

  test("calls onSubmit when form is submitted", async () => {
    const localProps = {
    ...props,
    onSubmit: jest.fn(),
  };
    render(<CreateForm {...localProps} />);
    fireEvent.change(screen.getByLabelText(localProps.fields[0].label), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(localProps.fields[1].label), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    await waitFor(() => {
      expect(localProps.onSubmit).toHaveBeenCalled();
    });
  });
  test("calls onCancel when cancel button is clicked", () => {
    render(<CreateForm {...props} isEditing />);
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(props.onCancel).toHaveBeenCalled();
  });
});
