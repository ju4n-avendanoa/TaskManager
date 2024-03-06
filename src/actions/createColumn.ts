import { baseUrl } from "@/utils/baseUrl";

export async function createColumn(userId: string, columnsLength: number) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/columns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(columnsLength),
    });

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
