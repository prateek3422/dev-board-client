'use client';
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { BsQuestionSquareFill } from "react-icons/bs";
import { SiAnswer } from "react-icons/si";
import { FaBlog } from "react-icons/fa6";
import { HiCreditCard } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { Badges, Loader, TopContents } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { Api } from "@/lib";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Dashboard() {

  const { data: profile, isLoading } = useQuery({
    queryKey: ["Auth"],
    queryFn: () => Api.get(`/auth/profile`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <div><Loader /></div>;


  return (
    <section>
      <div className={`p-4 sm:ml-64`}>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-between space-x-4">

          <div className="flex items-center justify-start space-x-4">
            <Image
              src="/abstract-6047465_1920.jpg"
              alt="abstract-6047465_1920.jpg"
              width={1920}
              height={1080}
              className="rounded-full w-24 h-24 sm:w-32 sm:h-32 mr-4"
            />
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {" "}
                @JohnDoe
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {" "}
                John Doe{" "}
              </p>
            </div>
          </div>
          <Link href="/dashboard/updateProfile">
          <Button className="mt-10 bg-[#3B82F6] hover:bg-blue-700 text-white" >update profile</Button>
          </Link>
              </div>
          <div>
            <h1 className="text-2xl font-bold  mt-16 text-gray-900 dark:text-white px-4">
              {" "}
              STATS
            </h1>
            <div className="flex flex-row justify-center gap-4  flex-wrap  items-center mt-4  ">
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  50 Total Answers
                </p>
                <SiAnswer className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  100 Total Questions
                </p>
                <BsQuestionSquareFill className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  50 Total Creadits
                </p>
                <HiCreditCard className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  10 Total Blogs
                </p>
                <FaBlog className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  1k Total Likes
                </p>
                <AiFillLike className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  1k Total Views
                </p>
                <AiOutlineEye className="text-white  text-2xl" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold  mt-16 text-gray-900 dark:text-white px-4">
            BADGES
          </h1>
          <Badges />

        </div>
      </div>
    </section>
  );
}
