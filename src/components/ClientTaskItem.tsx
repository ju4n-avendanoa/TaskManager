import { useState } from "react";
import { Tasks } from "@/interfaces/taskInterfaces";
import { ArrowUpCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  task: Omit<Tasks, "createdAt" | "id" | "favorite" | "done">;
  onSave: (task: Omit<Tasks, "createdAt" | "id" | "favorite" | "done">) => void;
};

function TaskItem({ task, onSave }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  return (
    <div className="bg-zinc-700 py-4 px-4 flex flex-col gap-4 mx-2 my-1 rounded-md shadow-md shadow-black">
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
        <>
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
        </>
      )}
      {/* <p className="text-xs lg:text-sm">{formatedDate}</p> */}
    </div>
  );
}

export default TaskItem;
