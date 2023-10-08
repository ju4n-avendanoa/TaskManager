"use client";

import { useUsersStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useErrorStore } from "@/store/errorStore";

function Login() {
  const { email, password, setEmail, setPassword } = useUsersStore();
  const { error, setError } = useErrorStore();
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError(true);
        router.refresh();
      } else {
        setError(false);
        router.push("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex grow flex-col gap-6 items-center justify-center">
      <h2 className="text-white font-bold text-4xl">Log In</h2>
      <form
        className="flex flex-col rounded-2xl gap-2 p-6 bg-slate-900 w-1/3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="h-10 bg-transparent border border-white text-white"
          onChange={handleInputChange}
          value={email}
        />
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          id="'password"
          className="h-10 bg-transparent border border-white text-white"
          onChange={handleInputChange}
          value={password}
        />
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-blue-300 rounded-lg w-full py-2 px-4 my-2"
          >
            Log in
          </button>
          <p className="text-white">
            Don&apos;t you have an acocunt yet?{" "}
            <Link href={"/register"} className="text-blue-300">
              sign up here
            </Link>
          </p>
        </div>
      </form>
      {error && (
        <div className="bg-red-500 rounded-2xl p-4">
          <p className="text-white">User credentials are invalid</p>
        </div>
      )}
    </div>
  );
}

export default Login;
