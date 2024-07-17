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
import parse from "html-react-parser"


export default function Blogs() {
  const [Search, setSearch] = useState<string>("");
  console.log(Search);

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () =>
      Api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs?func=true&q=${Search}&limit=10&page=1&tags=&cats=&sort=`
      ).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });


  return (
    <div className="mt-[88px] ">
      <header className="flex justify-center items-center ">
        <SearchBar search={Search} setSearch={setSearch} />
      </header>

      {/* <section className=" grid sm:grid-cols-2 md:grid-cols-3 mt-16 max-w-screen-3xl mx-auto gap-8 px-12">
        {data?.blogs.map((item: any) => (
          <Link
            key={item._id}
            href={`/blogs/${item.slug}`}
            className=" relative transform hover:-translate-y-2 hover:scale-105 duration-500 ease-in-out w-full  "
          >
            <div>
              <Image
                src={item?.image?.url}
                alt="Logo"
                width={1920}
                height={1080}
                className="rounded-lg opacity-80 object-cover w-full bg-gradient-to-b from-[#000000] to-[#1a1a1a]"
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0  bg-black/55 backdrop-blur-sm p-2">
              <p>{item.createdAt?.slice(0, 10)}</p>
              <h1 className="text-lg  font-bold text-wrap  ">{item.title}</h1>
            </div>
          </Link>
        ))}
      </section> */}

      {/* <!-- Card Blog --> */}
      <div className="max-w-screen px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Grid --> */}
        <div className="grid lg:grid-cols-3 lg:gap-y-16 gap-10">
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
                  <p className="mt-3 text-gray-600 dark:text-neutral-400">
                   {parse(item.content.substring(0, 200))}
                  </p>
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
