"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { baseUrl } from "@/utils/baseUrl";
import { getServerSession } from "next-auth";

export async function editColumnTitle(columnId: string, title: string) {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/columns/${columnId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(title),
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
