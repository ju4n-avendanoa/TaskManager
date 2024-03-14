import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NewTaskType } from "@/components/Board/ColumnContainer";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: params.userId,
      },
      include: { task: true },
    });

    return NextResponse.json(user?.task);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("");
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const data: NewTaskType = await request.json();
    const newTask = await prisma.task.create({
      data: {
        userId: params.userId,
        title: data.title,
        description: data.description,
        columnId: data.columnId,
      },
    });
    return NextResponse.json(newTask);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("");
  }
}
