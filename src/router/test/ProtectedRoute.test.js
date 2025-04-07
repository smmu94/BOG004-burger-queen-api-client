import { render, waitFor, screen } from "@testing-library/react";
import ProtectedRoute from "../ProtectedRoute";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { routes } from "../../utils/constants";

jest.mock("../../providers/UserProvider.js");

describe("App", () => {
  test("should render Order page", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.order}>
          <div data-testid="mesero">hola</div>
        </ProtectedRoute>
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByTestId("mesero")).toBeInTheDocument();
    });
  });

  test("should not render admin page", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.admin}>
          <div data-testid="mesero">hola</div>
        </ProtectedRoute>
      </Router>
    );
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.home);
    });
  });
});
