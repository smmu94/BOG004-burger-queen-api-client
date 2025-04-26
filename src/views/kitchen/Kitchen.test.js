import { getOrder as orders } from "@/providers/__mocks__/OrderProducts.js";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Kitchen from ".";

const mockOrders = orders.data;

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

jest.mock("@/components/navBar", () => () => <nav>Navbar Mock</nav>);

describe("Kitchencontainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      getOrders: jest.fn(),
      orders: mockOrders,
    });
  });

  test("render default", () => {
    render(<Kitchen />);
    expect(screen.getByTestId("kitchen-view")).toBeInTheDocument();
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByTestId("kitchen-container")).toBeInTheDocument();
  });

  test("it renders the orders in the kitchen", async () => {
    render(<Kitchen />);
    await waitFor(() => {
      const orders = screen.getAllByTestId("container-order");
      expect(orders.length).toBe(mockOrders.length);
    });
  });

  test("it renders the no orders message", async () => {
    useOrderStore.mockReturnValue({
      getOrders: jest.fn(),
      orders: [],
    });
    render(<Kitchen />);
    await waitFor(() => {
      expect(screen.getByTestId("no-orders")).toBeInTheDocument();
      expect(screen.getByText(/There are no orders at the moment/i)).toBeInTheDocument();
    });
  });
});
