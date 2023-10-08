"use client";

import { useUsersStore } from "@/store/userStore";
import { useErrorStore } from "@/store/errorStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

function Register() {
  const { email, password, name, setEmail, setPassword, setName } =
    useUsersStore();
  const { error, errorMessage, setError, setErrorMessage } = useErrorStore();

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const response = await res.json();
    if (res.status === 409) {
      setError(true);
      setErrorMessage(response.error);
      router.refresh();
    } else {
      setError(false);
      router.push("/");
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setError(false);
  }, [setError]);

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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
      {error && (
        <div className="bg-red-500 rounded-2xl p-4">
          <p className="text-white">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Register;
