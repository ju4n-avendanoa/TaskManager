import { TaskState, Tasks } from "@/interfaces/taskInterfaces";
import { create } from "zustand";
import getAllTasks from "@/utils/getAllTasks";
import addFavorite from "@/utils/addFavorite";
import deleteFavorite from "@/utils/deleteFavorite";
import addChecked from "@/utils/addChecked";
import deleteChecked from "@/utils/deleteChecked";
import deleteTask from "@/utils/deleteTask";

export const useTaskStore = create<TaskState>()((set) => {
  return {
    tasks: [],
    favorites: [],
    checked: [],
    pendings: [],
    description: "",
    title: "",
    sort: true,
    setSort: () => set((state) => ({ sort: !state.sort })),
    setDescription: (description) => set({ description }),
    setTitle: (title) => set({ title }),
    setFavorites: (favorites) =>
      set((state) => ({
        ...state,
        favorites,
      })),
    setChecked: (checked) =>
      set((state) => ({
        ...state,
        checked,
      })),
    getTasks: async (userId) => {
      try {
        if (userId) {
          const tasks = await getAllTasks(userId);
          const favorites = tasks.filter(
            (task: Tasks) => task.favorite === true
          );
          const checked = tasks.filter((task: Tasks) => task.done === true);
          const pendings = tasks.filter((task: Tasks) => task.done === false);

          set((state) => ({
            ...state,
            favorites,
            checked,
            pendings,
            tasks,
          }));
          return tasks;
        }
      } catch (error: any) {
        console.error(error);
        return [];
      }
    },
    addFavorite: async (task) => {
      try {
        set((state) => {
          const updatedFavorites = [...state.favorites, task];
          return {
            ...state,
            favorites: updatedFavorites,
          };
        });
        await addFavorite(task);
      } catch (error) {
        console.log(error);
      }
    },

    deleteFavorites: async (task) => {
      try {
        set((state) => {
          const updatedFavorites = state.favorites.filter(
            (favoriteTask) => favoriteTask.id !== task.id
          );
          return {
            ...state,
            favorites: updatedFavorites,
          };
        });
        await deleteFavorite(task);
      } catch (error) {
        console.log(error);
      }
    },
    addChecked: async (task) => {
      try {
        set((state) => {
          const updatedchecked = [...state.checked, task];
          const updatedPending = state.pendings.filter(
            (pendingTask) => task.id !== pendingTask.id
          );
          return {
            ...state,
            checked: updatedchecked,
            pendings: updatedPending,
          };
        });
        await addChecked(task);
      } catch (error) {
        console.log(error);
      }
    },

    deleteChecked: async (task) => {
      try {
        set((state) => {
          const updatedchecked = state.checked.filter(
            (checkedTask) => checkedTask.id !== task.id
          );
          const updatedPending = [...state.pendings, task];
          return {
            ...state,
            checked: updatedchecked,
            pendings: updatedPending,
          };
        });
        await deleteChecked(task);
      } catch (error) {
        console.log(error);
      }
    },
    deleteTask: async (taskId) => {
      try {
        set((state) => {
          const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
          const updatedFavorites = state.favorites.filter(
            (favoriteTask) => favoriteTask.id !== taskId
          );
          const updatedChecked = state.checked.filter(
            (checkedTask) => checkedTask.id !== taskId
          );
          const updatedPending = state.pendings.filter(
            (pendingTask) => pendingTask.id !== taskId
          );
          return {
            ...state,
            tasks: updatedTasks,
            favorites: updatedFavorites,
            checked: updatedChecked,
            pendings: updatedPending,
          };
        });
        await deleteTask(taskId);
      } catch (error) {
        console.log(error);
      }
    },
  };
});
