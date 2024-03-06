import { getColumns } from "@/actions/getColumns";
import getAllTasks from "@/utils/getAllTasks";
import Board from "@/components/Board";

export const revalidate = 0;

export default async function HomePage({
  params,
}: {
  params: { userId: string };
}) {
  const tasks = await getAllTasks(params.userId);
  const columns = await getColumns(params.userId);

  console.log("render");

  return (
    <Board
      fetchedColumns={columns!}
      userId={params.userId}
      fetchedTasks={tasks}
    />
  );
}
