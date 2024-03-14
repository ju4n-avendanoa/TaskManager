import { getColumns } from "@/actions/getColumns";
import getAllTasks from "@/actions/getAllTasks";
import Board from "@/components/Board/Board";

type Props = {
  userId: string;
};

async function Workspace({ userId }: Props) {
  const tasks = await getAllTasks();
  const columns = await getColumns();

  return (
    <Board fetchedColumns={columns!} userId={userId} fetchedTasks={tasks} />
  );
}

export default Workspace;
