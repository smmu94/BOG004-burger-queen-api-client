import React from "react";
import { users } from "@/providers/__mocks__/UserProvider.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { getUserData } from "@/providers/UserProvider";
import { initialUserStatus, useUsersStore } from "@/store/useUsersStore";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AdminUsers from ".";

const mockUsers = users.data;
const mockUser = user();

jest.mock("@/store/useUsersStore", () => {
  const current = jest.requireActual("@/store/useUsersStore");
  return {
    ...current,
    useUsersStore: jest.fn(),
  };
});

jest.mock("@/providers/UserProvider", () => ({
  getUserData: jest.fn(),
}));

const Component = () => {
  const history = createMemoryHistory();
  return (
    <Router location={history.location} navigator={history}>
      <AdminUsers />
    </Router>
  );
};

describe("AdminUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useUsersStore.mockReturnValue({
      status: initialUserStatus,
      getUsers: jest.fn(),
      users: mockUsers
    });
    getUserData.mockReturnValue({
      ...mockUser,
      role: "admin",
    });
  });

  test("render default", () => {
    render(<Component />);
    expect(screen.getByTestId("admin-users-view")).toBeInTheDocument();
    expect(screen.getByTestId("admin-users-container")).toBeInTheDocument();
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
    expect(screen.getByTestId("users")).toBeInTheDocument();
  });

  test("it renders the users in the admin users view", async () => {
    render(<Component />);
    await waitFor(() => {
      const cards = screen.getAllByTestId("card");
      expect(cards.length).toBe(mockUsers.length);
    });
  });
  test("it should show the delete modal", async () => {
    useUsersStore.mockReturnValue({
      status: initialUserStatus,
      getUsers: jest.fn(),
      users: mockUsers,
      deleteUser: jest.fn(),
    });
    render(<Component />);
    const deleteButton = within(screen.getAllByTestId("card")[0]).getAllByTestId(
      "button"
    )[1];
    await act(async () => {
      deleteButton.click();
    });
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
  });
  test("it should close the delete modal", async () => {
    useUsersStore.mockReturnValue({
      status: initialUserStatus,
      getUsers: jest.fn(),
      users: mockUsers,
      deleteUser: jest.fn(),
    });
    render(<Component />);
    const deleteButton = within(screen.getAllByTestId("card")[0]).getAllByTestId(
      "button"
    )[1];
    await act(async () => {
      deleteButton.click();
    });
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
    const cancelButton = within(screen.getByTestId("delete-modal")).getByRole("button", {
      name: "Cancel",
    });
    await act(async () => {
      cancelButton.click();
    });
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });
  test("it should confirm the delete action", async () => {
    useUsersStore.mockReturnValue({
      status: initialUserStatus,
      getUsers: jest.fn(),
      users: mockUsers,
      deleteUser: jest.fn(),
    });
    render(<Component />);
    const deleteButton = within(screen.getAllByTestId("card")[0]).getAllByTestId(
      "button"
    )[1];
    await act(async () => {
      deleteButton.click();
    });
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
    const confirmButton = within(screen.getByTestId("delete-modal")).getByRole("button", {
      name: "Confirm",
    });
    await act(async () => {
      confirmButton.click();
    });
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });
});
