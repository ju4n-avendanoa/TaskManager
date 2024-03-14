"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "@/utils/baseUrl";
import { getServerSession } from "next-auth";

export async function editTask(task: Tasks) {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
  } catch (error: any) {
    console.log(error);
  }
}
