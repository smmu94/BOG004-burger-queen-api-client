import React from "react";
import { useUsersStore } from "@/store/useUsersStore";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from ".";

jest.mock("@/store/useUsersStore", () => {
  const current = jest.requireActual("@/store/useUsersStore");
  return {
    ...current,
    useUsersStore: jest.fn(),
  };
});

const props = {
  user: {
    id: 1,
    name: "Test User",
    email: "email@example.com",
    roles: {
      admin: true,
    }

  },
  handleDelete: jest.fn(),
};

describe("UserCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useUsersStore.mockReturnValue({
      setUserToEdit: jest.fn(),
    });
  });
  test("renders correctly", () => {
    render(<UserCard {...props} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText(props.user.name)).toBeInTheDocument();
    expect(screen.getByText(props.user.email)).toBeInTheDocument();
    expect(screen.getByText(Object.keys(props.user.roles))).toBeInTheDocument();
  });
  test("calls setUserToEdit when edit button is clicked", () => {
    const mockSetUserToEdit = jest.fn();
    useUsersStore.mockReturnValue({
      setUserToEdit: mockSetUserToEdit,
    });
    render(<UserCard {...props} />);
    fireEvent.click(screen.getAllByTestId("button")[0]);
    expect(mockSetUserToEdit).toHaveBeenCalledWith(props.user);
  });
  test("calls handleDelete when delete button is clicked", () => {
    const mockHandleDelete = jest.fn();
    render(<UserCard {...props} handleDelete={mockHandleDelete} />);
    fireEvent.click(screen.getAllByTestId("button")[1]);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
