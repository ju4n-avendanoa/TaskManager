import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: params.userId,
      },
      include: { columns: true },
    });

    const sortedColumns = user?.columns?.sort((a, b) => a.index - b.index);

    return NextResponse.json(sortedColumns || []);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const columnsLength: number = await request.json();

  try {
    const newColumn = await prisma.columns.create({
      data: {
        userId: params.userId,
        index: columnsLength,
      },
    });

    return NextResponse.json(newColumn);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

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
