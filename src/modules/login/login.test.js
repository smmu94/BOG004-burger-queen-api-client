import React from "react";
import { render, screen } from "@testing-library/react";
import Login from ".";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Login", () => {
  test("img should be in the document", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>
    );
    const image = screen.getByTestId("logo-burger");
    expect(image).toBeInTheDocument();
  });
});
