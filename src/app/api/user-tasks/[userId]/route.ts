import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Tasks } from "@/interfaces/taskInterfaces";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: params.userId,
    },
  });
  console.log(tasks);
  return NextResponse.json(tasks);
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const data: Tasks = await request.json();
  const newTask = await prisma.task.create({
    data: {
      userId: params.userId,
      title: data.title,
      description: data.description,
      columnId: "asds",
    },
  });
  return NextResponse.json(newTask);
}
