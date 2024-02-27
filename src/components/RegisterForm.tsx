"use client";

import { useErrorStore } from "@/store/errorStore";
import { SignUpSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { baseUrl } from "@/utils/baseUrl";
import ProviderLogs from "./ProviderLogs";
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
    const res = await fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
    <section className="min-h-screen w-full">
      <div className="flex flex-col p-8 w-5/6 md:w-2/3 lg:w-1/3 mx-auto mt-28 mb-10 items-center rounded-2xl bg-zinc-900 justify-center gap-6 h-full">
        <h2 className="lg:text-4xl text-2xl font-bold text-white text-center">
          Create your account
        </h2>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <label htmlFor="name" className="text-white">
              <input
                type="text"
                id="name"
                required
                className={`${
                  errors.name
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-zinc-600"
                } w-full p-4 border border-zinc-300 rounded-md peer bg-transparent`}
                {...register("name")}
              />
              <span
                className={`${
                  errors.name
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-white"
                } label-style bg-transparent`}
              >
                Name
              </span>
            </label>
          </div>

          {errors.name && (
            <p className="text-xs text-red-500">{errors.name?.message}</p>
          )}
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
                } w-full p-4 border border-zinc-300 rounded-md peer bg-transparent`}
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
                id="password"
                required
                className={`${
                  errors.password
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-zinc-600"
                } w-full p-4 border border-zinc-300 rounded-md peer bg-transparent`}
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
          <div className="relative">
            <label htmlFor="confirm-password" className="text-white">
              <input
                type="password"
                id="confirm-password"
                required
                className={`${
                  errors.confirmPassword
                    ? "border border-red-600 outline-red-600 text-red-600"
                    : "focus:outline-zinc-600"
                } w-full p-4 border border-zinc-300 rounded-md peer bg-transparent`}
                {...register("confirmPassword")}
              />
              <span
                className={`${
                  errors.confirmPassword
                    ? "peer-focus:text-red-600 text-red-600"
                    : "peer-focus:text-white"
                } label-style`}
              >
                Confirm password
              </span>
            </label>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:bg-zinc-600 px-4 py-3 my-2 text-white font-semibold bg-zinc-500 rounded-lg"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="text-white">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-blue-300 font-semibold hover:text-sky-500"
          >
            log in here
          </Link>
        </p>
        <ProviderLogs />
      </div>
    </section>
  );
}

export default RegisterForm;
