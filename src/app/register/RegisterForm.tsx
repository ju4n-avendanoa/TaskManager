"use client";

import { SignUpSchema } from "@/validations/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { baseUrl } from "@/utils/baseUrl";
import ProviderLogs from "../../components/ProviderLogs";
import Link from "next/link";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
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
    try {
      const response = await fetch(`${baseUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        return toast.error(errorResponse);
      }
      toast.success("Sign up successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("There was a problem, please try again later");
    } finally {
      reset();
    }
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col p-8 w-5/6 md:w-2/3 xl:w-1/3 mx-auto mt-[100px] mb-10 items-center rounded-2xl bg-zinc-900 justify-center gap-6">
        <h2 className="text-2xl font-bold text-center text-white lg:text-4xl">
          Create your account
        </h2>
        <form
          className="flex flex-col w-full gap-6"
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
              className="w-full px-4 py-3 my-2 font-semibold text-white rounded-lg hover:bg-zinc-600 bg-zinc-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="text-white">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-blue-300 hover:text-sky-500"
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
