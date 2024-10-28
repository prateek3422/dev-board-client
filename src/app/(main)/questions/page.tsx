"use client";
import { QuestionSearchBar } from "@/components/main/QuestionSearch";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Separator } from "@/components/ui/separator";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Avatar from "react-avatar";
import { format } from "timeago.js";

export default function Questions() {
  const auth = useAuthStore((state) => state.auth);

  // get question api call
  const { data: questions } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      Api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/Questions/getAllQuestions`
      ).then((res) => res.data?.data),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <section className="mt-24 h-[calc(100vh-13.5vh)]  py-4 sm:max-w-[70vw] mx-auto bg-neutral-800 ">
      <div className="flex  items-center justify-between px-5 ">
        <QuestionSearchBar />
        <div className="px-2 py-2">
          {auth.isAuth ? (
            <Link href="/Ask">
              <Button className=" bg-[#4926b0] hover:bg-[#3000b6] text-white">
                Add Question
              </Button>
            </Link>
          ) : (
            <Button
              className=" bg-[#4926b0] hover:bg-[#3000b6] text-white"
              disabled
            >
              Add Question
            </Button>
          )}
        </div>
      </div>
      <Separator
        className="h-[3px] my-2 w-[96%] mx-auto "
        orientation="horizontal"
      />

      <div>
        {questions?.map((data: any) => (
          <Link
            href={`/questions/${data?.slug}`}
            key={data._id}
            className="flex flex-col sm:flex-row mb-4 w-full justify-between  gap-4  px-4 py-2 rounded-lg"
          >
            <MagicCard
              className="cursor-pointer shadow-2xl"
              gradientColor={"#404040"}
            >
              <div className="flex gap-4 flex-col sm:flex-row items-start  justify-start py-4 px-4">
                <div className="flex flex-row sm:flex-col  gap-4 items-start justify-start sm:justify-center text-[#9a7afc] ">
                  <div className="text-sm font-normal flex items-center gap-2 ">
                    <span className="font-bold">{data.answer?.length}</span>
                    <span className="font-bold">Answers</span>
                  </div>

                  <div className="text-sm font-normal flex items-center justify-center gap-2">
                    <span className="font-bold ">{data.like?.length}</span>
                    <span className="font-bold">Likes</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-start justify-center">
                  <p className="text-gray-300 text-lg text-wrap">
                    {data.title}
                  </p>
                  <div className="w-full flex justify-center items-center ">
                    <div className="flex flex-row gap-2 items-start justify-center">
                      {data?.tags?.map((item: any) => (
                        <div
                          className="bg-[#4926b0] text-white text-xs px-2 py-1 rounded-lg  "
                          key={item._id}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>

                    <div className=" flex flex-col sm:flex-row gap-4 items-center justify-end  text-gray-300 w-full">
                      <div className="flex gap-1 items-center">
                        <Avatar
                          name={data?.owner?.Fullname}
                          src={data?.owner.avatar?.url}
                          size="20"
                          round
                        />
                        <span>{data?.owner?.Username}</span>
                      </div>

                      <div
                        className="gap-2
                      items-center hidden sm:flex"
                      >
                        <span>asked</span>
                        <span className="w-max">{format(data?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
