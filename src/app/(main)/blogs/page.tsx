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
import { FaSearch } from "react-icons/fa";
import parse from "html-react-parser";

export default function Blogs() {
  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () =>
      Api.get(`${process.env.NEXT_PUBLIC_API_URL}/Blogs/getAllBlog`).then(
        (res) => res?.data?.data
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div className="mt-[88px] ">
      <header className="flex justify-center items-center ">
        <SearchBar />
      </header>
      {/* <!-- Card Blog --> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Grid --> */}
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {/* <!-- Card --> */}

          {/* {data?.blogs?.length === 0 && (
            <div className="text-center">No Blogs found</div>
          )} */}

          {data?.map((item: any) => (
            <Link
              key={item._id}
              href={`/blogs/${item.slug}`}
              className="group rounded-xl overflow-hidden"
            >
              <div className="sm:flex">
                <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-72 h-56">
                  {/* <Image
                        className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                        src={item?.image?.url}
                        height={1920}
                        width={1080}
                        alt="Image Description"
                      /> */}
                  <img
                    src={item?.image?.url}
                    alt="Image Description"
                    className="group-hover:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
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
      {/* <!-- End Card Blog --> */}
    </div>
  );
}
