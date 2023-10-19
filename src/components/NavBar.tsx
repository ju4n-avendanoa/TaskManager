"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  CalendarDaysIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSessionMenuOpen(!isSessionMenuOpen);
  };

  const handleLogOut = async () => {
    signOut({ callbackUrl: "/" });
    setIsSessionMenuOpen(false);
  };

  const renderAuthenticatedLinks = () => {
    return (
      <ul className="flex flex-col lg:flex-row lg:gap-5 text-white gap-6">
        <Link
          href={`/tasks/${session?.user.id}`}
          onClick={() => setIsSessionMenuOpen(false)}
        >
          <li className="border text-xs lg:text-base max-lg:bg-slate-900 border-white py-2 px-4 hover:bg-blue-800 text-center btn">
            My tasks
          </li>
        </Link>
        <Link href="/newtask" onClick={() => setIsSessionMenuOpen(false)}>
          <li className="border text-xs lg:text-base max-lg:bg-slate-900 border-white py-2 px-4 hover:bg-blue-800 btn text-center">
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
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <span className="text-white text-xs lg:text-base">
            {session.user.email}
          </span>
          <button
            className="border max-lg:bg-slate-900 text-xs lg:text-base border-blue-300 text-blue-300 py-2 px-4 hover:bg-blue-800 hover:text-white"
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
        <Link href={"/"} onClick={() => setIsSessionMenuOpen(false)}>
          <CalendarDaysIcon className="w-6 lg:w-10 h-auto" color="white" />
        </Link>
        <h1 className="text-white text-base lg:text-xl font-bold">
          <Link href={"/"} onClick={() => setIsSessionMenuOpen(false)}>
            My Task Manager
          </Link>
        </h1>
      </section>
      <div className="relative">
        <Bars3BottomRightIcon
          color="white"
          className="w-6 h-auto lg:hidden"
          onClick={toggleMenu}
        />
        {isSessionMenuOpen && (
          <div className="fixed top-0 right-0 bottom-0 sm:w-2/5 bg-opacity-80 md:w-1/5 h-full bg-slate-600 z-10">
            <div className="w-full h-full p-4">
              <section className="flex flex-col items-center justify-center gap-6">
                {session ? renderAuthenticatedLinks() : null}
                {renderAuthenticationButtons()}
                <XCircleIcon
                  className="w-8 h-auto"
                  onClick={toggleMenu}
                  fill="slate"
                  color="white"
                />
              </section>
            </div>
          </div>
        )}
      </div>
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
