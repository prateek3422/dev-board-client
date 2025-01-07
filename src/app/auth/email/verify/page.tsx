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
import { useAuthStore } from "@/store";
import { BackgroundBeams } from "@/components/ui/backgroundBeam";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["verifyPassword"],
    mutationFn: (data: any) =>
      Api.post("/users/email-verify", { otp: data.pin }).then(
        (res) => res.data
      ),
    onSuccess: (data: any) => {
      toast.success(data.message);

      window.location.replace("/auth/signin");
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1 h-full bg-gradient-to-tr from-gray-300/10 to-gray-200/5 z-10  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 "
          >
            <h1 className="text-center font-semibold text-xl mt-4">Sign In</h1>

            <FormField
              control={form.control}
              name="pin"
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
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50  flex gap-2  items-center"
              disabled={isPending}
            >
              Submit
            </Button>

            <div className="flex items-center justify-center py-2 text-sm ">
              <p>
                Don&apos;t receive code?{" "}
                <Link
                  href="/auth/email/verification"
                  className="text-blue-600 ml-2 text-lg font-bold"
                >
                  Resend
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}

export default Page;
