"use client";

import {
  CalendarDaysIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ImageWithFallback from "./ImageWithFallback";
import UserMenu from "./UserMenu";
import Link from "next/link";

function NavBar() {
  const { data: session } = useSession();
  const [details, setDetails] = useState(false);

  return (
    <nav className="flex justify-between items-center py-3 lg:py-4 px-10 lg:px-20 select-none h-min">
      <section className="flex items-center gap-6">
        <Link href={"/"}>
          <ImageWithFallback
            src="https://res.cloudinary.com/dhjqarghy/image/upload/v1709070909/TaskManager/tasks-svgrepo-com_skdvqr.svg"
            alt="logo"
            width={50}
            height={50}
            fallbackSrc=""
            className="bg-sky-500 rounded-xl p-1 w-10 h-10"
          />
        </Link>
        <h1 className="text-base font-bold text-white lg:text-xl">
          <Link href={"/"}>My Task Manager</Link>
        </h1>
      </section>
      <div
        className="relative px-6 h-10 items-center flex bg-zinc-400 rounded-full"
        onClick={() => setDetails(!details)}
      >
        <div className="flex gap-3 h-full items-center cursor-pointer">
          <Bars3Icon className="w-6 h-6" />
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
