import FilterMenu from "@/components/FilterMenu";
import React from "react";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex flex-col w-full min-h-screen lg:flex-row">
      <FilterMenu />
      <section className="w-full lg:w-4/5 xl:w-5/6">{children}</section>
    </main>
  );
}

export default UserLayout;
