"use client";

import { useTaskStore } from "@/store/taskStore";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import TaskForm from "@/components/TaskForm";

function CreateTask({ params }: { params: { taskId: string } }) {
  const { title, description, setDescription, setTitle } = useTaskStore();

  const { data: session } = useSession();

  useEffect(() => {
    if (!params.taskId) return;
    fetch(`http://localhost:3000/api/tasks/${params.taskId}`)
      .then((response) => response.json())
      .then((response) => {
        setDescription(response.description);
        setTitle(response.title);
      });
  }, [setDescription, setTitle, params.taskId]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TaskForm
        description={description}
        title={title}
        taskId={params.taskId}
        userId={session?.user.id}
      />
    </div>
  );
}

export default CreateTask;
