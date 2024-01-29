import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "./baseUrl";

export default async function deleteChecked(task: Tasks) {
  await fetch(`${baseUrl}/api/tasks/checked/${task.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ done: false }),
  });
}
