import { useState } from "react";
import { Tasks } from "@/interfaces/taskInterfaces";
import {
  ArrowUpCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskOverlay() {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="bg-zinc-800 py-4 px-4 flex flex-col gap-4 mx-2 my-1 rounded-md shadow-md shadow-black" />
  );
}

export default TaskOverlay;
