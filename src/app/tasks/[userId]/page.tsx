"use client";

import { useEffect, useRef } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";

export default function HomePage() {
  const { tasks } = useTaskStore((state) => ({
    tasks: state.tasks,
  }));
  const { getTasks, setFavorites, setChecked, setTasks, favorites, checked } =
    useTaskStore();
  const allTasks = useRef(tasks);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks(session?.user.id);
        allTasks.current = tasks;
        console.log(allTasks.current);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [getTasks, session?.user.id, setFavorites, setChecked]);

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

  const showFavorites = () => {
    const favoriteTasks = allTasks.current.filter((task) =>
      favorites.includes(task.id)
    );
    setTasks(favoriteTasks);
  };

  const showDone = () => {
    const doneTasks = allTasks.current.filter((task) =>
      checked.includes(task.id)
    );
    setTasks(doneTasks);
  };

  const showAllTasks = () => {
    setTasks(allTasks.current);
  };

  return (
    <>
      <main>
        <section className="flex justify-center gap-4 my-4">
          <button
            onClick={showDone}
            className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900"
          >
            done tasks
          </button>
          <button
            onClick={showFavorites}
            className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900"
          >
            favorite tasks
          </button>
          <button
            onClick={showAllTasks}
            className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900"
          >
            show all tasks
          </button>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
          {tasks?.map((task) => (
            <article key={task.id}>
              <Task task={task} />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
