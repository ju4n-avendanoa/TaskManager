"use client";

import { Suspense, useEffect } from "react";
import Loading from "@/app/loading";
import { useTaskStore } from "@/store/taskStore";
import Task from "@/components/Task";

export default function HomePage({ params }: { params: { userId: string } }) {
  const { tasks, favorites } = useTaskStore((state) => ({
    tasks: state.tasks,
    favorites: state.favorites,
  }));
  const { getTasks } = useTaskStore();

  useEffect(() => {
    getTasks(params.userId);
  }, [getTasks, params.userId]);

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
        <Suspense fallback={<Loading />}>
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
            {tasks.map((task) => (
              <article key={task.id}>
                <Task task={task} favorites={favorites} />
              </article>
            ))}
          </main>
        </Suspense>
      )}
    </>
  );
}
