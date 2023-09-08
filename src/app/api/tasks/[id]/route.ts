import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Task {
  title: string;
  description: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const task = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(task);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  const data: Task = await request.json();
  const editedTask = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(editedTask);
}
