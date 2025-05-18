import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Product from ".";
import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import { products } from "@/providers/__mocks__/OrderProducts";

const mockProduct = products.data[0];

const mockAddProduct = jest.fn();
jest.mock("@/store/useCurrentOrderStore", () => ({
  useCurrentOrderStore: jest.fn(),
}));

describe("Product", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    useCurrentOrderStore.mockReturnValue({
      addProduct: mockAddProduct,
    });
  });

  test("it renders the product", () => {
    render(<Product {...mockProduct} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  test("Should call addProduct when clicking on card product", () => {
    render(<Product {...mockProduct} />);
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    expect(mockAddProduct).toHaveBeenCalledTimes(1);
    expect(mockAddProduct).toHaveBeenCalledWith({
      name: mockProduct.name,
      price: mockProduct.price,
      id: mockProduct.id,
      type: mockProduct.type,
    });
  });
});
