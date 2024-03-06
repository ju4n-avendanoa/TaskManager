import { Column } from "@/interfaces/column";
import { baseUrl } from "@/utils/baseUrl";

export async function getColumns(userId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/columns`);
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
