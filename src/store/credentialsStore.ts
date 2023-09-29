import { create } from "zustand";
import { Credentials } from "../app/interfaces/userInterfaces";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCredentialsStore = create<Credentials>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
