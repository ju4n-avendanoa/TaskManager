"use client";

import TaskForm from "@/components/TaskForm";
import { useTaskStore } from "@/store/taskStore";
import React, { useEffect } from "react";

function CreateTask({ params }: { params: { id: number } }) {
  const { title, description, setDescription, setTitle } = useTaskStore();

  useEffect(() => {
    if (!params.id) return;
    fetch(`https://my-task-organizer.vercel.app/api/tasks/${params.id}`)
      .then((response) => response.json())
      .then((response) => {
        setDescription(response.description);
        setTitle(response.title);
      });
  }, [params.id, setDescription, setTitle]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TaskForm description={description} title={title} id={params.id} />
    </div>
  );
}

export default CreateTask;
