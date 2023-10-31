"use client";

import { useTaskStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  title: string;
  description: string;
  taskId: string | null;
  userId: string | undefined;
}

function TaskForm({ title, description, taskId, userId }: Props) {
  const { setDescription, setTitle } = useTaskStore();
  const { data: session } = useSession();
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const apiUrl = taskId
        ? process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/tasks/${taskId}`
          : `https://my-task-organizer.vercel.app/api/tasks/${taskId}`
        : process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/user-tasks/${userId}`
        : `https://my-task-organizer.vercel.app/api/user-tasks/${userId}`;

      await fetch(apiUrl, {
        method: taskId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
    } catch (error) {
      console.error(error);
    }
    router.push(`/tasks/${session?.user.id}`);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-3 items-center bg-slate-900 rounded-md p-7">
      <form onSubmit={handleSubmit} className="flex flex-col w-64 gap-3">
        <label htmlFor="title" className="text-white">
          New Task
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder=" title"
          required
        />
        <label htmlFor="description" className="text-white">
          Description
        </label>
        <textarea
          placeholder=" description"
          name="description"
          id="description"
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-300 rounded-lg w-full py-2 px-4 mt-2"
          >
            add task
          </button>
        </div>
      </form>
      <button
        className="bg-blue-300 rounded-lg w-full py-2 px-4 my-2"
        onClick={() => {
          router.push(`/tasks/${session?.user.id}`);
          setTitle("");
          setDescription("");
        }}
      >
        go back
      </button>
    </div>
  );
}

export default TaskForm;
