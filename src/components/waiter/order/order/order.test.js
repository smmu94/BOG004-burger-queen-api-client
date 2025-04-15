import { render, waitFor, screen } from "@testing-library/react";
import Order from ".";

// import axios from 'axios';

jest.mock("../../../../providers/OrderProducts.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
  this.addEventListener = jest.fn();
};

describe("Order test", () => {
  test("muestra los productos", async () => {
    render(<Order />);
    await waitFor(() => {
      const cards = screen.getAllByTestId("card-product");
      expect(cards.length).toBe(2);
    });
  });
});
