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
  favorites: number[];
}

function Task({ task, favorites }: Props) {
  const { deleteTask, deleteFavorites, addFavorite } = useTaskStore();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    deleteTask(id);
  };

  const handleFav = (taskId: number) => {
    if (favorites.includes(taskId)) {
      deleteFavorites(taskId);
    } else {
      addFavorite(taskId);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/tasks/edit/${id}`);
  };

  return (
    <div
      className={
        favorites?.includes(task.id) ? "fav relative" : "card relative"
      }
    >
      {favorites?.includes(task.id) ? (
        <StarIcon
          className="star"
          fill="yellow"
          color="yellow"
          onClick={() => handleFav(task.id)}
        />
      ) : (
        <StarIcon className="star" onClick={() => handleFav(task.id)} />
      )}

      <TrashIcon
        className="trash"
        onClick={() => {
          handleDelete(task.id);
        }}
      />
      <PencilSquareIcon className="edit" onClick={() => handleEdit(task.id)} />
      <div className="p-6 divide-y-2">
        <h3 className="mb-3 text-xl text-blue-300">{task.title}</h3>
        <p className="text-md">{task.description}</p>
      </div>
    </div>
  );
}

export default Task;
