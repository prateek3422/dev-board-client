"use client";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/lib";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { CommentsModal, GetComments } from "@/components";
import { Loader } from "lucide-react";



export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => Api.get(`/blogs/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <div><Loader /></div>;
  return (
    <>
      <section className="mt-16">
       
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl text-center font-bold mt-8">{BlogData?.title}</h1>
              <div className=" mt-4  flex flex-col sm:flex-row sm:gap-8 justify-center items-center gap-4">
                <h3 className="text-2xl font-bold">{BlogData?.author?.name}</h3>
                <h3 className="text-2xl font-bold">
                  {BlogData?.createdAt.split("T")[0]}
                </h3>
              </div>

              <div className="mt-8 flex flex-col  items-center justify-center px-4">
                <Image
                  src={BlogData?.image?.url}
                  alt={BlogData?.title}
                  width={1920}
                  height={1080}
                  className="rounded-xl shadow-lg  object-cover w-full px-4 "
                />
                <div className=" flex  flex-col md:flex-row items-center px-4 justify-between w-full">
                  <div className="flex flex-row   items-center mt-8 gap-3">
                    <h2 className="text-md font-medium ">Tags</h2>
                    <TfiLayoutLineSolid />
                    {BlogData?.tags?.map((tag: any) => (
                      <span
                        className="text-sm border-1 px-4 py-1 bg-[#847F7F] bg-opacity-25 text-white rounded-full font-bold"
                        key={tag._id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row  items-center mt-8 gap-3">
                    <h2 className="text-md font-medium ">categories</h2>
                    <TfiLayoutLineSolid />
                    {BlogData?.categories?.map((tag: any) => (
                      <span
                        className="text-sm border-1 px-4 py-1 bg-[#847F7F] bg-opacity-25 text-white rounded-full font-bold"
                        key={tag._id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-16 flex justify-center">
                  <span className="max-w-4xl text-lg  leading-normal  text-gray-900 dark:text-white mt-8 flex flex-col gap-1 text-wrap">
                    {/* <ReactQuill
                      value={BlogData?.content}
                      readOnly={true}
                      theme={"bubble"}
                    /> */}
                    {parse(BlogData?.content)}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-8 px-10">
              <h2 className="text-3xl flex flex-row items-center justify-between font-bold mt-8 px-4">
                {BlogData?.comments?.length} Comments
               <CommentsModal name="Add Comments" title="Add Comments" lable="Comments" id={BlogData?._id}  />
              </h2>
             <GetComments blogId={BlogData?._id} />
            </div> */}
          </div>
      
      </section>
    </>
  );
}
