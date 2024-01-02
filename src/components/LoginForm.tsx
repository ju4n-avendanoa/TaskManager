"use client";

import { useTaskStore } from "@/store/taskStore";
import { LoginSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { setFavorites, setChecked } = useTaskStore();

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
        const favoriteResponse = await fetch(
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/tasks/favorite"
            : "https://my-task-organizer.vercel.app/api/tasks/favorite"
        );
        const checkedResponse = await fetch(
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/api/tasks/favorite"
            : "https://my-task-organizer.vercel.app/api/tasks/checked"
        );
        const favoriteData = await favoriteResponse.json();
        const checkedData = await checkedResponse.json();
        setFavorites(favoriteData);
        setChecked(checkedData);
        localStorage.setItem("favorites", JSON.stringify(favoriteData));
        localStorage.setItem("checked", JSON.stringify(checkedData));
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 grow">
      <h2 className="text-4xl font-bold text-white">Log In</h2>
      <form
        className="flex flex-col w-2/3 gap-2 p-6 rounded-2xl bg-slate-900 lg:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="your@email.com"
          className="h-10 text-white bg-transparent border border-white"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email?.message}</p>
        )}
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          id="'password"
          placeholder="********"
          className="h-10 text-white bg-transparent border border-white"
          {...register("password")}
        />
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 my-2 bg-blue-300 rounded-lg"
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
        <div className="p-4 bg-red-500 rounded-2xl">
          <p className="text-white">User credentials are invalid</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
