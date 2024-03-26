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
import { createPortal } from "react-dom";
import { NewTaskType } from "../Board/ColumnContainer";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import ClientColumnContainer from "./ClientColumnBoard";
import CreateColumnButton from "../CreateColumnButton";
import TaskOverlay from "../Board/TaskOverlay";

const initialColumns = [
  { id: "232344", title: "Column 1", index: 1 },
  { id: "548768", title: "Column 2", index: 2 },
];

const initialTasks = [
  {
    id: "123456789",
    title: "Task 1",
    description: "Description...",
    columnId: "232344",
    createdAt: Date.now().toString(),
  },
  {
    id: "123753456",
    title: "Task 2",
    description: "Description...",
    columnId: "232344",
    createdAt: Date.now().toString(),
  },
];

function ClientBoard() {
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [activeTask, setActiveTask] = useState<Tasks | null>();
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const columnsId = useMemo(
    () => columns?.map((column) => column.id),
    [columns]
  );

  const onCreateNewTask = (newTask: NewTaskType) => {
    const taskToAdd: Tasks = {
      ...newTask,
      createdAt: Date.now().toString(),
      id: Math.floor(Math.random() * 123456).toString(),
    };
    setTasks((prev) => [...prev, taskToAdd]);
  };

  const onDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const onDeleteColumn = (id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
    setTasks((prev) => prev.filter((task) => task.columnId !== id));
  };

  const onCreateNewColumn = (index: number) => {
    const newColumn: Column = {
      id: Math.floor(Math.random() * 123456).toString(),
      title: "New Column",
      index: index,
    };
    console.log(newColumn);
    setColumns((prev) => [...prev, newColumn]);
  };

  const onEditColumnTitle = (id: string, columnTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
      if (columnTitle === "") {
        return { ...column, title: "Column Title" };
      }
      return { ...column, title: columnTitle };
    });
    setColumns(newColumns);
  };

  const onEditTask = (editedTask: Tasks) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== editedTask.id) return task;
      return {
        ...task,
        title: editedTask.title,
        description: editedTask.description,
      };
    });
    setTasks(newTasks);
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

  const handleDragEnd = (e: DragEndEvent) => {
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

      setTasks((tasks) => {
        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    //Drop over a column

    if (isActiveATask && isOverAColumn) {
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
      <section className="flex h-full gap-6 px-10 pt-16 lg:pt-24 xl:pt-28 pb-5 overflow-auto">
        <SortableContext items={columnsId}>
          {columns?.map((column) => (
            <article key={column.id} className="h-full">
              <ClientColumnContainer
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
                <ClientColumnContainer
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

export default ClientBoard;
