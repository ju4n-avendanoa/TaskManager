import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import validateToken from "./utils/validateToken";

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get("Token");

  // if (token?.value) {
  //   const { payload } = await validateToken(token.value);
  // } else {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:id*"],
};
