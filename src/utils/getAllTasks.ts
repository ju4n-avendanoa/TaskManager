export default async function getAllTasks(userId: string) {
  try {
    if (userId) {
      const res = await fetch(
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/user-tasks/${userId}`
          : `https://my-task-organizer.vercel.app/api/user-tasks/${userId}`
      );
      if (!res.ok) {
        throw new Error("Error en la solicitud al servidor");
      }
      const tasks = await res.json();
      return tasks;
    }
  } catch (error: any) {
    console.error(error);
    return [];
  }
}
