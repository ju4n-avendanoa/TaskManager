import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Task {
  title: string;
  description: string;
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const tasks = await prisma.task.findMany({
    where: {
      userId: params.userId,
    },
  });
  return NextResponse.json(tasks);
}

// export async function PATCH(
//   request: Request,
//   { params }: { params: { userId: string } }
// ) {
//   const data: Task = await request.json();
//   const editedTask = await prisma.task.update({
//     where: {
//       userId: params.userId,
//     },
//     data: data,
//   });
//   return NextResponse.json(editedTask);
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { userId: string } }
// ) {
//   const task = await prisma.task.delete({
//     where: {
//       userId: params.userId,
//     },
//   });
//   return NextResponse.json(task);
// }
