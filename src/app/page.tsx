import "../styles/Global.css";

export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white select-none">
        <h1 className="mb-4 font-bold text-7xl">Task Manager</h1>
        <p className="mb-8 text-2lg">Organize your tasks efficiently.</p>
      </div>
    </div>
  );
}
