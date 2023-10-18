"use client";

import { useEffect, useMemo, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
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
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/tasks/favorite"
        );
        const data = await response.json();
        localStorage.setItem("favorites", JSON.stringify(data));
        setFavorites(data);
        console.log("favorite");
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
        console.log("checked");
      } catch (error) {
        console.error(error);
      }
    };

    fetchChecked();
  }, [setChecked]);

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

  const handleShowFavorites = () => {
    setShowChecked(false);
    setShowPending(false);
    setShowFavorites(!showFavorites);
    getTasks(session?.user.id);
  };

  const handleShowChecked = () => {
    setShowFavorites(false);
    setShowPending(false);
    setShowChecked(!showChecked);
    getTasks(session?.user.id);
  };

  const handleShowPending = () => {
    setShowFavorites(false);
    setShowChecked(false);
    setShowPending(!showPending);
    getTasks(session?.user.id);
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
        <section className="flex flex-col max-sm:items-center md:flex-row h-full">
          <div className="flex justify-center items-center bg-slate-500 p-2 gap-4 w-full md:hidden">
            <h2 className="text-white">Tasks Menu</h2>
            <Bars3Icon className="w-6 h-auto" color="white" />
          </div>
          <div className="flex flex-col items-start justify-start p-6 w-1/6 bg-slate-500 h-full max-sm:hidden">
            <div className="flex flex-col gap-6 text-xs">
              <button
                className={`border p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn ${
                  showFavorites ? "bg-blue-600" : ""
                }`}
                onClick={handleShowFavorites}
              >
                {showFavorites ? "Show All Tasks" : "Show Priority Tasks"}
              </button>
              <button
                className={`border p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn ${
                  showChecked ? "bg-blue-600" : ""
                }`}
                onClick={handleShowChecked}
              >
                {showChecked ? "Show All Tasks" : "Show Tasks Done"}
              </button>
              <button
                className={`border p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn ${
                  showPending ? "bg-blue-600" : ""
                }`}
                onClick={handleShowPending}
              >
                {showPending ? "Show All Tasks" : "Show Pending Tasks"}
              </button>
              <div className="flex gap-4 items-center">
                <button
                  onClick={toggleOrder}
                  className="border p-2 lg:w-max bg-blue-300 rounded-md border-slate-900 btn"
                >
                  sort by date
                </button>
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  checked={sort}
                  onChange={toggleOrder}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
          <section className="w-5/6">
            {showFavorites && favorites.length > 0 && (
              <div>
                <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                  Priority Tasks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                  {orderByDate.map((task) => {
                    if (task.favorite) {
                      return (
                        <article key={task.id}>
                          <Task task={task} />
                        </article>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
            {showFavorites && favorites.length === 0 && (
              <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                No Tasks Marked as Priorities
              </h2>
            )}
            {showChecked && checked.length > 0 && (
              <div>
                <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                  Tasks Done
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                  {orderByDate.map((task) => {
                    if (task.done) {
                      return (
                        <article key={task.id}>
                          <Task task={task} />
                        </article>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
            {showChecked && checked.length === 0 && (
              <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                No Tasks Marked as Done
              </h2>
            )}
            {showPending && orderByDate.length > 0 && (
              <div>
                <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                  Pending Tasks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 w-full">
                  {orderByDate.map((task) => {
                    if (!task.done) {
                      return (
                        <article key={task.id}>
                          <Task task={task} />
                        </article>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
            {!showFavorites &&
              !showChecked &&
              !showPending &&
              orderByDate?.length > 0 && (
                <div>
                  <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
                    All Tasks
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
                    {orderByDate?.map((task) => (
                      <article key={task.id}>
                        <Task task={task} />
                      </article>
                    ))}
                  </div>
                </div>
              )}
            {!showFavorites &&
              !showChecked &&
              !showPending &&
              orderByDate?.length === 0 && (
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
