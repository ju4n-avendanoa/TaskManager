"use client";

import Task from "./Task";
import { useTaskStore } from "@/store/taskStore";
import { useEffect, useMemo } from "react";

function TaskGrid({ userId }: { userId: string }) {
  const { tasks, getTasks, sort } = useTaskStore();

  const tasksOrderedByDate = useMemo(() => {
    return sort
      ? [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : tasks;
  }, [sort, tasks]);

  useEffect(() => {
    getTasks(userId);
  }, [getTasks, userId]);

  return (
    <div className="grid grid-cols-4 gap-8 p-8 pt-24">
      {tasksOrderedByDate.map((task: any) => (
        <div key={task.id}>
          <Task task={task} />
        </div>
      ))}
    </div>
  );
}

export default TaskGrid;
