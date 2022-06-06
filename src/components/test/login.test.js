import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "../login/login";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


test("it does not allows the user to login successfully", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  const email = screen.getByPlaceholderText("Usuario");

  fireEvent.change(email, { target: { value: "pepe@foodelicious.com" } });

  const password = screen.getByPlaceholderText("Contraseña");
  fireEvent.change(password, { target: { value: "123456" } });

  const button = screen.getByText("INICIAR SESIÓN");
  fireEvent.click(button);

  let errMessage;
  await waitFor(() => {
    errMessage = screen.queryByTestId("login-error-message");
    expect(errMessage.textContent).toBe("Usuario y/o contraseña no encontrado");
  });
});


test("allows the user to login successfully", async() => {

  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  const email = screen.getByPlaceholderText("Usuario");

  fireEvent.change(email, { target: { value: "waiter@foodelicious.com" } });

  const password = screen.getByPlaceholderText("Contraseña");
  fireEvent.change(password, { target: { value: "123456" } });
  const button = screen.getByText("INICIAR SESIÓN");
  fireEvent.click(button);
  await waitFor(() => {
  expect(history.location.pathname).toBe("/order");
  });
});