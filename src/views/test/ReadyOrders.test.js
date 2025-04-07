import { render, screen, waitFor } from "@testing-library/react";
import Readyorders from "../ReadyOrders";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


jest.mock("../../providers/OrderProducts.js");

window.BroadcastChannel = function () {
    this.name = "";
    this.close = jest.fn();
    this.postMessage = jest.fn();
    this.addEventListener = jest.fn();
  };

  describe("Readyorders", () => {
    test("Debería mostrar las órdenes listas", async () => {
      const history = createMemoryHistory();
      render(
        <Router location={history.location} navigator={history}>
          <Readyorders />
        </Router>
      );
      await waitFor(() => {
        const cards = screen.getAllByTestId("deliveredOrder");
        expect(cards.length).toBe(1);
      });
    });
    test("Debería mostrar las órdenes entregadas", async () => {
        const history = createMemoryHistory();
        render(
          <Router location={history.location} navigator={history}>
            <Readyorders />
          </Router>
        );
        await waitFor(() => {
          const cards = screen.getAllByTestId("container-ready-order");
          expect(cards.length).toBe(1);
        });
      });
  });