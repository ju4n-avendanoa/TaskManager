import { getColumns } from "@/actions/getColumns";
import getAllTasks from "@/utils/getAllTasks";
import Board from "@/components/Board";

type Props = {
  userId: string;
};

async function Workspace({ userId }: Props) {
  const tasks = await getAllTasks(userId);
  const columns = await getColumns(userId);

  return (
    <Board fetchedColumns={columns!} userId={userId} fetchedTasks={tasks} />
  );
}

export default Workspace;
