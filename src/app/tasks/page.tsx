import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <div>{session?.user?.name}</div>;
}

export default page;
