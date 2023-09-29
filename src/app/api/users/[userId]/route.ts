import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(user);
}
