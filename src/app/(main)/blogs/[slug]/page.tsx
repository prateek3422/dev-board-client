"use client";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api, queryClient } from "@/lib";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { CommentsModal, GetComments, Loader } from "@/components";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store";
import { stat } from "fs";
import Avatar from "react-avatar";
import Blogs from "../page";
import { CommentSheet } from "@/components/main/modal/CommentSheet";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { slug: string } }) {
  const auth = useAuthStore((state) => state.auth);
  const { slug } = params;
  const { data: BlogData, isLoading } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => Api.get(`/blogs/${slug}`).then((res) => res?.data?.data),
    enabled: !!slug,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  

  const { data: Author } = useQuery({
    queryKey: ["author", BlogData?.author?._id],
    queryFn: () =>
      Api.get(`/blogs/author/${BlogData?.author?._id}`).then((res) => res?.data?.data),
    enabled: !!BlogData?.author?._id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });


  const { mutate, isPending } = useMutation({
    mutationKey: ["BlogLike"],
    mutationFn: () =>
      Api.post(`/blogs/${BlogData?._id}/like`, {}).then((res) => res.data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["blogs", slug] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });
  
  const handleLike = () => {
    mutate();
  }

 

  if (isLoading)
    return (
      <div className="flex  items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  return (
    <>
      {/* 
    
      <section classNameName="mt-16">
       
          <div classNameName="flex flex-col items-center justify-center">
            <div classNameName="flex flex-col items-center justify-center">
              <h1 classNameName="text-4xl text-center font-bold mt-8">{BlogData?.title}</h1>
              <div classNameName=" mt-4  flex flex-col sm:flex-row sm:gap-8 justify-center items-center gap-4">
                <h3 classNameName="text-2xl font-bold">{BlogData?.author?.name}</h3>
                <h3 classNameName="text-2xl font-bold">
                  {BlogData?.createdAt.split("T")[0]}
                </h3>
              </div>

              <div classNameName="mt-8 flex flex-col  items-center justify-center px-4">
                <Image
                  src={BlogData?.image?.url}
                  alt={BlogData?.title}
                  width={1920}
                  height={1080}
                  classNameName="rounded-xl shadow-lg  object-cover w-full px-4 "
                />
                <div classNameName=" flex  flex-col md:flex-row items-center px-4 justify-between w-full">
                  <div classNameName="flex flex-row   items-center mt-8 gap-3">
                    <h2 classNameName="text-md font-medium ">Tags</h2>
                    <TfiLayoutLineSolid />
                    {BlogData?.tags?.map((tag: any) => (
                      <span
                        classNameName="text-sm border-1 px-4 py-1 bg-[#847F7F] bg-opacity-25 text-white rounded-full font-bold"
                        key={tag._id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div classNameName="flex flex-row  items-center mt-8 gap-3">
                    <h2 classNameName="text-md font-medium ">categories</h2>
                    <TfiLayoutLineSolid />
                    {BlogData?.categories?.map((tag: any) => (
                      <span
                        classNameName="text-sm border-1 px-4 py-1 bg-[#847F7F] bg-opacity-25 text-white rounded-full font-bold"
                        key={tag._id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div classNameName="mt-16 flex justify-center">
                  <span classNameName="max-w-4xl text-lg  leading-normal  text-gray-900 dark:text-white mt-8 flex flex-col gap-1 text-wrap">
                    <ReactQuill
                      value={BlogData?.content}
                      readOnly={true}
                      theme={"bubble"}
                    />
                    {parse(BlogData?.content)}
                  </span>
                </div>
              </div>
            </div>

            <div classNameName="flex flex-col gap-8 px-10">
              <h2 classNameName="text-3xl flex flex-row items-center justify-between font-bold mt-8 px-4">
                {BlogData?.comments?.length} Comments
               <CommentsModal name="Add Comments" title="Add Comments" lable="Comments" id={BlogData?._id}  />
              </h2>
             <GetComments blogId={BlogData?._id} />
            </div>
          </div>
      
      </section> */}

      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto mt-20">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
          {/* <!-- Content --> */}
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
              <div className="space-y-5 lg:space-y-8">
                <Link
                  className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline dark:text-blue-500"
                  href="/blogs"
                >
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Blog
                </Link>

                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
                  {BlogData?.title}
                </h2>

                <div className="flex items-center gap-x-5">
                  <a
                    className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200"
                    href="#"
                  >
                    Company News
                  </a>
                  <span className="text-xs sm:text-sm text-gray-800 dark:text-neutral-200">
                    {BlogData?.createdAt.split("T")[0]}
                  </span>
                </div>
                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src={BlogData?.image?.url}
                    alt={BlogData?.title}
                  />
                  {/* <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                    A man and a woman looking at a cell phone.
                  </figcaption> */}
                </figure>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">
                    Bringing the culture of sharing to everyone
                  </h3>

                  <span className="text-lg text-gray-800 dark:text-neutral-200">
                    {parse(BlogData?.content)}
                  </span>
                </div>
                <div className="grid lg:flex lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                  {/* <!-- Badges/Tags --> */}
                  {/* <div>
                    <a
                      className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      href="#"
                    >
                      Plan
                    </a>
                    <a
                      className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      href="#"
                    >
                      Web development
                    </a>
                    <a
                      className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      href="#"
                    >
                      Free
                    </a>
                    <a
                      className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      href="#"
                    >
                      Team
                    </a>
                  </div> */}

                  <div>
                    {BlogData?.tags?.map((tag: any) => (
                      <span
                        className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                        key={tag._id}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  {/* <!-- End Badges/Tags --> */}

                  <div className="flex justify-end items-center gap-x-1.5">
                    {/* <!-- Button --> */}
                    <div className="hs-tooltip inline-block">
                      <button
                        type="button"
                        className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                      onClick={() => mutate()}
                     >
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
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {BlogData?.likes?.length}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>likes</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </button>
                    </div>
                    {/* <!-- Button --> */}

                    <div className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>

                    {/* <!-- Button --> */}
                    <div className="hs-tooltip inline-block">
                      <CommentSheet blogId={BlogData?._id}  comment={BlogData?.comments} />
                    </div>
                    {/* <!-- Button --> */}

                    <div className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>

                    {/* <!-- share --> */}
                    <div className="hs-dropdown relative inline-flex">
                      <button
                        type="button"
                        id="blog-article-share-dropdown"
                        className="hs-dropdown-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                      >
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
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" x2="12" y1="2" y2="15" />
                        </svg>
                        Share
                      </button>
                      <div
                        className="hs-dropdown-menu w-56 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mb-1 z-10 bg-gray-900 shadow-md rounded-xl p-2 dark:bg-black"
                        aria-labelledby="blog-article-share-dropdown"
                      >
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:ring-neutral-400"
                          href="#"
                        >
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
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                          Copy link
                        </a>
                        <div className="border-t border-gray-600 my-2 dark:border-neutral-800"></div>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:ring-neutral-400"
                          href="#"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                          </svg>
                          Share on Twitter
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:ring-neutral-400"
                          href="#"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg>
                          Share on Facebook
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:ring-neutral-400"
                          href="#"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                          </svg>
                          Share on LinkedIn
                        </a>
                      </div>
                    </div>
                    {/* <!-- Button --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Content --> */}

          {/* <!-- Sidebar -->/ */}
          <div className="lg:col-span-1 lg:w-full lg:h-full lg:bg-gradient-to-r lg:from-gray-50 lg:via-transparent lg:to-transparent dark:from-neutral-800">
            <div className="sticky top-0 start-0 py-8 lg:ps-8">
              {/* <!-- Avatar Media --> */}
              <div className="group flex items-center gap-x-3 border-b border-gray-200 pb-8 mb-8 dark:border-neutral-700">
                <Avatar
                  name={BlogData?.author?.name}
                  src={BlogData?.author?.avatar?.url}
                  size="40"
                  round={true}
                />

                <a className="group grow block" href="">
                  <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                    {BlogData?.author?.name}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {BlogData?.author?.email}
                  </p>
                </a>

                <div className="grow">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                      </svg>
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- End Avatar Media --> */}

              {Author?.blogs?.map((blog: any) => (
                <div className="space-y-6" key={blog._id}>
                  {/* <!-- Media --> */}
                  <Link className="group flex items-center gap-x-6" href={`/blogs/${blog.slug}`}>
                    <div className="grow mt-4">
                      <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-500">
                     {blog.title}
                      </span>
                    </div>

                    <div className="flex-shrink-0 relative rounded-lg overflow-hidden size-20 mt-4">
                      <img
                        className="size-full absolute top-0 start-0 object-cover rounded-lg"
                        src={blog.image?.url}
                        alt="Image Description"
                      />
                    </div>
                  </Link>
                  {/* <!-- End Media --> */}
                </div>
              ))}
            </div>
          </div>
          {/* <!-- End Sidebar --> */}
        </div>
      </div>
    </>
  );
}
