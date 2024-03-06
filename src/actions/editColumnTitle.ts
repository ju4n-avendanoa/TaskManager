import { baseUrl } from "@/utils/baseUrl";

export async function editColumnTitle(
  columnId: string,
  title: string,
  userId: string
) {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/${userId}/columns/${columnId}`,
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
