"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/validations/userSchema";
import { useRouter } from "next/navigation";
import { useErrorStore } from "@/store/errorStore";
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const { error, errorMessage, setError, setErrorMessage } = useErrorStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/users/register"
        : "https://my-task-organizer.vercel.app/api/users/register",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await res.json();
    if (!res.ok) {
      setError(true);
      if (res.status === 409) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage("There was an error, please try again later");
      }
    }
    router.push("/login");
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 grow">
      <h2 className="text-4xl font-bold text-white">Sign Up</h2>
      <form
        className="flex flex-col w-2/3 gap-2 p-6 rounded-2xl bg-slate-900 lg:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="your name"
          className="h-10 text-white bg-transparent border border-white"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name?.message}</p>
        )}
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
          id="password"
          placeholder="********"
          className="h-10 text-white bg-transparent border border-white"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password?.message}</p>
        )}
        <label htmlFor="confirm-password" className="text-white">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="********"
          className="h-10 text-white bg-transparent border border-white"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">
            {errors.confirmPassword?.message}
          </p>
        )}
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 my-2 bg-blue-300 rounded-lg"
          >
            Sign up
          </button>
          <p className="text-white">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-300">
              log in here
            </Link>
          </p>
        </div>
      </form>
      {error && (
        <div className="p-4 bg-red-500 rounded-lg">
          <p className="text-white">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
