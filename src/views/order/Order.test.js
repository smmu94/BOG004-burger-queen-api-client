import { getUserData } from "@/providers/UserProvider";
import { products } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import Ordercontainer from ".";
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
      <Ordercontainer />
    </Router>
  );
};

describe("Ordercontainer", () => {
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
