import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "./baseUrl";

export default async function addChecked(task: Tasks) {
  await fetch(`${baseUrl}/api/tasks/checked/${task.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: true }),
  });
}
