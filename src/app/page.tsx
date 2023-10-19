import "../styles/Global.css";

export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-white text-center select-none">
        <h1 className="text-7xl font-bold mb-4">Task Manager</h1>
        <p className="text-2lg mb-8">Organize your tasks efficiently.</p>
      </div>
    </div>
  );
}
