import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import {
  TrashIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Tasks } from "@/app/interfaces/taskInterfaces";

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

  const formattedDate = task.createdAt.split("T")[0];

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleFavorite = () => {
    if (favorites.includes(task)) {
      deleteFavorites(task);
    } else {
      addFavorite(task);
    }
  };
  const handleToggleChecked = () => {
    if (checked.includes(task.id)) {
      deleteChecked(task.id);
    } else {
      addChecked(task.id);
    }
  };

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const isPrioritary = favorites.includes(task);
  const isChecked = checked.includes(task.id);
  const isFavAndChecked = favorites.includes(task) && checked.includes(task.id);

  return (
    <div
      className={`card relative ${
        isFavAndChecked
          ? "checked-fav "
          : isPrioritary
          ? "fav"
          : isChecked
          ? "checked "
          : ""
      }`}
    >
      <ExclamationTriangleIcon
        className={"star"}
        onClick={handleToggleFavorite}
        fill={isPrioritary ? "red" : "none"}
      />
      <CheckCircleIcon
        className={"check"}
        onClick={handleToggleChecked}
        color={isChecked ? "blue" : "none"}
      />

      <TrashIcon className="trash" onClick={handleDelete} />
      <PencilSquareIcon className="edit" onClick={handleEdit} />
      <div className="p-6">
        <h3 className="mb-3 text-xl text-blue-300">{task.title}</h3>
        <p className="text-md">{task.description}</p>
        <br />
        <p className="text-md">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Task;
