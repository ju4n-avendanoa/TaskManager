"use client";

import { useUsersStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useErrorStore } from "@/store/errorStore";

function Login() {
  const { email, password } = useUsersStore();
  const { setEmail, setPassword } = useUsersStore();
  const { error, errorMessage } = useErrorStore();
  const { setErrorMessage, setError } = useErrorStore();

  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
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
          onChange={handleEmailChange}
          value={email}
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
