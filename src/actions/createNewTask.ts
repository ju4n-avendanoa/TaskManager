"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { NewTaskType } from "@/components/Board/ColumnContainer";
import { baseUrl } from "@/utils/baseUrl";
import { getServerSession } from "next-auth";

export async function createNewTask(newTask: NewTaskType) {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }

    const task = await response.json();
    return task;
  } catch (error: any) {
    console.log(error);
  }
}
