import { baseUrl } from "@/utils/baseUrl";
import { UniqueIdentifier } from "@dnd-kit/core";

export async function updateColumnIndex(
  activeColumnId: UniqueIdentifier,
  overColumnId: UniqueIdentifier,
  userId: string
) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/columns`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeColumnId, overColumnId }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse);
    }
  } catch (error: any) {
    console.log(error);
  }
}
