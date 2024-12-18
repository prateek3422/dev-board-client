"use client";
import { Loader } from "@/components";
import { Button } from "@/components/ui/button";
import Editor from "@/components/Editor/Editor";
import { Api, queryClient } from "@/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store";
import { Toggle } from "@/components/ui/toggle";
import { BiSolidLike } from "react-icons/bi";
import { AnswerModal } from "@/components/main/modal/AnswerModal";
import { format } from "timeago.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardPen, Edit, Trash2 } from "lucide-react";
import { EditAnswerModal } from "@/components/main/modal/EditAnswerModal";
import convertToReactElements from "@/components/htmlparser";

export default function Page({ params }: { params: { slug: any } }) {
  const { slug } = params;
  const auth = useAuthStore((state) => state.auth);

  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["question", slug],
    queryFn: () => Api.get(`Questions/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["QuestionLike"],
    mutationFn: () =>
      Api.post(`/Likes//toggle/q/${slug}`, {}).then((res) => res?.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["question", slug] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: DeleteAnswer } = useMutation({
    mutationKey: ["DeleteAnswer"],
    mutationFn: (answerId: string) =>
      Api.delete(`/Answers/${answerId}`).then((res) => res?.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["question", slug] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-24 min-h-[calc(100vh-13.5vh)]">
        <Loader />
      </div>
    );

  return (
    <>
      <section className="w-full md:max-w-4xl  px-4 mt-20 lg:pt-10 pb-12 sm:px-6 lg:px-8 md:mx-auto bg-neutral-800">
        <div className=" flex flex-col md:flex-row gap-4 items-start justify-between">
          <div className=" py-2 flex  flex-col  gap-2 items-start justify-center">
            <h1 className="text-2xl font-bold text-wrap">{BlogData?.title}</h1>
            <div className="flex flex-row items-center gap-8">
              <h3>Asked {format(BlogData?.createdAt.slice(0, 10))}</h3>
              <h3>Answer {BlogData?.answer?.length}</h3>
            </div>
          </div>

          {/* //question bitton */}

          <div className="">
            {auth.isAuth ? (
              <Link href="/Ask">
                <Button className="mt-4  bg-[#4926b0] hover:bg-[#3000b6] text-white">
                  Add Question
                </Button>
              </Link>
            ) : (
              <Button
                className="mt-4 bg-[#4926b0] hover:bg-[#3000b6] text-white"
                disabled
              >
                Add Question
              </Button>
            )}
          </div>
        </div>
        <Separator className="my-4 text-center" />
        {/* question block */}
        <div className="flex flex-col justify-center">
          <div>
            <div className="w-full py-2 px-4   flex flex-col gap-4 justify-center  ">
              <span>{convertToReactElements(BlogData?.question)}</span>
            </div>

            <div className="flex flex-row items-center  justify-between gap-8 px-4 ">
              <div className="flex  items-center justify-center gap-4">
                {BlogData?.tags?.map((tag: any) => (
                  <div
                    className="bg-[#4926b0] text-white text-xs px-2 py-1 rounded-lg  text-center  "
                    key={tag._id}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>

              <div className="hs-tooltip inline-block">
                <Button
                  //@ts-ignore
                  variant="none"
                  className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                  onClick={() => mutate()}
                  disabled={!auth.isAuth}
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{BlogData?.likes?.length}</TooltipTrigger>
                      <TooltipContent>
                        <p>likes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 " />

          {/* answers block */}
          <div className=" ">
            <div className="w-full py-2 px-4  flex flex-col  ">
              <div className="mb-2 px-4 py-2 ">
                <h1>{BlogData?.answer?.length} answers</h1>
              </div>
              {BlogData?.answer?.map(
                (answer: any) => (
                  console.log(answer?._id),
                  (
                    <div
                      key={answer._id}
                      className="w-full py-2 px-4flex flex-col items-center"
                    >
                      <div className=" px-4 py-2  rounded-lg ">
                        <span className=" mt-4  max-w-[80vw] ">
                          {convertToReactElements(answer.answer)}
                        </span>
                        <div className="flex flex-row items-center justify-between gap-8 mt-4">
                          <h3 className="text-[#9a7afc]">
                            Asked by: {answer.owner.Username}
                          </h3>

                          {auth.user?._id === answer.owner._id ? (
                            <div className="flex gap-4">
                              <Button
                                variant="none"
                                onClick={() => DeleteAnswer(answer?._id)}
                              >
                                <Trash2 />
                              </Button>
                              <EditAnswerModal
                                slug={answer?._id}
                                qusId={slug}
                                content={answer?.answer}
                              />
                            </div>
                          ) : null}
                        </div>

                        <Separator className="my-4" />
                      </div>
                    </div>
                  )
                )
              )}
            </div>
            <div className="my-8 px-4 ">
              <AnswerModal questionId={BlogData?._id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
