import React from "react";
import { products } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { getUserData } from "@/providers/UserProvider";
import { initialStatus, useProductStore } from "@/store/useProductStore";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AdminProducts from ".";

const mockProducts = products.data;
const mockUser = user();

jest.mock("@/store/useProductStore", () => {
  const current = jest.requireActual("@/store/useProductStore");
  return {
    ...current,
    useProductStore: jest.fn(),
  };
});

jest.mock("@/providers/UserProvider", () => ({
  getUserData: jest.fn(),
}));

const Component = () => {
  const history = createMemoryHistory();
  return (
    <Router location={history.location} navigator={history}>
      <AdminProducts />
    </Router>
  );
};

describe("AdminProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProductStore.mockReturnValue({
      status: initialStatus,
      getProducts: jest.fn(),
      products: mockProducts,
    });
    getUserData.mockReturnValue({
      ...mockUser,
      role: "admin",
    });
  });

  test("render default", () => {
    render(<Component />);
    expect(screen.getByTestId("admin-products-view")).toBeInTheDocument();
    expect(screen.getByTestId("admin-products-container")).toBeInTheDocument();
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
    expect(screen.getByTestId("products")).toBeInTheDocument();
  });

  test("it renders the products in the admin products view", async () => {
    render(<Component />);
    await waitFor(() => {
      const cards = screen.getAllByTestId("card");
      expect(cards.length).toBe(mockProducts.length);
    });
  });
  test("it should show the delete modal", async () => {
    useProductStore.mockReturnValue({
      status: initialStatus,
      getProducts: jest.fn(),
      products: mockProducts,
      deleteProduct: jest.fn(),
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
    useProductStore.mockReturnValue({
      status: initialStatus,
      getProducts: jest.fn(),
      products: mockProducts,
      deleteProduct: jest.fn(),
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
    useProductStore.mockReturnValue({
      status: initialStatus,
      getProducts: jest.fn(),
      products: mockProducts,
      deleteProduct: jest.fn(),
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
