import { getUserData } from "@/providers/UserProvider";
import { routes } from "@/utils/constants";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

jest.mock("@/providers/UserProvider", () => ({
  getUserData: jest.fn(),
}));

const mockGetUserData = (roles = {}) => {
  getUserData.mockReturnValue({
    accessToken: "mocked-token",
    user: {
      email: "mock@user.com",
      roles,
      id: 3,
    },
  });
};

describe("ProtectedRoute", () => {
  test("should render Order page for waiter", async () => {
    mockGetUserData({ waiter: true });

    const history = createMemoryHistory();
    history.push(routes.order);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.order}>
          <div data-testid="waiter">Order page</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("waiter")).toBeInTheDocument();
    });
  });

  test("should not render admin page for waiter", async () => {
    mockGetUserData({ waiter: true });

    const history = createMemoryHistory();
    history.push(routes.admin);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.admin}>
          <div data-testid="admin">Admin page</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.home);
    });
  });

  test("should render admin page for admin", async () => {
    mockGetUserData({ admin: true });

    const history = createMemoryHistory();
    history.push(routes.admin);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.admin}>
          <div data-testid="admin">Admin Page</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("admin")).toBeInTheDocument();
    });
  });

  test("should redirect to home if user does not have access to kitchen page", async () => {
    mockGetUserData({ waiter: true });

    const history = createMemoryHistory();
    history.push(routes.kitchen);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.kitchen}>
          <div data-testid="kitchen">Kitchen Page</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.home);
    });
  });

  test("should render kitchen page for chef", async () => {
    mockGetUserData({ chef: true });

    const history = createMemoryHistory();
    history.push(routes.kitchen);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.kitchen}>
          <div data-testid="kitchen">Kitchen Page</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("kitchen")).toBeInTheDocument();
    });
  });

  test("should redirect to home if user does not have access to readyOrder page", async () => {
    mockGetUserData({ chef: true });

    const history = createMemoryHistory();
    history.push(routes.readyOrder);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.readyOrder}>
          <div data-testid="readyOrder">Ready Order</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.home);
    });
  });

  test("should render readyOrder page for waiter", async () => {
    mockGetUserData({ waiter: true });

    const history = createMemoryHistory();
    history.push(routes.readyOrder);

    render(
      <Router location={history.location} navigator={history}>
        <ProtectedRoute target={routes.readyOrder}>
          <div data-testid="readyOrder">Ready Order</div>
        </ProtectedRoute>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("readyOrder")).toBeInTheDocument();
    });
  });
});
