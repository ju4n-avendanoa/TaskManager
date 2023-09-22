import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "@/app/interfaces/taskInterfaces";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const data: User = await request.json();
  const user = await prisma.users.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) return;
  const passOk = await bcrypt.compare(data.password, user.password);
  if (!passOk) return;
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 1000000,
    }
  );
  const response = NextResponse.json({
    token,
  });

  response.cookies.set({
    name: "Token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return response;
}
