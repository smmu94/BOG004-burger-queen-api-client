import React from "react";
import { getOrder as orders } from "@/providers/__mocks__/OrderProducts.js";
import { getUserData as user } from "@/providers/__mocks__/UserProvider";
import { getUserData } from "@/providers/UserProvider";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Readyorders from ".";

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
      <Readyorders />
    </Router>
  );
};

describe("Readyorders", () => {
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
    expect(screen.getByTestId("readyorders-view")).toBeInTheDocument();
    expect(screen.getByTestId("readyorders-container")).toBeInTheDocument();
    expect(screen.getByTestId("deliveredOrders")).toBeInTheDocument();
    expect(screen.getByTestId("servedOrders")).toBeInTheDocument();
  });
});
