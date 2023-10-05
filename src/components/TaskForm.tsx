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
  const router = useRouter();
  const { setDescription, setTitle } = useTaskStore();
  const { data: session } = useSession();
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
      if (taskId) {
        await fetch(`http://localhost:3000/api/tasks/${userId}/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      } else {
        await fetch(`http://localhost:3000/api/tasks/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      }
    } catch (error) {
      console.log("error");
    }
    router.push("/");
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
