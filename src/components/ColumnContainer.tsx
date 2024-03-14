import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { Column } from "@/interfaces/column";
import { Tasks } from "@/interfaces/taskInterfaces";
import { CSS } from "@dnd-kit/utilities";
import TaskItem from "./TaskItem";
import NewTask from "./NewTask";
import LoadingTask from "./LoadingTask";

type Props = {
  onEditColumnTitle: (id: string, columnTitle: string) => void;
  onDeleteColumn: (columnId: string) => void;
  column: Column;
  tasks: Tasks[];
  onDeleteTask: (id: string) => void;
  onCreateNewTask: (newTask: NewTaskType) => void;
  onEditTask: (task: Tasks) => void;
};

export type NewTaskType = {
  title: string;
  description: string;
  columnId: string;
};

function ColumnContainer({
  onEditColumnTitle,
  onDeleteColumn,
  column,
  tasks,
  onDeleteTask,
  onCreateNewTask,
  onEditTask,
}: Props) {
  const [newTask, setNewTask] = useState<NewTaskType | null>(null);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

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
      />
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
        className="flex gap-2 p-4 bg-zinc-900 justify-between items-center h-[50px] touch-none"
      >
        {!editMode ? (
          <span
            className="w-3/4 text-white select-none line-clamp-1"
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
            className="text-white bg-transparent outline-none outline-sky-700"
          />
        ) : null}
        <TrashIcon
          className="z-10 w-8 h-8 p-1 text-white border border-white rounded-full"
          onClick={() => onDeleteColumn(column.id)}
        />
      </div>
      <div className="flex flex-col w-full gap-3 p-2 overflow-y-auto grow">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onSave={(editedTask) => onEditTask(editedTask)}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </SortableContext>
        {newTask ? (
          <NewTask
            newTask={newTask}
            onCancel={() => setNewTask(null)}
            onSave={async (newTask) => {
              setNewTask(null);
              setLoading(true);
              if (newTask.description === "") {
                newTask.description = "Description";
              }
              if (newTask.title === "") {
                newTask.title = "Title";
              }
              await onCreateNewTask(newTask);
              setLoading(false);
            }}
          />
        ) : null}
        {loading && <LoadingTask />}
      </div>
      <button
        className="flex items-center gap-2 px-2 py-3 text-sm text-white select-none bg-zinc-900 active:text-sky-600 hover:bg-zinc-700"
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
