import { render, screen } from "@testing-library/react";
import Ordercontainer from "../Order";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


jest.mock("../../providers/UserProvider.js");

window.BroadcastChannel = function () {
    this.name = "";
    this.close = jest.fn();
    this.postMessage = jest.fn();
    this.addEventListener = jest.fn();
  };

describe("Order", () => {
    test("order content should have rendered", () => {
      const history = createMemoryHistory();
      render(
        <Router location={history.location} navigator={history}>
          <Ordercontainer />
        </Router>
      );
      expect(screen.getByTestId("order-view")).toBeInTheDocument();
    });
  });