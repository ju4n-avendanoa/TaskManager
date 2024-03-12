import ImageMainPage from "@/components/ImageMainPage";
import TextAnimated from "@/components/TextAnimated";
import Board from "@/components/Board";
import UtilityCard from "@/components/UtilityCard";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center flex-col lg:flex-row justify-center lg:h-screen w-full">
        <section className="flex text-white select-none justify-center w-full h-[400px] lg:h-full lg:w-2/5 bg-zinc-700">
          <div className="flex gap-12 flex-col text-center items-center px-10 my-auto h-1/2">
            <h1 className="text-2xl md:text-4xl font-bold lg:text-6xl text-sky-500">
              Task Manager
            </h1>
            <TextAnimated />
          </div>
        </section>
        <section className="w-full lg:w-3/5 lg:h-full h-[600px] md:h-[700px] lg:pt-[72px]">
          <ImageMainPage />
          {/* <Board /> */}
        </section>
      </div>
      <section className="flex flex-col gap-6 bg-zinc-900 w-full p-10 items-center">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-4xl text-white font-bold">
            Streamlined Task Management
          </h2>
          <p className="text-white text-xl text-center w-1/2">
            ask Master simplifies your workflow. Customize columns,
            drag-and-drop tasks, and collaborate effortlessly. Stay organized
            and boost productivity.
          </p>
        </div>
        <div className="text-white w-full flex lg:flex-row flex-col gap-10 p-10 justify-around">
          <UtilityCard
            title="Customizable Task Columns"
            description="Tailor your workspace by creating and organizing columns to match your workflow, making it easy to categorize and manage tasks efficiently."
          />
          <UtilityCard
            title="Intuitive Drag-and-Drop Interface"
            description="Seamlessly rearrange tasks and columns with a simple drag-and-drop interface, promoting a fluid and user-friendly experience for effortless organization."
          />
          <UtilityCard
            title="Cross-Device Syncing"
            description="Access your tasks and columns seamlessly across multiple devices, ensuring you have the flexibility to manage your work from anywhere, whether it's on your computer, tablet, or smartphone."
          />
        </div>
      </section>
    </main>
  );
}
