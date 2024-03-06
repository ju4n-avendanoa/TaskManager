import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  try {
    const { activeColumnId, overColumnId } = await request.json();

    const [activeColumn, overColumn] = await Promise.all([
      prisma.columns.findUnique({ where: { id: activeColumnId } }),
      prisma.columns.findUnique({ where: { id: overColumnId } }),
    ]);

    if (!activeColumn || !overColumn) {
      throw new Error("Columns not found");
    }

    await prisma.columns.update({
      where: { id: activeColumnId },
      data: { index: overColumn.index },
    });

    await prisma.columns.update({
      where: { id: overColumnId },
      data: { index: activeColumn.index },
    });

    return NextResponse.json("Indexes updated");
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
