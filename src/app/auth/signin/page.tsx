"use client";
import { useState } from "react";
import { type SignInFormSchemaType, useSignInForm } from "@/hooks/form/signIn";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

function SignIn() {
  const storeSignIn = useAuthStore((state) => state.signIn);
  const [isPassword, setIsPassword] = useState(true);

  const passwordToggle = () => {
    setIsPassword(!isPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: any) =>
      Api.post("/users/signin", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      storeSignIn(data.data);
      window.location.replace("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleSignIn = (data: SignInFormSchemaType) => {
    mutate(data);
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen mx-2">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex gap-8 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1"
        >
          <h1 className="text-center font-semibold text-xl">Sign In</h1>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <MdEmail size={20} />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("username")}
              />
            </label>
            {errors.username && (
              <p className="text-red-500 font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <TbPasswordFingerprint size={20} />
              <input
                autoComplete="false"
                type={isPassword ? "password" : "text"}
                className="grow"
                placeholder="...."
                {...register("password")}
              />
              {isPassword ? (
                <FaEye size={22} onClick={passwordToggle} />
              ) : (
                <FaEyeSlash size={22} onClick={passwordToggle} />
              )}
            </label>
            {errors.password && (
              <p className="text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-sm btn-primary w-full"
            >
              {isPending ? "Loading..." : "Sign In"}
            </button>
          </div>

          <div className="font-medium">
            <Link href="/auth/password/forget" className="text-primary">
              Forgot Password
            </Link>
            <br />
            <p>
              Don t have an account?{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignIn;
