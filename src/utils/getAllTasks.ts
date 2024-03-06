import { baseUrl } from "./baseUrl";

export default async function getAllTasks(userId: string) {
  try {
    const res = await fetch(`${baseUrl}/api/user-tasks/${userId}`);
    if (!res.ok) {
      throw new Error("Error en la solicitud al servidor");
    }
    const tasks = await res.json();
    return tasks;
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
