import { routes } from "@/utils/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Navbar from ".";

describe("navBar", () => {
  beforeEach(() => {
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
        <Navbar
          item1="EMPLEADOS"
          item2="PRODUCTOS"
          link1={routes.admin}
          link2={routes.adminProducts}
        />
      </Router>
    );
    const logOutIcon = screen.getByTestId("logout");
    fireEvent.click(logOutIcon);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.home);
    });
  });
});
