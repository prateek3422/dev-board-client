"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["ForgotPassword"],
    mutationFn: (data: any) =>
      Api.post("/auth/forget-password", data).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      window.location.replace("/auth/password/reset");
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center gap-2 px-4">
                  <FormLabel className="text-white "> </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className=" grow border-2 border-gray-600 h-[2.5rem] w-full md:w-72 xl:w-96 m-1   py-2 pl-8 pr-4 "
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

            <Button type="submit" className="mx-auto" disabled={isPending}>
              Forgot Password
            </Button>
            <div className="font-medium ">
              <p>
                Don&apos;t have an account?{" "}
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

export default Page;
