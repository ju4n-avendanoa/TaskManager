import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function UserMenu() {
  const { data: session } = useSession();
  return (
    <div className="absolute right-0 w-64 py-2 bg-zinc-200 border shadow-lg rounded-xl top-14">
      {session ? (
        <ul className="flex flex-col">
          <Link href={`/tasks/${session?.user.id}`}>
            <li className="px-6 py-2 hover:bg-zinc-300">My Tasks</li>
          </Link>
          <li
            className="px-6 py-2 cursor-pointer hover:bg-zinc-300"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col">
          <Link href={"/register"}>
            <li className="px-6 py-2 hover:bg-zinc-300">Sign up</li>
          </Link>
          <Link href={"/login"}>
            <li className="px-6 py-2 hover:bg-zinc-300">Log in</li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
