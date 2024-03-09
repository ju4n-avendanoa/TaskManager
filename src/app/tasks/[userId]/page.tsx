import { Suspense } from "react";
import Workspace from "./Workspace";
import Loading from "@/app/loading";

export const revalidate = 0;

export default async function HomePage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Workspace userId={params.userId} />
    </Suspense>
  );
}
