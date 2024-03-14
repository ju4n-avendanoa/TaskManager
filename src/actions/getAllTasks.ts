"use server";

import { getServerSession } from "next-auth";
import { baseUrl } from "../utils/baseUrl";
import { config } from "@/app/api/auth/[...nextauth]/route";

export default async function getAllTasks() {
  try {
    const session = await getServerSession(config);

    const res = await fetch(`${baseUrl}/api/user-tasks/${session?.user.id}`);

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
