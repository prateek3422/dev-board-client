"use client";
import { Api, queryClient } from "@/lib";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import Avatar from "react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import toast from "react-hot-toast";
import { format } from "timeago.js";

export const GetComments = ({ blogId }: { blogId: string }) => {
  const [commentStates, setCommentStates] = useState(
    [] as { visible: boolean; value: string }[]
  );

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

  const { data: updateComment, isPending } = useMutation({
    mutationFn: ({ commentId, comment }: any) =>
      Api.post(`/blogs/comments/${commentId}`, { comment, blogId }).then(
        (res) => res?.data?.data
      ),
    onSuccess: (data) => {
      toast.success("Comment Updated Successfully");
    },
    onError: (error) => {
      toast.error("Error Updating Comment");
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: ({ commentId }: any) =>
      Api.delete(`blogs/comments/${commentId}`, {}).then(
        (res) => res?.data?.data
      ),
    onSuccess: (data) => {
      toast.success("Comment Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["comment", blogId] });
    },
    onError: (error) => {
      toast.error("Error deleting Comment");
    },
  });

  const handleDeleteComment = (commentId: any) => {
    deleteComment({ commentId });
  };

  const handleToggleVisibility = (index: number) => {
    setCommentStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, visible: !state.visible } : state
      )
    );
  };

  const handleChange = (index: number, value: string) => {
    setCommentStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? { ...state, value } : state))
    );
  };

  const handleUpdateComment = (index: number, commentId: string) => {
    updateComment({ commentId, comment: commentStates[index].value });
    setCommentStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, visible: false } : state
      )
    );
  };

  return (
    <>
      <ScrollArea className=" h-[60vh] w-80 rounded-md border mt-8">
        {comment?.comments?.map((comments: any, index: number) => (
          <div key={comments._id}>
            <Separator className="mt-4" />
            <div className="flex flex-col gap-4 p-3 mt-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    name={comments?.author?.name}
                    src={comments?.author?.avatar?.url}
                    size="40"
                    round
                  />
                  <span className="group grow block">
                    <h5 className="group-hover:text-gray-600 text-sm font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200">
                      {comments?.author?.name}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      {format(comments?.createdAt)}
                    </p>
                  </span>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleToggleVisibility(index)}
                      >
                        Edit comment
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => {
                            handleDeleteComment(comments?._id);
                          }}
                        >
                          Delete comment
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="text-md text-gray-800 dark:text-neutral-200 px-4">
                {commentStates[index]?.visible ? (
                  <div className="grid gap-4 py-4">
                    <textarea
                      className="py-3 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-blue-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                      rows={2}
                      value={commentStates[index].value}
                      onChange={(e) => handleChange(index, e.target.value)}
                      placeholder="This is a textarea placeholder"
                    ></textarea>

                    <div>
                      <Button
                        type="submit"
                        onClick={() =>
                          handleUpdateComment(index, comments?._id)
                        }
                      >
                        Update comment
                      </Button>
                    </div>
                  </div>
                ) : (
                  comments?.comment
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};
