import React from "react";
import { useUsersStore } from "@/store/useUsersStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddUser from ".";
import { formValidation } from "./constants";

jest.mock("@/store/useUsersStore", () => ({
  useUsersStore: jest.fn(),
}));

const user = {
  name: "John Doe",
  email: "email@example.com",
  password: "password123",
  role: "admin",
}

const renderAddUser = (
  userToEdit = null,
  status = { action: null, type: null, message: "" }
) => {
  const mockAddUser = jest.fn();
  const mockUpdateUser = jest.fn();
  const mockSetUserToEdit = jest.fn();
  const mockClearStatus = jest.fn();

  useUsersStore.mockReturnValue({
    addUser: mockAddUser,
    updateUser: mockUpdateUser,
    status,
    userToEdit,
    setUserToEdit: mockSetUserToEdit,
    clearStatus: mockClearStatus,
  });
  render(<AddUser />);
  return {
    mockAddUser,
    mockUpdateUser,
    mockSetUserToEdit,
    mockClearStatus,
  };
};

describe("AddUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("render CreateForm for adding a product", () => {
    renderAddUser();
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
  });
  test("render createForm for editing a product", () => {
    renderAddUser({ id: 1 });
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
  });
  test("should calls addUser on submit in add mode", async () => {
    const { mockAddUser } = renderAddUser();
    const name = screen.getByLabelText("Full Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const role = screen.getByLabelText("Role");
    fireEvent.change(name, { target: { value: user.name } });
    fireEvent.change(email, { target: { value: user.email } });
    fireEvent.change(password, { target: { value: user.password } });
    fireEvent.change(role, { target: { value: user.role } });
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockAddUser).toHaveBeenCalledTimes(1));
  });
  test("should calls updateUser on submit in edit mode", async () => {
    const { mockUpdateUser } = renderAddUser({ id: 1 });
    const name = screen.getByLabelText("Full Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const role = screen.getByLabelText("Role");
    fireEvent.change(name, { target: { value: user.name } });
    fireEvent.change(email, { target: { value: user.email } });
    fireEvent.change(password, { target: { value: user.password } });
    fireEvent.change(role, { target: { value: user.role } });
    const submitButton = screen.getByRole("button", { name: "Update" });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockUpdateUser).toHaveBeenCalledTimes(1));
  });
  test("should calls setUserToEdit(null) on cancel", async () => {
    const { mockSetUserToEdit } = renderAddUser({ id: 1 });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    await waitFor(() => expect(mockSetUserToEdit).toHaveBeenCalledWith(null));
  });
  test("render success status messages", () => {
    renderAddUser(null, { type: "success", message: "Success!", action: "add" });
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });
  test("render error status messages", () => {
    renderAddUser(null, { type: "error", message: "Error!", action: "add" });
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
  test("should show form validation errors", async () => {
    renderAddUser();
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.name.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.email.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.password.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.role.required)).toBeInTheDocument();
    });
    const email = screen.getByLabelText("Email");
    fireEvent.change(email, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.email.pattern.message)).toBeInTheDocument();
    });
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, { target: { value: "123" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.password.minLength.message)).toBeInTheDocument();
    });
  });
});
