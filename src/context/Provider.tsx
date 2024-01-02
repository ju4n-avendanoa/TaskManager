"use client";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
  session: any;
}

function Provider({ children, session }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
