import Board from "@/components/Board";
import TextAnimated from "@/components/TextAnimated";

export default function HomePage() {
  return (
    <main className="flex lg:flex-row flex-col items-center justify-center h-screen">
      <section className="flex text-white select-none items-center justify-center w-full h-full lg:w-2/5 bg-zinc-700">
        <div className="flex gap-12 flex-col text-center items-center px-10">
          <h1 className="text-4xl font-bold lg:text-6xl text-sky-500">
            Task Manager
          </h1>
          <TextAnimated />
        </div>
      </section>

      <section className="w-full lg:w-3/5 h-full pt-20">
        {/* <Board /> */}
      </section>
    </main>
  );
}
