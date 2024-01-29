import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "./baseUrl";

export default async function deleteFavorite(task: Tasks) {
  await fetch(`${baseUrl}/api/tasks/favorite/${task.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: false,
    }),
  });
}
