"use client";
import Image from "next/image";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaQuoteLeft } from "react-icons/fa6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Api, queryClient } from "@/lib";
//@ts-ignore
import parse from "html-react-parser";
//@ts-ignore
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
import { ShareComponent } from "@/components/Share";

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
      Api.get(`/blogs/author/${BlogData?.author?._id}`).then(
        (res) => res?.data?.data
      ),
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
      queryClient.invalidateQueries({ queryKey: ["blogs", slug]});
      queryClient.invalidateQueries({ queryKey: ["Author", BlogData?.author?._id]});
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

 

  if (isLoading)
    return (
      <div className="flex  items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  return (
    <>
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
                      <Button
                      //@ts-ignore
                        variant="none"
                        className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                        onClick={() => mutate()}
                        disabled={!auth.isAuth}
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
                      </Button>
                    </div>
                    {/* <!-- Button --> */}

                    <div className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>

                    {/* <!-- Button --> */}
                    <div className="hs-tooltip inline-block">
                      <CommentSheet
                        blogId={BlogData?._id}
                        comment={BlogData?.comments}
                        auth={auth}
                      />
                    </div>
                    {/* <!-- Button --> */}

                    <div className="block h-3 border-e border-gray-300 mx-3 dark:border-neutral-600"></div>
                    <ShareComponent slug={slug} />


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
                  <Link
                    className="group flex items-center gap-x-6"
                    href={`/blogs/${blog.slug}`}
                  >
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
