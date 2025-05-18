import { render, screen } from "@testing-library/react";
import OrderRow from ".";

const props = {
  client: "Juan Perez",
  timeOrd: "12:00",
};

describe("OrderRow", () => {
  test("render default", () => {
    render(<OrderRow {...props} />);
    expect(screen.getByTestId("orderRow")).toBeInTheDocument();
    expect(screen.getByText(props.client)).toBeInTheDocument();
    expect(screen.getByText(props.timeOrd)).toBeInTheDocument();
  });
});