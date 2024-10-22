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
import { BackgroundBeams } from "@/components/ui/backgroundBeam";

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
      <section className="flex justify-center items-center min-h-screen relative">
        <BackgroundBeams />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1 h-full bg-gradient-to-tr from-gray-300/10 to-gray-200/5 z-10  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50"
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <img src="/Vector.png" alt="" className="w-10" />
              <h1 className="text-center  text-base ">Forget password</h1>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormControl>
                    <div className="relative  w-full md:w-70  xl:w-96">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-70 xl:w-96"
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

            <Button
              type="submit"
              className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 w-full md:w-70 xl:w-96 flex gap-2  items-center"
              disabled={isPending}
            >
              Forgot Password
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}

export default Page;
