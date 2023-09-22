"use client";

import { useUsersStore } from "@/store/taskStore";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

function Register() {
  const { id, email, password, name } = useUsersStore();
  const { setId, setName, setEmail, setPassword } = useUsersStore();

  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setId(uuidv4());
    await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, email, password }),
    });
    router.push("/");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex grow flex-col gap-6 items-center justify-center">
      <h2 className="text-white font-bold text-4xl">Sign Up</h2>
      <form
        className="flex flex-col rounded-2xl gap-2 p-6 bg-slate-900 w-1/3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="h-10 bg-transparent border border-white text-white"
          onChange={handleNameChange}
          value={name}
          required
        />
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="h-10 bg-transparent border border-white text-white"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <label htmlFor="password" className="text-white">
          Passowrd
        </label>
        <input
          type="password"
          id="'password"
          className="h-10 bg-transparent border border-white text-white"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-blue-300 rounded-lg w-full py-2 px-4 my-2"
          >
            Sign up
          </button>
          <p className="text-white">
            Already have an acocunt?{" "}
            <Link href={"/login"} className="text-blue-300">
              log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
