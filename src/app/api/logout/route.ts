import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("Token");

  if (!token) {
    return NextResponse.json(
      {
        message: "Not logged in",
      },
      {
        status: 401,
      }
    );
  }

  try {
    cookieStore.delete("Token");

    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
