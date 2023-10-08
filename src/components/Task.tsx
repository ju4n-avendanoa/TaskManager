import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import {
  TrashIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Tasks } from "@/app/interfaces/taskInterfaces";

interface Props {
  task: Tasks;
}

function Task({ task }: Props) {
  const { deleteTask, deleteFavorites, addFavorite, favorites } =
    useTaskStore();
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

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const isFavorite = favorites.includes(task.id);

  return (
    <div
      className={
        favorites?.includes(task.id) ? "fav relative" : "card relative"
      }
    >
      <StarIcon
        className={`star${isFavorite ? " star-favorite" : ""}`}
        onClick={handleToggleFavorite}
        fill={isFavorite ? "yellow" : "none"}
        color={isFavorite ? "yellow" : "none"}
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
