"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";
import Filters from "@/components/Filters";

export default function HomePage() {
  const { sort, getTasks, setFavorites, setChecked, tasks, favorites } =
    useTaskStore();
  const allTasks = useRef(tasks);
  const [showFavorites, setShowFavorites] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks(session?.user.id);
        console.log("hola");
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [getTasks, session?.user.id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/tasks/favorite"
        );
        const data = await response.json();
        localStorage.setItem("favorites", JSON.stringify(data));
        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  useEffect(() => {
    const fetchChecked = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks/checked");
        const data = await response.json();
        localStorage.setItem("checked", JSON.stringify(data));
        setChecked(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChecked();
  }, [setChecked]);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const orderByDate = useMemo(() => {
    return sort
      ? [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : tasks;
  }, [sort, tasks]);

  return (
    <>
      <main className="h-full">
        <div className="flex h-full">
          <div className="w-1/5 bg-slate-500 h-">
            <Filters allTasks={allTasks.current} />
            <button onClick={handleShowFavorites}>
              {showFavorites ? "Ocultar Favoritos" : "Mostrar Favoritos"}
            </button>
          </div>
          {showFavorites && favorites.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
              {favorites.map((task) => (
                <article key={task.id}>
                  <Task task={task} />
                </article>
              ))}
            </div>
          )}
          {!showFavorites && tasks?.length > 0 && (
            <div className="w-4/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
                {orderByDate?.map((task) => (
                  <article key={task.id}>
                    <Task task={task} />
                  </article>
                ))}
              </div>
            </div>
          )}
          {!showFavorites && tasks?.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-6xl text-white font-bold">
                No Tasks Pending
              </h2>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
