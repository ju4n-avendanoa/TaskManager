import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createNewTask } from "@/actions/createNewTask";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { editTask } from "@/actions/editTask";
import { useMemo, useState } from "react";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "./TaskItem";
import NewTask from "./NewTask";

type Props = {
  column: Column;
  onDeleteColumn: (columnId: string) => void;
  tasks: Tasks[];
  onEditColumnTitle: (id: string, columnTitle: string) => void;
  userId: string;
};

export type NewTaskType = {
  title: string;
  description: string;
  columnId: string;
};

function ColumnContainer({
  column,
  onDeleteColumn,
  tasks,
  onEditColumnTitle,
  userId,
}: Props) {
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [editMode, setEditMode] = useState(false);
  const [newTask, setNewTask] = useState<NewTaskType | null>(null);

  const createTask = (columnId: string) => {
    const newTask = {
      title: "",
      columnId: columnId,
      description: "",
    };

    setNewTask(newTask);
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

  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
      className="bg-zinc-500 h-full w-[350px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex gap-2 p-4 bg-zinc-900 justify-between items-center h-[50px]"
      >
        {!editMode ? (
          <span
            className="text-white select-none"
            onClick={() => setEditMode(true)}
          >
            {column.title}
          </span>
        ) : null}
        {editMode ? (
          <input
            type="text"
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            autoFocus
            onBlur={() => {
              if (column.title === columnTitle) return setEditMode(false);
              onEditColumnTitle(column.id, columnTitle);
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (column.title === columnTitle) return setEditMode(false);

              onEditColumnTitle(column.id, columnTitle);
              setEditMode(false);
            }}
            className="bg-transparent outline-sky-700 outline-none text-white"
          />
        ) : null}
        <TrashIcon
          className="z-100 w-8 h-8 text-white border border-white rounded-full p-1"
          onClick={() => onDeleteColumn(column.id)}
        />
      </div>
      <div className="grow flex flex-col gap-1 overflow-auto">
        {tasks.map((task, index) => (
          <SortableContext items={tasksId}>
            <TaskItem
              task={task}
              key={index}
              onSave={(editedTask) => editTask(editedTask, userId)}
            />
          </SortableContext>
        ))}
        {newTask ? (
          <NewTask
            newTask={newTask}
            onCancel={() => setNewTask(null)}
            onSave={(newTask) => {
              createNewTask(newTask, userId);
              setNewTask(null);
            }}
            userId={userId}
          />
        ) : null}
      </div>
      <button
        className="flex select-none gap-2 items-center bg-zinc-900 text-white active:text-sky-600 hover:bg-zinc-700 py-3 px-2 text-sm"
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
