import { routes } from "@/utils/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Navbar from ".";

describe("Navbar", () => {
  const user = {
    name: "Ana Pérez",
    email: "anita.borg@systers.xyz",
    password: "$2a$10$itZyq8s85",
    roles: { admin: true },
    id: 1,
  };

  const renderNavbar = () => {
    const history = createMemoryHistory();
    history.push(routes.order);
    render(
      <Router location={history.location} navigator={history}>
        <Navbar items={[{ label: "ORDERS", path: routes.order }]} />
      </Router>
    );
    return history;
  };

  beforeEach(() => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  });

  test("renders navbar with logos and item", () => {
    renderNavbar();
    expect(screen.getByTestId("logo-mobile")).toBeInTheDocument();
    expect(screen.getByTestId("logo-desktop")).toBeInTheDocument();
    expect(screen.getByText("ORDERS")).toBeInTheDocument();
  });

  test("shows mobile menu when clicking hamburger icon", () => {
    renderNavbar();
    const hamburger = screen.getByTestId("hamburger-menu");
    fireEvent.click(hamburger);
    expect(screen.getByText("ORDERS")).toBeInTheDocument();
  });
});
