"use client";
import { SearchBar } from "@/components/main/SearchBar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import parse from "html-react-parser";
import Avatar from "react-avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "timeago.js";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [toggle, setToggle] = useState("blog");

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () =>
      Api.get(`/getAllBlog?userId=${slug}`).then((res) => res?.data?.data),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: questions } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      Api.get(
        `/qas/author/${slug}
`
      ).then((res) => res.data?.data?.questions),

    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  console.log(data);

  return (
    <>
      <section className="mt-[20vh] max-w-[80rem] mx-auto">
        <div className="flex items-center justify-between  gap-6 px-8 max-w-[35rem]  mx-auto">
          <Avatar
            name={data?.blogs[0]?.author?.name}
            src={data?.blogs[0]?.author?.avatar?.url}
            size="70"
            round={true}
          />

          <div>
            <h1 className="text-2xl font-bold">
              {data?.blogs[0]?.author?.name}
            </h1>
            <div className="flex  gap-4 items-start justify-start">
              <div className="text-sm mt-4">
                {toggle === "blog" ? data?.blogs.length : questions.length}{" "}
                posts{" "}
              </div>
              {/* <p className="text-sm mt-4">10 following </p> */}
              {/* <p className="text-sm mt-4">20 followers </p> */}
            </div>
          </div>

          <div>{/* <Button>follow</Button> */}</div>
        </div>

        <div className="flex gap-4 px-8 py-4 max-w-[35rem]  mx-auto justify-center items-center">
          <div className="text-sm font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li>
                <div
                  className={`${
                    toggle === "blog"
                      ? "inline-block p-4 text-blue-600 border-b-2 hover:cursor-pointer border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "inline-block p-4  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 cursor-pointer"
                  }  }`}
                  onClick={() => setToggle("blog")}
                >
                  Blogs
                </div>
              </li>
              <li>
                <div
                  className={`${
                    toggle === "question"
                      ? "inline-block p-4 text-blue-600 border-b-2 cursor-pointer  border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "inline-block p-4  hover:text-gray-600 cursor-pointer hover:border-gray-300 "
                  }  }`}
                  onClick={() => setToggle("question")}
                >
                  Questions
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${toggle === "blog" ? "block" : "hidden"}`}>
          <div className="max-w-[85rem]  mx-auto">
            {/* <!-- Grid --> */}
            <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
              {/* <!-- Card --> */}

              {data?.blogs.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/blogs/${item.slug}`}
                  className="group rounded-xl overflow-hidden"
                >
                  <div className="sm:flex">
                    <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-72 h-56">
                      <Image
                        className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                        src={item?.image?.url}
                        height={1920}
                        width={1080}
                        alt="Image Description"
                      />
                    </div>

                    <div className="grow mt-4 sm:mt-0 sm:ms-6 px-4 sm:px-0">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
                        {item.title}
                      </h3>
                      <span className="mt-3 text-gray-600 dark:text-neutral-400">
                        {parse(item.content.substring(0, 120))}
                      </span>
                      <p className="mt-4 inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium">
                        Read more
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
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* <!-- End Card --> */}
            </div>
            {/* <!-- End Grid --> */}
          </div>
        </div>

        <div className={`${toggle === "question" ? "block" : "hidden"}`}>
          <div className="max-w-[70rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="  flex flex-col  items-center w-full ">
              {questions?.map((data: any) => (
                <Link
                  href={`/questions/${data?._id}`}
                  key={data._id}
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
          </div>
        </div>
      </section>
    </>
  );
}
