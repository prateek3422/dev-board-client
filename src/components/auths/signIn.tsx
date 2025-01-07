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
import { BackgroundBeams } from "@/components/ui/backgroundBeam";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),

  password: z
    .string({ required_error: "password required" })
    .min(8, { message: "password most be 8 characters" }),
});

export function SignInComp() {
  const [isPassword, setIsPassword] = useState(true);
  const storeSignIn = useAuthStore((state) => state.signIn);

  // Auth0 google signin
  const googleSignin = async () => {
    try{
      const isSuccess = await Api.get("/users/google")

    if(isSuccess){
      const getUser = await Api.get("/users/current-user");

      storeSignIn(getUser.data?.data);
        window.location.replace("/dashboard");
      }
    }catch (error){
      console.log(error)
    }

  };
  const GithubSignin = async () => {
    const isSuccess = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/users/github`,
      "_self"
    );
      const getUser = await Api.get("/users/current-user");
      if (getUser) {
        storeSignIn(getUser.data?.data);
        window.location.replace("/dashboard");
      }

  };

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
      Api.post("/users/signin", data).then((res) => res.data),
    onSuccess: (data: any) => {
      // console.log(data);
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
      <section className="flex justify-center items-center min-h-screen relative">
        <BackgroundBeams />
        <div className="flex mb-4 flex-col rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1 h-full bg-gradient-to-tr from-gray-300/10 to-gray-200/5 z-10  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-4 flex-col rounded-lg p-3 w-full  "
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <img src="/Vector.png" alt="" className="w-10" />
                <h1 className="text-center  text-base ">Sign in devwave</h1>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center  ">
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
                    <FormControl>
                      <div className="relative flex  w-full md:w-70  xl:w-96">
                        <Input
                          placeholder="Enter your password"
                          className=" grow border-2 mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50 h-[2.5rem]   w-full md:w-72  xl:w-96 m-1 py-2 pl-8 pr-4 "
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
                            className="absolute end-4 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                          />
                        ) : (
                          <FaEyeSlash
                            size={22}
                            onClick={passwordToggle}
                            className="absolute end-4 top-0 bottom-0 m-auto w-5 h-5 text-gray-400"
                          />
                        )}
                      </div>
                    </FormControl>

                    <div className="w-full md:w-70 xl:w-96  flex items-center justify-end">
                      <Link
                        href="/auth/password/forget"
                        className="text-blue-600  text-sm font-bold"
                      >
                        forgot password ?
                      </Link>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50  w-full md:w-70 xl:w-96 flex gap-2  items-center"
                disabled={isPending}
              >
                Sign In
              </Button>
            </form>
          </Form>

          {/* <div className="flex justify-center items-center">
            <div className="border my-2  border-gray-900 w-[25%]"></div>
            <span className="mx-2 text-sm">OR</span>
            <div className="border my-2 border-gray-900 w-[25%] "></div>
          </div> */}
          {/* <div className="flex flex-col justify-center items-center gap-2">
            <Button
              className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2"
              onClick={googleSignin}
            >
              {" "}
              <FcGoogle size={25} />
              signIn with Google
            </Button>
            <Button className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2 "
            onClick={GithubSignin}
            >
             {" "}
             <Github size={25} />
             signIn with Github
            </Button>
          </div> */}
          <div className="flex items-center justify-center py-2 text-sm ">
            <p>
              Don&apos;t have an account ?
              <Link
                href="/auth/signup"
                className="text-blue-600 ml-2 text-lg font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
