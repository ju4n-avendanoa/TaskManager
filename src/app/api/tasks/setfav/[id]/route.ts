// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function PATCH(
//   request: Request,
//   { params }: { params: { id: number } }
// ) {
//   const data = await request.json();
//   const editedTask = await prisma.task.update({
//     where: {
//       id: Number(params.id),
//     },
//     data: data,
//   });
//   return NextResponse.json(editedTask);
// }
