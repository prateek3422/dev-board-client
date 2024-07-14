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
import { AnswerModal } from "@/components/main/modal/AnswerModal";

export default function Page({ params }: { params: { slug: any } }) {
  const { slug } = params;

  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["question", slug],
    queryFn: () => Api.get(`/qas/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-24 min-h-screen">
        <Loader />
      </div>
    );

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
        <Separator className="my-4 w-[80vw] text-center" />
        <div className="flex flex-col justify-center items-center">
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
              <Toggle
                className="bg-[#101010] text-white text-xs px-2 py-1 rounded-lg w-12 text-cener mt-4  "
                aria-activedescendant="#FE0000"
              >
                <BiSolidLike />
              </Toggle>
            </div>
          </div>
          <Separator className="my-8 w-[80vw]" />

          <div className=" ">
            <div className="w-full py-2 px-4  flex flex-col  ">
              <div className="mb-2 px-4 py-2 ">
                <h1>{BlogData?.answers?.length} answers</h1>
              </div>
              {BlogData?.answers?.map((answer: any) => (
                <div
                  key={answer._id}
                  className="w-full py-2 px-4flex flex-col items-center"
                >
                  <div className="border-2  hover:bg-gray-800 border-[#5c5c5c] px-4 py-2  rounded-lg ">
                    <h2 className=" mt-4  max-w-[80vw] ">
                      {parse(answer.answer)}
                    </h2>
                    <div className="flex flex-row items-center gap-8">
                      <h3>Asked by: {answer.author.name}</h3>
                      {/* <h3>{answer.createdAt.slice(0, 10)}</h3> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-8 px-4 ">
              <AnswerModal slug={slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
