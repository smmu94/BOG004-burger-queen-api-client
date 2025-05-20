import {
  createUser,
  deleteUser,
  getUser as fetchUsers,
  updateUser,
} from "@/providers/UserProvider";
import { create } from "zustand";

export const initialUserStatus = {
  action: null,
  type: null,
  message: "",
};

export const useUsersStore = create((set) => ({
  users: [],
  userToEdit: null,
  status: initialUserStatus,
  clearStatus: () => set({ status: { type: null, action: null, message: "" } }),
  setUserToEdit: (user) => set({ userToEdit: user }),
  getUsers: async () => {
    try {
      const res = await fetchUsers();
      set({
        users: res.data,
        status: { action: "fetch", type: "success", message: "Users fetched successfully" },
      });
    } catch (err) {
      set({
        status: { action: "fetch", type: "error", message: "Error when fetching users" },
      });
    }
  },
  addUser: async (user) => {
    try {
      const newUser = await createUser(user);
      set((state) => ({
        users: [...state.users, newUser.data],
        status: { action: "add", type: "success", message: "User added successfully" },
      }));
      return true;
    } catch (err) {
      set({
        status: { action: "add", type: "error", message: "Error when adding user" },
      });
      return false;
    }
  },
  updateUser: async (id, user) => {
    try {
      await updateUser(id, user);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
        status: { action: "update", type: "success", message: "User updated successfully" },
      }));
      return true;
    } catch (err) {
      set({
        status: { action: "update", type: "error", message: "Error when updating user" },
      });
      return false;
    }
  },
  deleteUser: async (id) => {
    try {
      await deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        status: { action: "delete", type: "success", message: "User deleted successfully" },
      }));
    } catch (err) {
      set({
        status: { action: "delete", type: "error", message: "Error when deleting user" },
      });
    }
  },
}));