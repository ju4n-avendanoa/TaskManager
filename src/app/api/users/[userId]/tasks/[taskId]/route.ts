import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Tasks } from "@/interfaces/taskInterfaces";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const data: Tasks = await request.json();
    const newTask = await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });
    return NextResponse.json(newTask);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("");
  }
}
