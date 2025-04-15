import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from "./login";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import * as UserProvider from "../../providers/UserProvider";
import { routes } from "../../utils/constants";
import { loginError, tags } from "./constants";

jest.mock("../../providers/UserProvider", () => ({
  login: jest.fn(),
  getUser: jest.fn(),
  saveUser: jest.fn(),
}));

test("it does not allow the user to login successfully", async () => {
  const history = createMemoryHistory();
  const mockLogin = UserProvider.login;
  mockLogin.mockRejectedValueOnce({ data: null });

  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText("User"), {
    target: { value: "pepe@foodelicious.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  const button = screen.getByText(tags.loginBtn);
  fireEvent.click(button);

  await waitFor(() => {
    const errMessage = screen.queryByTestId("login-error-message");
    expect(errMessage).toHaveTextContent(
      loginError
    );
  });
});

test("allows the user to login as waiter successfully", async () => {
  const history = createMemoryHistory();
  const mockLogin = UserProvider.login;
  mockLogin.mockResolvedValueOnce({ data: {} });

  const mockGetUser = UserProvider.getUser;
  mockGetUser.mockResolvedValueOnce({
    data: [{ email: "waiter@foodelicious.com", roles: { waiter: true } }],
  });

  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText("User"), {
    target: { value: "waiter@foodelicious.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  const button = screen.getByText(tags.loginBtn);
  fireEvent.click(button);

  await waitFor(() => {
    expect(history.location.pathname).toBe(routes.order);
  });
});

test("allows the user to login as admin successfully", async () => {
  const history = createMemoryHistory();
  const mockLogin = UserProvider.login;
  mockLogin.mockResolvedValueOnce({ data: {} });

  const mockGetUser = UserProvider.getUser;
  mockGetUser.mockResolvedValueOnce({
    data: [{ email: "anita.borg@systers.xyz", roles: { admin: true } }],
  });

  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText("User"), {
    target: { value: "anita.borg@systers.xyz" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  const button = screen.getByText(tags.loginBtn);
  fireEvent.click(button);

  await waitFor(() => {
    expect(history.location.pathname).toBe(routes.admin);
  });
});
