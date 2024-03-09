import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { columnId: string } }
) {
  try {
    const title = await request.json();

    const na = await prisma.columns.update({
      where: {
        id: params.columnId,
      },
      data: {
        title,
      },
    });

    return NextResponse.json("Column updated successfully");
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { columnId: string } }
) {
  try {
    await prisma.task.deleteMany({
      where: {
        columnId: params.columnId,
      },
    });

    const columnDeleted = await prisma.columns.delete({
      where: {
        id: params.columnId,
      },
    });

    const indexDeleted = columnDeleted.index;

    await prisma.$executeRaw`UPDATE "Columns" SET "index" = "index" - 1 WHERE "index" > ${indexDeleted}`;

    return NextResponse.json(columnDeleted);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
