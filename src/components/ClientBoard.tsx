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
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import ClientColumnContainer from "./ClientColumnBoard";
import CreateColumnButton from "./CreateColumnButton";
import TaskOverlay from "./TaskOverlay";

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

  const onDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const onDeleteColumn = (id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
    setTasks((prev) => prev.filter((task) => task.columnId !== id));
  };

  const onCreateNewColumn = (index: number) => {
    const newColumn = {
      id: Math.floor(Math.random() * 123456).toString(),
      title: "New Column",
      index: index,
    };
    setColumns((prev) => [...prev, newColumn]);
  };

  const onEditColumnTitle = (id: string, columnTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
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
      <section className="flex flex-col lg:pt-24 items-center gap-4">
        <h2 className="text-white text-4xl font-semibold">
          Star organizing your tasks
        </h2>
        <CreateColumnButton
          onCreateNewColumn={onCreateNewColumn}
          index={columns[columns.length - 1].index + 1}
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
      <section className="flex gap-6 px-12 py-8 lg:pb-6 lg:pt-16 h-full overflow-auto">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <article key={column.id} className="h-full">
              <ClientColumnContainer
                column={column}
                onDeleteColumn={onDeleteColumn}
                onEditTitle={onEditColumnTitle}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                onAddNewTask={(newTask) =>
                  setTasks((prev) => [...prev, newTask])
                }
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            </article>
          ))}
        </SortableContext>
        <div>
          <CreateColumnButton
            onCreateNewColumn={onCreateNewColumn}
            index={columns[columns.length - 1].index + 1}
          />
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ClientColumnContainer
                  column={activeColumn}
                  onDeleteColumn={onDeleteColumn}
                  onEditTitle={onEditColumnTitle}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                  onAddNewTask={(newTask) =>
                    setTasks((prev) => [...prev, newTask])
                  }
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
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
