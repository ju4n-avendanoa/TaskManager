"use client";

import { Suspense, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import Task from "@/components/Task";
import Loading from "@/app/loading";

export default function HomePage() {
  const { tasks } = useTaskStore((state) => ({
    tasks: state.tasks,
  }));
  const { getTasks } = useTaskStore();

  const { data: session } = useSession();

  useEffect(() => {
    getTasks(session?.user.id);
  }, [getTasks, session?.user.id]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/favorite")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("favorites", JSON.stringify(data));
      });
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
            {tasks?.map((task) => (
              <article key={task.id}>
                <Task task={task} />
              </article>
            ))}
          </main>
        }
      </Suspense>
    </>
  );
}
