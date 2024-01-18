export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center text-white select-none">
        <h1 className="mb-4 w-[12ch] block whitespace-nowrap text-4xl font-bold lg:text-7xl overflow-hidden type-title">
          Task Manager
        </h1>
        <span className="w-[41ch] block whitespace-nowrap text-lg lg:text-2xl mt-10 border-r-2 border-solid overflow-hidden typewritter">
          Optimize your task management effectively
        </span>
      </div>
    </div>
  );
}
