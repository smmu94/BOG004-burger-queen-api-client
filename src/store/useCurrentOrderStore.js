import { create } from "zustand";

export const useCurrentOrderStore = create((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id);
      return {
        products: existingProduct
          ? state.products.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            )
          : [...state.products, { ...product, quantity: 1 }],
      };
    }),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0),
    })),
  resetProduct: () => set({ products: [] }),
}));
