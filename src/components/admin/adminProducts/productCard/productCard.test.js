import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from ".";

jest.mock("@/store/useProductStore", () => {
  const current = jest.requireActual("@/store/useProductStore");
  return {
    ...current,
    useProductStore: jest.fn(),
  };
});

const props = {
  product: {
    id: 1,
    name: "Test Product",
    price: 10.0,
    type: "Test Type",
    image: "test-image.jpg",
  },
  handleDelete: jest.fn(),
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProductStore.mockReturnValue({
      setProductToEdit: jest.fn(),
    });
  });
  test("renders correctly", () => {
    render(<ProductCard {...props} />);
    expect(screen.getByTestId("product-card")).toBeInTheDocument();
    expect(screen.getByText(props.product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${props.product.price}`)).toBeInTheDocument();
    expect(screen.getByText(props.product.type)).toBeInTheDocument();
  });
  test("calls setProductToEdit when edit button is clicked", () => {
    const mockSetProductToEdit = jest.fn();
    useProductStore.mockReturnValue({
      setProductToEdit: mockSetProductToEdit,
    });
    render(<ProductCard {...props} />);
    fireEvent.click(screen.getAllByTestId("button")[0]);
    expect(mockSetProductToEdit).toHaveBeenCalledWith(props.product);
  });
  test("calls handleDelete when delete button is clicked", () => {
    const mockHandleDelete = jest.fn();
    render(<ProductCard {...props} handleDelete={mockHandleDelete} />);
    fireEvent.click(screen.getAllByTestId("button")[1]);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
