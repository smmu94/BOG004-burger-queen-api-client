import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Kitchen from "../Kitchen";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("../../providers/OrderProducts.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
  this.addEventListener = jest.fn();
};

describe("Kitchen", () => {
  test("Debería mostrar las órdenes pendientes", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Kitchen />
      </Router>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId("container-order");
      expect(cards.length).toBe(2);
    });
  });
});
