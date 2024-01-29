import { Tasks } from "@/interfaces/taskInterfaces";
import { baseUrl } from "./baseUrl";

export default async function addFavorite(task: Tasks) {
  await fetch(`${baseUrl}/api/tasks/favorite/${task.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: true,
    }),
  });
}
