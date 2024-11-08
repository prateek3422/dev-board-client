"use client";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { BsQuestionSquareFill } from "react-icons/bs";
import { SiAnswer } from "react-icons/si";
import { FaBlog } from "react-icons/fa6";
import { HiCreditCard } from "react-icons/hi2";
import { AiOutlineEye } from "react-icons/ai";
import { Badges } from "@/components/dashboard/Badges";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "@/lib";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "@/components/Loader";
import Avatar from "react-avatar";
import { FaHeart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { DeleteUser } from "@/components/dashboard/AlertModal/deleteUser";

export default function Dashboard() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["Auth"],
    queryFn: () =>
      Api.get(`/users/current-user`).then((res) => res?.data?.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  console.log(profile);
  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-24 min-h-screen w-full">
        <Loader />
      </div>
    );

  return (
    <section>
      <div className={`flex flex-1 min-h-screen`}>
        <div className="p-4 border-2  rounded-lg dark:border-gray-700">
          <div className="flex flex-col md:flex-row  items-center justify-between space-x-4">
            <div className="flex items-center justify-start space-x-4 gap-2">
              <Avatar
                name={profile?.Fullname}
                src={profile?.avatar?.url}
                size="80"
                round
                className="aspect-auto"
              />
              <div className="flex flex-col justify-center items-start gap-2">
                <p className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {" "}
                  {profile?.Fullname}
                </p>
                <p className="text-lg font-small text-gray-900 dark:text-white">
                  {" "}
                  {profile?.email}
                </p>
              </div>
            </div>
            {/* <Button className="mt-4" variant="destructive">
              Delete
            </Button> */}

            <DeleteUser />
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
                  {profile?.user?.blogCount} Total Blogs
                </p>
                <FaBlog className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  {profile?.user?.questionCount} Total Questions
                </p>
                <BsQuestionSquareFill className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  {profile?.user?.credit} Total Creadits
                </p>
                <HiCreditCard className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  {profile?.user?.answersCount} Total Answers
                </p>
                <SiAnswer className="text-white  text-2xl" />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  {profile?.user?.blogLikesCount} Total Likes
                </p>
                <FaHeart />
              </div>
              <div className=" p-2 bg-blue-500 rounded-lg shadow-md px-4 w-[24rem] flex flex-row justify-between items-center">
                <p className="text-white text-lg font-bold py-2">
                  {" "}
                  {profile?.user?.questionLikesCount} Total question Likes
                </p>

                <AiFillLike className="text-white  text-2xl" />
              </div>
            </div>
          </div>
          {/* <h1 className="text-2xl font-bold  mt-16 text-gray-900 dark:text-white px-4">
            BADGES
          </h1> */}
          {/* <Badges /> */}
        </div>
      </div>
    </section>
  );
}
