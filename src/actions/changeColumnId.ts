import { baseUrl } from "@/utils/baseUrl";

export async function changeColumnId(
  taskId: string,
  newColumnId: string,
  userId: string
) {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/${userId}/newColumnId/${taskId}`,
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
