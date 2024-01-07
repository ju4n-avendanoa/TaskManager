"use client";

import { useFiltersStore } from "@/store/filtersStore";
import { useTaskStore } from "@/store/taskStore";
import { useEffect, useMemo } from "react";
import Task from "./Task";

function TaskGrid({ userId }: { userId: string }) {
  const { tasks, getTasks, sort, favorites, checked, pendings } =
    useTaskStore();
  const { favorite, done, pending } = useFiltersStore();

  useEffect(() => {
    getTasks(userId);
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
    <div className="grid w-full grid-cols-1 gap-8 p-8 pt-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasksOrderedByDate.map((task: any) => (
        <div key={task.id}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
}

export default TaskGrid;
