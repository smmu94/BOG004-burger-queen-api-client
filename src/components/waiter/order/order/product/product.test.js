import { render, fireEvent, screen } from "@testing-library/react";
import Product from ".";

describe("Product", () => {
  test("it renders the product", () => {
    render(<Product />);
    expect(screen.getByTestId("card-product")).toBeInTheDocument();
  });

  test("img should be in the document", () => {
    render(<Product />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("Testing product component", () => {
    const onClick = jest.fn();
    render(<Product handleAddProduct={onClick} />);
    const containerProduct = screen.getByTestId("card-product");
    fireEvent.click(containerProduct);
    expect(onClick).toHaveBeenCalled();
  });
});
