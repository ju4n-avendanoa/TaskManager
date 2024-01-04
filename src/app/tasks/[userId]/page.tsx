import TaskGrid from "@/components/TaskGrid";

export const revalidate = 0;

export default function HomePage({ params }: { params: { userId: string } }) {
  return (
    <>
      <main>
        <section className="flex flex-col h-full max-sm:items-center md:flex-row">
          <TaskGrid userId={params.userId} />
        </section>
      </main>
    </>
  );
}
