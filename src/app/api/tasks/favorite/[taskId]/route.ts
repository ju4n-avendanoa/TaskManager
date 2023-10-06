import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { favorite } = await request.json();
  const task = await prisma.task.update({
    where: {
      id: params.taskId,
    },
    data: {
      favorite,
    },
  });
  return NextResponse.json(task.id);
}
