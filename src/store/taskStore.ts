import { create } from "zustand";
import { TaskState } from "@/app/interfaces/taskInterfaces";

export const useTaskStore = create<TaskState>()((set) => {
  let initialFavorites: number[] = [];
  if (typeof window !== "undefined") {
    const localValue = localStorage.getItem("favorite");
    if (localValue !== null) {
      initialFavorites = JSON.parse(localValue);
    }
  }

  return {
    tasks: [],
    favorites: initialFavorites,
    description: "",
    title: "",
    setDescription: (description) => set({ description }),
    setTitle: (title) => set({ title }),
    getTasks: async (userId) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/user-tasks/${userId}`
        );
        const tasks = await res.json();
        set((state) => ({
          ...state,
          tasks,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    addFavorite: (id) => {
      // set((state) => {
      //   const updatedFavorites = [...state.favorites, id];
      //   localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      //   return {
      //     ...state,
      //     favorites: updatedFavorites,
      //   };
      // });
    },
    deleteFavorites: (id) => {
      // set((state) => {
      //   const updatedFavorites = state.favorites.filter(
      //     (favId) => id !== favId
      //   );
      //   localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      //   return {
      //     ...state,
      //     favorites: updatedFavorites,
      //   };
      // });
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
          state.deleteFavorites(taskId);
          return {
            ...state,
            tasks: updatedTasks,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
});
