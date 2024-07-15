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

// async function getBlogs() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?func=true&q=&limit=10&page=1&tags=&cats=&sort=`, {
//     cache: "no-store",
//   });
//   const data = await res?.json();
//   return data;
// }

export default  function Blogs() {
  const [Search, setSearch] = useState<string>("");
  console.log(Search);

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => Api.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs?func=true&q=${Search}&limit=10&page=1&tags=&cats=&sort=`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });



  return (
    <div className="mt-[88px] ">
      <header className="flex justify-center items-center ">
      <form className="form relative">
      <input
        className="input rounded-full px-8 py-3 border-2 w-[40vw] border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 bg-[#4e4e4f] shadow-md"
        placeholder="Search..."
        required={false}
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
      />
      <Button className="absolute right-3 -translate-y-1/2 top-1/2 p-1 w-[40px] rounded-full bg-blue-600 hover:bg-blue-700 text-white">
        <FaSearch />
      </Button>
    </form>
      </header>

      <section className=" grid sm:grid-cols-2 md:grid-cols-3 mt-16 max-w-screen-4xl mx-auto gap-4 px-4">
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
      </section>
    </div>
  );
}
