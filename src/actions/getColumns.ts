"use server";

import { getServerSession } from "next-auth";
import { baseUrl } from "@/utils/baseUrl";
import { config } from "@/app/api/auth/[...nextauth]/route";
import { Column } from "@/interfaces/column";

export async function getColumns() {
  try {
    const session = await getServerSession(config);

    const response = await fetch(
      `${baseUrl}/api/users/${session?.user.id}/columns`
    );
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }

    const columns: Column[] = await response.json();

    return columns;
  } catch (error: any) {
    console.log(error);
  }
}
