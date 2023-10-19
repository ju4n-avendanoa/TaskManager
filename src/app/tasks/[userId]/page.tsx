"use client";

import { useEffect } from "react";
import { useTaskStore } from "@/store/taskStore";
import { useSession } from "next-auth/react";
import FullTaskComponent from "@/components/FullTaskComponent";

export default function HomePage() {
  const { getTasks, setFavorites, setChecked } = useTaskStore();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getTasks(session?.user.id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [getTasks, session?.user.id]);

  useEffect(() => {
    const favoriteItems = localStorage.getItem("favorites");
    const checkedItems = localStorage.getItem("checked");
    setFavorites(JSON.parse(favoriteItems as string));
    setChecked(JSON.parse(checkedItems as string));
  }, [setFavorites, setChecked]);

  return (
    <>
      <main className="h-full">
        <section className="flex flex-col max-sm:items-center md:flex-row h-full">
          <FullTaskComponent />
        </section>
      </main>
    </>
  );
}
