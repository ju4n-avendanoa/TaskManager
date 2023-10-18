"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  CalendarDaysIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogOut = async () => {
    signOut({ callbackUrl: "/" });
  };

  const renderAuthenticatedLinks = () => {
    return (
      <ul className="flex gap-5 text-white">
        <Link href={`/tasks/${session?.user.id}`}>
          <li className="border border-white py-2 px-4 hover:bg-blue-800 btn">
            My tasks
          </li>
        </Link>
        <Link href="/newtask">
          <li className="border border-white py-2 px-4 hover:bg-blue-800 btn">
            Create new task
          </li>
        </Link>
      </ul>
    );
  };

  const renderAuthenticationButtons = () => {
    if (typeof session === "undefined") {
      return (
        <div
          className="text-white
      "
        >
          Loading session...
        </div>
      );
    } else if (session) {
      return (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="text-white">{session.user.email}</span>
          <button
            className="border border-blue-300 text-blue-300 py-2 px-4 hover:bg-blue-800 hover:text-white"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-5">
          <button
            className="border border-blue-300 text-blue-300 py-2 px-4 hover:bg-blue-800 hover:text-white"
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign up
          </button>
          <button
            className="border border-blue-300 text-blue-300 py-2 px-4 hover:bg-blue-800 hover:text-white"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </button>
        </div>
      );
    }
  };

  return (
    <nav className="flex items-center px-4 justify-between gap-6">
      <section className="flex items-center gap-2">
        <Link href={"/"}>
          <CalendarDaysIcon className="w-6 lg:w-10 h-auto" color="white" />
        </Link>
        <h1 className="text-white text-base lg:text-xl font-bold">
          <Link href={"/"}>My Task Manager</Link>
        </h1>
      </section>
      <Bars3BottomRightIcon color="white" className="w-6 h-auto lg:hidden" />
      <section className="hidden lg:block">
        {session ? renderAuthenticatedLinks() : null}
      </section>
      <section className="hidden lg:block">
        {renderAuthenticationButtons()}
      </section>
    </nav>
  );
}

export default NavBar;
