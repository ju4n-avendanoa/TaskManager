"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";

export default function HomePage() {
  const { tasks } = useTaskStore((state) => ({
    tasks: state.tasks,
  }));
  const { getTasks, setFavorites } = useTaskStore();

  const { data: session } = useSession();

  useEffect(() => {
    getTasks(session?.user.id);
  }, [getTasks, session?.user.id]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/favorite")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("favorites", JSON.stringify(data));
        setFavorites(data);
      });
  }, [setFavorites]);

  return (
    <>
      {
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
          {tasks?.map((task) => (
            <article key={task.id}>
              <Task task={task} />
            </article>
          ))}
        </main>
      }
    </>
  );
}
