"use client";

import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import UserMenu from "./UserMenu";
import Link from "next/link";

function NavBar() {
  const { data: session } = useSession();
  const [details, setDetails] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 select-none lg:py-4 lg:px-20 h-min">
      <section className="flex items-center gap-4">
        <Link href={"/"}>
          <ImageWithFallback
            src="https://res.cloudinary.com/dhjqarghy/image/upload/v1712290234/TaskManager/1486504829-clipboard-tasks-report-business-checking-verification-list_81387_yrqufu.png"
            alt="logo"
            width={50}
            height={50}
            fallbackSrc=""
            className="w-10 h-10 p-1 bg-sky-500 rounded-xl"
          />
        </Link>
        <h1 className="text-base font-bold text-white lg:text-xl">
          <Link href={"/"}>My Task Manager</Link>
        </h1>
      </section>
      <div
        className="relative flex items-center h-10 px-3 lg:px-6 rounded-full bg-zinc-400"
        onClick={() => setDetails(!details)}
      >
        <div className="flex items-center h-full sm:gap-3 cursor-pointer">
          <Bars3Icon className="w-6 h-6 hidden sm:block" />
          {session?.user.image ? (
            <ImageWithFallback
              src={session.user.image}
              alt="profile-photo"
              width={300}
              height={300}
              className="w-6 h-auto rounded-full"
              fallbackSrc="https://res.cloudinary.com/dhjqarghy/image/upload/v1708459216/Airbnb/user-circle-svgrepo-com_o8x5oh.svg"
            />
          ) : (
            <UserCircleIcon className="w-6 h-6 text-sky-700" />
          )}
        </div>
        {details ? <UserMenu /> : null}
      </div>
    </nav>
  );
}

export default NavBar;
