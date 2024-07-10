import { Api } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const GetComments = ({ blogId }: { blogId: string }) => {
  const { data: comment, isLoading } = useQuery({
    queryKey: ["comment", blogId],
    queryFn: () =>
      Api.get(`/blogs/${blogId}/comments?&func=true`).then(
        (res) => res?.data?.data
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

     console.log(comment)
  return (
    <>
      {comment?.comments?.map((comments: any) => (
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
              <p className="text-sm">{comments?.createdAt.split("T")[0]}</p>
              <p className="text-sm max-w-[40vw] mt-2 text-gray-900 dark:text-white">
                {comments?.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
