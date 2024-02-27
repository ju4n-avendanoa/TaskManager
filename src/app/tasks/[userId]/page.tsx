import TaskGrid from "@/components/TaskGrid";

export const revalidate = 0;

export default function HomePage({ params }: { params: { userId: string } }) {
  return <TaskGrid userId={params.userId} />;
}
