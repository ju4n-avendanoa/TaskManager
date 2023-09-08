"use client";

import TaskForm from "@/components/TaskForm";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../layout";
import { AxiosResponse } from "axios";
import { Tasks } from "@/components/TasksList";

function CreateTask({ params }: { params: { id: number } }) {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!params.id) return;
    axiosInstance
      .get("/" + params.id)
      .then((response: AxiosResponse<Tasks>) => {
        setDescription(response.data.description);
        setTitle(response.data.title);
      });
  }, [params.id]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <TaskForm
        description={description}
        setDescription={setDescription}
        title={title}
        setTitle={setTitle}
        id={params.id}
      />
    </div>
  );
}

export default CreateTask;
