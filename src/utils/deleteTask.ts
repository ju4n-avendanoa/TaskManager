export default async function deleteTask(taskId: string) {
  await fetch(
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api/tasks/${taskId}`
      : `https://my-task-organizer.vercel.app/api/tasks/${taskId}`,

    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
