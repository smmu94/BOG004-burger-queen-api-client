import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateProduct from ".";
import { formValidation } from "./constants";

jest.mock("@/store/useProductStore", () => ({
  useProductStore: jest.fn(),
}));

const product = {
  name: "Test Product",
  price: 10.0,
  type: "Desayuno",
  image: "http://example.com/test-image.jpg",
};

const renderCreateProduct = (
  productToEdit = null,
  status = { action: null, type: null, message: "" }
) => {
  const mockAddProduct = jest.fn();
  const mockUpdateProduct = jest.fn();
  const mockSetProductToEdit = jest.fn();
  const mockClearStatus = jest.fn();

  useProductStore.mockReturnValue({
    addProduct: mockAddProduct,
    updateProduct: mockUpdateProduct,
    status,
    productToEdit,
    setProductToEdit: mockSetProductToEdit,
    clearStatus: mockClearStatus,
  });
  render(<CreateProduct />);
  return {
    mockAddProduct,
    mockUpdateProduct,
    mockSetProductToEdit,
    mockClearStatus,
  };
};

describe("CreateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("render CreateForm for adding a product", () => {
    renderCreateProduct();
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
  });
  test("render createForm for editing a product", () => {
    renderCreateProduct({ id: 1 });
    expect(screen.getByTestId("admin-create-form")).toBeInTheDocument();
  });
  test("should calls addProduct on submit in add mode", async () => {
    const { mockAddProduct } = renderCreateProduct();
    const productNameInput = screen.getByLabelText("Product Name");
    const productPriceInput = screen.getByLabelText("Product Price");
    const productTypeInput = screen.getByLabelText("Product Type");
    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productNameInput, { target: { value: product.name } });
    fireEvent.change(productPriceInput, { target: { value: product.price } });
    fireEvent.change(productTypeInput, { target: { value: product.type } });
    fireEvent.change(productImageInput, { target: { value: product.image } });
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockAddProduct).toHaveBeenCalledTimes(1));
  });
  test("should calls updateProduct on submit in edit mode", async () => {
    const { mockUpdateProduct } = renderCreateProduct({ id: 1 });
    const productNameInput = screen.getByLabelText("Product Name");
    const productPriceInput = screen.getByLabelText("Product Price");
    const productTypeInput = screen.getByLabelText("Product Type");
    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productNameInput, { target: { value: product.name } });
    fireEvent.change(productPriceInput, { target: { value: product.price } });
    fireEvent.change(productTypeInput, { target: { value: product.type } });
    fireEvent.change(productImageInput, { target: { value: product.image } });
    const submitButton = screen.getByRole("button", { name: "Update" });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockUpdateProduct).toHaveBeenCalledTimes(1));
  });
  test("should calls setProductToEdit(null) on cancel", async () => {
    const { mockSetProductToEdit } = renderCreateProduct({ id: 1 });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    await waitFor(() => expect(mockSetProductToEdit).toHaveBeenCalledWith(null));
  });
  test("render success status messages", () => {
    renderCreateProduct(null, { type: "success", message: "Success!", action: "add" });
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });
  test("render error status messages", () => {
    renderCreateProduct(null, { type: "error", message: "Error!", action: "add" });
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
  test("should show form validation errors", async () => {
    renderCreateProduct();
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.productName.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.productPrice.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.imageUrl.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.productPrice.required)).toBeInTheDocument();
    });
    const productPriceInput = screen.getByLabelText("Product Price");
    fireEvent.change(productPriceInput, { target: { value: 0 } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.productPrice.min.message)).toBeInTheDocument();
    });
    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productImageInput, { target: { value: "abc" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.imageUrl.pattern.message)).toBeInTheDocument();
    });
  });
});
