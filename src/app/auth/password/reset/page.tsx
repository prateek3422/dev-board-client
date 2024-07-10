"use client";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { Api } from "@/lib";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  password: z.string(),
});

function Page() {
  const [isPassword, setIsPassword] = useState(true);

  const passwordToggle = () => {
    setIsPassword(!isPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["verifyPassword"],
    mutationFn: (data: any) =>
      Api.post("/auth/verify-email", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      window.location.replace("/");
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
      <section className="flex justify-center items-center h-screen mx-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col bg-gray-800 rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1"
          >
            <h1 className="text-center font-semibold text-xl mt-4">Sign In</h1>

         
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className=" bg-gray-600" />
                        <InputOTPSlot index={1} className=" bg-gray-600" />
                        <InputOTPSlot index={2} className=" bg-gray-600" />
                        <InputOTPSlot index={3} className=" bg-gray-600" />
                        <InputOTPSlot index={4} className=" bg-gray-600" />
                        <InputOTPSlot index={5} className=" bg-gray-600" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  {/* <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                  {/* <FormLabel>One-Time Password</FormLabel> */}
                  <FormControl>
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
                                className=" grow border-2 border-gray-600 h-[2.5rem]   w-full md:w-72 xl:w-96 m-1  py-2 pl-8 pr-4 "
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
                  </FormControl>
                  {/* <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mx-auto mb-8" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}

export default Page;
