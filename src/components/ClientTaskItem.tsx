import { useState } from "react";
import { Tasks } from "@/interfaces/taskInterfaces";
import {
  ArrowUpCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: Tasks;
  onSave: (task: Tasks) => void;
  onDeleteTask: (id: string) => void;
};

function ClientTaskItem({ task, onSave, onDeleteTask }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Tasks",
      task,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        className="bg-zinc-800/60 py-2 px-4 flex flex-col items-start gap-4 md:min-h-[110px] lg:min-h-[130px] lg:max-h-[130px] rounded-md min-h-[100px]"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-zinc-800 py-2 px-4 flex flex-col gap-4 rounded-md shadow-md shadow-black lg:min-h-[130px] md:min-h-[110px] min-h-[100px] max-h-[130px] overflow-hidden touch-none"
    >
      {editMode ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="bg-transparent outline-sky-700 outline-none text-white lg:text-base text-sm"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent outline-sky-700 outline-none text-white lg:text-sm text-xs overflow-auto"
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-sky-700 text-white rounded-lg px-2 text-xs py-1 flex gap-1 items-center active:scale-95 transition duration-150 w-[70px] justify-center"
              onClick={() => {
                onSave({ ...task, title: title, description: description });
                setEditMode(false);
              }}
            >
              <span>save</span>
              <ArrowUpCircleIcon className="w-4 h-4" />
            </button>
            <button
              className="bg-red-700 text-white rounded-lg px-2 text-xs py-1 flex gap-1 items-center active:scale-95 transition duration-150 w-[70px] justify-center"
              onClick={() => setEditMode(false)}
            >
              <span>cancel</span>
              <XCircleIcon className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <div
          className="flex items-center justify-between gap-2 w-full h-full touch-none"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
          {...attributes}
          {...listeners}
        >
          <div className="flex flex-col justify-start gap-2 w-[250px] h-full">
            <h3
              className="text-sm font-bold whitespace-pre-line text-sky-400 lg:text-base hyphens-auto overflow-ellipsis"
              onClick={() => setEditMode(true)}
            >
              {title}
            </h3>
            <p
              className="text-xs lg:text-sm whitespace-pre-line text-white overflow-y-auto hyphens-auto"
              onClick={() => setEditMode(true)}
            >
              {description}
            </p>
          </div>
          <TrashIcon
            className="min-w-max h-6 text-white border rounded-full p-0.5 cursor-pointer active:text-sky-300 active:border-sky-300 lg:hidden"
            onClick={() => onDeleteTask(task.id)}
          />
          {mouseOver && (
            <TrashIcon
              className="min-w-max h-6 text-white border rounded-full p-0.5 cursor-pointer active:text-sky-300 active:border-sky-300"
              onClick={() => onDeleteTask(task.id)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ClientTaskItem;
