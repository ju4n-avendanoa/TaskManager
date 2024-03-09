import { Column } from "@/interfaces/column";
import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tasks } from "@/interfaces/taskInterfaces";
import TaskItem from "./TaskItem";
import NewTask from "./NewTask";

type Props = {
  column: Column;
  onDeleteColumn: (columnId: string) => void;
  onEditTitle: (columnId: string, value: string) => void;
  tasks: Omit<Tasks, "createdAt" | "id" | "favorite" | "done">[];
  onAddNewTask: (
    newTask: Omit<Tasks, "createdAt" | "id" | "favorite" | "done">
  ) => void;
  onEditTask: (
    task: Omit<Tasks, "createdAt" | "id" | "favorite" | "done">
  ) => void;
};

function ColumnContainer({
  column,
  onDeleteColumn,
  onEditTitle,
  tasks,
  onAddNewTask,
  onEditTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newTask, setNewTask] = useState<Omit<
    Tasks,
    "createdAt" | "id" | "favorite" | "done"
  > | null>(null);

  const createTask = (columnId: string) => {
    const newTask: Omit<Tasks, "createdAt" | "id" | "favorite" | "done"> = {
      title: "",
      columnId: columnId,
      description: "",
    };

    setNewTask(newTask);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return onEditTitle(column.id, e.target.value);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <section
        className="h-full w-[350px] p-10 border-2 border-zinc-400"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      ></section>
    );
  }

  return (
    <section
      ref={setNodeRef}
      style={style}
      className="bg-zinc-400 h-full w-[350px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex gap-2 p-4 bg-zinc-900 justify-between items-center h-[50px]"
        onClick={() => setEditMode(true)}
      >
        {!editMode ? (
          <span className="text-white select-none">{column.title}</span>
        ) : null}
        {editMode ? (
          <input
            type="text"
            value={column.title}
            onChange={handleTitleChange}
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              setEditMode(false);
            }}
            className="bg-transparent outline-sky-700 outline-none text-white"
          />
        ) : null}
        <TrashIcon
          className="z-100 w-8 h-8 text-white border border-white rounded-full p-1"
          onClick={() => {
            onDeleteColumn(column.id);
          }}
        />
      </div>
      {/* <div className="grow flex flex-col gap-1 overflow-auto">
        {tasks.map((task, index) => (
          <TaskItem
            task={task}
            key={index}
            onSave={(editedTask) => onEditTask(editedTask)}
          />
        ))}
        {newTask ? (
          <NewTask
            newTask={newTask}
            onCancel={() => setNewTask(null)}
            onSave={(newTask) => {
              onAddNewTask(newTask);
              setNewTask(null);
            }}
          />
        ) : null}
      </div> */}
      <button
        className="flex gap-2 items-center bg-zinc-900 text-white active:text-sky-600 hover:bg-zinc-700 py-3 px-2 text-sm"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusCircleIcon className="w-6 h-6" />
        <span>Add task</span>
      </button>
    </section>
  );
}

export default ColumnContainer;
