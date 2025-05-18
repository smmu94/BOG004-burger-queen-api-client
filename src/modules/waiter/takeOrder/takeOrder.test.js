import React from "react";
import { getUserData } from "@/providers/UserProvider";
import { products } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import TakeOrder from ".";
import { useProductStore } from "@/store/useProductStore";

const mockUser = user();
jest.mock("@/providers/UserProvider", () => ({
  getUserData: jest.fn(),
}));
const mockProducts = products.data;
jest.mock("@/store/useProductStore", () => ({
  useProductStore: jest.fn(),
}));

const Component = () => {
  const history = createMemoryHistory();
  return (
    <Router location={history.location} navigator={history}>
      <TakeOrder />
    </Router>
  );
};

describe("TakeOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getUserData.mockReturnValue(mockUser);
    useProductStore.mockReturnValue({
      getProducts: jest.fn(),
      products: mockProducts,
    });
  });
  test("render default", () => {
    render(<Component />);
    expect(screen.getByTestId("order-view")).toBeInTheDocument();
    expect(screen.getByTestId("order-container")).toBeInTheDocument();
    expect(screen.getByTestId("order-products")).toBeInTheDocument();
    expect(screen.getByTestId("order-summary")).toBeInTheDocument();
  });
});
