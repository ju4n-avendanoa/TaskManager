import TasksList from "@/components/TasksList";
import "../styles/Global.css";
import NavBar from "@/components/NavBar";

export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 ">
        <TasksList />
      </main>
    </>
  );
}
