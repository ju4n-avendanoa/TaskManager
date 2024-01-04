"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  CalendarDaysIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";

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
      <ul className="flex flex-col gap-6 text-white lg:flex-row lg:gap-5">
        <Link
          href={`/tasks/${session?.user.id}`}
          onClick={() => setIsSessionMenuOpen(false)}
        >
          <li className="px-4 py-2 text-xs text-center border border-white lg:text-base max-lg:bg-slate-900 hover:bg-blue-800 btn">
            My tasks
          </li>
        </Link>
        <Link href="/newtask" onClick={() => setIsSessionMenuOpen(false)}>
          <li className="px-4 py-2 text-xs text-center border border-white lg:text-base max-lg:bg-slate-900 hover:bg-blue-800 btn">
            Create new task
          </li>
        </Link>
      </ul>
    );
  };

  const renderAuthenticationButtons = () => {
    if (typeof session === "undefined") {
      return <div className="text-white ">Loading session...</div>;
    } else if (session) {
      return (
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <span className="text-xs text-white lg:text-base">
            {session.user.email}
          </span>
          <button
            className="px-4 py-2 text-xs text-blue-300 border border-blue-300 max-lg:bg-slate-900 lg:text-base hover:bg-blue-800 hover:text-white"
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
            className="px-4 py-2 text-blue-300 border border-blue-300 hover:bg-blue-800 hover:text-white"
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign up
          </button>
          <button
            className="px-4 py-2 text-blue-300 border border-blue-300 hover:bg-blue-800 hover:text-white"
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
    <nav className="flex justify-between lg:grid lg:grid-cols-3 place-items-center">
      <section className="flex items-center gap-2">
        <Link href={"/"} onClick={() => setIsSessionMenuOpen(false)}>
          <CalendarDaysIcon className="w-6 h-auto lg:w-10" color="white" />
        </Link>
        <h1 className="text-base font-bold text-white lg:text-xl">
          <Link href={"/"} onClick={() => setIsSessionMenuOpen(false)}>
            My Task Manager
          </Link>
        </h1>
      </section>
      <div className="relative lg:hidden">
        <Bars3BottomRightIcon
          color="white"
          className="w-6 h-auto lg:hidden"
          onClick={toggleMenu}
        />
        {isSessionMenuOpen && (
          <div className="fixed top-0 bottom-0 right-0 z-10 h-full sm:w-2/5 bg-opacity-80 md:w-1/5 bg-slate-600">
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
