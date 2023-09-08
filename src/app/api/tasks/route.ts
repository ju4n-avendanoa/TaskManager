import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Task {
  title: string;
  description: string;
}

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const data: Task = await request.json();
  const newTask = await prisma.task.create({ data });
  return NextResponse.json(newTask);
}
