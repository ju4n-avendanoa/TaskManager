"use client";

import { Suspense, useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import Task from "@/components/Task";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

export default function HomePage({ params }: { params: { userId: string } }) {
  const { tasks, favorites } = useTaskStore((state) => ({
    tasks: state.tasks,
    favorites: state.favorites,
  }));
  const { getTasks } = useTaskStore();

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
    getTasks(params.userId);
  }, [getTasks, params.userId, status]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
            {tasks.map((task) => (
              <article key={task.id}>
                <Task task={task} favorites={favorites} />
              </article>
            ))}
          </main>
        }
      </Suspense>
    </>
  );
}
