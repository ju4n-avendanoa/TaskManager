import { Filters } from "@/interfaces/filters";
import { create } from "zustand";

export const useFiltersStore = create<Filters>()((set) => {
  return {
    favorite: false,
    done: false,
    pending: false,
    setFavorite: (newState) => set({ favorite: newState }),
    setDone: (newState) => set({ done: newState }),
    setPending: (newState) => set({ pending: newState }),
  };
});
