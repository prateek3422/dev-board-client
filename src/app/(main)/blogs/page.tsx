import { SearchBar } from "@/components";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?func=true&q=&limit=10&page=1&tags=&cats=&sort=`, {
    cache: "no-store",
  });
  const data = await res?.json();
  return data;
}

export default async function Blogs() {
  const { data } = await getBlogs();
  return (
    <>
      <header className="flex flex-row justify-center items-center">
        <SearchBar />

      </header>

      <section className="flex flex-row flex-wrap w-full items-center justify-center bg-[#030712] rounded-lg shadow-lg p-4">
        {data.blogs.map((item: any) => (
          <Link
            key={item._id}
            href={`/blogs/${item.slug}`}
            className="w-[33%]  p-4 relative transform hover:-translate-y-2 hover:scale-105 duration-500 ease-in-out"
          >
            <Image
              src={item?.image?.url}
              alt="Logo"
              width={1920}
              height={1080}
              className="rounded-lg opacity-80 object-cover h-[40vh] w-[60vw] bg-gradient-to-b from-[#000000] to-[#1a1a1a]"
            />
            <div className="absolute bottom-10 left-5 p-4 text-white text-sm ">
              <p>{item.createdAt?.slice(0, 10)}</p>
              <h1 className="text-lg  font-bold text-wrap mx-2 ">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
