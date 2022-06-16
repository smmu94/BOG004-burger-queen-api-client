import "@testing-library/jest-dom";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import Navbar from "../navBar";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("navBar", () => {
  beforeEach(() => {
    // window.sessionStorage = { setItem: jest.fn() };
    // window.JSON2 = { stringify: jest.fn()};
    const user = {
      name: "Ana Pérez",
      email: "anita.borg@systers.xyz",
      password: "$2a$10$itZyq8s85",
      roles: "admin",
      id: 1,
    };
    window.sessionStorage.setItem("user", JSON.stringify(user));
  });

  test("Al cerrar sesión debería navegar a home", async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Navbar  item1="EMPLEADOS"
        item2="PRODUCTOS"
        link1="/admin"
        link2="/admin-products" />
      </Router>
    );
    const logOutIcon = screen.getByTestId("logout");
    fireEvent.click(logOutIcon);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });
  });
});
