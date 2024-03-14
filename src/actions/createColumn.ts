"use server";

import { config } from "@/app/api/auth/[...nextauth]/route";
import { baseUrl } from "@/utils/baseUrl";
import { getServerSession } from "next-auth";

export async function createColumn(columnsLength: number) {
  try {
    const session = await getServerSession(config);
    console.log(session);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/columns`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(columnsLength),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }

    const newColumn = await response.json();

    return newColumn;
  } catch (error: any) {
    console.log(error);
  }
}
