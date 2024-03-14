import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import { CSS } from "@dnd-kit/utilities";
import ClientTaskItem from "./ClientTaskItem";
import ClientNewTask from "./ClientNewTask";

type Props = {
  column: Column;
  onEditTitle: (columnId: string, value: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddNewTask: (newTask: Tasks) => void;
  onEditTask: (task: Tasks) => void;
  onDeleteTask: (id: string) => void;
  tasks: Tasks[];
};

function ClientColumnContainer({
  column,
  onDeleteColumn,
  onEditTitle,
  tasks,
  onAddNewTask,
  onEditTask,
  onDeleteTask,
}: Props) {
  const [newTask, setNewTask] = useState<Tasks | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const createTask = (columnId: string) => {
    const newTask: Tasks = {
      title: "",
      columnId: columnId,
      description: "",
      id: Math.floor(Math.random() * 123456).toString(),
      createdAt: Date.now().toString(),
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
      className="bg-zinc-500 h-full w-[350px] flex flex-col overflow-hidden touch-none"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex gap-2 p-4 bg-zinc-900 justify-between items-center h-[50px]"
      >
        {!editMode ? (
          <span
            className="text-white select-none line-clamp-1 w-3/4"
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
              onEditTitle(column.id, columnTitle);
              setEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (column.title === columnTitle) return setEditMode(false);
              onEditTitle(column.id, columnTitle);
              setEditMode(false);
            }}
            className="bg-transparent outline-sky-700 outline-none text-white"
          />
        ) : null}
        <TrashIcon
          className="z-10 w-8 h-8 text-white border border-white rounded-full p-1"
          onClick={() => {
            onDeleteColumn(column.id);
          }}
        />
      </div>
      <div className="grow flex flex-col gap-3 p-2 w-full overflow-y-auto">
        <SortableContext items={tasksId}>
          {tasks.map((task, index) => (
            <ClientTaskItem
              task={task}
              key={index}
              onSave={(editedTask) => onEditTask(editedTask)}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </SortableContext>
        {newTask ? (
          <ClientNewTask
            newTask={newTask}
            onCancel={() => setNewTask(null)}
            onSave={(newTask) => {
              onAddNewTask(newTask);
              setNewTask(null);
            }}
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

export default ClientColumnContainer;
