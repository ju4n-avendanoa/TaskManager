"use client";

import { useEffect, useMemo, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";

export default function HomePage() {
  const {
    sort,
    setSort,
    getTasks,
    setFavorites,
    setChecked,
    tasks,
    favorites,
    checked,
  } = useTaskStore();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showChecked, setShowChecked] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks(session?.user.id);
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
    if (showChecked) {
      setShowChecked((prev) => !prev);
    }
    if (showPending) {
      setShowPending((prev) => !prev);
    }
    setShowFavorites(!showFavorites);
  };
  const handleShowChecked = () => {
    if (showFavorites) {
      setShowFavorites((prev) => !prev);
    }
    if (showPending) {
      setShowPending((prev) => !prev);
    }
    setShowChecked(!showChecked);
  };
  const handleShowPending = () => {
    if (showFavorites) {
      setShowFavorites((prev) => !prev);
    }
    if (showChecked) {
      setShowChecked((prev) => !prev);
    }
    setShowPending(!showPending);
  };

  const orderByDate = useMemo(() => {
    return sort
      ? [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : tasks;
  }, [sort, tasks]);

  const toggleOrder = () => {
    setSort();
  };

  return (
    <>
      <main className="h-full">
        <section className="flex h-full">
          <div className=" flex flex-col items-center justify-start p-6 w-1/5 bg-slate-500 h-full">
            <div className="flex flex-col gap-6 w-max">
              <button
                className={`border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn ${
                  showFavorites ? "bg-blue-600" : ""
                }
                `}
                onClick={handleShowFavorites}
              >
                {showFavorites
                  ? "Mostrar todas las tareas"
                  : "Mostrar Tareas Prioritarias"}
              </button>
              <button
                className={`border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn ${
                  showChecked ? "bg-blue-600" : ""
                }`}
                onClick={handleShowChecked}
              >
                {showChecked
                  ? "Mostrar todas las tareas"
                  : "Mostrar tareas hechas"}
              </button>
              <button
                className={`border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn ${
                  showPending ? "bg-blue-600" : ""
                }`}
                onClick={handleShowPending}
              >
                {showPending
                  ? "Mostrar todas las tareas"
                  : "Mostrar tareas pendientes"}
              </button>
              <div className="flex gap-4 items-center">
                <button
                  onClick={toggleOrder}
                  className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
                >
                  sort by date
                </button>
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  checked={sort}
                  onChange={setSort}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
          <section className="w-4/5">
            {showFavorites && favorites.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                {favorites.map((task) => (
                  <article key={task.id}>
                    <Task task={task} />
                  </article>
                ))}
              </div>
            )}
            {showChecked && checked.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                {checked.map((task) => (
                  <article key={task.id}>
                    <Task task={task} />
                  </article>
                ))}
              </div>
            )}
            {showPending && tasks.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                {tasks.map((task) => (
                  <article key={task.id}>
                    <Task task={task} />
                  </article>
                ))}
              </div>
            )}
            {!showFavorites &&
              !showChecked &&
              !showPending &&
              tasks?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
                  {orderByDate?.map((task) => (
                    <article key={task.id}>
                      <Task task={task} />
                    </article>
                  ))}
                </div>
              )}
            {!showFavorites &&
              !showChecked &&
              !showPending &&
              tasks?.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <h2 className="text-6xl text-white font-bold">
                    No Tasks Pending
                  </h2>
                </div>
              )}
          </section>
        </section>
      </main>
    </>
  );
}
