import { render, screen } from "@testing-library/react";
import ServedOrder from ".";

const props = {
  client: "Juan Perez",
  timeOrd: "12:00",
};

describe("ServedOrder", () => {
  test("render default", () => {
    render(<ServedOrder {...props} />);
    expect(screen.getByTestId("ServedOrder")).toBeInTheDocument();
    expect(screen.getByText(props.client)).toBeInTheDocument();
    expect(screen.getByText(props.timeOrd)).toBeInTheDocument();
  });
});