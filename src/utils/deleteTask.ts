import { baseUrl } from "./baseUrl";

export default async function deleteTask(taskId: string) {
  await fetch(`${baseUrl}:3000/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
