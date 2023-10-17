import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { done } = await request.json();
  const task = await prisma.task.update({
    where: {
      id: params.taskId,
    },
    data: {
      done,
    },
  });
  return NextResponse.json(task);
}
