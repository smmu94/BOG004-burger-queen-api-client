import React from "react";
import { getOrder as orders } from "@/providers/__mocks__/OrderProducts";
import { useOrderStore } from "@/store/useOrderStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Kitchen from ".";

const mockOrder = orders.data[0];
const props = {
  id: mockOrder.id,
  client: mockOrder.client,
  product: mockOrder.products,
  status: mockOrder.status,
  dataEntry: mockOrder.dateEntry,
  timeOrd: mockOrder.timeOrd,
};
const mockUpdateOrder = jest.fn();
jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

describe("Kitchen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      updateOrder: mockUpdateOrder,
    });
  });

  test("it renders the order", () => {
    render(<Kitchen {...props} />);
    expect(screen.getByTestId("container-order")).toBeInTheDocument();
  });

  test("it renders the order with delivered status", () => {
    const timeOrd = "00:10";
    render(<Kitchen {...props} status="delivered" timeOrd={timeOrd} />);
    expect(screen.getByTestId("status")).toHaveTextContent("delivered");
    expect(screen.getByTestId("status")).toHaveClass("bg-success");
    expect(screen.getByTestId("delivered-order")).toBeInTheDocument();
    expect(screen.getByText(`The order preparation took ${timeOrd}`)).toBeInTheDocument();
  });

  test("it renders the order with pending status", () => {
    render(<Kitchen {...props} status="pending" />);
    expect(screen.getByTestId("status")).toHaveTextContent("pending");
    expect(screen.getByTestId("status")).toHaveClass("bg-warning");
    expect(screen.queryByTestId("delivered-order")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Send",
      })
    ).toBeInTheDocument();
  });

  test("it should call updateOrder when clicking on button", async () => {
    render(<Kitchen {...props} status="pending" />);
    const btn = screen.getByRole("button", {
      name: "Send",
    });
    fireEvent.click(btn);
    await waitFor(() => expect(mockUpdateOrder).toHaveBeenCalledTimes(1));
  });
});
