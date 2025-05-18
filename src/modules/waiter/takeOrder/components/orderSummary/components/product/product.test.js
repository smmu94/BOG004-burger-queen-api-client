import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Product from ".";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";

const mockProduct = {
  name: "Sandwich de jamón y queso",
  price: 1000,
  id: 1,
  type: "Desayuno",
  quantity: 2,
};

jest.mock("@/store/useCurrentOrderStore", () => ({
  useCurrentOrderStore: jest.fn(),
}));

describe("Product", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCurrentOrderStore.mockReturnValue({
      products: [],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
  });
  test("renders product summary with placeholder when no products are added", () => {
    render(<Product />);
    const quantityProduct = screen.getByTestId("quantity-product");
    expect(quantityProduct).toBeInTheDocument();
    expect(quantityProduct).toHaveTextContent("0");
  });
  test("renders product summary with added products", () => {
    useCurrentOrderStore.mockReturnValue({
      products: [mockProduct],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    render(<Product />);
    const quantityProduct = screen.getByTestId("quantity-product");
    expect(quantityProduct).toBeInTheDocument();
    expect(quantityProduct).toHaveTextContent("0");
    waitFor(() => {
      expect(quantityProduct).toHaveTextContent(mockProduct.quantity);
      expect(quantityProduct).toHaveTextContent(mockProduct.name);
      expect(quantityProduct).toHaveTextContent(mockProduct.price);
    });
  });
  test("calls removeProduct when subtract icon is clicked", () => {
    useCurrentOrderStore.mockReturnValue({
      products: [mockProduct],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    render(<Product />);
    const subtractIcon = screen.getByTestId("subtract");
    fireEvent.click(subtractIcon);
    expect(useCurrentOrderStore().removeProduct).toHaveBeenCalledWith(
      mockProduct.id
    );
  });
});
