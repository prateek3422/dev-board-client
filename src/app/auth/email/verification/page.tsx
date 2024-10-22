"use client";
import { BackgroundBeams } from "@/components/ui/backgroundBeam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";

function Page() {
  const [value, setValue] = useState({ email: "" });

  const { mutate, isPending } = useMutation({
    mutationKey: ["verifyPassword"],
    mutationFn: (data: any) =>
      Api.post("/users/resend-email", { email: data }).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);

      window.location.replace("/auth/email/verify");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const sendVerificationEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(value.email);
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen relative">
        <BackgroundBeams />
        <form
          onSubmit={sendVerificationEmail}
          className="flex gap-4 flex-col rounded-lg p-3 w-full md:w-1/2 lg:w-1/3 m-1 h-full bg-gradient-to-tr from-gray-300/10 to-gray-200/5 z-10  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50 py-8"
        >
          <h1 className="text-center font-semibold text-xl">
            Send Verification Email
          </h1>

          <div>
            <label className="input input-bordered flex justify-center  items-center gap-2">
              <MdEmail size={20} />
              <Input
                type="email"
                className=" grow border-2  mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg  border-gray-600/50    h-[2.5rem]  m-1 py-2 pl-8 pr-4 w-full md:w-72 xl:w-96"
                placeholder="email"
                value={value.email}
                onChange={(e) => setValue({ email: e.target.value })}
              />
            </label>

            <p className="text-red-500 font-medium"></p>
          </div>

          <div>
            <Button
              type="submit"
              className="mx-auto text-black dark:text-white  bg-clip-padding  backdrop-blur-md bg-opacity-30 shadow-lg border border-gray-600/50  flex gap-2  items-center"
            >
              Send Verification Email
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Page;
