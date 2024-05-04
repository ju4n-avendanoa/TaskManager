"use client";

import { motion } from "framer-motion";
import ImageMainPage from "@/components/MainPage/ImageMainPage";
import TextAnimated from "@/components/MainPage/TextAnimated";
import UtilityCard from "@/components/MainPage/UtilityCard";
import ClientBoard from "@/components/ClientBoard/ClientBoard";
import Avatar from "@/components/MainPage/Avatar";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen min-w-[300px]">
      <div className="w-full relative bg-zinc-700">
        <section className="flex items-center flex-col lg:flex-row justify-center lg:h-[720px] w-full max-w-[1600px] m-auto p-5">
          <section className="flex text-white select-none justify-center w-full h-[500px] lg:h-full lg:w-3/5 xl:w-2/5">
            <div className="relative max-lg:max-w-[500px] flex flex-col items-center justify-start w-full gap-16 px-5 my-auto lg:items-start sm:px-10 lg:pr-0 lg:pl-32 h-3/5">
              <h1 className="w-full text-3xl sm:text-5xl md:text-5xl font-bold text-center lg:text-left lg:text-6xl text-sky-500">
                Task <br className="md:hidden lg:block" />
                Manager
              </h1>
              <TextAnimated />
              <div className="absolute left-0 flex items-center justify-center w-full gap-4 lg:justify-start lg:pl-32 sm:px-10 lg:pr-0 -bottom-10">
                <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710220777/TaskManager/avatar-portrait-svgrepo-com_ltmmx3.svg" />
                <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710359839/TaskManager/avatar-svgrepo-com_3_uucjmi.svg" />
                <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221454/TaskManager/avatar-svgrepo-com_1_nmkmfj.svg" />
                <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221456/TaskManager/avatar-svgrepo-com_v8om3q.svg" />
                <Avatar src="https://res.cloudinary.com/dhjqarghy/image/upload/v1710221452/TaskManager/avatar-svgrepo-com_2_n7gljd.svg" />
              </div>
            </div>
          </section>
          <section className="w-full min-w-[300px] lg:h-full h-[600px] md:h-[700px] lg:pt-[72px] max-xl:overflow-x-auto lg:w-2/5 xl:w-3/5">
            <ImageMainPage />
          </section>
          <div className="absolute -bottom-[81px] overflow-hidden left-0 curve w-full z-10">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-zinc-700"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-zinc-700"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-zinc-700"
              ></path>
            </svg>
          </div>
        </section>
      </div>

      <section className="relative w-full h-auto p-6 pt-32 pb-24 bg-zinc-900 md:px-10">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 0.75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-around w-full h-auto gap-10"
        >
          <div className="flex flex-col items-center justify-around gap-6 max-lg:h-1/5">
            <h2 className="text-2xl font-bold text-center text-white lg:text-3xl xl:text-4xl">
              Streamlined Task Management
            </h2>
            <p className="w-full text-base text-center text-white lg:text-lg xl:text-xl lg:w-1/2">
              ask Master simplifies your workflow. Customize columns,
              drag-and-drop tasks, and collaborate effortlessly. Stay organized
              and boost productivity.
            </p>
          </div>
          <div className="flex flex-col items-center justify-around w-full gap-8 text-white max-lg:h-4/5 lg:flex-row">
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
          <div className="absolute -bottom-[69px] overflow-hidden left-0 curve-bottom w-full z-10">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-zinc-900"
              ></path>
            </svg>
          </div>
        </motion.div>
      </section>

      <section className="lg:h-screen h-[1200px] w-full">
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
