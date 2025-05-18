import React from "react";
import { render, screen } from "@testing-library/react";
import OrderCard from ".";

const props = {
  id: "123456",
  client: "John Doe",
  product: [
    { id: "1", name: "Product A", quantity: 2 },
    { id: "2", name: "Product B", quantity: 3 },
  ],
  badgeColor: "success",
  badgeText: "Completed",
};

describe("OrderCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders default", () => {
    render(
      <OrderCard {...props}>
        <p>Children</p>
      </OrderCard>
    );
    expect(screen.getByTestId("order-card")).toBeInTheDocument();
    expect(screen.getByText(`Order #${props.id}`)).toBeInTheDocument();
    expect(screen.getByText(`Customer: ${props.client}`)).toBeInTheDocument();
    props.product.forEach((prod) => {
      expect(screen.getByText(prod.name)).toBeInTheDocument();
      expect(screen.getByText(prod.quantity)).toBeInTheDocument();
    });
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
  test("renders with custom badge color and text", () => {
    render(
      <OrderCard {...props} badgeColor="warning" badgeText="Pending">
        <p>Children</p>
      </OrderCard>
    );
    expect(screen.getByTestId("status")).toHaveTextContent("Pending");
    expect(screen.getByTestId("status")).toHaveClass("bg-warning");
  });
});
