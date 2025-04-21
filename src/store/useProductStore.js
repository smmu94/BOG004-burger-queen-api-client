import { products as fetchProducts } from "@/providers/OrderProducts";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    const res = await fetchProducts();
    set({ products: res.data });
  },
}));
