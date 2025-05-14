import React from "react";
import { products } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { getUserData } from "@/providers/UserProvider";
import { initialStatus, useProductStore } from "@/store/useProductStore";
import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AdminproductsView from ".";

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
      <AdminproductsView />
    </Router>
  );
};

describe("Adminproducts", () => {
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
    expect(screen.getByTestId("create-product")).toBeInTheDocument();
    expect(screen.getByTestId("products")).toBeInTheDocument();
  });

  test("it renders the products in the admin products view", async () => {
    render(<Component />);
    await waitFor(() => {
      const cards = screen.getAllByTestId("product-card");
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
    await waitFor(() => {
      const deleteButtons = screen.getAllByTestId("delete-product");
      expect(deleteButtons.length).toBe(mockProducts.length);
    });
    const deleteButtons = screen.getAllByTestId("delete-product");
    await act(async () => {
      deleteButtons[0].click();
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
    const deleteButtons = screen.getAllByTestId("delete-product");
    await act(async () => {
      deleteButtons[0].click();
    });
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
    const cancelButton = screen.getByTestId("cancel-delete");
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
    const deleteButtons = screen.getAllByTestId("delete-product");
    await act(async () => {
      deleteButtons[0].click();
    });
    await waitFor(() => {
      expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
    });
    const confirmButton = screen.getByTestId("confirm-delete");
    await act(async () => {
      confirmButton.click();
    });
    expect(screen.queryByTestId("delete-modal")).not.toBeInTheDocument();
  });
});
