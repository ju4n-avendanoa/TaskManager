"use server";

import { baseUrl } from "../utils/baseUrl";

export default async function deleteTask(taskId: string) {
  await fetch(`${baseUrl}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
