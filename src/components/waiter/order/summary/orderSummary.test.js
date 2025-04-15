import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Ordersummary from ".";

jest.mock("../../../../providers/OrderProducts.js");
jest.mock("../../../../providers/UserProvider.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
};

const summaryProducts = [
  {
    id: 2,
    name: "Café americano",
    price: 500,
    quantity: 1,
    type: "Desayuno",
  },
];

describe("OrderSummary test", () => {
  test("deberia crear una orden", async () => {
    render(<Ordersummary productList={summaryProducts} reset={jest.fn()} />);

    const client = screen.getByTestId("input-client");
    fireEvent.change(client, { target: { value: "Pepe Gonzalez" } });
    const button = screen.getByText("Send");
    fireEvent.click(button);
    // let message = await screen.findByText('Pedido enviado');
    await waitFor(
      () => {
        const message = screen.queryByTestId("created-order");

        expect(message.textContent).toBe("Order created successfully");
      },
      { timeout: 3000 }
    );
  });
});
