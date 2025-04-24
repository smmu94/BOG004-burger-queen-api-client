import React from 'react';
import { render, screen } from "@testing-library/react";
import Ordercontainer from ".";

jest.mock("@/providers/UserProvider.js");

jest.mock("@/components/navBar", () => () => <nav>Navbar Mock</nav>);
jest.mock("@/components/waiter/order/order", () => () => <div>Order Mock</div>);
jest.mock("@/components/waiter/order/summary", () => () => <div>Summary Mock</div>);

describe("Ordercontainer", () => {
  test("render default", () => {
    render(<Ordercontainer />);
    expect(screen.getByTestId("order-view")).toBeInTheDocument();
    expect(screen.getByTestId("order-container")).toBeInTheDocument();
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Order Mock")).toBeInTheDocument();
    expect(screen.getByText("Summary Mock")).toBeInTheDocument();
  });
});
