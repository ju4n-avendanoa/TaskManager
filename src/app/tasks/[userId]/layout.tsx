import FilterMenu from "@/components/FilterMenu";
import React from "react";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen">
      <FilterMenu className="sticky top-0 flex flex-col items-start justify-start w-1/6 h-screen md:flex-row md:p-2 lg:p-6 bg-slate-500 max-sm:hidden" />
      <section className="w-5/6">{children}</section>
    </main>
  );
}

export default UserLayout;
