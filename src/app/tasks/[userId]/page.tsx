"use client";

import { Suspense } from "react";

import TasksList from "@/components/TasksList";
import { useRouter } from "next/navigation";
import "../../styles/Global.css";
import LoadingTasks from "./loading";

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/newtask");
  };

  return (
    <>
      <header className="h-1/5 flex flex-col items-center justify-around gap-4 p-5 bg-slate-900">
        <h1 className="text-white text-4xl font-bold">Task List</h1>
        <button onClick={handleClick} className="btn">
          add new task
        </button>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
        <Suspense fallback={<LoadingTasks />}>
          <TasksList />
        </Suspense>
      </main>
    </>
  );
}
