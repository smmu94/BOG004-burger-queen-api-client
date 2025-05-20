import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductList from ".";
import { FOODTYPE } from "./constants";
import { products } from "@/providers/__mocks__/OrderProducts.js";
import { useProductStore } from "@/store/useProductStore";

const mockProducts = products.data;

jest.mock("@/store/useProductStore", () => ({
  useProductStore: jest.fn(),
}));

describe("ProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProductStore.mockReturnValue({
      getProducts: jest.fn(),
      products: mockProducts,
    });
  });
  test("it renders the productList component", () => {
    render(<ProductList />);
    expect(screen.getByRole("button", { name: FOODTYPE.breakFast })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: FOODTYPE.lunch })).toBeInTheDocument();
    expect(screen.getByTestId("products")).toBeInTheDocument();
  });
  test("it renders the products by breakFast type", async () => {
    render(<ProductList />);
    const breakFastButton = screen.getByRole("button", { name: FOODTYPE.breakFast });
    fireEvent.click(breakFastButton);
    await waitFor(() => {
      const products = screen.getAllByTestId("card");
      expect(products.length).toBe(2);
    });
  });
  test("it renders the products by lunch type", async () => {
    render(<ProductList />);
    const lunchButton = screen.getByRole("button", { name: FOODTYPE.lunch });
    fireEvent.click(lunchButton);
    await waitFor(() => {
      const products = screen.getAllByTestId("card");
      expect(products.length).toBe(1);
    });
  });
});
