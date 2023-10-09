import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import {
  TrashIcon,
  PencilSquareIcon,
  StarIcon,
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
    if (favorites.includes(task.id)) {
      deleteFavorites(task.id);
    } else {
      addFavorite(task.id);
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

  const isFavorite = favorites.includes(task.id);
  const isChecked = checked.includes(task.id);
  const isFavAndChecked =
    favorites.includes(task.id) && checked.includes(task.id);

  return (
    <div
      className={
        isFavAndChecked
          ? "card checked-fav relative"
          : isFavorite
          ? "card fav relative"
          : isChecked
          ? "card checked relative"
          : "card relative"
      }
    >
      <StarIcon
        className={"star"}
        onClick={handleToggleFavorite}
        fill={isFavorite ? "yellow" : "none"}
        color={isFavorite ? "yellow" : "none"}
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
        <p className="text-md">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Task;
