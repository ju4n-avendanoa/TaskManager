import { useTaskStore } from "@/store/taskStore";
import React, { useMemo } from "react";
import Task from "./Task";

interface Props {
  showChecked: boolean;
  showFavorites: boolean;
  showPending: boolean;
}

function TaskGrid({ showChecked, showFavorites, showPending }: Props) {
  const { sort, tasks, favorites, checked } = useTaskStore();

  const orderByDate = useMemo(() => {
    return sort
      ? [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      : tasks;
  }, [sort, tasks]);

  return (
    <>
      {showFavorites && favorites.length > 0 && (
        <>
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
        </>
      )}
      {showFavorites && favorites.length === 0 && (
        <>
          <h2 className="text-white text-2xl lg:text-4xl font-bold text-center pt-4">
            No Tasks Marked as Priorities
          </h2>
        </>
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
            <h2 className="text-6xl text-white font-bold">No Tasks Pending</h2>
          </div>
        )}
    </>
  );
}

export default TaskGrid;
