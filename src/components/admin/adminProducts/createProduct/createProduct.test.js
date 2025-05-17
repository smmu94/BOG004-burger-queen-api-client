import React from "react";
import { initialStatus, useProductStore } from "@/store/useProductStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateProduct from ".";
import { formValidation } from "./constants";

jest.mock("@/store/useProductStore", () => {
  const current = jest.requireActual("@/store/useProductStore");
  return {
    ...current,
    useProductStore: jest.fn(),
  };
});

describe("CreateProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProductStore.mockReturnValue({
      addProduct: jest.fn(),
      setStatus: jest.fn(),
      status: initialStatus,
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
  });

  test("render default", () => {
    render(<CreateProduct />);
    expect(screen.getByTestId("create-product")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  test("should submit form with valid data", async () => {
    const mockAddProduct = useProductStore().addProduct;
    useProductStore.mockReturnValue({
      addProduct: mockAddProduct,
      setStatus: jest.fn(),
      status: {
        ...initialStatus,
        type: "success",
        action: "add",
        message: "Product added successfully",
      },
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    const product = {
      name: "Test Product",
      price: 10.0,
      type: "Desayuno",
      image: "http://example.com/test-image.jpg",
    };
    render(<CreateProduct />);
    const productNameInput = screen.getByLabelText("Product Name");
    fireEvent.change(productNameInput, { target: { value: product.name } });

    const productPriceInput = screen.getByLabelText("Product Price");
    fireEvent.change(productPriceInput, { target: { value: product.price } });

    const productTypeSelect = screen.getByLabelText("Product Type");
    fireEvent.change(productTypeSelect, { target: { value: product.type } });

    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productImageInput, { target: { value: product.image } });

    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        ...product,
        dataEntry: expect.any(String),
      });
      expect(productNameInput.value).toBe("");
      expect(productPriceInput.value).toBe("");
      expect(productTypeSelect.value).toBe("");
      expect(productImageInput.value).toBe("");
      expect(screen.getByTestId("success-message")).toBeInTheDocument();
      expect(screen.getByTestId("success-message")).toHaveTextContent("Product added successfully");
    });
  });

  test("should show error message when submit with empty fields", async () => {
    useProductStore.mockReturnValue({
      addProduct: jest.fn(),
      setStatus: jest.fn(),
      status: initialStatus,
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.productName.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.productPrice.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.imageUrl.required)).toBeInTheDocument();
      expect(screen.getByText(formValidation.type.required)).toBeInTheDocument();
    });
  });

  test("should show error message when submit with invalid data", async () => {
    useProductStore.mockReturnValue({
      addProduct: jest.fn(),
      setStatus: jest.fn(),
      status: initialStatus,
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    const productNameInput = screen.getByLabelText("Product Name");
    fireEvent.change(productNameInput, { target: { value: "na" } });
    const productPriceInput = screen.getByLabelText("Product Price");
    fireEvent.change(productPriceInput, { target: { value: 0 } });
    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productImageInput, { target: { value: "invalid-url" } });
    const submitButton = screen.getByRole("button", { name: "Add" });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(screen.getByText(formValidation.productName.minLength.message)).toBeInTheDocument();
      expect(screen.getByText(formValidation.productPrice.min.message)).toBeInTheDocument();
      expect(screen.getByText(formValidation.imageUrl.pattern.message)).toBeInTheDocument();
    });
  });

  test("should error message when there is a server error", async () => {
    useProductStore.mockReturnValue({
      addProduct: jest.fn(),
      setStatus: jest.fn(),
      status: { ...initialStatus, type: "error", action: "add", message: "Server error" },
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toHaveTextContent("Server error");
    });
  });

  test("should show success message when product is updated", async () => {
    const mockUpdateProduct = jest.fn();
    const productToEdit = {
      id: 1,
      name: "Test Product",
      price: 10.0,
      type: "Desayuno",
      image: "http://example.com/test-image.jpg",
    };
    useProductStore.mockReturnValue({
      updateProduct: mockUpdateProduct,
      setStatus: jest.fn(),
      status: {
        ...initialStatus,
        type: "success",
        action: "update",
        message: "Product updated successfully",
      },
      productToEdit,
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    const productNameInput = screen.getByLabelText("Product Name");
    fireEvent.change(productNameInput, { target: { value: "Updated Product" } });
    const productPriceInput = screen.getByLabelText("Product Price");
    fireEvent.change(productPriceInput, { target: { value: productToEdit.price } });
    const productTypeSelect = screen.getByLabelText("Product Type");
    fireEvent.change(productTypeSelect, { target: { value: productToEdit.type } });
    const productImageInput = screen.getByLabelText("Image URL");
    fireEvent.change(productImageInput, { target: { value: productToEdit.image } });
    const submitButton = screen.getByRole("button", { name: "Update" });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(1, {
        name: "Updated Product",
        price: productToEdit.price,
        type: productToEdit.type,
        image: productToEdit.image,
      });
      expect(screen.getByTestId("success-message")).toBeInTheDocument();
      expect(screen.getByTestId("success-message")).toHaveTextContent(
        "Product updated successfully"
      );
    });
  });

  test("should show an error message when there is a server error while updating", async () => {
    const mockUpdateProduct = jest.fn();
    const productToEdit = {
      id: 1,
      name: "Test Product",
      price: 10.0,
      type: "Desayuno",
      image: "http://example.com/test-image.jpg",
    };
    useProductStore.mockReturnValue({
      updateProduct: mockUpdateProduct,
      setStatus: jest.fn(),
      status: {
        ...initialStatus,
        type: "error",
        action: "update",
        message: "Error when updating product",
      },
      productToEdit,
      setProductToEdit: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toHaveTextContent("Error when updating product");
    });
  });

  test("should reset the form when cancel update is clicked", async () => {
    const mockSetProductToEdit = jest.fn();
    const productToEdit = {
      id: 1,
      name: "Test Product",
      price: 10.0,
      type: "Desayuno",
      image: "http://example.com/test-image.jpg",
    };
    useProductStore.mockReturnValue({
      setProductToEdit: mockSetProductToEdit,
      productToEdit,
      status: initialStatus,
      setStatus: jest.fn(),
      clearStatus: jest.fn(),
    });
    render(<CreateProduct />);
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(mockSetProductToEdit).toHaveBeenCalledWith(null);
    });
  });
});
