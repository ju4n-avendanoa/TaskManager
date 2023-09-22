import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { User } from "@/app/interfaces/taskInterfaces";
import hashPassword from "@/utils/passwordHash";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data: User = await request.json();
  console.log(data);
  try {
    const passHashed = await hashPassword(data.password);
    await prisma.users.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: passHashed,
      },
    });
    return NextResponse.json("");
  } catch {
    return NextResponse.error();
  }
}
