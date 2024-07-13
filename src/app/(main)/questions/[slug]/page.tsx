'use client';
import { Loader } from "@/components";
import { Api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function Page({params}: {params: {slug: any}}) {
  const { slug } = params;

  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["question", slug],
    queryFn: () => Api.get(`/qas/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  console.log(BlogData);

  if (isLoading) return <div><Loader /></div>;
  return (
    <>

      <section>
        <div className="px-10 py-2 flex  flex-col mt-20 gap-2 items-center justify-center">
          <h1 className="text-3xl font-bold">
           {BlogData?.title}
          </h1>
          <div className="flex flex-row items-center gap-8">
            <h3>Asked by: Alex Perez</h3>
            <h3>{BlogData?.createdAt.slice(0, 10)}</h3>
          </div>
        </div>

        <div className="border-t-2 border-[red] w-full px-8 py-2  ">
          <h2 className="text-center mt-4">
           {
             BlogData?.question

           }
          </h2>

        </div>
      </section>
    </>
  );
}

