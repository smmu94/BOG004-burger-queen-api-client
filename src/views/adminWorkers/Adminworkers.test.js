import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Adminworkers from ".";

jest.mock("@/providers/UserProvider.js");

window.BroadcastChannel = function () {
  this.name = "";
  this.close = jest.fn();
  this.postMessage = jest.fn();
  this.addEventListener = jest.fn();
};

describe("Adminworkers", () => {
  test("Debería mostrar la lista de empleados", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Adminworkers />
      </Router>
    );
    await waitFor(() => {
      const cards = screen.getAllByTestId("admin-worker");
      expect(cards.length).toBe(2);
    });
  });
});
