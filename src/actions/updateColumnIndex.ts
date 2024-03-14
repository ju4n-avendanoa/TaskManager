"use server";

import { getServerSession } from "next-auth";
import { UniqueIdentifier } from "@dnd-kit/core";
import { baseUrl } from "@/utils/baseUrl";
import { config } from "@/app/api/auth/[...nextauth]/route";

export async function updateColumnIndex(
  activeColumnId: UniqueIdentifier,
  overColumnId: UniqueIdentifier
) {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/columns`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeColumnId, overColumnId }),
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
