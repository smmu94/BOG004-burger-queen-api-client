import { initialStatus, useProductStore } from "@/store/useProductStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
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
      createProduct: jest.fn(),
      setStatus: jest.fn(),
      status: initialStatus,
      setProductToEdit: jest.fn(),
    });
  });
  test("render default", () => {
    render(<CreateProduct />);
    expect(screen.getByTestId("create-product")).toBeInTheDocument();
    expect(screen.getByTestId("product-name")).toBeInTheDocument();
    expect(screen.getByTestId("product-price")).toBeInTheDocument();
    expect(screen.getByTestId("product-type")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toBeInTheDocument();
    expect(screen.getByRole("button", {
      name: "Add"
    })).toBeInTheDocument();
  });
  test("should submit form with valid data", async () => {
    const mockAddProduct = jest.fn();
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
    });
    const product = {
      name: "Test Product",
      price: 10.0,
      type: "Desayuno",
      image: "http://example.com/test-image.jpg",
    };
    render(<CreateProduct />);
    const productNameInput = screen.getByTestId("product-name");
    fireEvent.change(productNameInput, { target: { name: "productName", value: product.name } });
    const productPriceInput = screen.getByTestId("product-price");
    fireEvent.change(productPriceInput, { target: { name: "productPrice", value: product.price } });
    const productTypeInput = screen.getByTestId("product-type");
    fireEvent.change(productTypeInput, { target: { name: "type", value: product.type } });
    const productImageInput = screen.getByTestId("product-image");
    fireEvent.change(productImageInput, { target: { name: "imageUrl", value: product.image } });
    const submitButton = screen.getByRole("button", {
      name: "Add"
    });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        ...product,
        dataEntry: expect.any(String),
      });
      expect(productNameInput.value).toBe("");
      expect(productPriceInput.value).toBe("");
      expect(productTypeInput.value).toBe("");
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
    });
    render(<CreateProduct />);
    const submitButton = screen.getByRole("button", {
      name: "Add"
    });
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
    });
    render(<CreateProduct />);
    const productNameInput = screen.getByTestId("product-name");
    fireEvent.change(productNameInput, { target: { name: "productName", value: "na" } });
    const productPriceInput = screen.getByTestId("product-price");
    fireEvent.change(productPriceInput, { target: { name: "productPrice", value: 0 } });
    const productImageInput = screen.getByTestId("product-image");
    fireEvent.change(productImageInput, { target: { name: "imageUrl", value: "invalid-url" } });
    const submitButton = screen.getByRole("button", {
      name: "Add"
    });
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
    });
    render(<CreateProduct />);
    const productNameInput = screen.getByTestId("product-name");
    fireEvent.change(productNameInput, { target: { name: "productName", value: "Updated Product" } });
    const productPriceInput = screen.getByTestId("product-price");
    fireEvent.change(productPriceInput, { target: { name: "productPrice", value: productToEdit.price } });
    const productTypeInput = screen.getByTestId("product-type");
    fireEvent.change(productTypeInput, { target: { name: "type", value: productToEdit.type } });
    const productImageInput = screen.getByTestId("product-image");
    fireEvent.change(productImageInput, { target: { name: "imageUrl", value: productToEdit.image } });
    const submitButton = screen.getByRole("button", {
      name: "Update"
    });
    fireEvent.submit(submitButton);
    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(1, {
        name: "Updated Product",
        price: productToEdit.price,
        type: productToEdit.type,
        image: productToEdit.image,
      });
      expect(screen.getByTestId("success-message")).toBeInTheDocument();
      expect(screen.getByTestId("success-message")).toHaveTextContent("Product updated successfully");
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
      status: { ...initialStatus, type: "error", action: "update", message: "Error when updating product" },
      productToEdit,
      setProductToEdit: jest.fn(),
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
    });
    render(<CreateProduct />);
    const cancelButton = screen.getByRole("button", {
      name: "Cancel"
    });
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(mockSetProductToEdit).toHaveBeenCalledWith(null);
    });
  });
});
