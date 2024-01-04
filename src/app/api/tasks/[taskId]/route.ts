import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Tasks } from "@/interfaces/taskInterfaces";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const task = await prisma.task.findUnique({
    where: {
      id: params.taskId,
    },
  });
  return NextResponse.json(task);
}

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const data: Tasks = await request.json();
  const editedTask = await prisma.task.update({
    where: {
      id: params.taskId,
    },
    data: data,
  });
  return NextResponse.json(editedTask);
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const task = await prisma.task.delete({
    where: {
      id: params.taskId,
    },
  });
  return NextResponse.json(task);
}
