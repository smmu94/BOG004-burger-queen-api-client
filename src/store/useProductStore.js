import {
  createProduct,
  deleteProduct,
  products as fetchProducts,
  updateProduct,
} from "@/providers/OrderProducts";
import { create } from "zustand";

export const initialStatus = {
  action: null,
  type: null,
  message: "",
};

export const useProductStore = create((set) => ({
  products: [],
  productToEdit: null,
  status: initialStatus,
  clearStatus: () => set({ status: { type: null, action: null, message: "" } }),
  setProductToEdit: (product) => set({ productToEdit: product }),
  getProducts: async () => {
    try {
      const res = await fetchProducts();
      set({
        products: res.data,
        status: { action: "fetch", type: "success", message: "Products fetched successfully" },
      });
    } catch (err) {
      set({
        status: { action: "fetch", type: "error", message: "Error when fetching products" },
      });
    }
  },
  addProduct: async (product) => {
    try {
      const newProduct = await createProduct(product);
      set((state) => ({
        products: [...state.products, newProduct.data],
        status: { action: "add", type: "success", message: "Product added successfully" },
      }));
      return true;
    } catch (err) {
      set({
        status: { action: "add", type: "error", message: "Error when adding product" },
      });
      return false;
    }
  },
  updateProduct: async (id, product) => {
    try {
      await updateProduct(id, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
        status: { action: "update", type: "success", message: "Product updated successfully" },
      }));
      return true;
    } catch (err) {
      set({
        status: { action: "update", type: "error", message: "Error when updating product" },
      });
      return false;
    }
  },
  deleteProduct: async (id) => {
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        status: { action: "delete", type: "success", message: "Product deleted successfully" },
      }));
    } catch (err) {
      set({
        status: { action: "delete", type: "error", message: "Error when deleting product" },
      });
    }
  },
}));
