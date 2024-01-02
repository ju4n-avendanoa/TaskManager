import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import hashPassword from "@/utils/passwordHash";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const emailExists = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExists)
      return NextResponse.json(
        { error: `User with the email ${data.email} already exists` },
        { status: 409 }
      );

    const passHashed = await hashPassword(data.password);
    await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: passHashed,
      },
    });
    return NextResponse.json("user created successfully");
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
