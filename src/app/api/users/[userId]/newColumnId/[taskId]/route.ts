import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const newColumnId = await request.json();

    await prisma.task.update({
      where: { id: params.taskId },
      data: {
        columnId: newColumnId,
      },
    });
    return NextResponse.json("");
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(error);
  }
}
