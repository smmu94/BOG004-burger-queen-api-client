import { create } from "zustand";
import { createOrder } from "@/providers/OrderProducts";

export const useOrderStore = create((set) => ({
  orders: [],
  message: "",
  error: "",

  setMessage: (msg) => {
    set({ message: msg });
    setTimeout(() => set({ message: "" }), 2000);
  },
  setError: (err) => {
    set({ error: err });
    setTimeout(() => set({ error: "" }), 2000);
  },
  createOrder: async (order) => {
    try {
      const res = await createOrder(order);
      set((state) => ({
        orders: [...state.orders, res.data],
      }));
      useOrderStore.getState().setMessage("Order created successfully");
    } catch (err) {
      useOrderStore.getState().setError("Failed to create order");
    }
  },
}));
