"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import ImageMainPage from "@/components/MainPage/ImageMainPage";
import TextAnimated from "@/components/MainPage/TextAnimated";
import UtilityCard from "@/components/MainPage/UtilityCard";
import ClientBoard from "@/components/ClientBoard/ClientBoard";
import Avatar from "@/components/MainPage/Avatar";

export default function HomePage() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="flex items-center flex-col lg:flex-row justify-center lg:h-[720px] w-full">
        <section className="flex text-white select-none justify-center w-full h-[500px] lg:h-full lg:w-2/5 bg-zinc-700">
          <div className="relative flex flex-col items-center justify-start w-full gap-16 my-auto lg:items-start px-14 h-3/5 lg:h-3/5">
            <h1 className="text-5xl font-bold text-center lg:text-left lg:text-6xl text-sky-500">
              Task <br />
              Manager
            </h1>
            <TextAnimated />
            <div className="absolute left-0 flex items-center justify-center w-full gap-4 lg:justify-start px-14 -bottom-10">
              <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710220777/TaskManager/avatar-portrait-svgrepo-com_ltmmx3.svg" />
              <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710359839/TaskManager/avatar-svgrepo-com_3_uucjmi.svg" />
              <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221454/TaskManager/avatar-svgrepo-com_1_nmkmfj.svg" />
              <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221456/TaskManager/avatar-svgrepo-com_v8om3q.svg" />
              <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221452/TaskManager/avatar-svgrepo-com_2_n7gljd.svg" />
            </div>
          </div>
        </section>
        <section className="w-full lg:w-3/5 lg:h-full h-[600px] md:h-[700px] lg:pt-[72px] max-xl:overflow-x-auto">
          <ImageMainPage />
        </section>
      </section>

      <section className="bg-zinc-900 w-full h-[1200px] md:h-[1100px] lg:h-[600px] p-6 md:px-10 py-20">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 0.75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-around w-full h-full gap-10"
        >
          <div className="flex flex-col items-center justify-around gap-6 max-lg:h-1/5">
            <h2 className="text-2xl font-bold text-white lg:text-3xl xl:text-4xl">
              Streamlined Task Management
            </h2>
            <p className="w-full text-base text-center text-white lg:text-lg xl:text-xl lg:w-1/2">
              ask Master simplifies your workflow. Customize columns,
              drag-and-drop tasks, and collaborate effortlessly. Stay organized
              and boost productivity.
            </p>
          </div>
          <div className="flex flex-col items-center justify-around w-full gap-10 text-white max-lg:h-4/5 lg:flex-row">
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
        </motion.div>
      </section>
      <section className="lg:h-[650px] h-[1000px] w-full">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 0.75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-around w-full h-full lg:flex-row"
        >
          <section className="relative flex flex-col items-center justify-center w-full px-10 py-10 text-center text-white select-none gap-14 lg:items-start max-lg:h-2/5 lg:h-full lg:w-2/5 bg-zinc-700 lg:pb-10 lg:text-left">
            <h2 className="w-full text-3xl font-bold xl:text-5xl text-sky-400 lg:w-3/5">
              Explore the efficiency of our task management app
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl">
              Test the interface <span className="lg:hidden">below</span> and
              sign up to unlock all features
            </p>
            <p className="text-lg lg:text-xl xl:text-2xl animate-bounce">
              Make every day more productive with us!
            </p>
          </section>
          <section className="w-full max-lg:h-3/5 lg:w-3/5 lg:h-full">
            <ClientBoard />
          </section>
        </motion.div>
      </section>
    </main>
  );
}
