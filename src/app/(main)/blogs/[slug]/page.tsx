"use client";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/lib";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { CommentsModal } from "@/components";


const Data = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "This Is A Standard Format Post.",
    title: "Introduction to JSON",
    content:
      "JSON (JavaScript Object Notation) is a lightweight data-interchange format...",
    tags: ["JSON", "data", "format"],
    isPublic: true,
    author: "John Doe",
    date: "20-06-2024",
    cmments: [
      {
        id: 1,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/3d-cartoon-style-character_23-2151034097.jpg?t=st=1718526536~exp=1718530136~hmac=4b0f8febf835db4853f050e1100c5b6966593d1ae6961034a931fd220252078c&w=740",
        date: "2024-06-20",
      },
      {
        id: 2,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-curly-hair-brown-hat_1142-42780.jpg?t=st=1718526664~exp=1718530264~hmac=c4775b4057860c192f7b2262bd90c69bddb461a8bed882dc17762cd8a958d48b&w=740",
        date: "2024-06-20",
      },
      {
        id: 3,
        content:
          "Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate, facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.",
        author: "John Doe",
        avatar:
          "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1718527511~exp=1718531111~hmac=7b5a4362463526a89c9017c96b4c728bd03b04444384b73da6e600dc5493facd&w=740",
        date: "2024-06-20",
      },
    ],
  },
];

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

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <section>
        {Data.map((item) => (
          <div key={item.id}>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-6xl font-bold mt-8">{item.name}</h1>
              <div className=" mt-4  flex flex-row justify-center items-center gap-8">
                <h3 className="text-2xl font-bold">{BlogData?.author?.name}</h3>
                <h3 className="text-2xl font-bold">
                  {BlogData?.createdAt.split("T")[0]}
                </h3>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center">
                <Image
                  src={BlogData?.image?.url}
                  alt={item.title}
                  width={1920}
                  height={1080}
                  className="rounded-lg shadow-lg object-cover h-[60vh] w-[60vw] "
                />
                <div className=" flex flex-row items-center justify-between w-full">
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

                <div className="mt-16">
                  <span className="max-w-4xl text-lg  leading-normal text-gray-900 dark:text-white mt-8 flex flex-col gap-1 text-wrap">
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

            <div className="flex flex-col gap-8 px-10">
              <h2 className="text-3xl flex flex-row items-center justify-between font-bold mt-8 px-4">
                {BlogData?.comments?.length} Comments
               <CommentsModal name="Add Comments" title="Add Comments" lable="Comments" />
              </h2>
              {Data?.map((comments: any) => (
                <div
                  className="flex flex-col items-start shadow-xl rounded-xl bg-gray-900 p-3"
                  key={comments?._id}
                >
                  <div className="flex flex-row items-center gap-4 justify-center">
                    <div className="flex flex-row items-center  justify-center">
                      {/* <Image
                      src={cmment.avatar}
                      alt={cmment.avatar}
                      width={100}
                      height={100}
                      className="rounded-full shadow-lg object-cover h-[10vh] w-[5vw]"
                    /> */}
                    </div>
                    <div className="flex flex-col  items-start gap-1 justify-center ">
                      <p className="text-xl font-bold">{comments?.author}</p>
                      <p className="text-sm">{comments?.date}</p>
                      <p className="text-sm max-w-[40vw] mt-2 text-gray-900 dark:text-white">
                        {comments?.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
