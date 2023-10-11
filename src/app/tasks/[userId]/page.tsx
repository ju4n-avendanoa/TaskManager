"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";
import Filters from "@/components/Filters";

export default function HomePage() {
  const { sort, getTasks, setFavorites, setChecked, tasks } = useTaskStore();
  const allTasks = useRef(tasks);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks(session?.user.id);
        allTasks.current = tasks;
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
          </div>
          <div className="w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
              {orderByDate?.map((task) => (
                <article key={task.id}>
                  <Task task={task} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
