import { getOrder as orders } from "@/providers/__mocks__/OrderProducts.js";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen } from "@testing-library/react";
import React from "react";
import Delivered from ".";

const { data: mockOrders } = orders;

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

describe("Delivered", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      orders: mockOrders,
    });
  });

  test("render default", () => {
    render(<Delivered />);
    expect(screen.getByTestId("deliveredOrders")).toBeInTheDocument();
    const orders = screen.getAllByTestId("delivered-order");
    expect(orders.length).toBe(mockOrders.filter((o) => o.status === "delivered").length);
  });
});
