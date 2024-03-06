import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "@/utils/baseUrl";

export async function editTask(task: Tasks, userId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/${userId}/tasks/${task.id}`,
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
