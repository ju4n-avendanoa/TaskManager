"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import Task from "./Task";

function TasksList() {
  const { tasks, favorites } = useTaskStore((state) => ({
    tasks: state.tasks,
    favorites: state.favorites,
  }));
  const { getTasks } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      {tasks.length === 0 ? (
        <h2 className="text-white font-bold text-7xl col-span-full text-center">
          No Tasks Pending
        </h2>
      ) : (
        tasks.map((task) => (
          <article key={task.id}>
            <Task task={task} favorites={favorites} />
          </article>
        ))
      )}
    </>
  );
}

export default TasksList;
