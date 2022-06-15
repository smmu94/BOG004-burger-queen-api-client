import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "../Login";
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
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
