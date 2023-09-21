"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src="https://res.cloudinary.com/dhjqarghy/image/upload/v1695326224/6804639_bcqc0u.webp"
          alt="logo"
          width={60}
          height={60}
        />
        <h1 className="text-white text-xl font-bold">My Task Manager</h1>
      </div>
      <ul className="flex gap-5 text-white">
        <li className="border border-white py-2 px-4">
          <Link href="/tasks">My tasks</Link>
        </li>
        <li className="border border-white py-2 px-4">
          <Link href="/newtask">Create new task</Link>
        </li>
      </ul>
      <div className="flex gap-2">
        {/* <Image src={} alt='profile' width={} height={}/> */}
        <button
          className="btn"
          onClick={() => {
            router.push("/register");
          }}
        >
          Sign in
        </button>
        <button
          className="btn"
          onClick={() => {
            router.push("/login");
          }}
        >
          Log in
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
