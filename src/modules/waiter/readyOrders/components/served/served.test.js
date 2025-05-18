import { getOrder as orders } from "@/providers/__mocks__/OrderProducts.js";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Served from ".";

const { data: mockOrders } = orders;

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

describe("Served", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      orders: mockOrders,
    });
  });

  afterAll(() => {
    global.innerWidth = 1024;
  });

  test("render default", () => {
    render(<Served />);
    expect(screen.getByTestId("servedOrders")).toBeInTheDocument();
  });

  test("renders served orders", () => {
    render(<Served />);
    mockOrders
      .filter((o) => o.status === "served")
      .forEach((order) => {
        expect(screen.getByText(order.client)).toBeInTheDocument();
        expect(screen.getByText(order.timeOrd)).toBeInTheDocument();
      });
  });

  test("does not show orders if mobile and not expanded", () => {
    global.innerWidth = 500;
    const { queryByTestId } = render(<Served />);
    expect(queryByTestId("servedOrders")).not.toBeInTheDocument();
  });

  test("shows orders on mobile after clicking to expand", () => {
    global.innerWidth = 500;
    render(<Served />);
    const header = screen.getByTestId("servedOrders-header");
    fireEvent.click(header);
    expect(screen.getByTestId("servedOrders")).toBeInTheDocument();
  });

  test("closes overlay when close button is clicked", () => {
    global.innerWidth = 1024;
    render(<Served />);
    const closeButton = screen.getByRole("button", { name: "✕" });
    expect(closeButton).toBeInTheDocument();
    closeButton.click();
  });
});
