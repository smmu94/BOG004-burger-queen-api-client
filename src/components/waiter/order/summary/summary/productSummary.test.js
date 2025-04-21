import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Productsummary from ".";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";

const mockProductSummary = {
  name: "Sandwich de jamón y queso",
  price: 1000,
  id: 1,
  type: "Desayuno",
  quantity: 2,
};

jest.mock("@/store/useCurrentOrderStore", () => ({
  useCurrentOrderStore: jest.fn(),
}));

describe("ProductSummary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCurrentOrderStore.mockReturnValue({
      products: [],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
  });
  test("renders product summary with placeholder when no products are added", () => {
    render(<Productsummary />);
    const quantityProduct = screen.getByTestId("quantity-product");
    expect(quantityProduct).toBeInTheDocument();
    expect(quantityProduct).toHaveTextContent("0");
  });
  test("renders product summary with added products", () => {
    useCurrentOrderStore.mockReturnValue({
      products: [mockProductSummary],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    render(<Productsummary />);
    const quantityProduct = screen.getByTestId("quantity-product");
    expect(quantityProduct).toBeInTheDocument();
    expect(quantityProduct).toHaveTextContent("0");
    waitFor(() => {
      expect(quantityProduct).toHaveTextContent(mockProductSummary.quantity);
      expect(quantityProduct).toHaveTextContent(mockProductSummary.name);
      expect(quantityProduct).toHaveTextContent(mockProductSummary.price);
    });
  });
  test("calls removeProduct when subtract icon is clicked", () => {
    useCurrentOrderStore.mockReturnValue({
      products: [mockProductSummary],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    render(<Productsummary />);
    const subtractIcon = screen.getByTestId("subtract");
    fireEvent.click(subtractIcon);
    expect(useCurrentOrderStore().removeProduct).toHaveBeenCalledWith(
      mockProductSummary.id
    );
  });
});
