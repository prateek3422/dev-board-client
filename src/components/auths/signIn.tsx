"use client";
import { useState } from "react";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TbPasswordFingerprint } from "react-icons/tb";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "password required" })
    .min(8, { message: "password most be 8 characters" }),
});

export function SignInComp() {
  const [isPassword, setIsPassword] = useState(true);
  const storeSignIn = useAuthStore((state) => state.signIn);

  const passwordToggle = () => {
    setIsPassword(!isPassword);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: any) =>
      Api.post("/auth/signin", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      storeSignIn(data.data?.user);
      window.location.replace("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1"
          >
            <h1 className="text-center font-semibold text-xl mt-4">Sign In</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                  <FormLabel className="text-white "> </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                      type="email"
                        placeholder="Enter your email"
                        className=" grow border-2 border-gray-600 h-[2.5rem]  w-full md:w-72 xl:w-96 m-1  py-2 pl-8 pr-4 "
                        {...field}
                      />
                      <MdEmail
                        size={20}
                        className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center ">
                  <FormLabel> </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        className=" grow border-2 border-gray-600 h-[2.5rem]   w-full md:w-72 xl:w-96 m-1 py-2 pl-8 pr-4 "
                        autoComplete="false"
                        type={isPassword ? "password" : "text"}
                        {...field}
                      />
                      <TbPasswordFingerprint
                        size={20}
                        className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                      />

                      {isPassword ? (
                        <FaEye
                          size={22}
                          onClick={passwordToggle}
                          className="absolute end-2 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                        />
                      ) : (
                        <FaEyeSlash
                          size={22}
                          onClick={passwordToggle}
                          className="absolute end-2 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                        />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mx-auto" disabled={isPending}>
              Sign In
            </Button>
            <div className="font-medium ">
              <Link href="/auth/password/forget" className="text-blue-600">
                Forgot Password
              </Link>
              <br />
              <p >
                Don&apos;t have an account ?
                <Link href="/auth/signup" className="text-blue-600 ml-2">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
