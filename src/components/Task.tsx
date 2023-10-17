import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import {
  TrashIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Tasks } from "@/app/interfaces/taskInterfaces";
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
    if (favorites.includes(task)) {
      deleteFavorites(task);
    } else {
      addFavorite(task);
    }
  };
  const handleToggleChecked = () => {
    if (checked.includes(task)) {
      deleteChecked(task);
    } else {
      addChecked(task);
    }
  };

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const isPrioritary = favorites.includes(task);
  const isChecked = checked.includes(task);
  const isFavAndChecked = favorites.includes(task) && checked.includes(task);

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
        <p className="text-md">{formatedDate}</p>
      </div>
    </div>
  );
}

export default Task;
