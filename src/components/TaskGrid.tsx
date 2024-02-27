"use client";

import { useFiltersStore } from "@/store/filtersStore";
import { useTaskStore } from "@/store/taskStore";
import { useEffect, useMemo, useState } from "react";
import Loading from "@/app/loading";
import Task from "./Task";

function TaskGrid({ userId }: { userId: string }) {
  const { tasks, getTasks, sort, favorites, checked, pendings } =
    useTaskStore();
  const { favorite, done, pending } = useFiltersStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTasks(userId);
    setLoading(false);
  }, [getTasks, userId]);

  const taskToShow = favorite
    ? favorites
    : done
    ? checked
    : pending
    ? pendings
    : tasks;

  const tasksOrderedByDate = useMemo(() => {
    return sort
      ? [...taskToShow].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : taskToShow;
  }, [sort, taskToShow]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="flex flex-col h-full max-sm:items-center md:flex-row">
          <div className="grid w-full grid-cols-1 gap-8 p-8 pt-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasksOrderedByDate.map((task: any) => (
              <div key={task.id}>
                <Task task={task} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default TaskGrid;
