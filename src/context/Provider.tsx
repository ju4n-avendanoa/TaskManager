"use client";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: React.ReactNode;
  session: any; // Aquí debes proporcionar el tipo adecuado para tu sesión
}

function Provider({ children, session }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
