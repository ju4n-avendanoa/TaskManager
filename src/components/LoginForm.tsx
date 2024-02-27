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
    <section className="min-h-screen w-full">
      <div className="flex flex-col pt-28 items-center justify-center gap-6 h-full">
        <h2 className="text-4xl font-bold text-white">Log In</h2>
        <form
          className="flex flex-col w-5/6 md:w-2/3 gap-6 p-6 rounded-2xl bg-zinc-900 lg:w-1/3"
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
          <div className="flex flex-col gap-2 items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 my-2 bg-zinc-500 text-white font-semibold rounded-lg hover:bg-zinc-600 transition active:scale-95 duration-150"
            >
              Log in
            </button>
            <p className="text-white">
              Don&apos;t you have an acocunt yet?{" "}
              <Link
                href={"/register"}
                className="text-sky-300 font-semibold hover:text-sky-500"
              >
                sign up here
              </Link>
            </p>
          </div>
          <ProviderLogs />
        </form>
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
