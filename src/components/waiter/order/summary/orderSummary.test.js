import { useCurrentOrderStore } from "@/store/useCurrentOrderStore";
import { useOrderStore } from "@/store/useOrderStore";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import OrderSummary from ".";
import { getTotalPrice } from "./utils";

const mockProductsSummary = [
  {
    id: 2,
    name: "Café americano",
    price: 500,
    quantity: 1,
    type: "Desayuno",
  },
];

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));
jest.mock("@/store/useCurrentOrderStore", () => ({
  useCurrentOrderStore: jest.fn(),
}));

describe("OrderSummary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCurrentOrderStore.mockReturnValue({
      products: [],
      resetProduct: jest.fn(),
    });
    useOrderStore.mockReturnValue({
      createOrder: jest.fn(),
      message: null,
      error: null,
    });
  });

  test("render default", () => {
    render(<OrderSummary />);
    const inputClient = screen.getByTestId("input-client");
    expect(inputClient).toBeInTheDocument();
    const btnClient = screen.getByTestId("btn-client");
    expect(btnClient).toBeInTheDocument();
    const productSummary = screen.getByTestId("product-summary");
    expect(productSummary).toBeInTheDocument();
    const finalSummary = screen.getByTestId("final-summary");
    expect(finalSummary).toBeInTheDocument();
  });
  test("should display total price correctly", () => {  
    useCurrentOrderStore.mockReturnValue({
      products: mockProductsSummary,
      resetProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    render(<OrderSummary />);
    const totalPrice = getTotalPrice(mockProductsSummary);
    const totalPriceElement = screen.getByText(`Total: $${totalPrice}`);
    expect(totalPriceElement).toBeInTheDocument();
  });

  test("displays success message when order is created successfully", () => {
    useCurrentOrderStore.mockReturnValue({
      products: mockProductsSummary,
      resetProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    useOrderStore.mockReturnValue({
      createOrder: jest.fn(),
      message: "Order created successfully",
      error: undefined,
    });
    render(<OrderSummary />);
    const alertMessage = screen.getByTestId("alert-message");
    expect(alertMessage).toHaveTextContent("Order created successfully");
  });

  test("displays error message when order creation fails", () => {
    useCurrentOrderStore.mockReturnValue({
      products: mockProductsSummary,
      resetProduct: jest.fn(),
      removeProduct: jest.fn(),
    });
    useOrderStore.mockReturnValue({
      createOrder: jest.fn(),
      message: undefined,
      error: "Failed to create order",
    });
    render(<OrderSummary />);
    const alertMessage = screen.getByTestId("alert-error");
    expect(alertMessage).toHaveTextContent("Failed to create order");
  });
});
