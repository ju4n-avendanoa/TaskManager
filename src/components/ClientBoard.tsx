"use client";

import { useMemo, useState } from "react";
import * as tasksss from "@/../tareas.json";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import ColumnContainer from "./ColumnContainer";
import { createColumn } from "@/actions/createColumn";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

// const initialColumns = [
//   { id: "232344", title: "columna 1" },
//   { id: "548768", title: "columna 2" },
// ];

type Props = {
  columns: Column[] | undefined;
  userId: string;
};

function Board({ columns, userId }: Props) {
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [tasks, setTasks] = useState<
    Omit<Tasks, "createdAt" | "id" | "favorite" | "done">[]
  >(Array.from(tasksss));

  const columnsId = useMemo(
    () => columns?.map((column) => column.id),
    [columns]
  );

  // const onEditTitle = (id: string, value: string) => {
  //   const newColumns = columns?.map((column) => {
  //     if (column.id !== id) return column;
  //     return { ...column, title: value };
  //   });
  //   setColumns(newColumns);
  // };

  // const onDeleteColumn = (id: string) => {
  //   setColumns((prev) => prev.filter((column) => column.id !== id));
  //   console.log(columns);
  // };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column")
      setActiveColumn(e.active.data.current.column);
    return;
  };

  // const handleDragEnd = (e: DragEndEvent) => {
  //   const { over, active } = e;

  //   if (!over) return;

  //   const activeColumnId = active.id;
  //   const overColumnId = over.id;

  //   if (activeColumnId === overColumnId) return;

  //   setColumns((columns) => {
  //     const activeColumnIndex = columns.findIndex(
  //       (col) => col.id === activeColumnId
  //     );
  //     const overColumnIndex = columns.findIndex(
  //       (col) => col.id === overColumnId
  //     );
  //     return arrayMove(columns, activeColumnIndex, overColumnIndex);
  //   });
  // };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
      },
    })
  );

  console.log(columns);

  if (columns?.length === 0) {
    return (
      <section className="flex flex-col pt-24 items-center gap-4">
        <h2 className="text-white text-4xl font-semibold">
          Star organizing your tasks
        </h2>
        {/* <button
          className="bg-zinc-900 text-white flex gap-2 items-center py-2 px-4 w-fit rounded-lg"
          onClick={() => createColumn(userId)}
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span>Create column</span>
        </button> */}
      </section>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
    >
      <section className="flex gap-6 p-12 h-full overflow-auto">
        {/* <SortableContext items={columnsId}>
          {columns.map((column) => (
            <article key={column.id} className="h-full">
              <ColumnContainer
                column={column}
                onDeleteColumn={onDeleteColumn}
                onEditTitle={onEditTitle}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                onAddNewTask={(newTask) => {
                  setTasks((prev) => [...prev, newTask]);
                }}
                onEditTask={(task) => setTasks((prev) => [...prev, task])}
              />
            </article>
          ))}
        </SortableContext> */}
        <div>
          {/* <button onClick={() => createNewColumn()}>Create column</button> */}
        </div>
        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {/* {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  onDeleteColumn={onDeleteColumn}
                  onEditTitle={onEditTitle}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                  onAddNewTask={(newTask) =>
                    setTasks((prev) => [...prev, newTask])
                  }
                  onEditTask={(task) => setTasks((prev) => [...prev, task])}
                />
              )} */}
            </DragOverlay>,
            document.body
          )}
      </section>
    </DndContext>
  );
}

export default Board;
