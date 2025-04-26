import { create } from "zustand";
import { createOrder, updateOrder, getOrder } from "@/providers/OrderProducts";

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
  getOrders: async () => {
    try {
      const res = await getOrder();
      set({ orders: res.data });
    } catch (err) {
      useOrderStore.getState().setError("Failed to fetch orders");
    }
  },
  resetOrder: (id) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }));
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
  updateOrder: async (id, order) => {
    try {
      const res = await updateOrder(id, order);
      set((state) => ({
        orders: state.orders.map((order) => (order.id === id ? res.data : order)),
      }));
      useOrderStore.getState().setMessage("Order updated successfully");
    } catch (err) {
      useOrderStore.getState().setError("Failed to update order");
    }
  },
}));
