import { Tasks } from "@/interfaces/taskInterfaces";

export default async function addChecked(task: Tasks) {
  await fetch(
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api/tasks/checked/${task.id}`
      : `https://my-task-organizer.vercel.app/api/tasks/checked/${task.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    }
  );
}
