import { create } from "zustand";
import { TaskState } from "@/app/interfaces/taskInterfaces";
import { useErrorStore } from "./errorStore";

export const useTaskStore = create<TaskState>()((set) => {
  return {
    tasks: [],
    favorites: [],
    description: "",
    title: "",
    setDescription: (description) => set({ description }),
    setTitle: (title) => set({ title }),
    setFavorites: (favorites) => set({ favorites }),
    getTasks: async (userId) => {
      try {
        if (userId) {
          const res = await fetch(
            `http://localhost:3000/api/user-tasks/${userId}`
          );
          if (!res.ok) {
            throw new Error("Error en la solicitud al servidor");
          }
          const tasks = await res.json();
          set((state) => ({
            ...state,
            tasks,
          }));
        }
      } catch (error: any) {
        console.error(error);
      }
    },
    addFavorite: async (taskId) => {
      try {
        await fetch(`http://localhost:3000/api/tasks/favorite/${taskId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: true }),
        });

        set((state) => {
          const updatedFavorites = [...state.favorites, taskId];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return {
            ...state,
            favorites: updatedFavorites,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    deleteFavorites: async (taskId) => {
      try {
        await fetch(`http://localhost:3000/api/tasks/favorite/${taskId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite: false }),
        });

        set((state) => {
          const updatedFavorites = state.favorites.filter(
            (favId) => favId !== taskId
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return {
            ...state,
            favorites: updatedFavorites,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTask: async (taskId) => {
      try {
        await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        set((state) => {
          const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
          const updatedFavorites = state.favorites.filter(
            (favId) => favId !== taskId
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

          return {
            ...state,
            tasks: updatedTasks,
            favorites: updatedFavorites,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
});
