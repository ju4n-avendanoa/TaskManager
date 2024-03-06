import { baseUrl } from "@/utils/baseUrl";

export async function deleteColumn(columnId: string, userId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/${userId}/columns/${columnId}`,
      {
        method: "DELETE",
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
