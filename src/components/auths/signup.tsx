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
import { SiNamecheap } from "react-icons/si";
import axios from "axios";
import { User } from "lucide-react";
import { BackgroundBeams } from "../ui/backgroundBeam";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

const formSchema = z.object({
  Fullname: z
    .string()
    .min(3, { message: "name must be at least 3 characters" }),
  Username: z
    .string()
    .min(3, { message: "name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "password required" })
    .min(8, { message: "password most be 8 characters" }),
});

export const SignUpComp = () => {
  const [isPassword, setIsPassword] = useState(true);
  const storeSignIn = useAuthStore((state) => state.signIn);
  const passwordToggle = () => {
    setIsPassword(!isPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Fullname: "",
      Username: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: any) =>
      Api.post("/users/register", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      // storeSignIn(data.data);
      window.location.replace("/auth/email/verify");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  //auth0 google signup
  const googleSignUp = async () => {
    const isSuccess = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/users/google`,
      "_self"
    );

    if (isSuccess) {
      const getUser = await Api.get("/users/current-user");
      if (getUser) {
        storeSignIn(getUser.data?.data);
        window.location.replace("/dashboard");
      }
    }
  };
  const GithubSignUp = async () => {
    const isSuccess = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/users/github`,
      "_self"
    );

    if (isSuccess) {
      const getUser = await Api.get("/users/current-user");
      if (getUser) {
        storeSignIn(getUser.data?.data);
        window.location.replace("/dashboard");
      }
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <>
      <section className="flex  flex-col justify-center items-center min-h-screen relative">
        <BackgroundBeams />
        <div className="flex mb-4 flex-col rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1 h-full bg-gradient-to-tr from-gray-300/10 to-gray-200/5 z-10  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex mb-4 flex-col rounded-lg p-3 w-full  "
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <img src="/Vector.png" alt="" className="w-10" />
                <h1 className="text-center  text-base ">Sign up devwave</h1>
              </div>

              <FormField
                control={form.control}
                name="Fullname"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center ">
                    <FormLabel className="text-white "> </FormLabel>
                    <FormControl>
                      <div className="relative  flex  w-full md:w-70  xl:w-96">
                        <Input
                          type="text"
                          placeholder="Enter your Fullname"
                          className=" grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-72 xl:w-96 "
                          {...field}
                        />
                        <SiNamecheap
                          size={20}
                          className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Username"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center ">
                    <FormLabel className="text-white "> </FormLabel>
                    <FormControl>
                      <div className="relative flex  w-full md:w-70  xl:w-96">
                        <Input
                          type="text"
                          placeholder="Enter your Username"
                          className=" grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-72 xl:w-96  "
                          {...field}
                        />
                        <User
                          size={20}
                          className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center  ">
                    <FormLabel className="text-white "> </FormLabel>
                    <FormControl>
                      <div className="relative flex  w-full md:w-70  xl:w-96">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className=" grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-72 xl:w-96 "
                          {...field}
                        />
                        <MdEmail
                          size={20}
                          className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5"
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
                      <div className="relative flex  w-full md:w-70  xl:w-96">
                        <Input
                          placeholder="Enter your password"
                          className=" grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-72 xl:w-96 "
                          autoComplete="false"
                          type={isPassword ? "password" : "text"}
                          {...field}
                        />
                        <TbPasswordFingerprint
                          size={20}
                          className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5"
                        />

                        {isPassword ? (
                          <FaEye
                            size={22}
                            onClick={passwordToggle}
                            className="absolute end-2 top-0 bottom-0 m-auto w-5 h-5"
                          />
                        ) : (
                          <FaEyeSlash
                            size={22}
                            onClick={passwordToggle}
                            className="absolute end-2 top-0 bottom-0 m-auto w-5 h-5"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className=" mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2  items-center my-2"
                disabled={isPending}
              >
                Sign Up
              </Button>
            </form>
          </Form>

          {/* <div className="flex justify-center items-center">
            <div className="border my-2  border-gray-900 w-[25%]"></div>
            <span className="mx-2 text-sm">OR</span>
            <div className="border my-2 border-gray-900 w-[25%] "></div>
          </div> */}
{/* 
          <div className="flex flex-col justify-center items-center gap-2 my-2">
            <Button
              onClick={googleSignUp}
              className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2"
            >
              {" "}
              <FcGoogle size={25} />
              signIn with Google
            </Button>
            <Button className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2 " 
              onClick={GithubSignUp}
            >
             {" "}
             <FaXTwitter size={25} />
             signIn with github
            </Button>
          </div> */}

          <div className="flex items-center justify-center text-sm  ">
            <p>
              You have an account ?
              <Link
                href="/auth/signin"
                className="text-blue-600 text-lg font-bold ml-2"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
