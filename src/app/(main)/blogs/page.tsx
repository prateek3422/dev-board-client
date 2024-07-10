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
    <div className="mt-[88px] ">
      <header className="flex justify-center items-center ">
        <SearchBar />
      </header>

      <section className=" grid sm:grid-cols-2 md:grid-cols-3 mt-16 max-w-screen-4xl mx-auto gap-4 px-4">
        {data.blogs.map((item: any) => (
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
            <div className="absolute left-0 right-0 bottom-0  bg-black/55 backdrop-blur-sm p-2" >
              <p>{item.createdAt?.slice(0, 10)}</p>
              <h1 className="text-lg  font-bold text-wrap  ">
                {item.title}
              </h1>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
