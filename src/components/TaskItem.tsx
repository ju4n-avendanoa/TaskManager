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
};

function TaskItem({ task, onSave }: Props) {
  const [description, setDescription] = useState(task.description);
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-zinc-800 py-4 px-4 flex flex-col gap-4 mx-2 my-1 rounded-md shadow-md shadow-black"
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
            className="bg-transparent outline-sky-700 outline-none text-white lg:text-sm text-xs"
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
          className="flex items-center justify-between h-full"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className=" flex flex-col gap-2 items-start justify-center">
            <h3
              className="text-sm font-bold whitespace-pre-line text-sky-400 lg:text-base"
              onClick={() => setEditMode(true)}
            >
              {title}
            </h3>
            <p
              className="text-xs lg:text-sm whitespace-pre-line text-white"
              onClick={() => setEditMode(true)}
            >
              {description}
            </p>
          </div>
          {mouseOver && (
            <TrashIcon
              className="w-6 h-6 text-white border rounded-full p-0.5 cursor-pointer"
              onClick={() => ""}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TaskItem;
