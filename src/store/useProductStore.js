import { products as fetchProducts } from "@/providers/OrderProducts";
import { create } from "zustand";
import { getToken } from "@/providers/UserProvider";

export const useProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    const token = getToken();
    if (!token) return;
    const res = await fetchProducts();
    set({ products: res.data });
  },
}));
