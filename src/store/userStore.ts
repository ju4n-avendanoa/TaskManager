import { create } from "zustand";
import { UserState } from "../app/interfaces/userInterfaces";

export const useUsersStore = create<UserState>()((set) => ({
  name: "",
  email: "",
  password: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));
