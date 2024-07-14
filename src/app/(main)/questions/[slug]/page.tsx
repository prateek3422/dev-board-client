"use client";
import { Loader } from "@/components";
import { Button } from "@/components/ui/button";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
import { Api } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store";
import { Toggle } from "@/components/ui/toggle";
import { BiSolidLike } from "react-icons/bi";

export default function Page({ params }: { params: { slug: any } }) {
  const { slug } = params;
  const auth = useAuthStore((state) => state.auth);

  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["question", slug],
    queryFn: () => Api.get(`/qas/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const [value, setValue] = React.useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["AskAnswer", slug],
    mutationFn: (data: any) =>
      Api.post(`qas/${slug}/answers`, { answer: data }).then((res) => res.data),
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-24">
        <Loader />
      </div>
    );

  const handleSubmit = () => {
    mutate(value);
    setValue("");
  };
  return (
    <>
      <section>
        <div className="px-10 py-2 flex  flex-col mt-20 gap-2 items-center justify-center">
          <h1 className="text-3xl font-bold">{BlogData?.title}</h1>
          <div className="flex flex-row items-center gap-8">
            <h3>Asked by: {BlogData?.author.name}</h3>
            <h3>{BlogData?.createdAt.slice(0, 10)}</h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Separator className="my-4 w-[80vw]" />
          <div>
            <div className="w-full py-2 px-4 m   flex flex-col gap-4 justify-center items-center">
              <h2 className=" mt-4  max-w-[80vw]">
                {parse(BlogData?.question)}
              </h2>
            </div>

            <div className="flex flex-row items-center gap-8">
              {BlogData?.tags?.map((tag: any) => (
                <div
                  className="bg-[#3B82F6] text-white text-xs px-2 py-1 rounded-lg w-12 text-cener mt-4 "
                  key={tag._id}
                >
                  {tag.name}
                </div>
              ))}
            <Toggle className="bg-[#101010] text-white text-xs px-2 py-1 rounded-lg w-12 text-cener mt-4  "  aria-activedescendant="#FE0000"><BiSolidLike /></Toggle>
            </div>

          </div>

          <Separator className="my-4 w-[80vw]" />

          <div>
            <div className="w-full py-2 px-4 m   flex flex-col gap-4 justify-center items-center">
              {BlogData?.answers?.map((answer: any) => (
                <div
                  key={answer._id}
                  className="w-full py-2 px-4 m   flex flex-col gap-4 justify-center items-center"
                >
                  <h2 className=" mt-4  max-w-[80vw]">
                    {parse(answer.answer)}
                  </h2>
                  <div className="flex flex-row items-center gap-8">
                    <h3>Asked by: {answer.author.name}</h3>
                    {/* <h3>{answer.createdAt.slice(0, 10)}</h3> */}
                  </div>

                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 bg-red-600 border-[redx-8]  "></div>

          <div className="w-full py-2 px-4 flex flex-col gap-4 justify-center items-center">
            <Editor
              className="w-full py-2 px-4  max-w-[80vw] mt-4"
              disabled={true}
              value={value}
              onChange={setValue}
            />
            {auth.isAuth ? (
              <Link href="/Ask">
                <Button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto mt-16"
                  onClick={handleSubmit}
                >
                  Post your answer
                </Button>
              </Link>
            ) : (
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mx-auto mt-16"
                disabled
              >
                Post your answer
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
