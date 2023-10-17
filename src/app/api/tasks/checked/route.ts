import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const tasks = await prisma.task.findMany({
    where: {
      userId: session?.user.id,
      done: true,
    },
  });

  let checked = [];
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      checked.push(tasks[i]);
    }
  }
  return NextResponse.json(checked);
}
