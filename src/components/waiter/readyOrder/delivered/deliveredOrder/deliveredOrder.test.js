import { render, screen } from "@testing-library/react";
import React from "react";
import DeliveredOrder from ".";
import { useOrderStore } from "@/store/useOrderStore";

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

describe("DeliveredOrder", () => {
   beforeEach(() => {
      jest.clearAllMocks();
      useOrderStore.mockReturnValue({
        updateOrder: jest.fn(),
      });
    });
  test("render default", () => {
    render(<DeliveredOrder {...props} />);
    expect(screen.getByTestId("delivered-order")).toBeInTheDocument();
    expect(screen.getByTestId("status")).toBeInTheDocument();
    expect(screen.getByTestId("status")).toHaveTextContent("delivered");
    expect(screen.getByTestId("order-product")).toBeInTheDocument();
    expect(screen.getByTestId("order-product")).toHaveTextContent(
      summaryProducts[0].name
    );
    expect(screen.getByTestId("order-product")).toHaveTextContent(
      summaryProducts[0].quantity
    );
    expect(screen.getByTestId("btn-serve")).toBeInTheDocument();
  });
  test("should call updateOrder when button is clicked", () => {
    const updateOrderMock = jest.fn();
    useOrderStore.mockReturnValue({
      updateOrder: updateOrderMock,
    });
    render(<DeliveredOrder {...props} />);
    const button = screen.getByTestId("btn-serve");
    button.click();
    expect(updateOrderMock).toHaveBeenCalledWith(props.id, {
      status: "served",
    });
  });
});
