"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleLogOut = async () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image
            src="https://res.cloudinary.com/dhjqarghy/image/upload/v1695326224/6804639_bcqc0u.webp"
            alt="logo"
            width={60}
            height={60}
          />
        </Link>
        <h1 className="text-white text-xl font-bold">
          <Link href={"/"}>My Task Manager</Link>
        </h1>
      </div>
      {session && (
        <ul className="flex gap-5 text-white">
          <Link href={`/tasks/${session!.user?.id}`}>
            <li className="border border-white py-2 px-4 hover:bg-blue-800">
              My tasks
            </li>
          </Link>
          <Link href="/newtask">
            <li className="border border-white py-2 px-4 hover:bg-blue-800">
              Create new task
            </li>
          </Link>
        </ul>
      )}
      <div>
        {session ? (
          <button
            className="border border-blue-300 text-blue-300 py-2 px-4 hover:bg-blue-800 hover:text-white"
            onClick={() => {
              handleLogOut();
            }}
          >
            Log out
          </button>
        ) : (
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
        )}
      </div>
    </nav>
  );
}

export default NavBar;
