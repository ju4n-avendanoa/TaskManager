import FilterMenu from "@/components/FilterMenu";
import React from "react";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex w-full min-h-screen lg:flex-row">
      <FilterMenu />
      <section className="w-full lg:flex-1">{children}</section>
    </main>
  );
}

export default UserLayout;
