import React from "react";
import { render, screen } from "@testing-library/react";
import Card from ".";

const props = {
  image: "https://example.com/image.jpg",
  info: {
    name: "Product Name",
    price: "$10.00",
  },
};

describe("Card", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders default", () => {
    render(<Card {...props} />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText(props.info.name)).toBeInTheDocument();
    expect(screen.getByText(props.info.price)).toBeInTheDocument();
  });
  test("renders with image", () => {
    render(<Card {...props} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", props.image);
  });
  test("renders with children", () => {
    render(
      <Card {...props}>
        <button>Click me</button>
      </Card>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  test("renders with onClick handler", () => {
    const handleClick = jest.fn();
    render(<Card {...props} onClick={handleClick} />);
    screen.getByTestId("card").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
