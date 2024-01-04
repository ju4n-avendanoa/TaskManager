import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import {
  TrashIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Tasks } from "@/interfaces/taskInterfaces";
import formatDate from "@/utils/formatDate";

interface Props {
  task: Tasks;
}

function Task({ task }: Props) {
  const {
    deleteTask,
    deleteFavorites,
    addFavorite,
    favorites,
    checked,
    addChecked,
    deleteChecked,
  } = useTaskStore();

  const router = useRouter();

  const formatedDate = formatDate(task.createdAt);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleFavorite = () => {
    if (favorites.some((item) => item.id === task.id)) {
      deleteFavorites(task);
    } else {
      addFavorite(task);
    }
  };

  const handleToggleChecked = () => {
    if (checked.some((item) => item.id === task.id)) {
      deleteChecked(task);
    } else {
      addChecked(task);
    }
  };

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const isPrioritary = favorites.some((item) => item.id === task.id);
  const isChecked = checked.some((item) => item.id === task.id);
  const isPrioAndChecked = (isPrioritary && isChecked) === true;

  return (
    <div
      className={`card relative ${
        isPrioAndChecked
          ? "checked-fav"
          : isPrioritary
          ? "fav"
          : isChecked
          ? "checked"
          : ""
      }`}
    >
      <ExclamationTriangleIcon
        className={"star"}
        onClick={handleToggleFavorite}
        fill={isPrioritary ? "red" : "none"}
        title={
          isPrioritary
            ? "Click to remove from priority tasks!"
            : "Click to add as a priority task!"
        }
      />
      <CheckCircleIcon
        className={"check"}
        onClick={handleToggleChecked}
        color={isChecked ? "white" : "none"}
        fill={isChecked ? "blue" : "none"}
        title={
          isChecked
            ? "Click to remove from done tasks!"
            : "Click to add as a done task!"
        }
      />

      <TrashIcon
        className="trash"
        onClick={handleDelete}
        title="Click to delete this task!"
      />
      <PencilSquareIcon
        className="edit"
        onClick={handleEdit}
        title="Click to edit this task!"
      />
      <div className="p-4 lg:p-6">
        <h3 className="mb-3 text-sm font-bold text-blue-300 lg:text-lg">
          {task.title}
        </h3>
        <p className="text-xs lg:text-sm">{task.description}</p>
        <br />
        <p className="text-xs lg:text-sm">{formatedDate}</p>
      </div>
    </div>
  );
}

export default Task;
