"use client";

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
import { useMemo, useState } from "react";
import { updateColumnIndex } from "@/actions/updateColumnIndex";
import { deleteColumn } from "@/actions/deleteColumn";
import { createPortal } from "react-dom";
import { createColumn } from "@/actions/createColumn";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import CreateColumnButton from "./CreateColumnButton";
import ColumnContainer from "./ColumnContainer";
import { editColumnTitle } from "@/actions/editColumnTitle";

type Props = {
  fetchedColumns: Column[];
  userId: string;
  fetchedTasks: Tasks[];
};

function Board({ fetchedColumns, userId, fetchedTasks }: Props) {
  const [activeColumn, setActiveColumn] = useState<Column | null>();
  const [columns, setColumns] = useState(fetchedColumns);
  const [tasks, setTasks] = useState(fetchedTasks);

  const onDeleteColumn = async (id: string) => {
    await deleteColumn(id, userId);
    setColumns((prev) => prev.filter((column) => column.id !== id));
  };

  const onCreateNewColumn = async (userId: string, index: number) => {
    const newColumn = await createColumn(userId, index);
    setColumns((prev) => [...prev, newColumn]);
  };

  const onEditColumnTitle = (id: string, columnTitle: string) => {
    const newColumns = columns.map((column) => {
      if (column.id !== id) return column;
      return { ...column, title: columnTitle };
    });
    setColumns(newColumns);

    editColumnTitle(id, columnTitle, userId);
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Column")
      setActiveColumn(e.active.data.current.column);
    return;
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    updateColumnIndex(activeColumnId, overColumnId, userId);

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
      },
    })
  );

  const columnsId = useMemo(
    () => columns?.map((column) => column.id),
    [columns]
  );

  if (columns?.length === 0) {
    return (
      <section className="flex flex-col pt-40 text-center items-center gap-4">
        <h2 className="text-white text-2xl lg:text-4xl font-semibold">
          Star organizing your tasks
        </h2>
        <CreateColumnButton
          userId={userId}
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
    >
      <section className="flex gap-6 pt-24 px-10 pb-5 h-screen overflow-auto">
        <SortableContext items={columnsId}>
          {columns?.map((column) => (
            <article key={column.id} className="h-full">
              <ColumnContainer
                column={column}
                onDeleteColumn={onDeleteColumn}
                onEditColumnTitle={onEditColumnTitle}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                userId={userId}
              />
            </article>
          ))}
        </SortableContext>
        <div>
          <CreateColumnButton
            userId={userId}
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
                  userId={userId}
                />
              )}
            </DragOverlay>,
            document.body
          )}
      </section>
    </DndContext>
  );
}

export default Board;
