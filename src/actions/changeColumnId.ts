"use server";

import { baseUrl } from "@/utils/baseUrl";
import { config } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function changeColumnId(taskId: string, newColumnId: string) {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/newColumnId/${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColumnId),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
  } catch (error: any) {
    console.log(error);
  }
}
