import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { User } from "@/app/interfaces/userInterfaces";
import hashPassword from "@/utils/passwordHash";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: User = await request.json();
  try {
    const passHashed = await hashPassword(data.password);
    await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: passHashed,
      },
    });
    return NextResponse.json("");
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
