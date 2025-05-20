import React from "react";
import { useOrderStore } from "@/store/useOrderStore";
import { render, screen } from "@testing-library/react";
import Order from ".";

const summaryProducts = [
  {
    id: 2,
    name: "Café americano",
    price: 500,
    quantity: 1,
    type: "Desayuno",
  },
];

const props = {
  id: 1,
  client: "Juan Perez",
  product: summaryProducts,
};

jest.mock("@/store/useOrderStore", () => ({
  useOrderStore: jest.fn(),
}));

describe("Order", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOrderStore.mockReturnValue({
      updateOrder: jest.fn(),
    });
  });
  test("render default", () => {
    render(<Order {...props} />);
    expect(screen.getByTestId("order-card")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Serve Order",
      })
    ).toBeInTheDocument();
  });
  test("should call updateOrder when button is clicked", () => {
    const updateOrderMock = jest.fn();
    useOrderStore.mockReturnValue({
      updateOrder: updateOrderMock,
    });
    render(<Order {...props} />);
    const button = screen.getByRole("button", {
      name: "Serve Order",
    });
    button.click();
    expect(updateOrderMock).toHaveBeenCalledWith(props.id, {
      status: "served",
    });
  });
});
