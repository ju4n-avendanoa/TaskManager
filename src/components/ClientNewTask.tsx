import { Tasks } from "@/interfaces/taskInterfaces";
import { ArrowUpCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type NewTaskType = {
  title: string;
  description: string;
  columnId: string;
};

type Props = {
  newTask: NewTaskType;
  onCancel: () => void;
  onSave: (newTask: NewTaskType) => void;
};

function NewTask({ newTask, onCancel, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="bg-zinc-700 py-4 px-2 mx-2 my-1 flex flex-col gap-4 rounded-md shadow-md shadow-black">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        placeholder="Title"
        className="bg-transparent outline-sky-700 outline-none text-white text-sm"
      />
      <textarea
        value={description}
        placeholder="Description..."
        onChange={(e) => setDescription(e.target.value)}
        className="bg-transparent outline-sky-700 outline-none text-white text-sm"
      />
      <div className="flex justify-end gap-2">
        <button
          className="bg-sky-700 text-white rounded-lg px-2 text-xs py-1 flex gap-1 items-center active:scale-95 transition duration-150 w-[70px] justify-center"
          onClick={() => {
            onSave({ ...newTask, title: title, description: description });
          }}
        >
          <span>save</span>
          <ArrowUpCircleIcon className="w-4 h-4" />
        </button>
        <button
          className="bg-red-700 text-white rounded-lg px-2 text-xs py-1 flex gap-1 items-center active:scale-95 transition duration-150 w-[70px] justify-center"
          onClick={() => onCancel()}
        >
          <span>cancel</span>
          <XCircleIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default NewTask;
