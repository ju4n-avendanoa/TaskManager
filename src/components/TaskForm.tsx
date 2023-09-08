"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  title: string;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: number | null;
}

function TaskForm({ title, description, setDescription, setTitle, id }: Props) {
  const router = useRouter();

  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(event.target.value);
    };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (id) {
        await fetch(`https://todolist-drab-ten.vercel.app/api/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      } else {
        await fetch("https://todolist-drab-ten.vercel.app/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
      }
    } catch (error) {
      console.log(error);
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
          onChange={handleChange(setTitle)}
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
          onChange={handleChange(setDescription)}
          required
        ></textarea>
        <div className="flex justify-center">
          <button type="submit" className="btn">
            add task
          </button>
        </div>
      </form>
      <button
        className="btn "
        onClick={() => {
          router.push("/");
        }}
      >
        go back
      </button>
    </div>
  );
}

export default TaskForm;
