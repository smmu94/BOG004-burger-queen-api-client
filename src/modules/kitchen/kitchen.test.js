import React from "react";
import { getUserData } from "@/providers/UserProvider";
import { getOrder as orders } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider.js";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Kitchen from ".";
import { emptyOrdersMessage } from "./constants";

const { data: mockOrders } = orders;
const mockUser = user();

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

jest.mock("@/providers/UserProvider", () => ({
  getUserData: jest.fn(),
}));

const Component = () => {
  const history = createMemoryHistory();
  return (
    <Router location={history.location} navigator={history}>
      <Kitchen />
    </Router>
  );
};

describe("Kitchen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      getOrders: jest.fn(),
      orders: mockOrders,
    });
    getUserData.mockReturnValue(mockUser);
  });

  test("render default", () => {
    render(<Component />);
    expect(screen.getByTestId("kitchen-view")).toBeInTheDocument();
    expect(screen.getByTestId("kitchen-container")).toBeInTheDocument();
  });

  test("it renders the orders in the kitchen", async () => {
    render(<Component />);
    await waitFor(() => {
      const orders = screen.getAllByTestId("order-card");
      expect(orders.length).toBe(mockOrders.length);
    });
  });

  test("it renders the no orders message", async () => {
    useOrderStore.mockReturnValue({
      getOrders: jest.fn(),
      orders: [],
    });
    render(<Component />);
    await waitFor(() => {
      expect(screen.getByTestId("no-orders")).toBeInTheDocument();
      expect(screen.getByTestId("no-orders")).toHaveTextContent(emptyOrdersMessage);
    });
  });
});
