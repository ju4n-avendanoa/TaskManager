import { NewTaskType } from "@/components/ColumnContainer";
import { baseUrl } from "@/utils/baseUrl";

export async function createNewTask(newTask: NewTaskType, userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

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
