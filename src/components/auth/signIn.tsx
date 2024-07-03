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
      storeSignIn(data.data);
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
            className="flex gap-8 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1"
          >
            <h1 className="text-center font-semibold text-xl">Sign In</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-2 px-4">
                  <FormLabel className="text-white ">
                    {" "}
                    <MdEmail size={20} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className=" grow border-2 border-gray-600 mr-8 h-[2.5rem]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-2 px-4">
                  <FormLabel>
                    {" "}
                    <TbPasswordFingerprint size={20} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className=" grow border-2 border-gray-600 h-[2.5rem]"
                      autoComplete="false"
                      type={isPassword ? "password" : "text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {isPassword ? (
                    <FaEye size={22} onClick={passwordToggle} />
                  ) : (
                    <FaEyeSlash size={22} onClick={passwordToggle} />
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
            >
              Submit
            </Button>
            <div className="font-medium">
            <Link href="/auth/password/forget" className="text-blue-600">
              Forgot Password
            </Link>
            <br />
            <p>
              Don t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600">
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
