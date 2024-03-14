"use client";

import { LoginSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProviderLogs from "./ProviderLogs";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const [error, setError] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError(true);
      } else {
        setError(false);
        router.push("/");
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-5/6 gap-6 p-8 mx-auto mt-20 md:w-2/3 lg:w-1/3 rounded-2xl bg-zinc-900">
        <h2 className="text-2xl font-bold text-center text-white lg:text-4xl">
          Welcome back
        </h2>
        <form
          className="flex flex-col w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <label htmlFor="email" className="text-white">
              <input
                type="email"
                id="email"
                required
                className={`${
                  errors.email
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-zinc-600"
                } w-full p-4 border border-gray-300 rounded-md peer bg-transparent`}
                {...register("email")}
              />
              <span
                className={`${
                  errors.email
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-white"
                } label-style`}
              >
                Email address
              </span>
            </label>
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          )}
          <div className="relative">
            <label htmlFor="password" className="text-white">
              <input
                type="password"
                id="'password"
                required
                className={`${
                  errors.password
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-zinc-600"
                } w-full p-4 border border-gray-300 rounded-md peer bg-transparent`}
                {...register("password")}
              />
              <span
                className={`${
                  errors.password
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-white"
                } label-style`}
              >
                Password
              </span>
            </label>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password?.message}</p>
          )}
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 my-2 font-semibold text-white transition duration-150 rounded-lg bg-zinc-500 hover:bg-zinc-600 active:scale-95"
            >
              Log in
            </button>
            <p className="text-white">
              Don&apos;t you have an acocunt yet?{" "}
              <Link
                href={"/register"}
                className="font-semibold text-sky-300 hover:text-sky-500"
              >
                sign up here
              </Link>
            </p>
          </div>
        </form>
        <ProviderLogs />
        {error && (
          <div className="p-4 bg-red-500 rounded-2xl">
            <p className="text-white">User credentials are invalid</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default LoginForm;
