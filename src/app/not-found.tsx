import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 p-8 pt-28 text-center">
      <h2 className="text-3xl font-bold text-sky-400">Page not found</h2>
      <p className="text-white">
        Please try again or come back to the main page{" "}
        <Link
          href={"/"}
          className="font-bold underline underline-offset-2 text-sky-400"
        >
          here
        </Link>
      </p>
    </section>
  );
}

export default NotFound;
