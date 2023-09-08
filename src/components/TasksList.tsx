"use client";

import { useState, useEffect } from "react";

import {
  TrashIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export interface Tasks {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

function TasksList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const localValue = localStorage.getItem("favorites");
      if (localValue == null) return [];
      return JSON.parse(localValue);
    }
  });

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((response) => response.json())
      .then((response) => setTasks(response));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE", // Método HTTP DELETE
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favId) => id !== favId)
    );
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleFav = (taskId: number) => {
    if (favorites.includes(taskId)) {
      setFavorites((prev) => prev.filter((favId) => taskId !== favId));
    } else {
      setFavorites((prev) => [...prev, taskId]);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/tasks/edit/${id}`);
  };

  return (
    <>
      {tasks.length === 0 ? (
        <h2 className="text-white font-bold text-7xl col-span-full text-center">
          No Tasks Pending
        </h2>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={
              favorites.includes(task.id)
                ? "bg-sky-950 rounded-lg text-white border border-white w-auto break-all whitespace-normal relative outline outline-2 outline-yellow-400 shadow-md shadow-yellow-400"
                : "bg-sky-950 rounded-lg text-white border border-white w-auto break-all whitespace-normal relative"
            }
          >
            {favorites.includes(task.id) ? (
              <StarIcon
                className="absolute w-5 top-0 right-1 h-auto rounded-full cursor-pointer"
                fill="yellow"
                color="yellow"
                onClick={() => handleFav(task.id)}
              />
            ) : (
              <StarIcon
                className="absolute w-5 top-0 right-1 h-auto rounded-full cursor-pointer"
                onClick={() => handleFav(task.id)}
              />
            )}

            <TrashIcon
              className="absolute w-5 bottom-0 right-1 h-auto bg-red-500 rounded-full cursor-pointer"
              onClick={() => {
                handleDelete(task.id);
              }}
            />
            <PencilSquareIcon
              className="absolute w-5 bottom-0 right-7 h-auto bg-blue-500 rounded-full cursor-pointer"
              onClick={() => handleEdit(task.id)}
            />
            <div className="p-6 divide-y-2">
              <h3 className="mb-3 text-xl text-blue-300">{task.title}</h3>
              <p className="text-md">{task.description}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default TasksList;
