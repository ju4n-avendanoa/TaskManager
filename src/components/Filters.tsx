import { Tasks } from "@/app/interfaces/taskInterfaces";
import { useTaskStore } from "@/store/taskStore";

interface Props {
  allTasks: Tasks[];
}

function Filters({ allTasks }: Props) {
  const { setTasks, favorites, sort, setSort, checked } = useTaskStore();

  const showFavorites = () => {
    const favoriteTasks = allTasks.filter((task) =>
      favorites.includes(task.id)
    );
    setTasks(favoriteTasks);
  };

  const showDone = () => {
    const doneTasks = allTasks.filter((task) => checked.includes(task.id));
    setTasks(doneTasks);
  };
  const showPending = () => {
    const doneTasks = allTasks.filter((task) => !checked.includes(task.id));
    setTasks(doneTasks);
  };

  const showAllTasks = () => {
    setTasks(allTasks);
  };
  const toggleOrder = () => {
    setSort();
  };

  return (
    <section className="flex justify-center gap-4 py-8">
      <div className="w-max flex flex-col gap-6">
        <button
          onClick={showDone}
          className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
        >
          done tasks
        </button>
        <button
          onClick={showFavorites}
          className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
        >
          priority tasks
        </button>
        <button
          onClick={showPending}
          className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
        >
          pending tasks
        </button>
        <button
          onClick={showAllTasks}
          className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
        >
          all tasks
        </button>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleOrder}
            className="border w-auto p-2 bg-blue-300 rounded-md border-slate-900 btn"
          >
            sort by date
          </button>
          <input
            type="checkbox"
            name="asc"
            id="asc"
            checked={sort}
            onChange={setSort}
            className="w-6 h-6"
          />
        </div>
      </div>
    </section>
  );
}

export default Filters;
