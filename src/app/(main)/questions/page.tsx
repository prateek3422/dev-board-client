"use client";

import { BlogModal } from "@/components/dashboard/modal/BlogModal";
import { QuestionSearchBar } from "@/components/main/QuestionSearch";
import { SearchBar } from "@/components/main/SearchBar";
import { Button } from "@/components/ui/button";
import { Api } from "@/lib";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Avatar from "react-avatar";
import { format } from "timeago.js"


export default function Questions() {
  const auth = useAuthStore((state) => state.auth);
  const { data: questions } = useQuery({
    queryKey: ["question"],
    queryFn: () => Api.get(`/qas`).then((res) => res.data?.data?.questions),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: tag } = useQuery({
    queryKey: ["tag"],
    queryFn: () => Api.get(`/tags?func=true`).then((res) => res.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: () => Api.get(`/categories?func=true`).then((res) => res.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <section>
      <header className="bg-fixed h-[calc(60vh-4vh)] bg-[#030712]  bg-cover bg-center bg-no-repeat rounded-lg shadow-lg px-4 py-2">
        <div className="bg-[url('/alex-perez-pEgsWN0kwbQ-unsplash.jpg')] h-full bg-cover bg-center bg-no-repeat w-full  flex flex-col items-center justify-center">
          <h1 className="text-3xl  font-bold  text-white w-50vw ">
            Share & grow the world knowledge!
          </h1>

          <p className="text-center text-white max-w-3xl mt-4 font-bold ">
            Our mission is to connect developers and enthusiasts with the
            knowledge they seek, enabling a dynamic exchange of coding expertise
            and diverse perspectives. By fostering a collaborative environment,
            we aim to enhance understanding and empower everyone to share their
            programming knowledge, driving innovation and growth in the tech
            community
          </p>
        </div>
      </header>

      <main>
        <div className="search  rounded-lg shadow-lg px-8 py-4 flex flex-row items-center justify-center">
          <QuestionSearchBar />
        </div>

        <div className="max-w-[75rem] px-4 py-2 grid gap-4 mt-4 md:grid-cols-[55vw_minmax(20vw,_1fr)] mx-auto">
          <div className="  flex flex-col  items-center w-full ">
            {questions?.map((data: any) => (
              <Link
                href={`/questions/${data?._id}`}
                key={data.id}
                className="flex flex-col sm:flex-row  border-2 mb-4 w-full justify-between  gap-4 bg-[#847f7f21] px-4 py-2 rounded-lg"
              >
                <div className="flex gap-4 flex-col sm:flex-row items-start  justify-start">
                  <div className="flex flex-row sm:flex-col  gap-4 items-start justify-start sm:justify-center">
                    <span>{data?.answers?.length} answers</span>
                    <span>{data.likes?.length} likes</span>
                  </div>
                  <div className="flex flex-col gap-4 items-start justify-center">
                    <p className="text-white text-sm">{data.title}</p>
                    {data?.tags?.map((item: any) => (
                      <div
                        className="bg-[#3B82F6] text-white text-xs px-2 py-1 rounded-lg"
                        key={item._id}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" flex gap-4 items-end justify-end">
                  <div className="flex gap-1 items-center">
                    <Avatar
                      name={data?.author.name}
                      src={data?.author.avatar?.url}
                      size="20"
                      round
                    />
                    <span>{data?.author.name}</span>
                  </div>

                  <div
                    className="flex gap-2
                   items-center"
                  >
                    <span>asked</span>
                    <span>{format(data?.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-[#847f7f21]  rounded-xl flex flex-col items-center  gap-8 ">
            {auth.isAuth ? (
              <Link href="/Ask">
                <Button className="mt-4 bg-[#4926b0] hover:bg-[#3000b6] text-white">
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
{/* 
            <div className="border-2   flex flex-row items-center justify-center ">
              {tag?.data?.tags?.map((item: any) => (
                <div
                  key={item._id}
                  className="flex items-center justify-center py-4"
                >
                  <Button>{item.name}</Button>
                </div>
              ))}
            </div>

            <div className="border-2  flex flex-row items-center justify-center ">
              {category?.data?.categories?.map((item: any) => (
                <div
                  key={item._id}
                  className="flex  items-center justify-center gap-2  py-4"
                >
                  <Button>{item.name}</Button>
                </div>
              ))} */}
            {/* </div> */}
          </div>
        </div>
      </main>
    </section>
  );
}
