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

  const handleDelete = async (id: string) => {
    deleteTask(task.id);
  };

  const handleFav = (taskId: string) => {
    if (favorites.includes(taskId)) {
      deleteFavorites(taskId);
    } else {
      addFavorite(task.id);
    }
  };

  const handleEdit = (taskId: string) => {
    router.push(`/tasks/edit/${taskId}`);
  };
  console.log(favorites);
  return (
    <div className={"card relative"}>
      <StarIcon className="star" onClick={() => handleFav(task.id)} />

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
