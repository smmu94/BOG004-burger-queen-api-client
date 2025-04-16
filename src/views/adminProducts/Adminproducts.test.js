import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import AdminproductsView from ".";

jest.mock("@/providers/OrderProducts.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
  this.addEventListener = jest.fn();
};

describe("Adminproducts", () => {
  test("muestra los productos (view)", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <AdminproductsView />
      </Router>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId("admin-product");
      expect(cards.length).toBe(3);
    });
  });
});
