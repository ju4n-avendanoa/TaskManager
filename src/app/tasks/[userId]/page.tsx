import TaskGrid from "@/components/TaskGrid";
import { Suspense } from "react";

export const revalidate = 0;

export default function HomePage({ params }: { params: { userId: string } }) {
  return (
    <main>
      <section className="flex flex-col h-full max-sm:items-center md:flex-row">
        <Suspense fallback={<div>Loaging......</div>}>
          <TaskGrid userId={params.userId} />
        </Suspense>
      </section>
    </main>
  );
}
