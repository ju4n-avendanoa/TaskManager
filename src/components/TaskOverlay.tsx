import { Tasks } from "@/interfaces/taskInterfaces";

function TaskOverlay({ task }: { task: Tasks }) {
  return (
    <div className="bg-zinc-800 py-2 px-4 flex flex-col gap-4 rounded-md shadow-md shadow-black lg:min-h-[130px] md:min-h-[110px] min-h-[100px] max-h-[130px] overflow-hidden">
      <div className="flex items-center justify-between gap-2 w-full h-full">
        <div className="flex flex-col justify-start gap-2 w-[250px] h-full">
          <h3 className="text-sm font-bold whitespace-pre-line text-sky-400 lg:text-base line-clamp-1">
            {task.title}
          </h3>
          <p className="text-xs lg:text-sm whitespace-pre-line text-white line-clamp-4">
            {task.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskOverlay;
