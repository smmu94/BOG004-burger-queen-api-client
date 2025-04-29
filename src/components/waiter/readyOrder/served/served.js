import { render, screen } from "@testing-library/react";
import DeliveredOrder from ".";

describe("DeliveredOrder", () => {
  test("it renders the deliveredOrder", () => {
    render(<DeliveredOrder />);
    expect(screen.getByTestId("deliveredOrder")).toBeInTheDocument();
  });
});
