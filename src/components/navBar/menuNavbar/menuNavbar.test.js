import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import MenuNavBar from ".";
import { routes } from "@/utils/constants";

describe("MenuNavBar", () => {
  const items = [
    { label: "ORDERS", path: routes.order },
    { label: "READY", path: routes.readyOrder },
  ];

  const renderWithRouter = () => {
    const history = createMemoryHistory();
    history.push("/initial");
    render(
      <Router location={history.location} navigator={history}>
        <MenuNavBar items={items} />
      </Router>
    );
    return history;
  };

  beforeEach(() => {
    sessionStorage.setItem("user", "test-user");
  });

  test("renders navigation links based on items", () => {
    renderWithRouter();

    items.forEach((_, index) => {
      expect(screen.getByTestId(`link-${index}`)).toBeInTheDocument();
    });
  });

  test("logout clears sessionStorage and redirects to home", () => {
    const history = renderWithRouter();

    const logoutIcon = screen.getByTestId("logout");
    fireEvent.click(logoutIcon);

    expect(sessionStorage.getItem("user")).toBeNull();
    expect(history.location.pathname).toBe(routes.home);
  });
});
