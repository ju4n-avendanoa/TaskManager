"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { updateColumnIndex } from "@/actions/updateColumnIndex";
import { editColumnTitle } from "@/actions/editColumnTitle";
import { changeColumnId } from "@/actions/changeColumnId";
import { createNewTask } from "@/actions/createNewTask";
import { deleteColumn } from "@/actions/deleteColumn";
import { createPortal } from "react-dom";
import { createColumn } from "@/actions/createColumn";
import { debounce } from "lodash";
import { editTask } from "@/actions/editTask";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import { toast } from "sonner";
import ColumnContainer, { NewTaskType } from "./ColumnContainer";
import CreateColumnButton from "../CreateColumnButton";
import TaskOverlay from "./TaskOverlay";
import deleteTask from "@/actions/deleteTask";

type Props = {
  fetchedColumns: Column[];
  userId: string;
  fetchedTasks: Tasks[];
};

function Board({ fetchedColumns, fetchedTasks }: Props) {
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [activeTask, setActiveTask] = useState<Tasks | null>();
  const [columns, setColumns] = useState(fetchedColumns);
  const [tasks, setTasks] = useState(fetchedTasks);

  const columnsId = useMemo(
    () => columns?.map((column) => column.id),
    [columns]
  );

  const debouncedChangeColumnId = useMemo(
    () =>
      debounce(async (activeId: string, overId: string) => {
        await changeColumnId(activeId, overId);
      }, 4000),
    []
  );

  const onCreateNewTask = async (newTask: NewTaskType) => {
    const task = await createNewTask(newTask);
    setTasks((prev) => [...prev, task]);
    0;
  };

  const onDeleteTask = async (taskId: string) => {
    toast.promise(
      async () => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        await deleteTask(taskId);
      },
      {
        loading: "Loading...",
        success: "Task deleted successfully!",
        error: "Failed to delete task",
      }
    );
  };

  const onDeleteColumn = async (id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
    await deleteColumn(id);
    setTasks((prev) => prev.filter((task) => task.columnId !== id));
  };

  const onCreateNewColumn = async (index: number) => {
    const newColumn = await createColumn(index);
    setColumns((prev) => [...prev, newColumn]);
  };

  const onEditColumnTitle = async (id: string, columnTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
      if (columnTitle === "") {
        return { ...column, title: "Column Title" };
      }
      return { ...column, title: columnTitle };
    });
    setColumns(newColumns);

    await editColumnTitle(id, columnTitle);
  };

  const onEditTask = async (editedTask: Tasks) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== editedTask.id) return task;
      return {
        ...task,
        title: editedTask.title,
        description: editedTask.description,
      };
    });
    setTasks(newTasks);
    await editTask(editedTask);
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.column);
      return;
    }
    if (e.active.data.current?.type === "Tasks") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    const { over, active } = e;

    if (!over) return;

    setActiveColumn(null);
    setActiveTask(null);

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
    await updateColumnIndex(activeId, overId);
  };

  const onDragOver = async (e: DragOverEvent) => {
    const { over, active } = e;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Tasks";
    const isOverATask = over.data.current?.type === "Tasks";

    if (!isActiveATask) return;

    //Drop over a task

    const activeIndex = tasks.findIndex((task) => task.id === activeId);

    if (isActiveATask && isOverATask) {
      const overIndex = tasks.findIndex((task) => task.id === overId);

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        debouncedChangeColumnId(
          tasks[activeIndex].id,
          tasks[overIndex].columnId
        );
      }
      setTasks((tasks) => {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    //Drop over a column

    if (isActiveATask && isOverAColumn) {
      if (tasks[activeIndex].columnId !== overId) {
        debouncedChangeColumnId(tasks[activeIndex].id, overId as string);
      }

      setTasks((tasks) => {
        tasks[activeIndex].columnId = overId as string;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  if (columns?.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4 pt-40 text-center">
        <h2 className="text-2xl font-semibold text-white lg:text-4xl">
          Star organizing your tasks
        </h2>
        <CreateColumnButton
          index={columns?.length + 1}
          onCreateNewColumn={onCreateNewColumn}
        />
      </section>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
    >
      <section className="flex h-screen gap-6 px-10 pt-24 pb-5 overflow-auto">
        <SortableContext items={columnsId}>
          {columns?.map((column) => (
            <article key={column.id} className="h-full">
              <ColumnContainer
                column={column}
                onDeleteColumn={onDeleteColumn}
                onEditColumnTitle={onEditColumnTitle}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                onDeleteTask={onDeleteTask}
                onCreateNewTask={onCreateNewTask}
                onEditTask={onEditTask}
              />
            </article>
          ))}
        </SortableContext>
        <div>
          <CreateColumnButton
            index={columns?.length + 1}
            onCreateNewColumn={onCreateNewColumn}
          />
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  onDeleteColumn={onDeleteColumn}
                  onEditColumnTitle={onEditColumnTitle}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                  onDeleteTask={onDeleteTask}
                  onCreateNewTask={onCreateNewTask}
                  onEditTask={onEditTask}
                />
              )}

              {activeTask && <TaskOverlay task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
      </section>
    </DndContext>
  );
}

export default Board;
